import { motion } from 'framer-motion';
import { fadeUp, sectionViewport, staggerContainer } from '../lib/motion';

const TrustBar = () => {
  const partners = [
    'BRANŻA MOTORYZACYJNA',
    'BRANŻA FOTOWOLTAICZNA',
    'BRANŻA FITNESS',
    'BRANŻA IT',
    'BRANŻA BUDOWLANA',
    'BRANŻA PRAWNA',
    'BRANŻA E-COMMERCE',
    'BRANŻA MEDYCZNA',
    'BRANŻA TRANSPORTOWA',
    'BRANŻA MOTORYZACYJNA',
    'BRANŻA FOTOWOLTAICZNA',
    'BRANŻA FITNESS',
    'BRANŻA IT',
    'BRANŻA BUDOWLANA',
    'BRANŻA PRAWNA',
    'BRANŻA E-COMMERCE',
    'BRANŻA MEDYCZNA',
    'BRANŻA TRANSPORTOWA',
  ];

  return (
    <section className="section-shell relative z-20 overflow-hidden border-y border-white/5 bg-[#020202] py-10 md:py-12">
      <div className="pointer-events-none absolute left-[8%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#00FFD1]/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3 text-center">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#00FFD1]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gray-500 md:text-xs">
            Współpracujemy z firmami z tych branż
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#00FFD1]" />
        </motion.div>

        <motion.div variants={fadeUp} className="relative flex w-full items-center overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#020202] to-transparent md:w-48" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#020202] to-transparent md:w-48" />

          <div className="marquee-premium">
            {partners.map((partner, idx) => (
              <div key={`${partner}-${idx}`} className="group mx-7 flex cursor-default items-center justify-center md:mx-14">
                <div className="relative overflow-hidden border border-white/5 bg-white/[0.02] px-4 py-3 transition-all duration-500 group-hover:border-[#00FFD1]/20 group-hover:bg-white/[0.05] md:px-6">
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="whitespace-nowrap font-mono text-lg font-bold tracking-[0.16em] text-gray-600 transition-colors duration-500 group-hover:text-[#00FFD1] md:text-[1.6rem]">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TrustBar;
