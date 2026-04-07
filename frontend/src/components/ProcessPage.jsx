import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  FileOutput,
  LineChart,
  Palette,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Target,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, revealLeft, revealRight, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const detailedProcess = [
  {
    icon: Search,
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
    icon: Palette,
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
    icon: Code2,
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
    icon: LineChart,
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
    icon: Target,
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
    icon: Rocket,
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

const ProcessStep = ({ step, index }) => {
  const Icon = step.icon;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={sectionViewport}
      className="relative flex items-start gap-6 md:gap-10"
    >
      <div className="relative hidden md:block">
        <motion.div
          whileHover={{ scale: 1.06, rotate: -4 }}
          transition={springCard}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#050505] bg-[#00FFD1] text-black shadow-[0_0_30px_rgba(0,255,209,0.28)]"
        >
          <Icon size={24} strokeWidth={2.5} />
        </motion.div>
        {index !== detailedProcess.length - 1 && (
          <div className="absolute left-1/2 top-16 h-[calc(100%+3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-[#00FFD1]/50 via-[#00FFD1]/18 to-transparent" />
        )}
      </div>

      <motion.div
        whileHover={{ y: -8, scale: 1.004 }}
        transition={springCard}
        className="group relative flex-1 overflow-hidden border border-white/10 bg-[#0A0A0A]/95 shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">
                  <Clock size={12} /> {step.duration}
                </div>
                <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">
                  Etap {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3 md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Proces premium</span>
              </div>

              <h3 className="text-2xl font-bold leading-tight tracking-[-0.03em] text-white md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-gray-400 md:text-base">
                {step.desc}
              </p>

              <div className="mt-8 border border-[#00FFD1]/18 bg-[#00FFD1]/6 p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                    <FileOutput size={22} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">
                      Rezultat końcowy etapu
                    </div>
                    <div className="mt-2 text-base font-bold leading-snug text-white">
                      {step.deliverable}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex h-full flex-col border border-white/8 bg-black/35 p-6 md:p-8">
                <div>
                  <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">
                    Szczegółowy zakres działań
                  </h4>
                  <ul className="space-y-4">
                    {step.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3 text-sm text-gray-300 md:text-[0.98rem]">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-[#00FFD1]/85" size={20} />
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div className="border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                      <User size={12} /> Zespół realizujący
                    </div>
                    <div className="text-sm font-bold text-white">{step.team}</div>
                  </div>
                  <div className="border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                      <Clock size={12} /> Zaangażowanie klienta
                    </div>
                    <div className="text-sm font-bold text-[#00FFD1]">{step.clientTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section-shell relative min-h-screen overflow-hidden bg-[#050505] pb-12 pt-24 font-sans lg:pb-20 lg:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#00FFD1]/5 blur-[150px]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <motion.div variants={revealLeft} initial="hidden" animate="show">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-400 transition-all duration-300 hover:border-[#00FFD1]/20 hover:text-[#00FFD1]"
          >
            <ArrowLeft size={16} /> Powrót do strony głównej
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mx-auto mb-20 mt-10 max-w-5xl text-center lg:mb-24"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
            <ShieldCheck size={16} /> Architektura współpracy
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl lg:text-7xl">
            Nasz proces to <span className="text-brand-gradient">matematyka</span>.<br />
            Nie improwizacja.
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Skuteczny marketing B2B wymaga precyzji, nie chaosu. Zobacz, jak krok po kroku przeprowadzamy firmę od rozproszonej komunikacji do uporządkowanego systemu, który wspiera sprzedaż i wzrost.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="space-y-12 md:space-y-16"
        >
          {detailedProcess.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </motion.div>

        <motion.div
          variants={revealRight}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          whileHover={{ y: -8, scale: 1.008 }}
          transition={springCard}
          className="relative mt-24 overflow-hidden border border-[#00FFD1]/20 bg-[linear-gradient(135deg,rgba(10,10,10,0.96),rgba(2,2,2,0.96))] p-10 text-center shadow-[0_0_50px_rgba(0,255,209,0.08)] md:p-16"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-80" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#00FFD1]/10 blur-3xl" />

          <h3 className="relative z-10 text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
            Wiesz już, jak pracujemy. Czas wdrożyć to u Ciebie.
          </h3>
          <p className="relative z-10 mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Jeśli chcesz przestać improwizować i uporządkować stronę, komunikację oraz działania sprzedażowe, zacznijmy od rozmowy o tym, który etap jest dziś dla Twojej firmy najważniejszy.
          </p>

          <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={springCard}
              className="btn-primary w-full justify-center text-lg font-black sm:w-auto"
            >
              Zarezerwuj darmową analizę <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/#pricing"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springCard}
              className="btn-secondary w-full justify-center text-lg sm:w-auto"
            >
              <Settings2 size={20} /> Zobacz nasze pakiety
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessPage;
