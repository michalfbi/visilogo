import React, { useRef, useState } from 'react';
import { nb } from '../lib/typo';

const cases = [
  {
    id: 1,
    category: 'Branding',
    title: 'Kompleksowe odświeżenie wizerunku',
    problem:
      'Firma miała przestarzałe logo i niespójne materiały wizualne, przez co wypadała mało profesjonalnie na tle konkurencji.',
    solution:
      'Zaprojektowaliśmy od zera nową tożsamość marki: nowoczesne logo, dopasowaną paletę kolorów, typografię i pełną księgę znaku.',
    result:
      'Marka zyskała nowoczesny wygląd, który szybciej budzi zaufanie i ułatwia rozmowy z klientami premium.',
    stats: 'Nowe logo',
  },
  {
    id: 2,
    category: 'Strony WWW',
    title: 'Zaawansowana strona internetowa',
    problem:
      'Poprzednia witryna działała wolno, źle wyglądała na telefonach i praktycznie nie generowała zapytań z internetu.',
    solution:
      'Zbudowaliśmy nową, szybką i dopracowaną stronę WWW z czytelną strukturą usług, wyraźnymi sekcjami i dopracowanymi punktami kontaktu.',
    result:
      'Strona zaczęła działać jak cyfrowy handlowiec, który pomaga użytkownikowi szybciej przejść od zainteresowania do kontaktu.',
    stats: 'Nowa strona',
  },
  {
    id: 3,
    category: 'Social media',
    title: 'Spójne grafiki na profilach',
    problem:
      'Firma nie miała czasu na regularne publikacje, a materiały wrzucane na Facebooka i LinkedIna były wizualnie słabe i przypadkowe.',
    solution:
      'Stworzyliśmy profesjonalne szablony oraz estetyczne, spójne materiały dopasowane do stylu marki i charakteru oferty.',
    result:
      'Profile zaczęły wyglądać ekspercko i spójnie, a komunikacja wizualna lepiej wspiera prezentację usług w internecie.',
    stats: 'Spójne posty',
  },
  {
    id: 4,
    category: 'Kampanie',
    title: 'Kampania pozyskująca zlecenia',
    problem:
      'Firma miała dobrą ofertę, ale była praktycznie niewidoczna i opierała się wyłącznie na poleceniach oraz ruchu organicznym.',
    solution:
      'Uruchomiliśmy precyzyjne kampanie wizualne w Google Ads i Meta Ads, kierowane do osób realnie szukających tych konkretnych usług.',
    result:
      'Zamiast czekać na przypadkowe zapytania, firma zaczęła regularnie otrzymywać leady i telefony od nowych klientów.',
    stats: 'Więcej zapytań',
  },
];

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const item = cases[active];

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key === 'Home' || event.key === 'End' || keys[event.key]) {
      event.preventDefault();
      const next =
        event.key === 'Home' ? 0 : event.key === 'End' ? cases.length - 1 : (active + keys[event.key] + cases.length) % cases.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="cases" className="section" aria-labelledby="cases-title">
      <div className="container cases">
        <div className="cases__nav">
          <h2 id="cases-title">Realizacje w praktyce</h2>
          <p className="ink-2">Cztery sytuacje, z którymi przychodzą do nas firmy, i co z nimi zrobiliśmy.</p>
          <div className="cases__tabs" role="tablist" aria-label="Realizacje" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {cases.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`case-tab-${c.id}`}
                aria-selected={active === i}
                aria-controls="case-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
              >
                {c.category}
                <span>{c.stats}</span>
              </button>
            ))}
          </div>
        </div>

        <article
          id="case-panel"
          className="sheet crop crop--sheet"
          role="tabpanel"
          aria-labelledby={`case-tab-${item.id}`}
          tabIndex={0}
        >
          <div className="sheet__meta label">
            <span>{item.category}</span>
            <span>
              {active + 1} z {cases.length}
            </span>
          </div>
          <h3>{nb(item.title)}</h3>
          <dl className="sheet__rows">
            <div>
              <dt>Sytuacja</dt>
              <dd>{nb(item.problem)}</dd>
            </div>
            <div>
              <dt>Co zrobiliśmy</dt>
              <dd>{nb(item.solution)}</dd>
            </div>
            <div>
              <dt>Co zyskał klient</dt>
              <dd>{nb(item.result)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
};

export default CaseStudies;
