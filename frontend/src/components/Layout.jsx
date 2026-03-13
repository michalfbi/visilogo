import React, { useState, useEffect } from 'react';
import { ChevronDown, Zap, Eye } from 'lucide-react';

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

            {/* Rozwijane menu NARZĘDZIA */}
            <div className="relative group py-4">
              <button className="text-xs font-bold tracking-[0.2em] text-[#00FFD1] hover:text-white transition-colors flex items-center gap-1">
                🔥 NARZĘDZIA <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Content */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-60 bg-[#0A0A0A] border border-[#00FFD1]/20 rounded-xl shadow-[0_10px_40px_rgba(0,255,209,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <a href="/pojedynek" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                  <div className="bg-[#00FFD1]/10 p-2 rounded-lg text-[#00FFD1]">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Pojedynek</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">Szybkość i SEO</div>
                  </div>
                </a>
                <a href="/skaner" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                  <div className="bg-[#00FFD1]/10 p-2 rounded-lg text-[#00FFD1]">
                    <Eye size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Skaner Linków</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">Wizerunek B2B</div>
                  </div>
                </a>
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
