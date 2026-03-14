import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
// DODANO ArrowRight
import { ArrowLeft, ArrowRight, Search, Palette, Code2, LineChart, Target, Rocket, CheckCircle2, User, FileOutput, Clock, ShieldCheck, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const detailedProcess = [
  {
    icon: Search,
    title: "Faza 1: Głęboki Audyt i Strategia Biznesowa",
    duration: "Dni 1-7",
    team: "Główny Strateg, Analityk Biznesowy",
    clientTime: "Ok. 2 godziny (Warsztat zapoznawczy)",
    desc: "Nie zaczynamy od rysowania ładnych obrazków. Najpierw musimy zrozumieć matematykę Twojego biznesu i zdiagnozować, gdzie uciekają Ci pieniądze.",
    tasks: [
      "Warsztat Kick-off: Mapowanie Twoich celów finansowych i zasobów.",
      "Analiza Idealnego Klienta (ICP) oraz jego procesu decyzyjnego.",
      "Kalkulacja Unit Economics: Wyliczenie LTV, marży i progów rentowności reklam.",
      "Audyt konkurencji: Znalezienie luk komunikacyjnych w Twojej branży."
    ],
    deliverable: "Dokument Strategiczny i Plan Architektury Lejka"
  },
  {
    icon: Palette,
    title: "Faza 2: Branding Premium i Architektura UX",
    duration: "Dni 8-14",
    team: "Dyrektor Kreatywny, UX/UI Designer, Copywriter B2B",
    clientTime: "Ok. 1 godzina (Akceptacja makiet i tekstów)",
    desc: "Klienci B2B kupują oczami i zaufaniem. Projektujemy wizerunek, który pozycjonuje Cię jako niekwestionowanego lidera, pozwalając dyktować wyższe ceny.",
    tasks: [
      "Copywriting: Pisanie perswazyjnych tekstów bazujących na bólu i obiekcjach klienta.",
      "Identyfikacja wizualna: Projektowanie logo, dobór typografii i psychologii kolorów.",
      "Makiety UX (Wireframes): Projektowanie ścieżki wzroku użytkownika (sterowanie uwagą).",
      "Makiety UI (Hi-Fi): Pełny projekt graficzny strony gotowy do zakodowania."
    ],
    deliverable: "Księga Znaku (Brand Book) oraz Interaktywny Projekt Graficzny"
  },
  {
    icon: Code2,
    title: "Faza 3: Programowanie Maszyny Konwersji (Web Dev)",
    duration: "Dni 15-28",
    team: "Frontend Developer, Backend Developer",
    clientTime: "0 godzin (Pracujemy w pełni samodzielnie)",
    desc: "Przekuwamy projekt graficzny w błyskawicznie działającą, bezpieczną stronę internetową. Nie używamy gotowych, ociężałych szablonów. Piszemy czysty kod.",
    tasks: [
      "Kodowanie w nowoczesnych technologiach (React / Next.js) dla ekstremalnej szybkości.",
      "Optymalizacja Mobile-First: Idealne działanie na smartfonach (tam jest 70% ruchu).",
      "Techniczne SEO: Wdrażanie mikrodanych (Schema.org) i optymalizacja pod Google.",
      "Wdrażanie interaktywnych kalkulatorów i formularzy kwalifikujących leady."
    ],
    deliverable: "W pełni funkcjonalna, superszybka Strona WWW na serwerze testowym"
  },
  {
    icon: LineChart,
    title: "Faza 4: Setup Analityczny i Śledzenie Danych",
    duration: "Dni 29-31",
    team: "Specjalista ds. Analityki Webowej",
    clientTime: "0 godzin (Wymagamy jedynie dostępu do kont)",
    desc: "Jeśli nie możesz czegoś zmierzyć, nie możesz tym zarządzać. Zanim wpuścimy ruch, oflagowujemy stronę, by wiedzieć wszystko o zachowaniu użytkowników.",
    tasks: [
      "Instalacja Google Tag Managera (GTM) oraz Google Analytics 4 (GA4).",
      "Konfiguracja zdarzeń konwersji (śledzenie kliknięć w telefon, mail, formularz).",
      "Implementacja Pixela Meta oraz LinkedIn Insight Tag pod przyszły retargeting.",
      "Instalacja map cieplnych (Hotjar), by widzieć nagrania wideo z wizyt klientów."
    ],
    deliverable: "Gotowy do pracy, przetestowany ekosystem analityczny"
  },
  {
    icon: Target,
    title: "Faza 5: Uruchomienie Akwizycji (Traffic)",
    duration: "Dni 32-35",
    team: "Media Buyer (Ekspert Google/Meta Ads), Copywriter",
    clientTime: "Ok. 1 godzina (Podpięcie kart płatniczych i start)",
    desc: "Mamy gotowy silnik. Czas wlać do niego paliwo. Uruchamiamy precyzyjne kampanie reklamowe, uderzając bezpośrednio w osoby szukające Twoich usług.",
    tasks: [
      "Budowa struktury kampanii Google Ads (Search) opartych na intencji zakupowej.",
      "Przygotowanie kreacji wizualnych i tekstów reklamowych do Meta Ads (FB/IG).",
      "Ustawienie kampanii Retargetingowej (przypominanie się decydentom, którzy odeszli).",
      "Odpalamy system i zaczynamy zbierać pierwsze, kaloryczne zapytania B2B."
    ],
    deliverable: "Aktywne, zoptymalizowane kampanie reklamowe generujące ruch"
  },
  {
    icon: Rocket,
    title: "Faza 6: Skalowanie i Optymalizacja (Growth)",
    duration: "Bieżąca Opieka (Abonament)",
    team: "Dedykowany Account Manager, Media Buyer",
    clientTime: "Ok. 30 min miesięcznie (Raportowanie wyników)",
    desc: "Wrzucenie strony i reklam to dopiero początek. Codziennie monitorujemy wyniki, testujemy nowe nagłówki i zbijamy koszt pozyskania klienta (CAC).",
    tasks: [
      "Ciągła optymalizacja stawek i wykluczanie przepalających budżet słów kluczowych.",
      "Testy A/B (A/B Testing) nagłówków i formularzy w celu zwiększenia konwersji.",
      "Analiza nagrań z Hotjara i wprowadzanie poprawek UX na żywym organizmie.",
      "Comiesięczne, transparentne raporty: Ile wydaliśmy, ile leadów dostarczyliśmy."
    ],
    deliverable: "Przewidywalny, rosnący strumień nowych klientów każdego miesiąca"
  }
];

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden font-sans">
      {/* Tło i dekoracje */}
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[1000px] h-[1000px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] transition-colors mb-12 uppercase tracking-widest text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft size={16} /> Powrót do strony głównej
        </Link>

        {/* Nagłówek sekcji */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20">
            <ShieldCheck size={16} /> Architektura Współpracy
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Nasz proces to <span className="text-[#00FFD1]">matematyka.</span><br/>Nie wróżenie z fusów.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 leading-relaxed">
            Tworzenie skutecznego marketingu B2B wymaga inżynieryjnej precyzji. Nie ma tu miejsca na zgadywanie. Zobacz, jak w 6 tygodni przeprowadzimy Twoją firmę od chaosu do przewidywalnej maszyny generującej zysk.
          </motion.p>
        </div>

        {/* Główna Oś Czasu (Timeline) */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[1.75rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:via-[#00FFD1]/30 before:to-transparent">
          {detailedProcess.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
            >
              
              {/* Ikona na środku osi */}
              <div className="absolute left-[1.75rem] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#050505] bg-[#00FFD1] text-black shadow-[0_0_25px_rgba(0,255,209,0.3)] z-10 mt-6 md:mt-0">
                <step.icon size={24} strokeWidth={2.5} />
              </div>

              {/* Karta z treścią */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl hover:border-[#00FFD1]/40 transition-all duration-300 overflow-hidden ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                
                <div className="p-6 md:p-8 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-[#00FFD1]/10 border border-[#00FFD1]/20 text-[#00FFD1] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                      <Clock size={12} /> {step.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{step.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-6">
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4 flex items-center gap-2">
                      Zakres Działań:
                    </h4>
                    <ul className="space-y-3">
                      {step.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle2 className="text-[#00FFD1]/80 shrink-0 mt-0.5" size={18} />
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="bg-black border border-white/5 rounded-lg p-4">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1 flex items-center gap-1"><User size={12}/> Kto to realizuje?</div>
                      <div className="text-sm font-bold text-white">{step.team}</div>
                    </div>
                    <div className="bg-black border border-white/5 rounded-lg p-4">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1 flex items-center gap-1"><Clock size={12}/> Wymagany czas od Ciebie</div>
                      <div className="text-sm font-bold text-[#00FFD1]">{step.clientTime}</div>
                    </div>
                  </div>

                  <div className="bg-[#00FFD1]/5 border border-[#00FFD1]/20 rounded-lg p-4 mt-2 flex items-center gap-4">
                    <div className="bg-[#00FFD1]/20 p-2 rounded-full text-[#00FFD1] shrink-0">
                      <FileOutput size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#00FFD1] mb-1">Rezultat końcowy etapu:</div>
                      <div className="text-sm font-bold text-white leading-snug">{step.deliverable}</div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sekcja końcowa CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-br from-[#0A0A0A] to-[#020202] border border-[#00FFD1]/20 p-10 md:p-16 rounded-3xl text-center shadow-[0_0_50px_rgba(0,255,209,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-70" />
          
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Wiesz już jak pracujemy. <br/>Czas wdrożyć to u Ciebie.</h3>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Przestań współpracować z agencjami, które improwizują. Zarezerwuj darmową, 30-minutową konsultację, podczas której przeanalizujemy, na którym etapie Twój biznes traci najwięcej pieniędzy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="/#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#00FFD1] text-black font-bold text-lg py-5 px-10 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,209,0.3)]">
              Zarezerwuj darmową analizę <ArrowRight size={20} />
            </a>
            {/* Poprawiony drugi przycisk - kieruje do cennika zamiast do nieistniejącego konfiguratora */}
            <a href="/#pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white font-bold text-lg py-5 px-10 rounded-full hover:bg-white/5 transition-all">
              <Settings2 size={20} /> Zobacz nasze pakiety
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProcessPage;
