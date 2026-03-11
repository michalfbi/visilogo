import React, { useState, useEffect } from 'react';

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
    { name: 'USŁUGI', href: '#services' },
    { name: 'PROCES', href: '#process' },
    { name: 'CASE STUDIES', href: '#cases' },
    { name: 'PAKIETY', href: '#pricing' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00FFD1] selection:text-black">
      {/* Nawigacja */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 bg-black/90 backdrop-blur-md border-b border-white/10' : 'py-10 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter">
              Visi<span className="text-[#00FFD1]">Logo</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] ml-2 font-bold hidden sm:block">Agency</span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-3 bg-[#00FFD1] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-all rounded-sm"
            >
              Darmowa analiza biznesu
            </a>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Stopka */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2026 VisiLogo Agency. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
