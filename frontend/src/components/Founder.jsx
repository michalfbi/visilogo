import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Linkedin } from 'lucide-react';
import {
  fadeUp,
  revealLeft,
  revealRight,
  sectionViewport,
  springCard,
  staggerContainer,
} from '../lib/motion';

const Founder = () => {
  const highlights = [
    ['Partnerstwo', 'pracujemy jak rozszerzenie Twojego zespołu'],
    ['Odpowiedzialność', 'nie kończymy na estetyce, liczy się efekt'],
    ['Spójność', 'branding, strona i komunikacja działają razem'],
  ];

  return (
    <section className="section-shell relative overflow-hidden bg-black pb-16 pt-28 lg:pb-32 lg:pt-52">
      <div className="pointer-events-none absolute left-0 top-24 z-0 w-full select-none text-center opacity-[0.07]">
        <h2 className="text-[18vw] font-black leading-none tracking-[-0.08em] text-[#00FFD1]">
          VISILOGO
        </h2>
      </div>

      <div className="pointer-events-none absolute left-[-10%] top-[22%] h-80 w-80 rounded-full bg-[#00FFD1]/8 blur-[140px]" />
      <div className="pointer-events-none absolute right-[2%] bottom-[10%] h-96 w-96 rounded-full bg-blue-500/8 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(340px,0.88fr)_minmax(0,1.12fr)] lg:gap-20 xl:gap-24">
          <motion.div
            variants={revealLeft}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 0.8, 0, -0.6, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto max-w-md"
            >
              <div className="absolute -inset-6 border border-[#00FFD1]/10 bg-[radial-gradient(circle_at_top,_rgba(0,255,209,0.08),_transparent_45%)]" />
              <div className="absolute -bottom-6 -left-6 h-full w-full border border-[#00FFD1]/20" />
              <div className="absolute -right-8 top-10 w-40 border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Founder note</div>
                <div className="mt-2 text-sm leading-relaxed text-gray-300">
                  Marka ma wyglądać premium, ale przede wszystkim pomagać sprzedawać.
                </div>
              </div>

              <div className="relative z-10 aspect-[4/5] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
                <img
                  src="/michal.jpg"
                  alt="Michał Pakuła - Założyciel VisiLogo"
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-[#00FFD1] to-transparent" />
              <span className="text-sm font-bold uppercase tracking-[0.24em] text-[#00FFD1]">
                Michał Pakuła — Założyciel VisiLogo
              </span>
            </motion.div>

            <motion.h2
              variants={revealRight}
              className="max-w-[14ch] text-4xl font-bold leading-[1.03] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl"
            >
              Nie jesteśmy anonimową korporacją. <span className="text-gradient italic">Gramy w jednej drużynie.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-8 space-y-6 text-lg leading-relaxed text-gray-400">
              <p>
                Większość agencji traktuje swoich klientów jak kolejne pozycje w arkuszu kalkulacyjnym. Prace są rozpraszane,
                odpowiedzialność się rozmywa, a kontakt urywa zaraz po wystawieniu faktury. My działamy inaczej.
              </p>
              <p>
                VisiLogo powstało z myślą o ambitnych przedsiębiorcach, którzy potrzebują nie tylko estetyki, ale przede wszystkim
                partnera biznesowego. Kogoś, kto bierze odpowiedzialność za dowiezienie jakości, spójnego wizerunku i lepszego efektu
                sprzedażowego w internecie.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map(([title, description]) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={springCard}
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">{title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-300">
                    {description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4 md:gap-6">
              <motion.a
                href="https://www.linkedin.com/in/michał-pakuła-0b5b382b7"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={springCard}
                className="inline-flex items-center gap-3 border border-[#0077B5]/30 bg-[#0077B5] px-6 py-4 font-bold text-white shadow-[0_18px_60px_rgba(0,119,181,0.25)] transition-all duration-300 hover:bg-[#0077B5]/90"
              >
                <Linkedin size={20} />
                Poznajmy się na LinkedIn
                <ArrowUpRight size={16} />
              </motion.a>

              <motion.a
                href="/#cases"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={springCard}
                className="btn-secondary group"
              >
                Zobacz nasze wyniki
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
