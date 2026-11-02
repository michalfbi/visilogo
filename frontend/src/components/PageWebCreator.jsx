import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PageHead } from './studio/ui';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const highlights = [
  {
    title: 'Błyskawiczne ładowanie',
    desc: 'Architektura strony jest projektowana pod wydajność, dzięki czemu pierwsze wrażenie jest natychmiastowe i bardziej sprzedażowe.',
  },
  {
    title: 'UX nastawiony na decyzję',
    desc: 'Projektujemy ścieżki uwagi, sekcje i CTA tak, aby użytkownik naturalnie przechodził do kontaktu lub zapytania.',
  },
  {
    title: 'Solidne fundamenty SEO',
    desc: 'Porządna struktura informacji, semantyczny kod i przygotowanie pod dalszy wzrost ruchu organicznego.',
  },
];

const PageWebCreator = () => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    style: '',
    colors: '',
    goal: '',
    inspirations: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus('loading');

    const payload = {
      form_type: 'Kreator zaawansowanej strony WWW',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `Lead z dedykowanego kreatora WWW. Styl: ${formData.style}. Kolory: ${formData.colors}. Cel: ${formData.goal}. Inspiracje: ${formData.inspirations}`,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const busy = status === 'loading';
  const select = (name, label, options) => (
    <div className="field">
      <label htmlFor={`wc-${name}`}>{label}</label>
      <select id={`wc-${name}`} className="input select" name={name} value={formData[name]} onChange={handleInputChange} disabled={busy}>
        <option value="">Wybierz…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Konfigurator', to: '/skonfiguruj-projekt' }, { label: 'Kreator strony WWW' }]}
        title="Zbudujmy stronę, która wygląda premium i pracuje na leady."
        lead="Nie projektujemy zwykłych wizytówek. Tworzymy szybkie, nowoczesne i konwersyjne serwisy B2B, które porządkują komunikację marki i zamieniają ruch w konkretne zapytania."
        wide
      />

      <section className="section section--s" aria-label="Brief strony">
        <div className="container checkout">
          <div className="checkout__info">
            <dl className="rows-list">
              {highlights.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{nb(item.desc)}</dd>
                </div>
              ))}
            </dl>
            <div className="note-card">
              <h2 className="checkout__h">Chcesz zyskać nawet 20% rabatu?</h2>
              <p className="ink-2">
                {nb('Sama strona to mocny fundament, ale największy efekt daje w pakiecie z kampaniami, analityką i contentem. Dobierz więcej usług i obniż koszt całego wdrożenia.')}
              </p>
              <Link to="/skonfiguruj-projekt" state={{ preselectedService: 'www_adv' }} className="btn crop">
                Dobierz usługi i obniż koszty
              </Link>
            </div>
          </div>

          <div className="contact__form crop crop--sheet checkout__form">
            {status === 'success' ? (
              <div className="contact__done" role="status">
                <h2 className="checkout__h">Wizja przyjęta</h2>
                <p className="ink-2">
                  Nasz zespół przeanalizuje Twoje wytyczne i wróci z propozycją kierunku wdrożenia oraz dalszych kroków.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
                  <h2 className="checkout__h">Opowiedz nam o swojej wizji</h2>
                  <p className="ink-2">
                    {nb('Wypełnij krótki brief. Na jego podstawie przygotujemy dokładniejszą wycenę, kierunek kreatywny i rekomendację dla Twojej marki.')}
                  </p>
                </div>
                <div className="contact__pair">
                  {select('style', 'Styl wizualny', ['Nowoczesny i odważny', 'Minimalistyczny i czysty', 'Biznesowy i korporacyjny'])}
                  {select('colors', 'Kolorystyka', ['Ciemny motyw', 'Jasny i przejrzysty', 'Na bazie obecnego logo'])}
                </div>
                {select('goal', 'Główny cel strony', ['Generowanie leadów B2B', 'Wizerunek i portfolio', 'Sprzedaż e-commerce'])}
                <div className="field">
                  <label htmlFor="wc-insp">Linki do inspiracji</label>
                  <textarea id="wc-insp" className="input" name="inspirations" value={formData.inspirations} onChange={handleInputChange} rows={3} placeholder="np. apple.com, stripe.com, linear.app" disabled={busy} />
                </div>
                <div className="field">
                  <label htmlFor="wc-name">Imię i nazwisko lub firma</label>
                  <input id="wc-name" className="input" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} required disabled={busy} />
                </div>
                <div className="contact__pair">
                  <div className="field">
                    <label htmlFor="wc-email">E-mail *</label>
                    <input id="wc-email" className="input" type="email" name="email" autoComplete="email" inputMode="email" value={formData.email} onChange={handleInputChange} required disabled={busy} />
                  </div>
                  <div className="field">
                    <label htmlFor="wc-phone">Telefon</label>
                    <input id="wc-phone" className="input" type="tel" name="phone" autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleInputChange} disabled={busy} />
                  </div>
                </div>
                {status === 'error' && (
                  <p className="alert" role="alert">
                    Nie udało się wysłać briefu. Spróbuj ponownie za chwilę.
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="spin" size={18} aria-hidden="true" /> Wysyłanie briefu
                    </>
                  ) : (
                    <>
                      Wyślij brief i zapytaj o wycenę <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="note">Wycena jest bezpłatna i do niczego nie zobowiązuje.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageWebCreator;
