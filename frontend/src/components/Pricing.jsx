import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Start / Fundament",
      price: "2 900",
      range: "do 4 200 PLN",
      desc: "Idealne wejście na rynek. Prosta strona wizytówkowa i podstawowa identyfikacja.",
      features: [
        "One-Page / Wizytówka WWW",
        "Podstawowe logo",
        "Konfiguracja wizytówki Google",
        "Profile społecznościowe"
      ],
      highlight: false
    },
    {
      name: "Rozwój / Profesjonalny",
      price: "6 500",
      range: "do 9 900 PLN",
      desc: "System wizualny i platforma zorientowana na zbieranie leadów (konwersję).",
      features: [
        "Rozbudowana strona WWW (kilka podstron)",
        "Optymalizacja pod konwersję (UX)",
        "Standardowa identyfikacja (logo, księga znaku)",
        "Dobór typografii, kolorystyki i Key Visual"
      ],
      highlight: true
    },
    {
      name: "Kompleksowy / Dominacja",
      price: "11 900",
      range: "do 18 500 PLN+",
      desc: "Pełna opieka i 'wejście smoka'. Skalowanie przychodów poprzez zaawansowany marketing.",
      features: [
        "Duża platforma WWW z zaawansowanymi animacjami",
        "Pełny copywriting i audyt SEO",
        "Setup kampanii reklamowych (Google/Meta)",
        "Pierwszy miesiąc obsługi Social Media"
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
        <div className="mb-20 max-w-3xl mx-auto text-center">
          <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Inwestycja</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
          >
            Pakiety <span className="text-[#00FFD1]">Współpracy</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Transparentne ramy budżetowe dostosowane do Twoich celów biznesowych.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 md:p-10 transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-[#0A0A0A] border border-[#00FFD1]/50 shadow-[0_0_30px_rgba(0,255,209,0.05)] md:-translate-y-4' 
                  : 'bg-[#050505] border border-white/10 hover:border-[#00FFD1]/30 hover:bg-[#0A0A0A]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FFD1] text-black text-xs font-bold px-4 py-1 uppercase tracking-widest">
                  Rekomendowany
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-8 h-12">{plan.desc}</p>
              
              <div className="mb-8 pb-8 border-b border-white/10">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 ml-2 font-mono">PLN</span>
                <div className="text-sm text-[#00FFD1] mt-2 font-mono">{plan.range}</div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`block text-center w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                plan.highlight 
                  ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90' 
                  : 'border border-white/20 text-white hover:border-[#00FFD1] hover:text-[#00FFD1]'
              }`}>
                Wybierz Pakiet
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
