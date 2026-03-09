import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Smartphone, MousePointerClick } from 'lucide-react';

const cases = [
  {
    id: 1,
    category: "Branding",
    title: "Kompleksowe Odświeżenie Wizerunku",
    problem: "Firma miała przestarzałe logo i niespójne materiały wizualne, co sprawiało, że wyglądali mało profesjonalnie na tle konkurencji.",
    solution: "Zaprojektowaliśmy od zera nową tożsamość firmy: nowoczesne logo, dopasowane kolory, typografię oraz pełną księgę znaku.",
    result: "Firma zyskała nowoczesny wygląd, który od razu budzi zaufanie i ułatwia rozmowy z klientami premium.",
    icon: PenTool,
    stats: "Nowe Logo"
  },
  {
    id: 2,
    category: "Strony WWW",
    title: "Zaawansowana Strona Internetowa",
    problem: "Stara witryna klienta działała wolno, źle wyświetlała się na telefonach i nie generowała żadnych zapytań z internetu.",
    solution: "Zbudowaliśmy zupełnie nową, piękną i szybką stronę WWW, z wyraźnymi sekcjami usług i formularzami kontaktowymi.",
    result: "Strona działa jak wirtualny handlowiec i ułatwia klientom szybki kontakt z firmą.",
    icon: Layout,
    stats: "Nowa Strona"
  },
  {
    id: 3,
    category: "Social Media",
    title: "Spójne Grafiki na Profilach",
    problem: "Brak czasu na regularne postowanie i bardzo słaba jakość zdjęć wrzucanych na Facebooka oraz LinkedIna firmy.",
    solution: "Stworzyliśmy profesjonalne szablony graficzne oraz zajęliśmy się tworzeniem estetycznych, spójnych materiałów na profile społecznościowe.",
    result: "Profile firmy wyglądają teraz ekspercko, spójnie i świetnie prezentują ich usługi w internecie.",
    icon: Smartphone,
    stats: "Piękne Posty"
  },
  {
    id: 4,
    category: "Kampanie",
    title: "Kampania Pozyskująca Zlecenia",
    problem: "Firma miała fajne usługi, ale nikt o nich nie wiedział. Opierali się tylko na poczcie pantoflowej i poleceniach.",
    solution: "Uruchomiliśmy precyzyjne reklamy wizualne (Google Ads oraz Facebook Ads) skierowane na osoby szukające tych konkretnych usług.",
    result: "Zamiast czekać na polecenie, firma regularnie otrzymuje powiadomienia i telefony od nowych klientów.",
    icon: MousePointerClick,
    stats: "Więcej Zapytań"
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
            Nasze realizacje <span className="text-[#00FFD1]">w praktyce</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Zobacz proste przykłady tego, jak nasze usługi brandingowe i technologiczne pomagają firmom wejść na wyższy poziom.
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
                <p><strong className="text-white">Co zrobiliśmy:</strong> {item.solution}</p>
                <p><strong className="text-white">Co zyskał klient:</strong> {item.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
