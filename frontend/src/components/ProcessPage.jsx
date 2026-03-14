import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Palette, Code, Rocket, BarChart3, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const detailedProcess = [
  {
    icon: Target,
    title: "1. Warsztat Strategiczny i Diagnoza",
    duration: "Tydzień 1",
    desc: "Nie zaczynamy od rysowania ładnych obrazków. Zaczynamy od zrozumienia Twojego portfela.",
    bullets: [
      "Analiza Twojego Idealnego Klienta (ICP - Ideal Customer Profile).",
      "Kalkulacja Unit Economics (marża, LTV, maksymalny koszt pozyskania).",
      "Audyt obecnych wąskich gardeł (gdzie uciekają pieniądze).",
      "Ustalenie konkretnego, mierzalnego celu finansowego kampanii."
    ]
  },
  {
    icon: Palette,
    title: "2. Architektura i Branding Premium",
    duration: "Tydzień 2",
    desc: "Klienci B2B kupują oczami, zanim w ogóle przeczytają ofertę. Budujemy autorytet.",
    bullets: [
      "Projektowanie Księgi Znaku i Key Visual (spójność na każdym froncie).",
      "Dobór psychologii kolorów pod Twoją docelową branżę.",
      "Architektura informacji na stronie (UX) – planowanie ścieżki wzroku klienta.",
      "Opracowanie unikalnej propozycji wartości (UVP) w warstwie tekstowej."
    ]
  },
  {
    icon: Code,
    title: "3. Budowa Maszyny Konwersji (Web Dev)",
    duration: "Tydzień 3-4",
    desc: "Przekuwamy projekt w błyskawicznie działającą, zaprogramowaną platformę.",
    bullets: [
      "Kodowanie strony od zera z naciskiem na ekstremalną szybkość ładowania.",
      "Optymalizacja mobilna (Mobile-First) – tam przebywa dziś 70% decydentów.",
      "Wdrożenie formularzy kwalifikujących (odsiewanie słabych leadów).",
      "Zaawansowana analityka (podpięcie Google Tag Managera, Analytics, Pixeli)."
    ]
  },
  {
    icon: Rocket,
    title: "4. Uruchomienie Akwizycji (Traffic)",
    duration: "Tydzień 5",
    desc: "Mamy gotowy silnik. Czas wlać do niego paliwo w postaci wysoko intencyjnego ruchu.",
    bullets: [
      "Uruchomienie kampanii Google Ads (wyłapywanie klientów z palącym problemem).",
      "Uruchomienie Meta Ads (Retargeting - śledzenie prezesów, którzy opuścili stronę).",
      "Wdrożenie kampanii LinkedIn B2B (bezpośrednie docieranie do stanowisk).",
      "Testy A/B nagłówków i kreacji reklamowych."
    ]
  },
  {
    icon: BarChart3,
    title: "5. Skalowanie i Optymalizacja (Growth)",
    duration: "Bieżąca Opieka",
    desc: "To, co działa dzisiaj, jutro może być droższe. Codziennie pilnujemy Twojego budżetu.",
    bullets: [
      "Zbijanie kosztu pozyskania klienta (CAC) poprzez optymalizację stawek.",
      "Analiza nagrań sesji użytkowników na stronie (Hotjar).",
      "Raportowanie w twardych liczbach (ile wydaliśmy, ile zarobiłeś).",
      "Dodawanie nowych podstron i artykułów budujących SEO."
    ]
  }
];

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden font-sans">
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
          <ArrowLeft size={16} /> Wróć na stronę główną
        </Link>

        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20">
            Pełna Transparentność
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Jak zamieniamy obcych ludzi <br/><span className="text-[#00FFD1]">w Twoich klientów?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Nikt nie lubi "czarnych skrzynek" i płacenia za mgliste obietnice. W VisiLogo proces jest inżynieryjnie zaplanowany. Zobacz dokładnie, jak krok po kroku budujemy zyskowne maszyny B2B.
          </motion.p>
        </div>

        <div className="space-y-12 md:space-y-24 relative before:absolute before:inset-0 before:ml-8 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:via-[#00FFD1]/50 before:to-transparent">
          {detailedProcess.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`relative flex items-start md:items-center justify-between md:justify-normal group is-active ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Ikona na środku osi */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#020202] bg-[#00FFD1] text-black shadow-[0_0_20px_rgba(0,255,209,0.4)] z-10">
                <step.icon size={20} strokeWidth={2.5} />
              </div>

              {/* Karta z treścią */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl hover:border-[#00FFD1]/30 transition-colors ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <div className="text-[#00FFD1] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  Harmonogram: {step.duration}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {step.desc}
                </p>
                
                <ul className="space-y-3">
                  {step.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={16} />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-[#0A0A0A] border border-white/10 p-10 md:p-16 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-50" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Gotowy na wdrożenie tego systemu?</h3>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Przeanalizujemy Twój biznes podczas darmowej, 30-minutowej konsultacji. Powiemy Ci wprost, czy jesteśmy w stanie zrealizować dla Ciebie powyższe kroki.
          </p>
          <a href="/#contact" className="inline-flex items-center gap-3 bg-[#00FFD1] text-black font-bold text-lg py-4 px-10 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,209,0.2)]">
            Porozmawiajmy o strategii
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default ProcessPage;
