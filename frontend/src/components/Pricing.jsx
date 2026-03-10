import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const PricingCard = ({ plan, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 md:p-10 transition-all duration-300 flex flex-col h-full ${
        plan.highlight 
          ? 'bg-[#0A0A0A] border border-[#00FFD1]/50 shadow-[0_0_30px_rgba(0,255,209,0.05)] md:-translate-y-4' 
          : 'bg-[#050505] border border-white/10 hover:border-[#00FFD1]/30 hover:bg-[#0A0A0A]'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FFD1] text-black text-xs font-bold px-4 py-1 uppercase tracking-widest whitespace-nowrap">
          Najczęściej Wybierany
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
      <p className="text-gray-400 text-sm mb-8 min-h-[48px]">{plan.desc}</p>
      
      <div className="mb-8 pb-8 border-b border-white/10">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        <span className="text-gray-500 ml-2 font-mono">PLN</span>
        <div className="text-sm text-[#00FFD1] mt-2 font-mono">{plan.range}</div>
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-6">
          {/* Wyświetlamy 4 pierwsze usługi zawsze */}
          {plan.features.slice(0, 4).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={18} />
              <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
            </li>
          ))}

          {/* Rozwijana lista z resztą usług */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 pt-4 overflow-hidden"
              >
                {plan.features.slice(4).map((feat, idx) => (
                  <li key={idx + 4} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                  </li>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] text-xs font-bold uppercase tracking-widest mb-8 transition-colors focus:outline-none"
      >
        {isExpanded ? (
          <>Zwiń pełną listę <ChevronUp size={16} /></>
        ) : (
          <>Zobacz pełną listę (+{plan.features.length - 4}) <ChevronDown size={16} /></>
        )}
      </button>

      <a href="#contact" className={`mt-auto block text-center w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${
        plan.highlight 
          ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90' 
          : 'border border-white/20 text-white hover:border-[#00FFD1] hover:text-[#00FFD1]'
      }`}>
        Wybierz ten pakiet
      </a>
    </motion.div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Start / Podstawa",
      price: "2 900",
      range: "do 4 200 PLN",
      desc: "Idealny na start. Zyskaj spójny, podstawowy wizerunek, by móc wejść na rynek z klasą.",
      features: [
        "Projekt podstawowego Logo (2 koncepcje)",
        "Prosta Strona WWW (One-Page / Wizytówka)",
        "Konfiguracja firmowych profili",
        "Podstawowe grafiki na start (np. Tło FB)",
        "Dobór palety kolorów firmowych",
        "Optymalizacja strony na ekrany telefonów (RWD)",
        "Podpięcie statystyk strony (Google Analytics)"
      ],
      highlight: false
    },
    {
      name: "Rozwój / Profesjonalny",
      price: "6 500",
      range: "do 9 900 PLN",
      desc: "Dla firm chcących wyglądać mocno. Zaawansowana strona i pełny branding.",
      features: [
        "Zaawansowana, rozbudowana Strona WWW",
        "Pełny Branding i Podstawowa Księga Znaku",
        "Szablony do tworzenia grafik na Social Media",
        "Projektowanie pod kątem UX i generowania leadów",
        "Integracja formularzy z Twoim mailem/CRM",
        "Podstawowa optymalizacja pod wyszukiwarkę (SEO)",
        "Instalacja tagów śledzących zachowania klientów",
        "Wsparcie techniczne na czas wdrożenia"
      ],
      highlight: true
    },
    {
      name: "Kompleksowy / Dominacja",
      price: "11 900",
      range: "do 18 500 PLN+",
      desc: "Pełna obsługa. My robimy dla Ciebie wszystko: od logo po pozyskiwanie nowych klientów.",
      features: [
        "Zaawansowana Strona WWW (interakcje, premium design)",
        "Pełny copywriting biznesowy (my piszemy teksty na stronę)",
        "Rozbudowana Księga Znaku i Key Visual",
        "Setup pierwszych kampanii w Google Ads / Meta Ads",
        "Miesiąc pełnej opieki nad postami Social Media",
        "Wdrożenie systemów kwalifikowania leadów (formularze)",
        "Architektura SEO do budowy autorytetu tematycznego",
        "Dedykowane konsultacje strategiczne i opieka menedżera"
      ],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-[#000000] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Pakiety</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
          >
            Ile kosztuje <span className="text-[#00FFD1]">współpraca z nami?</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Trzy proste pakiety, dostosowane do tego, w jakim miejscu znajduje się obecnie Twoja firma.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
