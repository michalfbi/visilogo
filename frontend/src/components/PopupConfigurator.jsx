import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calculator, Tag, X } from 'lucide-react';
import { menuReveal, springCard } from '../lib/motion';

const PopupConfigurator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hiddenPaths = ['/', '/skonfiguruj-projekt', '/kreator-www', '/zamowienie'];
    const isHiddenPath = hiddenPaths.some((path) =>
      path === '/' ? location.pathname === '/' : location.pathname.includes(path)
    );

    if (isHiddenPath) {
      setIsOpen(false);
      return undefined;
    }

    const hasSeenPopup = sessionStorage.getItem('visilogo_configurator_popup');
    if (hasSeenPopup) return undefined;

    let hasOpened = false;

    const openPopup = () => {
      if (hasOpened) return;
      hasOpened = true;
      setIsOpen(true);
      window.removeEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
      if (window.scrollY > 1000) {
        openPopup();
      }
    };

    const timer = window.setTimeout(openPopup, 18000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('visilogo_configurator_popup', 'true');
  };

  const handleClickThrough = () => {
    setIsOpen(false);
    sessionStorage.setItem('visilogo_configurator_popup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuReveal}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:bottom-8 sm:right-8 sm:w-[420px]"
        >
          <div className="group relative overflow-hidden border border-[#00FFD1]/20 bg-[#050505]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
            <div className="pointer-events-none absolute -right-8 top-0 h-36 w-36 rounded-full bg-[#00FFD1]/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-gray-500 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 p-6 sm:p-7">
              <div className="mb-5 flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.05 }}
                  transition={springCard}
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]"
                >
                  <Calculator size={22} />
                </motion.div>

                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">
                    Smart configuration flow
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white sm:text-[1.35rem]">
                    Zbuduj własny pakiet usług
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-400 sm:text-[0.96rem]">
                Skorzystaj z naszego kreatora a'la carte. Dobierz technologie i usługi marketingowe w bardziej elastyczny sposób i zyskaj nawet <strong className="text-[#00FFD1]">20% rabatu</strong> na start.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00FFD1]">Szybko</div>
                  <div className="mt-2 text-sm text-gray-300">Wycena online w około 2 minuty</div>
                </div>
                <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00FFD1]">Elastycznie</div>
                  <div className="mt-2 text-sm text-gray-300">Łączysz tylko to, czego naprawdę potrzebujesz</div>
                </div>
              </div>

              <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={springCard} className="mt-6">
                <Link
                  to="/skonfiguruj-projekt"
                  onClick={handleClickThrough}
                  className="btn-primary group flex w-full items-center justify-center gap-2 text-sm font-black uppercase tracking-[0.22em]"
                >
                  Przejdź do kreatora
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <div className="relative z-10 flex items-center gap-2 border-t border-white/10 bg-white/[0.03] px-6 py-3 sm:px-7">
              <Tag size={12} className="text-[#00FFD1]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">
                Konfigurator dopasowany do nowego premium flow strony
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupConfigurator;
