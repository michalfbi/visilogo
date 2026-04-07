import { motion } from 'framer-motion';
import { ArrowUpRight, Layout, MousePointerClick, Palette, Smartphone } from 'lucide-react';
import { mockServices } from '../mock';
import { fadeUp, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const iconMap = {
  MousePointerClick,
  Layout,
  Smartphone,
  Palette,
};

const Services = () => {
  return (
    <section id="services" className="section-shell relative overflow-hidden bg-[#050505] py-16 lg:py-32">
      <div className="ambient-grid absolute inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute left-[-8%] top-[10%] h-72 w-72 rounded-full bg-[#00FFD1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[5%] h-80 w-80 rounded-full bg-blue-500/8 blur-[140px]" />

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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00FFD1]">Oferta premium</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="max-w-[12ch] text-4xl font-bold leading-[1.02] tracking-[-0.04em] md:text-5xl lg:text-6xl">
            Co dokładnie <span className="text-brand-gradient">dla Ciebie zrobimy?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 lg:text-xl">
            Koniec z szukaniem kilku różnych wykonawców. W VisiLogo otrzymujesz pełną opiekę graficzną, technologiczną i reklamową pod jednym dachem — w bardziej dopracowanej, nowoczesnej i spójnej formie.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8"
        >
          {mockServices.map((service, index) => {
            const Icon = iconMap[service.icon];

            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.012 }}
                transition={springCard}
                className="group relative overflow-hidden border border-white/8 bg-[#090909]/90 p-8 md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1]/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-14 top-8 h-32 w-32 rounded-full bg-[#00FFD1]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-white/[0.04] text-[#00FFD1] transition-all duration-500 group-hover:border-[#00FFD1]/30 group-hover:bg-[#00FFD1]/10">
                      {Icon && <Icon size={28} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500 transition-colors duration-500 group-hover:text-[#00FFD1]">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div className="mt-8 flex-1">
                    <h3 className="text-2xl font-bold tracking-[-0.03em] text-white transition-colors duration-500 group-hover:text-[#00FFD1] lg:text-[1.9rem]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-300">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-[#00FFD1]/20">
                    <p className="text-sm leading-relaxed text-gray-500 transition-colors duration-500 group-hover:text-gray-300">
                      {service.details}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
