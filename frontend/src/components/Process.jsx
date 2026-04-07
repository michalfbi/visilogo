import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockProcess } from '../mock';
import {
  fadeUp,
  revealLeft,
  sectionViewport,
  springCard,
  staggerContainer,
} from '../lib/motion';

const Process = () => {
  return (
    <section id="process" className="section-shell relative overflow-hidden bg-black py-16 lg:py-32">
      <div className="pointer-events-none absolute left-[-10%] top-[18%] h-80 w-80 rounded-full bg-[#00FFD1]/8 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[4%] h-96 w-96 rounded-full bg-blue-500/8 blur-[150px]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20 xl:gap-28">
          <motion.div
            variants={revealLeft}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="md:w-[36%]"
          >
            <div className="md:sticky md:top-32">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-[#00FFD1] to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00FFD1]">Proces premium</span>
              </div>

              <h2 className="max-w-[10ch] text-4xl font-bold leading-[1.02] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                Jak wygląda <span className="text-brand-gradient">współpraca?</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Przeprowadzimy Cię przez cały proces krok po kroku. Bez chaosu i bez niespodzianek — za to z bardzo czytelną strukturą, przewidywalnym rytmem pracy i lepszym doświadczeniem na każdym etapie.
              </p>

              <div className="mt-8 border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Flow współpracy</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">Od briefu do efektu</div>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  Każdy krok porządkuje decyzje, ogranicza chaos i zwiększa szansę, że finalny efekt będzie spójny wizualnie oraz skuteczny biznesowo.
                </p>
              </div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={springCard} className="mt-8 inline-flex">
                <Link to="/proces" className="btn-secondary group text-sm">
                  Poznaj szczegóły procesu
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="relative md:w-[64%]"
          >
            <div className="absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-[#00FFD1]/0 via-[#00FFD1]/30 to-[#00FFD1]/0 md:block" />
            <div className="space-y-8 md:space-y-10">
              {mockProcess.map((step, index) => (
                <ProcessStep key={`${step.step}-${index}`} step={step} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index }) => {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.008 }}
      transition={springCard}
      className="group relative md:pl-14"
    >
      <div className="absolute left-0 top-8 hidden h-5 w-5 -translate-x-1/2 border border-[#00FFD1]/40 bg-black md:block">
        <div className="glow-pulse absolute inset-[4px] bg-[#00FFD1]" />
      </div>

      <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-500 group-hover:border-[#00FFD1]/20 md:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1]/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#00FFD1]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">
                Etap {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-white/10 transition-colors duration-500 group-hover:bg-[#00FFD1]/30" />
            </div>

            <h3 className="text-2xl font-bold tracking-[-0.03em] text-white transition-colors duration-500 group-hover:text-[#00FFD1] md:text-3xl">
              {step.title}
            </h3>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-300">
              {step.desc}
            </p>
          </div>

          <div className="self-start border border-white/10 bg-black/40 px-4 py-3 text-right backdrop-blur-sm transition-all duration-500 group-hover:border-[#00FFD1]/25 group-hover:bg-[#00FFD1]/8">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500 group-hover:text-[#00FFD1]">Krok</div>
            <div className="mt-2 text-4xl font-black tracking-[-0.06em] text-white/20 transition-colors duration-500 group-hover:text-white/80">
              {step.step}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Process;
