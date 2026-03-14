import React, { useState, useEffect } from 'react';
import { ChevronDown, Zap, Eye, Crosshair, QrCode, Bot, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'USŁUGI', href: '/#services' },
    { name: 'PROCES', href: '/#process' },
    { name: 'CASE STUDIES', href: '/#cases' },
    { name: 'PAKIETY', href: '/#pricing' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00FFD1] selection:text-black">
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? 'py-4 bg-black/90 backdrop-blur-md border-b border-white/10' : 'py-10 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 z-50 relative">
            <span className="text-2xl font-black tracking-tighter">
              Visi<span className="text-[#00FFD1]">Logo</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] ml-2 font-bold hidden sm:block">Agency</span>
          </a>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}

            <div className="relative group py-4">
              <button className="text-xs font-bold tracking-[0.2em] text-[#00FFD1] hover:text-white transition-colors flex items-center gap-1">
                🔥 NARZĘDZIA <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-64 bg-[#0A0A0A] border border-[#00FFD1]/20 rounded-xl shadow-[0_10px_40px_rgba(0,255,209,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <a href="/pojedynek" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                  <div className="bg-[#00FFD1]/10 p-2 rounded-lg text-[#00FFD1]"><Zap size={18} /></div>
                  <div><div className="text-sm font-bold text-white">Pojedynek Stron</div><div className="text-[10px] text-gray-500 font-mono mt-0.5">Szybkość na tle rywali</div></div>
                </a>
                <a href="/szpieg-reklam" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                  <div className="bg-red-500/10 p-2 rounded-lg text-red-500"><Crosshair size={18} /></div>
                  <div><div className="text-sm font-bold text-white">Szpieg Reklam</div><div className="text-[10px] text-gray-500 font-mono mt-0.5">Podglądaj konkurencję</div></div>
                </a>
                <a href="/skaner" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                  <div className="bg-[#00FFD1]/10 p-2 rounded-lg text-[#00FFD1]"><Eye size={18} /></div>
                  <div><div className="text-sm font-bold text-white">Skaner Linków</div><div className="text-[10px] text-gray-500 font-mono mt-0.5">Wizerunek w sieci</div></div>
                </a>
                <a href="/baza-promptow" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Bot size={18} /></div>
                  <div><div className="text-sm font-bold text-white">Baza Promptów AI</div><div className="text-[10px] text-gray-500 font-mono mt-0.5">Lepsze teksty B2B</div></div>
                </a>
                <a href="/generator-qr" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                  <div className="bg-[#00FFD1]/10 p-2 rounded-lg text-[#00FFD1]"><QrCode size={18} /></div>
                  <div><div className="text-sm font-bold text-white">Generator QR</div><div className="text-[10px] text-gray-500 font-mono mt-0.5">Darmowe kody do druku</div></div>
                </a>
              </div>
            </div>

            <a href="/#contact" className="px-6 py-3 bg-[#00FFD1] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-all rounded-sm">
              Darmowa analiza
            </a>
          </div>

          <button className="lg:hidden text-white z-50 p-2 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-black pt-24 px-6 pb-6 flex flex-col overflow-y-auto lg:hidden">
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold tracking-[0.2em] text-white border-b border-white/10 pb-4">
                  {link.name}
                </a>
              ))}
              
              <div className="mt-2">
                <span className="text-[#00FFD1] text-xs font-bold tracking-[0.2em] mb-4 block">🔥 DARMOWE NARZĘDZIA</span>
                <div className="grid grid-cols-1 gap-3">
                  <a href="/pojedynek" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3"><Zap size={18} className="text-[#00FFD1]"/> Pojedynek Stron</a>
                  <a href="/szpieg-reklam" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3"><Crosshair size={18} className="text-red-500"/> Szpieg Reklam</a>
                  <a href="/skaner" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3"><Eye size={18} className="text-[#00FFD1]"/> Skaner Linków</a>
                  <a href="/baza-promptow" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3"><Bot size={18} className="text-blue-500"/> Baza Promptów AI</a>
                  <a href="/generator-qr" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3"><QrCode size={18} className="text-[#00FFD1]"/> Generator QR</a>
                </div>
              </div>

              <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 text-center w-full py-4 bg-[#00FFD1] text-black text-sm font-black tracking-widest uppercase rounded-sm">
                Darmowa analiza
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2026 VisiLogo Agency. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
