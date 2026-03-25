import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pricingPlans, localPricingPlans, singleServices } from '../mock';

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
          {plan.features.slice(0, 4).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={18} />
              <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
            </li>
          ))}

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

      <Link 
        to={`/zamowienie/${plan.id}`} 
        className={`mt-auto block text-center w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${
          plan.highlight 
            ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90' 
            : 'border border-white/20 text-white hover:border-[#00FFD1] hover:text-[#00FFD1]'
        }`}
      >
        Wybierz ten pakiet
      </Link>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 lg:py-32 bg-[#000000] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* SEKCJA 1: PAKIETY JEDNORAZOWE */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Wizerunek & Technologie</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
          >
            Pakiety <span className="text-[#00FFD1]">Projektowe</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Jednorazowe inwestycje w fundamenty Twojej marki: logo, identyfikację i nowoczesną stronę WWW.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* SEKCJA 2: PAKIETY ABONAMENTOWE */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Abonament / Retainer</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
          >
            Pakiety <span className="text-[#00FFD1]">Lokalnej Dominacji</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Zastępujemy zewnętrzne agencje i portale ogłoszeniowe. Stała współpraca nastawiona na przejmowanie rynku lokalnego i generowanie leadów.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {localPricingPlans.map((plan, index) => (
            <PricingCard key={`local-${index}`} plan={plan} index={index} />
          ))}
        </div>

        {/* SEKCJA 3: USŁUGI POJEDYNCZE (A LA CARTE) */}
        <div className="border-t border-white/10 pt-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Pojedyncze usługi <span className="text-gray-500">(A la carte)</span>
            </h2>
            <div className="bg-[#00FFD1]/5 border border-[#00FFD1]/20 p-6 rounded-xl inline-flex flex-col sm:flex-row items-center gap-4 text-left">
              <AlertTriangle className="text-[#00FFD1] shrink-0" size={32} />
              <div>
                <p className="text-white font-bold mb-1">Zanim wybierzesz pojedynczą usługę:</p>
                <p className="text-gray-400 text-sm">
                  Ceny usług wycenianych osobno są znacznie wyższe. Wybierając jeden z powyższych pakietów, zyskujesz synergię działań i <strong className="text-white">oszczędzasz średnio 35-50%</strong> w stosunku do cen pojedynczych.
                </p>
              </div>
            </div>
          </div>

          {/* GRID NA 4 KOLUMNY DLA USŁUG A LA CARTE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {singleServices.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#050505] border border-white/5 p-6 rounded-xl"
              >
                <h4 className="text-[#00FFD1] font-bold uppercase tracking-widest text-[11px] mb-6 border-b border-white/10 pb-4">
                  {category.category}
                </h4>
                <ul className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <div className="flex flex-col mb-1 gap-1">
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className="text-gray-500 font-mono text-xs">{item.price}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors mt-2">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-5xl mx-auto bg-gradient-to-br from-[#0A0A0A] to-[#020202] border border-[#00FFD1]/20 p-10 md:p-16 rounded-3xl text-center shadow-[0_0_50px_rgba(0,255,209,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-70" />
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Wolisz złożyć swój własny pakiet?</h3>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Skorzystaj z naszego konfiguratora. Wybierz pojedyncze usługi, których dokładnie potrzebujesz i natychmiast poznaj szacunkową wycenę swojego spersonalizowanego zamówienia.
            </p>
            <Link to="/skonfiguruj-projekt" className="inline-flex items-center justify-center gap-3 bg-[#00FFD1] text-black font-bold text-lg py-5 px-10 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,209,0.3)]">
              Skonfiguruj swoje zamówienie <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
