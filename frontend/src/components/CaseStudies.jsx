import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Users, PenTool } from 'lucide-react';

const cases = [
  {
    id: 1,
    category: "Wdrożenie IT / Web",
    title: "Dedykowany Serwis Ogłoszeniowy",
    problem: "Dealer tracił marżę na wysokich prowizjach zewnętrznych portali (OTOMOTO/OLX). Brak własnej bazy klientów.",
    solution: "Budowa niezależnej platformy sprzedażowej zintegrowanej ze stockiem. SEO pod konkretne modele aut.",
    result: "+40% zapytań bezpośrednich, 0% prowizji, pełna kontrola nad danymi klientów.",
    icon: Globe,
    stats: "ROI +300%"
  },
  {
    id: 2,
    category: "Kampania Performance",
    title: "Skalowanie Followersów w Social Media",
    problem: "Nowy punkt dealerski bez rozpoznawalności w regionie. Niski poziom zaufania klientów.",
    solution: "Agresywna kampania Meta Ads (Facebook/Instagram) nastawiona na budowanie lokalnej społeczności fanów motoryzacji.",
    result: "Pozyskanie 5,000+ lokalnych followersów w 3 miesiące. Zbudowanie wizerunku lidera opinii.",
    icon: TrendingUp,
    stats: "+5k Fanów"
  },
  {
    id: 3,
    category: "Social Media Management",
    title: "Kompleksowe Prowadzenie Social Media",
    problem: "Chaotyczna komunikacja, brak czasu na regularne wrzucanie ofert, słabej jakości zdjęcia z telefonu.",
    solution: "Przejęcie kanałów FB/IG/TikTok. Regularne wideo-prezentacje (Rolki) aut z placu, profesjonalne sesje.",
    result: "3x większe zasięgi organiczne. Szybsza rotacja aut 'gorących' (sprzedaż w <48h od publikacji).",
    icon: Users,
    stats: "3x Zasięg"
  },
  {
    id: 4,
    category: "Branding & Identity",
    title: "Branding Całej Identyfikacji Internetowej",
    problem: "Wizerunek kojarzący się z typowym, tanim 'komisem'. Trudność w sprzedaży aut segmentu Premium.",
    solution: "Totalny rebranding: Nowe logo, księga znaku, ciemny motyw strony (Dark Mode), spójne szablony ogłoszeń.",
    result: "Wzrost postrzeganej wartości marki. Skuteczne wejście w segment aut 100k+ PLN.",
    icon: PenTool,
    stats: "Premium Look"
  }
];

const CaseStudies = () => {
  return (
    <section id="casestudies" className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Realne <span className="text-[#00FFD1]">Wyniki</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Zobacz, jak pomagamy dealerom budować przewagę. Konkretne problemy, konkretne rozwiązania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 hover:border-[#00FFD1]/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/5 rounded-none text-[#00FFD1]">
                  <item.icon size={28} />
                </div>
                <div className="text-right">
                    <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Wynik</span>
                    <span className="text-xl font-bold text-white group-hover:text-[#00FFD1] transition-colors">{item.stats}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-[#00FFD1] text-xs uppercase tracking-widest mb-6">{item.category}</p>

              <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                <p><strong className="text-white">Problem:</strong> {item.problem}</p>
                <p><strong className="text-white">Działanie:</strong> {item.solution}</p>
                <p><strong className="text-white">Efekt:</strong> {item.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
