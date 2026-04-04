import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Smartphone, MousePointerClick } from 'lucide-react';

const cases = [
  {
    id: 1,
    category: "Branding",
    title: "Kompleksowe Od艣wie偶enie Wizerunku",
    problem: "Firma mia艂a przestarza艂e logo i爊iesp贸jne materia艂y wizualne, co sprawia艂o, 偶e wygl膮dali ma艂o profesjonalnie na tle konkurencji.",
    solution: "Zaprojektowali艣my od zera now膮 to偶samo艣膰 firmy: nowoczesne logo, dopasowane kolory, typografi臋 oraz pe艂n膮 ksi臋g臋 znaku.",
    result: "Firma zyska艂a nowoczesny wygl膮d, kt贸ry od razu budzi zaufanie i爑艂atwia rozmowy z爇lientami premium.",
    icon: PenTool,
    stats: "Nowe Logo"
  },
  {
    id: 2,
    category: "Strony WWW",
    title: "Zaawansowana Strona Internetowa",
    problem: "Stara witryna klienta dzia艂a艂a wolno, 藕le wy艣wietla艂a si臋 na telefonach i爊ie generowa艂a 偶adnych zapyta艅 z爄nternetu.",
    solution: "Zbudowali艣my zupe艂nie now膮, pi臋kn膮 i爏zybk膮 stron臋 WWW, z爓yra藕nymi sekcjami us艂ug i爁ormularzami kontaktowymi.",
    result: "Strona dzia艂a jak wirtualny handlowiec i爑艂atwia klientom szybki kontakt z爁irm膮.",
    icon: Layout,
    stats: "Nowa Strona"
  },
  {
    id: 3,
    category: "Social Media",
    title: "Sp贸jne Grafiki na Profilach",
    problem: "Brak czasu na regularne postowanie i燽ardzo s艂aba jako艣膰 zdj臋膰 wrzucanych na Facebooka oraz LinkedIna firmy.",
    solution: "Stworzyli艣my profesjonalne szablony graficzne oraz zaj臋li艣my si臋 tworzeniem estetycznych, sp贸jnych materia艂贸w na profile spo艂eczno艣ciowe.",
    result: "Profile firmy wygl膮daj膮 teraz ekspercko, sp贸jnie i犈泈ietnie prezentuj膮 ich us艂ugi w爄nternecie.",
    icon: Smartphone,
    stats: "Pi臋kne Posty"
  },
  {
    id: 4,
    category: "Kampanie",
    title: "Kampania Pozyskuj膮ca Zlecenia",
    problem: "Firma mia艂a fajne us艂ugi, ale nikt o爊ich nie wiedzia艂. Opierali si臋 tylko na poczcie pantoflowej i爌oleceniach.",
    solution: "Uruchomili艣my precyzyjne reklamy wizualne (Google Ads oraz Facebook Ads) skierowane na osoby szukaj膮ce tych konkretnych us艂ug.",
    result: "Zamiast czeka膰 na polecenie, firma regularnie otrzymuje powiadomienia i爐elefony od nowych klient贸w.",
    icon: MousePointerClick,
    stats: "Wi臋cej Zapyta艅"
  }
];

const CaseStudies = () => {
  return (
    <section id="casestudies" className="py-16 lg:py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Nasze realizacje <span className="text-[#00FFD1]">w praktyce</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Zobacz proste przyk艂ady tego, jak nasze us艂ugi brandingowe i爐echnologiczne pomagaj膮 firmom wej艣膰 na wy偶szy poziom.
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
                    <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Efekt</span>
                    <span className="text-xl font-bold text-white group-hover:text-[#00FFD1] transition-colors">{item.stats}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-[#00FFD1] text-xs uppercase tracking-widest mb-6">{item.category}</p>

              <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                <p><strong className="text-white">Sytuacja:</strong> {item.problem}</p>
                <p><strong className="text-white">Co zrobili艣my:</strong> {item.solution}</p>
                <p><strong className="text-white">Co zyska艂 klient:</strong> {item.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
