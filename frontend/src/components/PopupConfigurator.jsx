import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Calculator, ArrowRight, Tag } from 'lucide-react';

const PopupConfigurator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Sprawdzamy, czy użytkownik nie jest już na stronach związanych z�zamówieniem/konfiguratorem
    const hiddenPaths = ['/skonfiguruj-projekt', '/kreator-www', '/zamowienie'];
    const isHiddenPath = hiddenPaths.some(path => location.pathname.includes(path));

    if (isHiddenPath) {
      setIsOpen(false);
      return;
    }

    // Sprawdzamy, czy pop-up nie został już zamknięty w�tej sesji
    const hasSeenPopup = sessionStorage.getItem('visilogo_configurator_popup');
    if (hasSeenPopup) return;

    // Opóźnienie wysunięcia się pop-upa (np. 8 sekund po wejściu na stronę)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [location]);

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
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-2rem)] sm:w-[380px]"
        >
          <div className="bg-[#0A0A0A] border border-[#00FFD1]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            {/* Tło i�blask */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FFD1]/10 rounded-full blur-[40px] pointer-events-none" />
            
            {/* Przycisk zamknięcia */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>

            <div className="p-6">
              <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-full flex items-center justify-center text-[#00FFD1] mb-4">
                <Calculator size={20} />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                Zbuduj własny pakiet usług
              </h3>
              
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Skorzystaj z�naszego kreatora a'la carte. Dobierz technologie i�usługi marketingowe, aby zyskać nawet <strong className="text-[#00FFD1]">20% rabatu</strong> na start.
              </p>

              <Link 
                to="/skonfiguruj-projekt" 
                onClick={handleClickThrough}
                className="w-full flex items-center justify-center gap-2 bg-[#00FFD1] text-black font-bold py-3 rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,209,0.2)] group"
              >
                Przejdź do kreatora
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Pasek u dołu */}
            <div className="bg-white/5 px-6 py-2 border-t border-white/10 flex items-center gap-2">
              <Tag size={12} className="text-[#00FFD1]" />
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Wycena online w�2 minuty</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupConfigurator;