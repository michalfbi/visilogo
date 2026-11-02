import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { CtaBand, PageHead } from './studio/ui';
import { nb } from '../lib/typo';

const detailedProcess = [
  {
    title: 'Faza 1: Głęboki audyt i strategia biznesowa',
    duration: 'Dni 1–7',
    team: 'Główny strateg, analityk biznesowy',
    clientTime: 'Około 2 godziny',
    desc: 'Nie zaczynamy od rysowania ładnych ekranów. Najpierw musimy zrozumieć mechanikę Twojego biznesu, marże, cele sprzedażowe i miejsca, w których realnie uciekają pieniądze.',
    tasks: [
      'Warsztat kick-off: mapowanie celów finansowych, ograniczeń i priorytetów.',
      'Analiza idealnego klienta oraz jego procesu decyzyjnego.',
      'Kalkulacja unit economics: LTV, marża i progi opłacalności działań.',
      'Audyt konkurencji i identyfikacja luk komunikacyjnych w branży.',
    ],
    deliverable: 'Dokument strategiczny i plan architektury lejka',
  },
  {
    title: 'Faza 2: Branding premium i architektura UX',
    duration: 'Dni 8–14',
    team: 'Dyrektor kreatywny, UX/UI designer, copywriter B2B',
    clientTime: 'Około 1 godziny',
    desc: 'Klienci B2B kupują nie tylko ofertę, ale też zaufanie. Projektujemy wizerunek, który podnosi postrzeganą wartość firmy i ułatwia sprzedaż w wyższych widełkach.',
    tasks: [
      'Copywriting oparty na problemach, obiekcjach i języku decydentów.',
      'Projekt identyfikacji: logo, typografia, kolorystyka i system wizualny.',
      'Makiety UX sterujące uwagą użytkownika i ruchem po stronie.',
      'Hi-fi design gotowy do wdrożenia i dalszej optymalizacji.',
    ],
    deliverable: 'Brand book oraz kompletny projekt interfejsu',
  },
  {
    title: 'Faza 3: Programowanie maszyny konwersji',
    duration: 'Dni 15–28',
    team: 'Frontend developer, backend developer',
    clientTime: '0 godzin',
    desc: 'Przekuwamy projekt w szybki, bezpieczny i nowoczesny serwis. Bez ciężkich, przypadkowych szablonów. Liczy się kontrola nad jakością, wydajnością i ścieżką konwersji.',
    tasks: [
      'Kodowanie w nowoczesnym stacku nastawionym na szybkość i elastyczność.',
      'Optymalizacja mobile-first z naciskiem na realne zachowanie użytkownika.',
      'Techniczne SEO oraz przygotowanie pod indeksację i dane strukturalne.',
      'Wdrażanie formularzy, kalkulatorów i interaktywnych mechanik wspierających lead generation.',
    ],
    deliverable: 'W pełni funkcjonalna strona WWW na środowisku testowym',
  },
  {
    title: 'Faza 4: Setup analityczny i śledzenie danych',
    duration: 'Dni 29–31',
    team: 'Specjalista analityki webowej',
    clientTime: '0 godzin',
    desc: 'Zanim puścimy ruch, konfigurujemy pomiar. Jeśli nie możesz czegoś zobaczyć w danych, nie możesz tym rozsądnie zarządzać.',
    tasks: [
      'Instalacja GTM i Google Analytics 4.',
      'Konfiguracja zdarzeń konwersji: formularze, kliknięcia, kontakty.',
      'Implementacja Pixela Meta i LinkedIn Insight Tag pod retargeting.',
      'Uruchomienie map cieplnych i nagrań sesji dla późniejszych decyzji UX.',
    ],
    deliverable: 'Przetestowany ekosystem analityczny gotowy do pracy',
  },
  {
    title: 'Faza 5: Uruchomienie akwizycji',
    duration: 'Dni 32–35',
    team: 'Media buyer, copywriter ads',
    clientTime: 'Około 1 godziny',
    desc: 'Gdy silnik jest gotowy, uruchamiamy ruch. Kampanie startują w oparciu o intencję, nie przypadek, a przekaz jest zszyty z tym, co użytkownik widzi na stronie.',
    tasks: [
      'Budowa kampanii Google Ads opartych na intencji zakupowej.',
      'Przygotowanie kreacji i treści do Meta Ads oraz innych kanałów.',
      'Ustawienie retargetingu oraz sekwencji przypomnień.',
      'Start kampanii i zebranie pierwszych jakościowych leadów.',
    ],
    deliverable: 'Aktywne kampanie generujące ruch i pierwsze zapytania',
  },
  {
    title: 'Faza 6: Skalowanie i optymalizacja',
    duration: 'Model abonamentowy',
    team: 'Account manager, media buyer',
    clientTime: 'Około 30 minut miesięcznie',
    desc: 'Publikacja strony to dopiero początek. Monitorujemy wyniki, testujemy hipotezy i stopniowo obniżamy koszt pozyskania, poprawiając wynik całego systemu.',
    tasks: [
      'Ciągła optymalizacja stawek, grup odbiorców i budżetów.',
      'Testy A/B nagłówków, formularzy i kluczowych sekcji.',
      'Analiza danych jakościowych i zachowań użytkowników.',
      'Raporty oraz rekomendacje wdrożeniowe oparte na liczbach.',
    ],
    deliverable: 'Przewidywalny, rosnący strumień nowych klientów',
  },
];

// Day spans for the timeline strip; the last phase runs as a subscription.
const SPANS = [
  [1, 7],
  [8, 14],
  [15, 28],
  [29, 31],
  [32, 35],
];
const TOTAL_DAYS = 35;

const Timeline = () => (
  <figure className="timeline" aria-label="Oś czasu wdrożenia: 35 dni i abonament">
    <div className="timeline__track">
      {SPANS.map(([from, to], i) => (
        <a
          key={from}
          href={`#faza-${i + 1}`}
          className="timeline__seg"
          style={{ flexGrow: to - from + 1 }}
        >
          <span className="timeline__num">{i + 1}</span>
          <span className="timeline__days">
            {from}–{to}
          </span>
        </a>
      ))}
      <a href="#faza-6" className="timeline__seg timeline__seg--open" style={{ flexGrow: 7 }}>
        <span className="timeline__num">6</span>
        <span className="timeline__days">dalej</span>
      </a>
    </div>
    <figcaption className="label">
      Dni od podpisania umowy. Wdrożenie trwa {TOTAL_DAYS} dni, potem skalowanie w abonamencie.
    </figcaption>
  </figure>
);

const Phase = ({ step, index }) => {
  const [, name] = step.title.split(': ');
  return (
    <article id={`faza-${index + 1}`} className="phase" aria-labelledby={`faza-${index + 1}-t`}>
      <div className="phase__id">
        <span className="phase__num" aria-hidden="true">
          {index + 1}
        </span>
        <span className="label">{step.duration}</span>
      </div>
      <div className="phase__main">
        <h2 id={`faza-${index + 1}-t`}>
          <span className="visually-hidden">Faza {index + 1}: </span>
          {nb(name || step.title)}
        </h2>
        <p>{nb(step.desc)}</p>
        <p className="phase__out">
          <span className="label">Rezultat etapu</span>
          {nb(step.deliverable)}
        </p>
      </div>
      <div className="phase__side">
        <ul className="ticks">
          {step.tasks.map((task) => (
            <li key={task}>
              <Check size={16} aria-hidden="true" />
              <span>{nb(task)}</span>
            </li>
          ))}
        </ul>
        <dl className="phase__meta">
          <div>
            <dt>Zespół</dt>
            <dd>{step.team}</dd>
          </div>
          <div>
            <dt>Twój czas</dt>
            <dd>{step.clientTime}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Proces' }]}
        title="Nasz proces to matematyka, nie improwizacja."
        lead="Skuteczny marketing B2B wymaga precyzji, nie chaosu. Zobacz, jak krok po kroku przeprowadzamy firmę od rozproszonej komunikacji do uporządkowanego systemu, który wspiera sprzedaż i wzrost."
      >
        <Timeline />
      </PageHead>

      <section className="section section--s" aria-label="Fazy współpracy">
        <div className="container phases">
          {detailedProcess.map((step, index) => (
            <Phase key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Wiesz już, jak pracujemy. Czas wdrożyć to u Ciebie."
        text="Zacznijmy od rozmowy o tym, który etap jest dziś dla Twojej firmy najważniejszy."
        primary={{ href: '/#contact', label: 'Zarezerwuj darmową analizę' }}
        secondary={{ href: '/#pricing', label: 'Zobacz nasze pakiety' }}
      />
    </>
  );
};

export default ProcessPage;
