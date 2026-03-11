import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Usługi', path: '/#services' },
    { name: 'Proces', path: '/#process' },
    { name: 'Case Studies', path: '/#casestudies' },
    { name: 'Pakiety', path: '/#pricing' },
  ];

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#')) {
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-6' : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white z-50">
          Visi<span className="text-[#00FFD1]">Logo</span> <span className="text-xs font-normal text-gray-500 ml-2 uppercase tracking-widest hidden sm:inline">Agency</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
                key={link.name}
                href={link.path.substring(1)}
                className="text-sm font-medium text-gray-300 hover:text-[#00FFD1] transition-colors uppercase tracking-widest"
            >
                {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary text-xs uppercase tracking-widest px-6 py-3 h-auto"
          >
            Darmowa Analiza Biznesu
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-8 xl:hidden"
            >
              {navLinks.map((link) => (
                 <a
                    key={link.name}
                    href={link.path.substring(1)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-[#00FFD1]"
                 >
                    {link.name}
                 </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-[#00FFD1] text-xl font-bold mt-4"
              >
                Kontakt
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">
              Visi<span className="text-[#00FFD1]">Logo</span>
            </h2>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-6">
              Strategiczna agencja marketingowa wspierająca ambitnych przedsiębiorców B2B i firmy usługowe w cyfrowej transformacji.
            </p>
            <div className="text-sm text-gray-500">
                <p>Kompleksowe doradztwo i wdrażanie cyfrowych rozwiązań.</p>
                <p>100% focus na rentowności i generowaniu przychodów.</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Nawigacja</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-400 hover:text-[#00FFD1] transition-colors">Nasze Usługi</a></li>
              <li><a href="#process" className="text-gray-400 hover:text-[#00FFD1] transition-colors">Proces Działania</a></li>
              <li><a href="#casestudies" className="text-gray-400 hover:text-[#00FFD1] transition-colors">Wyniki i Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">kontakt@visilogo.com</li>
              <li className="text-gray-400">+48 536 837 946</li>
              <li className="text-gray-400">Kielce, Polska</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 VisiLogo Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-white text-sm">Polityka Prywatności</a>
            <a href="#" className="text-gray-600 hover:text-white text-sm">RODO / GDPR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00FFD1] selection:text-black font-sans">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
