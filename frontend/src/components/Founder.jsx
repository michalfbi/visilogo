import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowRight } from 'lucide-react';

const Founder = () => {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Tło ozdobne */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FFD1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Miejsce na zdjęcie / Awatar */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12"
          >
            <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto">
              {/* Ramka ozdobna */}
              <div className="absolute inset-0 border border-[#00FFD1]/30 translate-x-4 translate-y-4"></div>
              {/* Kontener na Twoje zdjęcie - na ten moment wstawiamy elegancki placeholder */}
              <div className="absolute inset-0 bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-700">
                <div className="w-24 h-24 mb-6 text-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <span className="text-gray-500 font-mono text-sm tracking-widest">[TU WSTAWISZ SWOJE ZDJĘCIE]</span>
              </div>
            </div>
          </motion.div>

          {/* Tekst / Manifest */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-[#00FFD1]"></span>
              Twój Partner w Biznesie
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Nie jesteśmy anonimową korporacją. <br />
              <span className="text-gray-500">Gramy w jednej drużynie.</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
              <p>
                Większość agencji traktuje swoich klientów jak kolejne pozycje w arkuszu kalkulacyjnym. Zrzucają pracę na stażystów i znikają po wystawieniu faktury. My działamy inaczej.
              </p>
              <p>
                Tworzymy VisiLogo z myślą o ambitnych przedsiębiorcach, którzy potrzebują nie tylko "ładnego obrazka", ale przede wszystkim doradcy. Osoby, która weźmie pełną odpowiedzialność za dowożenie klientów do ich biznesu. Twój wzrost to nasz wzrost.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-6 py-4 font-bold transition-colors"
              >
                <Linkedin size={20} />
                Poznajmy się na LinkedIn
              </a>
              <a href="#casestudies" className="flex items-center gap-2 text-white hover:text-[#00FFD1] font-bold uppercase tracking-widest text-sm transition-colors group">
                Zobacz nasze wyniki
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
