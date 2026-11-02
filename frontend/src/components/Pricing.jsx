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
  },
  {
    id: 'local',
    tab: 'Rynek lokalny, abonament',
    title: 'Pakiety lokalnej dominacji',
    description:
      'Stała współpraca nastawiona na przejmowanie rynku lokalnego, mocniejszą ekspozycję marki i generowanie leadów.',
    plans: localPricingPlans,
    infoCard: null,
  },
];

const PricingCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 4);
  const hiddenCount = plan.features.length - 4;

  return (
    <article className={`plan${plan.highlight ? ' plan--lead' : ''}`} aria-labelledby={`plan-${plan.id}`}>
      <div className="plan__top">
        {plan.highlight && <span className="plan__tag">Najczęściej wybierany</span>}
        <h3 id={`plan-${plan.id}`}>{plan.name.replace(' / ', ', ')}</h3>
        <p>{nb(plan.desc)}</p>
      </div>

      <div className="plan__price">
        <span className="figure">
          {plan.price}
          <small>PLN</small>
        </span>
        <span className="label">{plan.range}</span>
      </div>

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
        <Link to={`/zamowienie/${plan.id}`} className="btn btn--block crop">
          Wybierz ten pakiet
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
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
          <p className="lead">{nb('Trzy rodzaje pakietów i pojedyncze usługi. Wybierz zakres albo złóż własny w konfiguratorze.')}</p>
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
          {section.infoCard && (
            <div className="pricing__aside">
              <strong>{section.infoCard.title}</strong>
              <p>{nb(section.infoCard.text)}</p>
            </div>
          )}
        </div>

        <div className="table-wrap" style={{ marginTop: 'var(--space-3xl)' }}>
          <table className="table">
            <caption>
              <h3 style={{ fontSize: 'var(--text-section)', maxWidth: '20ch' }}>Pojedyncze usługi</h3>
              <p className="ink-2" style={{ margin: 'var(--space-md) 0 var(--space-lg)' }}>{nb('Wybierając większy pakiet, zyskujesz synergię działań i zwykle oszczędzasz średnio 35–50% względem cen pojedynczych usług.')}</p>
            </caption>
            <thead>
              <tr>
                <th scope="col">Usługa</th>
                <th scope="col">Zakres</th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  Cena
                </th>
              </tr>
            </thead>
            {singleServices.map((category) => (
              <tbody key={category.category}>
                <tr className="group">
                  <th scope="rowgroup" colSpan={3}>
                    {category.category}
                  </th>
                </tr>
                {category.items.map((item) => (
                  <tr key={item.name}>
                    <th scope="row">{item.name}</th>
                    <td className="muted">{item.desc}</td>
                    <td className="num">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

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
