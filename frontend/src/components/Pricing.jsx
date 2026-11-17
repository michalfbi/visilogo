import React, { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { localPricingPlans, pricingPlans, printPricingPlans, singleServices } from '../mock';
import { nb } from '../lib/typo';

const packageSections = [
  {
    id: 'branding',
    tab: 'Wizerunek i strona',
    title: 'Pakiety wizerunkowe',
    description: 'Jednorazowe inwestycje w fundamenty Twojej marki: logo, identyfikację i nowoczesną stronę WWW.',
    plans: pricingPlans,
    infoCard: null,
    terms: ['Ceny netto, doliczamy 23% VAT', 'Płatność 50% na start i 50% po odbiorze', 'Poprawki w cenie pakietu', 'Umowa i faktura VAT'],
  },
  {
    id: 'print',
    tab: 'Druk',
    title: 'Pakiety druk i identyfikacja',
    description: 'Przenosimy Twoją markę do świata fizycznego. Kompleksowe wsparcie od projektu po dopięcie realizacji.',
    plans: printPricingPlans,
    infoCard: {
      title: 'Gwarancja zero stresu',
      text: 'My projektujemy, my zamawiamy w drukarni i my pilnujemy kuriera. Ty odbierasz gotowe paczki pod drzwiami firmy. Podane ceny dotyczą projektów graficznych, a koszt druku wyceniamy według nakładu.',
    },
    terms: ['Ceny netto, doliczamy 23% VAT', 'Cena obejmuje projekty, druk wyceniamy przed zleceniem', 'Płatność za projekty po akceptacji'],
  },
  {
    id: 'local',
    tab: 'Rynek lokalny, abonament',
    title: 'Pakiety lokalnej dominacji',
    description:
      'Stała współpraca dla firm, które chcą zbierać telefony i zapytania z Google i Map w swoim mieście i powiecie.',
    plans: localPricingPlans,
    infoCard: null,
    terms: ['Ceny netto za miesiąc, doliczamy 23% VAT', 'Umowa na minimum 3 miesiące, potem miesięczne wypowiedzenie', 'Budżet reklamowy opłacasz osobno, bezpośrednio w Google', 'Raport co miesiąc'],
  },
];

const PricingCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 4);
  const hiddenCount = plan.features.length - 4;

  return (
    <article className={`plan${plan.highlight ? ' plan--lead' : ''}`} aria-labelledby={`plan-${plan.id}`}>
      <div className="plan__top">
        {plan.highlight && <span className="plan__tag">Polecany</span>}
        <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
        <p>{nb(plan.desc)}</p>
      </div>

      <div className="plan__price">
        <span className="figure">
          {!plan.fixed && <small className="plan__from">od</small>}
          {plan.price}
          <small>{plan.unit || 'zł'} netto</small>
        </span>
        {plan.range && <span className="label">{nb(plan.range)}</span>}
      </div>

      {(plan.time || plan.revisions) && (
        <dl className="plan__meta">
          {plan.time && (
            <div>
              <dt>Termin</dt>
              <dd>{plan.time}</dd>
            </div>
          )}
          {plan.revisions && (
            <div>
              <dt>{plan.unit ? 'Umowa' : 'Poprawki'}</dt>
              <dd>{plan.revisions}</dd>
            </div>
          )}
        </dl>
      )}

      <ul id={`features-${plan.id}`}>
        {visibleFeatures.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="plan__foot">
        {hiddenCount > 0 && (
          <button
            type="button"
            className="plan__more"
            aria-expanded={isExpanded}
            aria-controls={`features-${plan.id}`}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Pokaż mniej' : `Pokaż pełną listę (+${hiddenCount})`}
          </button>
        )}
        <Link to={`/zamowienie/${plan.id}`} className={`btn btn--block${plan.highlight ? ' btn--primary' : ''}`}>
          Zapytaj o ten pakiet
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <span className="note plan__note">Bez zobowiązań, odpowiadamy w 1 dzień roboczy</span>
      </div>
    </article>
  );
};

const Pricing = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const section = packageSections[active];

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + packageSections.length) % packageSections.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="container">
        <div className="head">
          <h2 id="pricing-title">{nb('Ceny podajemy od razu')}</h2>
          <p className="lead">{nb('Jasny zakres, termin i cena. Wybierz pakiet najbliższy Twojej sytuacji, resztę ustalimy w rozmowie.')}</p>
        </div>

        <div className="pricing__bar">
          <div className="seg" role="tablist" aria-label="Rodzaj pakietu" onKeyDown={onKeyDown}>
            {packageSections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pricing-tab-${s.id}`}
                aria-selected={active === i}
                aria-controls="pricing-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <p className="pricing__intro">{nb(section.description)}</p>
        </div>

        <div id="pricing-panel" role="tabpanel" aria-labelledby={`pricing-tab-${section.id}`}>
          <h3 className="visually-hidden">{section.title}</h3>
          <div className="plans">
            {section.plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
          {section.terms && (
            <ul className="pricing__terms" aria-label="Warunki współpracy">
              {section.terms.map((term) => (
                <li key={term}>
                  <Check size={16} aria-hidden="true" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          )}
          {section.infoCard && (
            <div className="pricing__aside">
              <strong>{section.infoCard.title}</strong>
              <p>{nb(section.infoCard.text)}</p>
            </div>
          )}
        </div>

        <details className="alacarte">
          <summary>
            <span className="alacarte__title">Potrzebujesz tylko jednej usługi? Zobacz ceny pojedynczych usług</span>
            <span className="index__sign" aria-hidden="true" />
          </summary>
          <p className="ink-2 alacarte__lead">
            {nb('Pojedyncza usługa ma sens, gdy resztę już masz. Przy kilku usługach taniej wychodzi konfigurator: od 5 usług nalicza 15% rabatu, od 6 usług 20%. Ceny netto.')}
          </p>
          <div className="alacarte__cols">
            {singleServices.map((category) => (
              <div key={category.category} className="alacarte__col">
                <h4>{category.category}</h4>
                <dl>
                  {category.items.map((item) => (
                    <div key={item.name}>
                      <dt>
                        {item.name}
                        <small>{item.desc}</small>
                      </dt>
                      <dd>{item.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </details>

        <div className="close-row">
          <h3>Wolisz złożyć własny pakiet?</h3>
          <p>{nb('Wybierz usługi, których potrzebujesz, a konfigurator sam naliczy rabat.')}</p>
          <Link to="/skonfiguruj-projekt" className="btn crop">
            Otwórz konfigurator
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
