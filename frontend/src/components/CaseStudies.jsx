import { motion } from 'framer-motion';
import { ArrowUpRight, Layout, MousePointerClick, PenTool, Smartphone } from 'lucide-react';
import { fadeUp, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const cases = [
  {
    id: 1,
    category: 'Branding',
    title: 'Kompleksowe odświeżenie wizerunku',
    problem:
      'Firma miała przestarzałe logo i niespójne materiały wizualne, przez co wypadała mało profesjonalnie na tle konkurencji.',
    solution:
      'Zaprojektowaliśmy od zera nową tożsamość marki: nowoczesne logo, dopasowaną paletę kolorów, typografię i pełną księgę znaku.',
    result:
      'Marka zyskała nowoczesny wygląd, który szybciej budzi zaufanie i ułatwia rozmowy z klientami premium.',
    icon: PenTool,
    stats: 'Nowe logo',
  },
  {
    id: 2,
    category: 'Strony WWW',
    title: 'Zaawansowana strona internetowa',
    problem:
      'Poprzednia witryna działała wolno, źle wyglądała na telefonach i praktycznie nie generowała zapytań z internetu.',
    solution:
      'Zbudowaliśmy nową, szybką i dopracowaną stronę WWW z czytelną strukturą usług, wyraźnymi sekcjami i dopracowanymi punktami kontaktu.',
    result:
      'Strona zaczęła działać jak cyfrowy handlowiec, który pomaga użytkownikowi szybciej przejść od zainteresowania do kontaktu.',
    icon: Layout,
    stats: 'Nowa strona',
  },
  {
    id: 3,
    category: 'Social Media',
    title: 'Spójne grafiki na profilach',
    problem:
      'Firma nie miała czasu na regularne publikacje, a materiały wrzucane na Facebooka i LinkedIna były wizualnie słabe i przypadkowe.',
    solution:
      'Stworzyliśmy profesjonalne szablony oraz estetyczne, spójne materiały dopasowane do stylu marki i charakteru oferty.',
    result:
      'Profile zaczęły wyglądać ekspercko i spójnie, a komunikacja wizualna lepiej wspiera prezentację usług w internecie.',
    icon: Smartphone,
    stats: 'Piękne posty',
  },
  {
    id: 4,
    category: 'Kampanie',
    title: 'Kampania pozyskująca zlecenia',
    problem:
      'Firma miała dobrą ofertę, ale była praktycznie niewidoczna i opierała się wyłącznie na poleceniach oraz ruchu organicznym.',
    solution:
      'Uruchomiliśmy precyzyjne kampanie wizualne w Google Ads i Meta Ads, kierowane do osób realnie szukających tych konkretnych usług.',
    result:
      'Zamiast czekać na przypadkowe zapytania, firma zaczęła regularnie otrzymywać leady i telefony od nowych klientów.',
    icon: MousePointerClick,
    stats: 'Więcej zapytań',
  },
];

const CaseStudies = () => {
  return (
    <section id="cases" className="section-shell relative overflow-hidden border-t border-white/5 bg-[#050505] py-16 lg:py-32">
      <div className="pointer-events-none absolute left-[5%] top-[12%] h-72 w-72 rounded-full bg-[#00FFD1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-[4%] bottom-[8%] h-80 w-80 rounded-full bg-blue-500/8 blur-[140px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mb-16 max-w-4xl lg:mb-20"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-[#00FFD1] to-transparent" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00FFD1]">Case studies</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="max-w-[12ch] text-4xl font-bold leading-[1.02] tracking-[-0.04em] md:text-5xl lg:text-6xl">
            Nasze realizacje <span className="text-brand-gradient">w praktyce</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 lg:text-xl">
            Zobacz konkretne przykłady tego, jak branding, technologia i kampanie mogą podnieść poziom wizerunku firmy oraz ułatwić generowanie wartościowych zapytań.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8"
        >
          {cases.map((item, index) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.012 }}
              transition={springCard}
              className="group relative overflow-hidden border border-white/10 bg-[#0A0A0A]/90 p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.16),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-[#00FFD1]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-white/[0.04] text-[#00FFD1] transition-all duration-500 group-hover:border-[#00FFD1]/30 group-hover:bg-[#00FFD1]/10">
                    <item.icon size={28} className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Efekt</span>
                    <span className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-white transition-colors duration-500 group-hover:text-[#00FFD1]">
                      {item.stats}
                      <ArrowUpRight size={16} className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">{item.category}</p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-600">Case {String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="text-2xl font-bold tracking-[-0.03em] text-white transition-colors duration-500 group-hover:text-[#00FFD1] md:text-[1.9rem]">
                  {item.title}
                </h3>

                <div className="mt-8 space-y-5 text-sm leading-relaxed text-gray-400 md:text-base">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Sytuacja</p>
                    <p>{item.problem}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Co zrobiliśmy</p>
                    <p>{item.solution}</p>
                  </div>
                  <div className="border-t border-white/10 pt-5 transition-colors duration-500 group-hover:border-[#00FFD1]/20">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Co zyskał klient</p>
                    <p className="text-gray-300">{item.result}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
