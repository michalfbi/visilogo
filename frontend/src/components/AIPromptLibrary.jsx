import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Check, ChevronDown, Copy, Lock, Search, X } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';
import { nb } from '../lib/typo';
import { HONEYPOT_NAME, useSpamGuard } from '../lib/spamGuard';
import { CATEGORIES, FIELDS, FORMS, PROMPTS, sectionsOf, slotsOf, textOf } from '../data/promptLibrary';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';
const STORE_KEY = 'visilogo:prompts:v2';
const EMPTY_FIELDS = Object.fromEntries(FIELDS.map((f) => [f.id, '']));

/* Light per-browser memory: company fields, address form and the unlock. Storage can be missing or full. */
const loadStore = () => {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
const saveStore = (data) => {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    /* private mode or full storage: the page still works, it just forgets on reload */
  }
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
};

const countBy = (list) => list.reduce((acc, p) => ({ ...acc, [p.cat]: (acc[p.cat] || 0) + 1 }), {});
const isGated = (catId) => CATEGORIES.find((c) => c.id === catId)?.gated;
const catLabel = (catId) => CATEGORIES.find((c) => c.id === catId)?.label;
const normalize = (s) => s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
/* Polish words change endings (opinia, opinię, opinii), so each query word matches on its stem. */
const stem = (w) => (w.length >= 6 ? w.slice(0, -2) : w.length >= 4 ? w.slice(0, -1) : w);
const matches = (prompt, query) => {
  const hay = normalize(`${prompt.title} ${prompt.use} ${prompt.where} ${prompt.task} ${catLabel(prompt.cat)}`);
  return normalize(query).split(/\s+/).filter(Boolean).every((w) => hay.includes(stem(w)));
};
const titleHit = (prompt, query) =>
  normalize(query).split(/\s+/).filter(Boolean).every((w) => normalize(prompt.title).includes(stem(w))) ? 1 : 0;

/* ---------------- one prompt ---------------- */

const Parts = ({ parts }) =>
  parts.map((part, i) =>
    part.kind === 'text' ? (
      <React.Fragment key={i}>{part.text}</React.Fragment>
    ) : (
      <mark key={i} className={`pv pv--${part.kind}${part.filled ? ' is-filled' : ''}`}>
        {part.text}
      </mark>
    )
  );

const PromptCard = ({ prompt, fields, forma, showCategory }) => {
  const slots = useMemo(() => slotsOf(prompt), [prompt]);
  const [slotValues, setSlotValues] = useState(() => slots.map(() => ''));
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const sections = sectionsOf(prompt, fields, forma, slotValues);
  const text = textOf(sections);
  const missingSlots = slotValues.filter((v) => !v.trim()).length;

  const flash = (message) => {
    setStatus(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(''), 4000);
  };

  const onCopy = async () => {
    const ok = await copyText(text);
    if (ok) flash('Skopiowano. Wklej do ChatGPT, Claude lub Gemini.');
    else {
      setOpen(true);
      flash('Nie udało się skopiować. Zaznacz tekst promptu i skopiuj go ręcznie.');
    }
  };

  const q = encodeURIComponent(text);

  return (
    <li className="pcard">
      <div className="pcard__head">
        {showCategory && <span className="label">{catLabel(prompt.cat)}</span>}
        <h3>{nb(prompt.title)}</h3>
        <p className="ink-2">{nb(prompt.use)}</p>
      </div>
      <p className="pcard__where">
        <span className="label">Gdzie użyć</span>
        {nb(prompt.where)}
      </p>

      {slots.length > 0 && (
        <div className="pcard__slots">
          {slots.map((slot, i) => {
            const id = `${prompt.id}-slot-${i}`;
            const Field = slot.paste ? 'textarea' : 'input';
            return (
              <div className="field" key={slot.raw}>
                <label htmlFor={id}>{slot.paste ? 'Wklej' : 'Wpisz'}: {slot.hint}</label>
                <Field
                  id={id}
                  className="input"
                  rows={slot.paste ? 3 : undefined}
                  type={slot.paste ? undefined : 'text'}
                  value={slotValues[i]}
                  onChange={(e) => {
                    const next = [...slotValues];
                    next[i] = e.target.value;
                    setSlotValues(next);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="pcard__text" id={`${prompt.id}-text`}>
        {open && (
          <pre className="pcard__extra">
            <Parts parts={sections.header} />
          </pre>
        )}
        <pre>
          {open && <span className="pcard__section">ZADANIE{'\n'}</span>}
          <Parts parts={sections.task} />
        </pre>
        {open && (
          <pre className="pcard__extra">
            <Parts parts={sections.rules} />
          </pre>
        )}
      </div>
      <button
        type="button"
        className="pcard__toggle"
        aria-expanded={open}
        aria-controls={`${prompt.id}-text`}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Ukryj dane firmy i zasady' : 'Pokaż cały prompt z danymi firmy i zasadami'}
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      <div className="pcard__actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={onCopy}>
          {status.startsWith('Skopiowano') ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          Kopiuj prompt
        </button>
        <a className="btn btn--sm" href={`https://chatgpt.com/?q=${q}`} target="_blank" rel="noopener noreferrer">
          Otwórz w ChatGPT
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="btn btn--sm" href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noopener noreferrer">
          Otwórz w Claude
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="pcard__status note" role="status" aria-live="polite">
        {status || (missingSlots > 0 ? `Uzupełnij ${missingSlots === 1 ? 'pole' : 'pola'} powyżej, żeby AI miało z czego pisać.` : '')}
      </p>
    </li>
  );
};

/* ---------------- locked preview ---------------- */

const LockedRow = ({ prompt, showCategory, onUnlock }) => (
  <li className="pcard pcard--locked">
    <div className="pcard__head">
      {showCategory && <span className="label">{catLabel(prompt.cat)}</span>}
      <h3>
        <Lock size={16} aria-hidden="true" /> {nb(prompt.title)}
      </h3>
      <p className="ink-2">{nb(prompt.use)}</p>
    </div>
    {onUnlock && (
      <button type="button" className="link" onClick={() => onUnlock(prompt.cat)}>
        Odblokuj tę kategorię
      </button>
    )}
  </li>
);

/* ---------------- page ---------------- */

const AIPromptLibrary = () => {
  const stored = useMemo(loadStore, []);
  const [fields, setFields] = useState({ ...EMPTY_FIELDS, ...(stored.fields || {}) });
  const [forma, setForma] = useState(stored.forma || 'ty');
  const [unlocked, setUnlocked] = useState(Boolean(stored.unlocked));
  const [active, setActive] = useState('google');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const tabRefs = useRef([]);
  const unlockRef = useRef(null);
  const mainRef = useRef(null);

  /* After switching category or searching from the sticky bar, bring the top of the results back into view. */
  const revealResults = () => {
    requestAnimationFrame(() => {
      const el = mainRef.current;
      if (!el) return;
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
      const top = el.getBoundingClientRect().top;
      if (top < navH) window.scrollTo({ top: window.scrollY + top - navH - 8, behavior: 'auto' });
    });
  };
  const { isBot } = useSpamGuard();

  useEffect(() => {
    saveStore({ fields, forma, unlocked });
  }, [fields, forma, unlocked]);

  const counts = useMemo(() => countBy(PROMPTS), []);
  const gatedTotal = PROMPTS.filter((p) => isGated(p.cat)).length;
  const required = FIELDS.filter((f) => !f.optional);
  const filledCount = required.filter((f) => fields[f.id].trim()).length;

  const searching = query.trim().length > 1;
  const list = searching
    ? PROMPTS.filter((p) => matches(p, query)).sort((x, y) => titleHit(y, query) - titleHit(x, query))
    : PROMPTS.filter((p) => p.cat === active);
  const activeLocked = !searching && isGated(active) && !unlocked;

  const onTabKey = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = CATEGORIES.findIndex((c) => c.id === active);
    const next = (index + step + CATEGORIES.length) % CATEGORIES.length;
    setActive(CATEGORIES[next].id);
    tabRefs.current[next]?.focus();
    revealResults();
  };

  const goUnlock = (catId) => {
    setQuery('');
    setActive(catId);
    requestAnimationFrame(() => unlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const onUnlock = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setUnlockError('Podaj poprawny adres e-mail.');
      return;
    }
    if (!consent) {
      setUnlockError('Aby odblokować bazę, zaznacz zgodę na otrzymywanie materiałów.');
      return;
    }
    setUnlockError('');
    if (!isBot(e.target)) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'Lead z Narzędzia: Baza promptów AI',
          form_location: 'Baza promptów, odblokowanie kategorii',
          page_url: window.location.href,
          email_klienta: email.trim(),
          marketing_consent: true,
          branza: fields.usluga,
          miasto: fields.miasto,
          message: `Odblokowanie bazy promptów (${gatedTotal} dodatkowych). Branża: ${fields.usluga || 'nie podano'}, miasto: ${fields.miasto || 'nie podano'}.`,
        }),
      }).catch(() => {});
    }
    setUnlocked(true);
  };

  const updateField = (id, value) => setFields((prev) => ({ ...prev, [id]: value }));

  return (
    <>
      <Helmet>
        <title>Baza promptów AI dla lokalnych firm | VisiLogo</title>
        <meta
          name="description"
          content={`${PROMPTS.length} gotowych promptów do ChatGPT i Claude dla lokalnych firm: opis i posty do wizytówki Google, odpowiedzi na opinie, teksty na stronę, posty, reklamy i wiadomości do klientów.`}
        />
        <link rel="canonical" href="https://visilogo.com/baza-promptow" />
      </Helmet>

      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Baza promptów AI' }]}
        title="Baza promptów AI dla lokalnych firm"
        lead={`${PROMPTS.length} gotowych poleceń do ChatGPT, Claude i Gemini: wizytówka Google, strona, social media, reklamy i rozmowy z klientami. Wpisz raz dane firmy, a każdy prompt uzupełni się sam.`}
      />

      <section className="section section--s" aria-label="Prompty">
        <div className="container pl">
          <aside className="pl__side" aria-labelledby="pl-company">
            <div className="pl__company">
              <div className="pl__company-head">
                <h2 id="pl-company" className="checkout__h">Dane Twojej firmy</h2>
                <span className="label">
                  {filledCount} z {required.length}
                </span>
              </div>
              {FIELDS.map((f) => (
                <div className="field" key={f.id}>
                  <label htmlFor={`pl-${f.id}`}>
                    {f.label}
                    {f.optional && <span className="label"> (opcjonalnie)</span>}
                  </label>
                  <input
                    id={`pl-${f.id}`}
                    className="input"
                    type="text"
                    placeholder={f.placeholder}
                    value={fields[f.id]}
                    onChange={(e) => updateField(f.id, e.target.value)}
                  />
                </div>
              ))}
              <fieldset className="pl__forma">
                <legend>Jak zwracasz się do klientów</legend>
                <div className="seg">
                  {FORMS.map((f) => (
                    <button key={f.id} type="button" aria-pressed={forma === f.id} onClick={() => setForma(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <p className="note">
                {nb('Dane zapisujemy tylko w tej przeglądarce, żebyś nie musiał wpisywać ich ponownie.')}{' '}
                {Object.values(fields).some((v) => v) && (
                  <button type="button" className="link" onClick={() => setFields(EMPTY_FIELDS)}>
                    Wyczyść
                  </button>
                )}
              </p>
            </div>

            <div className="note-card pl__cta">
              <h2 className="checkout__h">Wolisz, żeby zrobił to ktoś za Ciebie?</h2>
              <p className="ink-2">
                {nb('Napiszemy teksty, ustawimy wizytówkę Google i poprowadzimy reklamy dla Twojej firmy w Kielcach i całym świętokrzyskim.')}
              </p>
              <a href="/#contact" className="link">
                Porozmawiajmy
              </a>
            </div>
          </aside>

          <div className="pl__main" ref={mainRef}>
            <div className="pl__tools">
              <div className="pl__search">
                <Search size={18} aria-hidden="true" />
                <label htmlFor="pl-search" className="visually-hidden">
                  Szukaj promptu
                </label>
                <input
                  id="pl-search"
                  className="input"
                  type="search"
                  placeholder="Szukaj, np. opinia, SMS, reklama"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    revealResults();
                  }}
                />
                {query && (
                  <button type="button" className="pl__clear" onClick={() => setQuery('')} aria-label="Wyczyść wyszukiwanie">
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="pl__cats" role="tablist" aria-label="Kategorie promptów" onKeyDown={onTabKey}>
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`pl-tab-${c.id}`}
                    aria-selected={!searching && active === c.id}
                    aria-controls="pl-panel"
                    tabIndex={active === c.id ? 0 : -1}
                    onClick={() => {
                      setQuery('');
                      setActive(c.id);
                      revealResults();
                    }}
                  >
                    {c.gated && !unlocked && <Lock size={13} aria-label="po zapisie" />}
                    {c.label}
                    <span className="pl__count">{counts[c.id]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div id="pl-panel" role="tabpanel" aria-labelledby={searching ? undefined : `pl-tab-${active}`} aria-label={searching ? 'Wyniki wyszukiwania' : undefined}>
              {searching && (
                <p className="label pl__results" role="status">
                  {list.length === 0 ? 'Nic nie znaleziono. Spróbuj innego słowa.' : `Wyniki: ${list.length}`}
                </p>
              )}

              {activeLocked && (
                <form ref={unlockRef} onSubmit={onUnlock} className="tool-card pl__unlock" noValidate>
                  <h2 className="checkout__h">Odblokuj {gatedTotal} kolejnych promptów</h2>
                  <p className="ink-2">
                    {nb('Reklamy, odpowiedzi na zapytania i reklamacje, przypomnienia, analiza konkurencji i plan marketingu. Podaj e-mail, a w tej przeglądarce zostaną odblokowane na stałe.')}
                  </p>
                  <div className="field">
                    <label htmlFor="pl-email">E-mail</label>
                    <input
                      id="pl-email"
                      className="input"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="imie@twojafirma.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <input className="visually-hidden" type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <ConsentCheckbox marketingConsent={consent} setMarketingConsent={setConsent} />
                  <p className="note">{nb('Razem z e-mailem wyślemy nam to, co wpisałeś w polach „Czym się zajmujesz” i „Miasto”.')}</p>
                  {unlockError && (
                    <p className="alert" role="alert">
                      {unlockError}
                    </p>
                  )}
                  <button type="submit" className="btn btn--primary btn--block">
                    Odblokuj prompty
                  </button>
                </form>
              )}

              <ol className="pl__list">
                {list.map((p) =>
                  isGated(p.cat) && !unlocked ? (
                    <LockedRow key={p.id} prompt={p} showCategory={searching} onUnlock={searching ? goUnlock : null} />
                  ) : (
                    <PromptCard key={p.id} prompt={p} fields={fields} forma={forma} showCategory={searching} />
                  )
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <ToolsStrip current="/baza-promptow" />
    </>
  );
};

export default AIPromptLibrary;
