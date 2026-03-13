import React, { useState, useEffect } from 'react';
import { ChevronDown, Zap, Eye, Crosshair, QrCode, Calculator, Link2 } from 'lucide-react';

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          isScrolled ? 'py-4 bg-black/90 backdrop-blur-md border-b border-white/10' : 'py-10 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter">
              Visi<span className="text-[#00FFD1]">Logo</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] ml-2 font-bold hidden sm:block">Agency</span>
          </a>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="relative group py-4">
              <button className="text-xs font-bold tracking-[0.2em] text-[#00FFD1] hover:text-white transition-colors flex items-center gap-1">
                🔥 NARZĘDZIA (6) <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-72 bg-[#0A0A0A] border border-[#00FFD1]/20 rounded-xl shadow-[0_10px_40px_rgba(0,255,209,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden z-50">
                <div className="grid grid-cols-2">
                  <div className="border-r border-white/5">
                    <a href="/pojedynek" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 border-b border-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><Zap size={14} className="text-[#00FFD1]" /> Pojedynek</div>
                      <div className="text-[10px] text-gray-500 font-mono">Szybkość na tle rywali</div>
                    </a>
                    <a href="/szpieg-reklam" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 border-b border-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><Crosshair size={14} className="text-red-500" /> Szpieg Reklam</div>
                      <div className="text-[10px] text-gray-500 font-mono">Podglądaj konkurencję</div>
                    </a>
                    <a href="/skaner" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><Eye size={14} className="text-[#00FFD1]" /> Skaner Linków</div>
                      <div className="text-[10px] text-gray-500 font-mono">Wizerunek w sieci</div>
                    </a>
                  </div>
                  <div>
                    <a href="/kalkulator-kosztow" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 border-b border-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><Calculator size={14} className="text-blue-500" /> Kalkulator</div>
                      <div className="text-[10px] text-gray-500 font-mono">Etat vs Agencja</div>
                    </a>
                    <a href="/generator-utm" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 border-b border-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><Link2 size={14} className="text-orange-500" /> Generator UTM</div>
                      <div className="text-[10px] text-gray-500 font-mono">Linki dla analityki</div>
                    </a>
                    <a href="/generator-qr" className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-bold text-white"><QrCode size={14} className="text-[#00FFD1]" /> Generator QR</div>
                      <div className="text-[10px] text-gray-500 font-mono">Kody do druku</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href="/#contact" 
              className="px-6 py-3 bg-[#00FFD1] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-all rounded-sm"
            >
              Darmowa analiza
            </a>
          </div>
        </div>
      </nav>

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
