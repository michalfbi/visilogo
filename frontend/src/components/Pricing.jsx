import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Palette,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { localPricingPlans, pricingPlans, printPricingPlans, singleServices } from '../mock';
import { fadeUp, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const packageSections = [
  {
    id: 'branding',
    eyebrow: 'Budowa marki',
    title: 'Pakiety wizerunkowe',
    description:
      'Jednorazowe inwestycje w fundamenty Twojej marki: logo, identyfikację i nowoczesną stronę WWW.',
    plans: pricingPlans,
    icon: Palette,
    infoCard: null,
  },
  {
    id: 'print',
    eyebrow: 'Logistyka i druk',
    title: 'Pakiety druk & identyfikacja',
    description:
      'Przenosimy Twoją markę do świata fizycznego. Kompleksowe wsparcie od projektu po dopięcie realizacji.',
    plans: printPricingPlans,
    icon: Truck,
    infoCard: {
      icon: ShieldCheck,
      title: 'Gwarancja zero stresu',
      text: 'My projektujemy, my zamawiamy w drukarni i my pilnujemy kuriera. Ty odbierasz gotowe paczki pod drzwiami firmy. Podane ceny dotyczą projektów graficznych, a koszt druku wyceniamy według nakładu.',
    },
  },
  {
    id: 'local',
    eyebrow: 'Akwizycja klientów',
    title: 'Pakiety lokalnej dominacji',
    description:
      'Stała współpraca nastawiona na przejmowanie rynku lokalnego, mocniejszą ekspozycję marki i generowanie leadów.',
    plans: localPricingPlans,
    icon: Zap,
    infoCard: null,
  },
];

const PricingCard = ({ plan, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFeatures = plan.features.slice(0, 4);
  const hiddenFeatures = plan.features.slice(4);

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.012 }}
      transition={springCard}
      className={`group relative flex h-full flex-col overflow-hidden border p-8 md:p-10 ${
        plan.highlight
          ? 'border-[#00FFD1]/40 bg-[#0A0A0A] shadow-[0_24px_90px_rgba(0,255,209,0.08)]'
          : 'border-white/10 bg-[#050505]/95'
      }`}
    >
      {plan.highlight && (
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 border border-[#00FFD1]/20 bg-[#00FFD1] px-4 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-black shadow-[0_16px_50px_rgba(0,255,209,0.28)]">
          Najczęściej wybierany
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.15),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-12 top-8 h-28 w-28 rounded-full bg-[#00FFD1]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#00FFD1]">Pakiet {String(index + 1).padStart(2, '0')}</div>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white transition-colors duration-500 group-hover:text-[#00FFD1] md:text-[1.9rem]">
              {plan.name}
            </h3>
            <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-gray-400 md:text-base">
              {plan.desc}
            </p>
          </div>
        </div>

        <div className="mt-8 border-y border-white/10 py-6 transition-colors duration-500 group-hover:border-[#00FFD1]/20">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">{plan.price}</span>
            <span className="pb-1 font-mono text-sm text-gray-500">PLN</span>
          </div>
          <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00FFD1]">{plan.range}</div>
        </div>

        <div className="mt-8 flex-grow">
          <ul className="space-y-4">
            {visibleFeatures.map((feature, featureIndex) => (
              <li key={`${plan.id}-visible-${featureIndex}`} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 text-[#00FFD1]" size={18} />
                <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {isExpanded && hiddenFeatures.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 overflow-hidden pt-4"
              >
                {hiddenFeatures.map((feature, featureIndex) => (
                  <li key={`${plan.id}-hidden-${featureIndex}`} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0 text-[#00FFD1]" size={18} />
                    <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {hiddenFeatures.length > 0 && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-8 inline-flex items-center gap-2 self-start text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500 transition-colors duration-300 hover:text-[#00FFD1]"
          >
            {isExpanded ? (
              <>
                Zwiń listę <ChevronUp size={16} />
              </>
            ) : (
              <>
                Zobacz pełną listę (+{hiddenFeatures.length}) <ChevronDown size={16} />
              </>
            )}
          </button>
        )}

        <Link
          to={`/zamowienie/${plan.id}`}
          className={`mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] transition-all duration-300 ${
            plan.highlight
              ? 'bg-[#00FFD1] text-black hover:bg-[#7effe7] hover:shadow-[0_18px_60px_rgba(0,255,209,0.25)]'
              : 'border border-white/15 text-white hover:border-[#00FFD1]/50 hover:bg-[#00FFD1]/8 hover:text-[#00FFD1]'
          }`}
        >
          Wybierz ten pakiet
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
};

const SectionHeader = ({ icon: Icon, eyebrow, title, description, infoCard }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={sectionViewport}
      className="mx-auto mb-14 max-w-5xl text-center lg:mb-16"
    >
      <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
        <Icon size={14} />
        {eyebrow}
      </motion.div>

      <motion.h2 variants={fadeUp} className="mt-6 text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
        {title.split(' ').slice(0, -1).join(' ')} <span className="text-brand-gradient">{title.split(' ').slice(-1).join(' ')}</span>
      </motion.h2>

      <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 lg:text-xl">
        {description}
      </motion.p>

      {infoCard && (
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={springCard}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-4 border border-[#00FFD1]/20 bg-[#00FFD1]/6 p-6 text-left sm:flex-row sm:items-center"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
            <infoCard.icon size={28} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00FFD1]">{infoCard.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{infoCard.text}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const SingleServiceCategory = ({ category, index }) => {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={springCard}
      className="group relative overflow-hidden border border-white/8 bg-[#050505]/95 p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,209,0.12),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4 transition-colors duration-500 group-hover:border-[#00FFD1]/20">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">{category.category}</h4>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600">A la carte {String(index + 1).padStart(2, '0')}</span>
        </div>

        <ul className="space-y-6">
          {category.items.map((item, itemIndex) => (
            <li key={`${category.category}-${itemIndex}`} className="group/item">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white transition-colors duration-300 group-hover/item:text-[#00FFD1]">
                  {item.name}
                </span>
                <span className="font-mono text-xs text-gray-500">{item.price}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-500 transition-colors duration-300 group-hover/item:text-gray-300">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="section-shell relative overflow-hidden border-t border-white/5 bg-black py-16 lg:py-32">
      <div className="ambient-grid absolute inset-0 z-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute left-[-8%] top-[10%] h-80 w-80 rounded-full bg-[#00FFD1]/8 blur-[130px]" />
      <div className="pointer-events-none absolute right-[4%] top-[34%] h-96 w-96 rounded-full bg-blue-500/8 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6">
        {packageSections.map((section, sectionIndex) => (
          <div key={section.id} className={sectionIndex === packageSections.length - 1 ? 'mb-0' : 'mb-28 lg:mb-32'}>
            <SectionHeader
              icon={section.icon}
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
              infoCard={section.infoCard}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8"
            >
              {section.plans.map((plan, index) => (
                <PricingCard key={`${section.id}-${plan.id || index}`} plan={plan} index={index} />
              ))}
            </motion.div>
          </div>
        ))}

        <div className="border-t border-white/10 pt-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
              Pojedyncze usługi <span className="text-gray-500">(A la carte)</span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={springCard}
              className="mx-auto mt-8 inline-flex max-w-3xl flex-col items-start gap-4 border border-yellow-500/20 bg-yellow-500/5 p-6 text-left sm:flex-row sm:items-center"
            >
              <AlertTriangle className="shrink-0 text-yellow-500" size={30} />
              <p className="text-sm leading-relaxed text-gray-300">
                Wybierając większy pakiet, zyskujesz synergię działań i zwykle oszczędzasz średnio <strong>35–50%</strong>
                względem cen pojedynczych usług.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {singleServices.map((category, index) => (
              <SingleServiceCategory key={`${category.category}-${index}`} category={category} index={index} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={springCard}
            className="relative mx-auto mt-16 max-w-5xl overflow-hidden border border-[#00FFD1]/20 bg-[linear-gradient(135deg,rgba(10,10,10,0.96),rgba(2,2,2,0.96))] p-10 text-center shadow-[0_0_50px_rgba(0,255,209,0.08)] md:p-16"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-80" />
            <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#00FFD1]/10 blur-3xl" />

            <h3 className="relative z-10 text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              Wolisz złożyć swój własny pakiet?
            </h3>
            <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Skorzystaj z naszego konfiguratora. Wybierz usługi, których potrzebujesz i nalicz automatyczny rabat w bardziej elastycznym modelu.
            </p>
            <Link
              to="/skonfiguruj-projekt"
              className="btn-primary relative z-10 mt-10 inline-flex items-center justify-center gap-3 text-lg font-black"
            >
              Skonfiguruj swoje zamówienie
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
