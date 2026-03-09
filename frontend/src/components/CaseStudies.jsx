import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Users, PenTool } from 'lucide-react';

const cases = [
  {
    id: 1,
    category: "B2B Lead Generation",
    title: "Skalowanie Sprzedaży Software House",
    problem: "Firma opierała się w 100% na poleceniach. Brak przewidywalnego źródła nowych leadów zagranicznych.",
    solution: "Wdrożenie precyzyjnych kampanii Google Ads i LinkedIn Ads skierowanych na rynki DACH oraz nowa strona docelowa.",
    result: "Zbudowanie stabilnego potoku zapytań B2B i uniezależnienie od systemu poleceń (referrali).",
    icon: Globe,
    stats: "ROI +300%"
  },
  {
    id: 2,
    category: "Kampania Performance",
    title: "Dynamiczny Rozwój Usług B2B",
    problem: "Firma usługowa była niewidoczna dla największych graczy na rynku lokalnym z powodu braku wizerunku eksperta.",
    solution: "Agresywna kampania Meta Ads oraz Content Marketing nastawiony na budowanie eksperckiego wizerunku marki.",
    result: "Wzrost świadomości marki i nawiązanie współpracy z kluczowymi klientami premium w regionie.",
    icon: TrendingUp,
    stats: "+140% Leadów"
  },
  {
    id: 3,
    category: "Usługi Profesjonalne",
    title: "Cyfryzacja Kancelarii Prawnej",
    problem: "Przestarzała witryna internetowa i brak nowoczesnych kanałów pozyskiwania klientów korporacyjnych.",
    solution: "Całkowita przebudowa architektury strony, optymalizacja UX/UI oraz wdrożenie strategii SEO (Topical Authority).",
    result: "Dominacja w organicznych wynikach wyszukiwania i drastyczny wzrost zapytań o stałą obsługę firm.",
    icon: Users,
    stats: "3x Zasięg"
  },
  {
    id: 4,
    category: "Branding & Identity",
    title: "Rebranding Firmy Produkcyjnej",
    problem: "Wizerunek firmy nie odzwierciedlał wysokiej jakości jej produktów. Marka wyglądała na 'przestarzałą'.",
    solution: "Totalny rebranding: Nowe logo, księga znaku, spójny Key Visual oraz nowoczesny Dark Mode na stronie.",
    result: "Błyskawiczny wzrost postrzeganej wartości marki na rynku krajowym i zagranicznym.",
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
            Liczby mówią <span className="text-[#00FFD1]">same za siebie</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Nasi klienci nie płacą nam za ładne grafiki. Płacą nam za mierzalny zwrot z inwestycji (ROI). Zobacz, jak transformujemy firmy w liderów branży.
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
