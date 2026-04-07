import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, MousePointerClick, Palette, Smartphone } from 'lucide-react';
import {
  blurIn,
  fadeIn,
  fadeUp,
  floatingOrbs,
  glowPulse,
  heroStagger,
  revealLeft,
  revealRight,
  sectionViewport,
  springCard,
  viewportOnce,
} from '../lib/motion';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const LoadingPlaceholder = () => (
  <div className="relative h-full w-full overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.16),_transparent_32%),radial-gradient(circle_at_18%_18%,_rgba(255,255,255,0.08),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.03),_rgba(255,255,255,0.01))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
    <motion.div
      {...glowPulse}
      className="pointer-events-none absolute -top-12 right-[-4%] h-56 w-56 rounded-full bg-[#00FFD1]/18 blur-3xl"
    />
    <motion.div
      animate={floatingOrbs.animate}
      className="pointer-events-none absolute bottom-[-4%] left-[-4%] h-48 w-48 rounded-full bg-blue-500/12 blur-3xl"
    />
    <div className="ambient-grid pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[360px] w-[360px] rounded-full border border-[#00FFD1]/20 bg-[radial-gradient(circle,_rgba(0,255,209,0.12)_0%,_rgba(0,255,209,0.03)_38%,_transparent_70%)] shadow-[0_0_120px_rgba(0,255,209,0.08)]">
        <div className="absolute inset-[14%] rounded-full border border-white/10" />
        <div className="absolute inset-[28%] rounded-full border border-[#00FFD1]/18" />
        <div className="absolute inset-[40%] rounded-full border border-white/10" />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[32%] rounded-full bg-[#00FFD1]/10 blur-2xl"
        />
      </div>
    </div>
  </div>
);

const Hero = () => {
  const [load3D, setLoad3D] = useState(false);
  const [enableDesktopVisual, setEnableDesktopVisual] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const updateViewportMode = () => setEnableDesktopVisual(mediaQuery.matches);

    updateViewportMode();
    mediaQuery.addEventListener('change', updateViewportMode);

    return () => mediaQuery.removeEventListener('change', updateViewportMode);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !enableDesktopVisual) return undefined;

    const loadModel = () => {
      setLoad3D(true);
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((eventName) => {
        window.removeEventListener(eventName, loadModel);
      });
    };

    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((eventName) => {
      window.addEventListener(eventName, loadModel, { once: true, passive: true });
    });

    const timer = window.setTimeout(loadModel, 2200);

    return () => {
      window.clearTimeout(timer);
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((eventName) => {
        window.removeEventListener(eventName, loadModel);
      });
    };
  }, [enableDesktopVisual]);

  const heroServices = [
    {
      icon: Palette,
      title: 'Branding i wizerunek',
      desc: 'Logo, identyfikacja i kierunek wizualny, który odróżnia markę od konkurencji.',
    },
    {
      icon: Layout,
      title: 'Zaawansowane strony WWW',
      desc: 'Nowoczesne witryny z naciskiem na szybkość, wrażenie premium i konwersję.',
    },
    {
      icon: Smartphone,
      title: 'Grafiki i komunikacja',
      desc: 'Spójna oprawa do social mediów, kampanii i materiałów sprzedażowych.',
    },
    {
      icon: MousePointerClick,
      title: 'Kampanie internetowe',
      desc: 'Ruch, leady i działania reklamowe budowane pod realny wynik biznesowy.',
    },
  ];

  const heroStats = [
    ['360°', 'spójne prowadzenie marki'],
    ['B2B', 'skupienie na jakości leadów'],
    ['Premium', 'design, ruch i sprzedaż'],
  ];

  return (
    <section className="section-shell relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-black pt-32 pb-16 lg:min-h-screen lg:pt-36">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={floatingOrbs.animate}
          className="ambient-orb absolute top-[-8%] right-[-8%] h-[620px] w-[620px] rounded-full bg-[#00FFD1]/7 blur-[120px]"
        />
        <motion.div
          {...glowPulse}
          className="absolute left-[-12%] top-[18%] h-[340px] w-[340px] rounded-full bg-white/[0.06] blur-[110px]"
        />
        <motion.div
          animate={{ y: [0, -26, 0], x: [0, 16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-12%] left-[4%] h-[440px] w-[440px] rounded-full bg-blue-900/14 blur-[140px]"
        />
        <div className="ambient-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-14 px-6 lg:gap-16 xl:grid-cols-[minmax(0,1.02fr)_minmax(440px,0.98fr)]">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-[#00FFD1] to-transparent" />
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Wszystko w jednym miejscu</span>
          </motion.div>

          <motion.h1
            variants={blurIn}
            className="max-w-[13ch] text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl xl:text-[5.2rem]"
          >
            Tworzymy wizerunek, strony i kampanie, które <span className="bg-gradient-to-r from-[#00FFD1] via-white to-[#00FFD1] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">przyciągają klientów</span>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-400 xl:text-[1.18rem]">
            Konkretnie, estetycznie i bez marketingowego hałasu. Projektujemy marki, wdrażamy strony WWW i prowadzimy kampanie tak, aby cały system wizualny i sprzedażowy pracował razem.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {heroStats.map(([value, label]) => (
              <div key={value} className="motion-border border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                <div className="text-lg font-black tracking-[-0.04em] text-white">{value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">{label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.a href="#contact" whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={springCard} className="btn-primary group text-center">
              Darmowa konsultacja
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a href="#services" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={springCard} className="btn-secondary h-[52px]">
              Zobacz co robimy
            </motion.a>
          </motion.div>

          <motion.p variants={fadeIn} className="mt-5 text-sm text-gray-500">
            Jeden partner do brandingu, wdrożenia strony i kampanii nastawionych na leady.
          </motion.p>

          <motion.div
            variants={fadeUp}
            viewport={sectionViewport}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {heroServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { y: 0, scale: 1 },
                  hover: { y: -8, scale: 1.015 },
                }}
                transition={springCard}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start gap-4">
                  <div className="relative flex h-11 w-11 items-center justify-center bg-black text-[#00FFD1]">
                    <div className="absolute inset-0 bg-[#00FFD1]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <service.icon size={20} className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-white">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{service.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 transition-colors duration-300 group-hover:text-[#00FFD1]">
                  <span>Warstwa {String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#00FFD1]/40" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={revealRight}
          initial="hidden"
          animate="show"
          viewport={viewportOnce}
          className="relative hidden h-[620px] w-full xl:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 1.4, 0, -1.2, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {enableDesktopVisual && load3D ? (
              <div className="relative h-full w-full overflow-hidden border border-white/10 bg-[#050505] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                <Suspense fallback={<LoadingPlaceholder />}>
                  <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
                </Suspense>
              </div>
            ) : (
              <LoadingPlaceholder />
            )}
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
