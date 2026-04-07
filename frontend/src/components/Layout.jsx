import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Zap, Eye, Crosshair, QrCode, Bot, Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  menuReveal,
  mobilePanel,
  navItemReveal,
  springSoft,
  staggerContainer,
} from '../lib/motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = useMemo(
    () => [
      { name: 'USŁUGI', href: '/#services', route: '/' },
      { name: 'PROCES', href: '/proces', route: '/proces' },
      { name: 'CASE STUDIES', href: '/#cases', route: '/' },
      { name: 'PAKIETY', href: '/#pricing', route: '/' },
      { name: 'SKONFIGURUJ PROJEKT', href: '/skonfiguruj-projekt', route: '/skonfiguruj-projekt' },
    ],
    []
  );

  const toolLinks = useMemo(
    () => [
      {
        href: '/pojedynek',
        title: 'Pojedynek Stron',
        subtitle: 'Szybkość na tle rywali',
        icon: Zap,
        tone: 'text-[#00FFD1] bg-[#00FFD1]/10',
      },
      {
        href: '/szpieg-reklam',
        title: 'Szpieg Reklam',
        subtitle: 'Podglądaj konkurencję',
        icon: Crosshair,
        tone: 'text-red-500 bg-red-500/10',
      },
      {
        href: '/skaner',
        title: 'Skaner Linków',
        subtitle: 'Wizerunek w sieci',
        icon: Eye,
        tone: 'text-[#00FFD1] bg-[#00FFD1]/10',
      },
      {
        href: '/baza-promptow',
        title: 'Baza Promptów AI',
        subtitle: 'Lepsze teksty B2B',
        icon: Bot,
        tone: 'text-blue-500 bg-blue-500/10',
      },
      {
        href: '/generator-qr',
        title: 'Generator QR',
        subtitle: 'Darmowe kody do druku',
        icon: QrCode,
        tone: 'text-[#00FFD1] bg-[#00FFD1]/10',
      },
    ],
    []
  );

  const isLinkActive = (route) => {
    if (route === '/') return location.pathname === '/';
    return location.pathname.startsWith(route);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00FFD1] selection:text-black">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 z-50 w-full px-3 pt-3 sm:px-4"
      >
        <div
          className={`mx-auto max-w-[1520px] overflow-hidden border transition-all duration-500 ${
            isScrolled || isMobileMenuOpen || isToolsOpen
              ? 'border-white/10 bg-black/75 shadow-[0_20px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
              : 'border-white/5 bg-black/35 backdrop-blur-xl'
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1]/80 to-transparent opacity-80" />

          <div className="container mx-auto flex items-center justify-between gap-6 px-5 py-4 md:px-6 xl:px-8">
            <motion.a
              href="/"
              whileHover={{ x: 2 }}
              transition={springSoft}
              className="group relative z-50 flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#00FFD1]/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative text-2xl font-black tracking-[-0.05em] sm:text-[1.85rem]">
                  Visi<span className="text-[#00FFD1]">Logo</span>
                </span>
              </div>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.34em] text-gray-500 transition-colors duration-300 group-hover:text-gray-300 sm:block">
                Agency
              </span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navLinks.map((link) => {
                const active = isLinkActive(link.route);

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ y: -2 }}
                    transition={springSoft}
                    className={`group relative overflow-hidden px-4 py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
                      active ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute inset-x-3 bottom-2 h-px origin-left bg-gradient-to-r from-[#00FFD1] via-white/80 to-transparent transition-transform duration-500 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                    <span className="absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.a>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  transition={springSoft}
                  className={`group relative flex items-center gap-2 overflow-hidden px-4 py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
                    isToolsOpen ? 'text-white' : 'text-[#00FFD1] hover:text-white'
                  }`}
                >
                  <span className="relative z-10">Narzędzia</span>
                  <ChevronDown
                    size={15}
                    className={`relative z-10 transition-transform duration-400 ${isToolsOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute inset-0 bg-[#00FFD1]/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className={`absolute inset-x-3 bottom-2 h-px bg-gradient-to-r from-[#00FFD1] via-white/80 to-transparent transition-transform duration-500 ${isToolsOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </motion.button>

                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      variants={menuReveal}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[360px] overflow-hidden border border-white/10 bg-[#050505]/95 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
                      <div className="grid gap-px bg-white/5">
                        {toolLinks.map((tool, index) => {
                          const Icon = tool.icon;
                          return (
                            <motion.a
                              key={tool.href}
                              href={tool.href}
                              initial={{ opacity: 0, x: 14 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ delay: index * 0.04, duration: 0.32 }}
                              className="group relative flex items-center gap-4 bg-[#050505] px-5 py-4 transition-colors duration-300 hover:bg-white/[0.04]"
                            >
                              <div className={`flex h-11 w-11 items-center justify-center ${tool.tone}`}>
                                <Icon size={18} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 text-sm font-bold text-white">
                                  <span>{tool.title}</span>
                                  <ArrowUpRight size={14} className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                </div>
                                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                                  {tool.subtitle}
                                </div>
                              </div>
                              <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent transition-transform duration-500 group-hover:scale-y-100" />
                            </motion.a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                href="/#contact"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={springSoft}
                className="btn-primary ml-2 text-xs font-black uppercase tracking-[0.24em]"
              >
                Darmowa analiza
              </motion.a>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="relative z-50 inline-flex items-center justify-center border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobilePanel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/92 px-6 pt-28 pb-6 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="relative mx-auto flex h-full max-w-2xl flex-col overflow-hidden border border-white/10 bg-[#050505]/90"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#00FFD1]">Navigation</p>
                    <p className="mt-2 text-sm text-gray-400">Wybierz sekcję albo przejdź do jednego z narzędzi.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.route);
                    return (
                      <motion.a
                        key={link.name}
                        variants={navItemReveal}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center justify-between border px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                          active
                            ? 'border-[#00FFD1]/40 bg-[#00FFD1]/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight size={16} className="opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                      </motion.a>
                    );
                  })}
                </div>

                <motion.div variants={navItemReveal} className="mt-8 border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#00FFD1]">Darmowe narzędzia</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid gap-3">
                    {toolLinks.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <a
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex items-center gap-4 border border-white/10 bg-black/40 px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <div className={`flex h-10 w-10 items-center justify-center ${tool.tone}`}>
                            <Icon size={17} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-white">{tool.title}</div>
                            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">{tool.subtitle}</div>
                          </div>
                          <ArrowUpRight size={16} className="opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              <motion.div variants={navItemReveal} className="border-t border-white/10 p-5 sm:p-7">
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center text-sm font-black uppercase tracking-[0.24em]"
                >
                  Darmowa analiza
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="relative overflow-hidden border-t border-white/5 bg-black py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(880px,90vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FFD1]/70 to-transparent" />
        <div className="pointer-events-none absolute left-[8%] top-8 h-24 w-24 rounded-full bg-[#00FFD1]/8 blur-3xl" />
        <div className="pointer-events-none absolute right-[12%] bottom-6 h-32 w-32 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">© 2026 VisiLogo Agency. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
