import { motion } from 'framer-motion';
import { fadeUp, sectionViewport, staggerContainer, springCard } from '../lib/motion';

const DataStrip = () => {
  const stats = [
    {
      value: '100+',
      label: 'zrealizowanych projektów',
      note: 'branding, strony i kampanie prowadzone w jednym systemie',
    },
    {
      value: '1 mln zł+',
      label: 'wygenerowanej sprzedaży',
      note: 'efekt działań nastawionych na realną wartość biznesową',
    },
    {
      value: '80%',
      label: 'klientów zostaje na stałe',
      note: 'długofalowa współpraca zamiast jednorazowych wdrożeń',
    },
  ];

  return (
    <section className="section-shell relative z-10 overflow-hidden border-y border-white/5 bg-[#020202] py-14 lg:py-20">
      <div className="pointer-events-none absolute left-[8%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#00FFD1]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={springCard}
              className={`group relative overflow-hidden border border-white/8 bg-white/[0.02] px-6 py-8 text-center backdrop-blur-sm md:px-8 md:py-10 ${
                index !== stats.length - 1 ? 'md:border-r-0' : ''
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,209,0.12),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-[-0.06em] text-[#00FFD1] transition-transform duration-500 group-hover:scale-105 md:text-5xl lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white/80 md:text-xs">
                  {stat.label}
                </span>
                <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-gray-500 transition-colors duration-500 group-hover:text-gray-300">
                  {stat.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DataStrip;
