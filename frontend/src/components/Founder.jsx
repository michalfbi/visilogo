import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowRight } from 'lucide-react';

const Founder = () => {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FFD1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto group">
              <div className="absolute inset-0 border border-[#00FFD1]/30 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              {/* Usunięto klasy grayscale i hover:grayscale-0 */}
              <div className="relative bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center z-10">
                <img 
                  src="/michal.jpg" 
                  alt="Michał Pakuła - Założyciel VisiLogo" 
                  className="w-full h-auto object-contain shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{display: 'none'}} className="flex-col items-center py-20">
                   <div className="w-24 h-24 mb-6 text-white/10">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                   </div>
                   <span className="text-gray-500 font-mono text-sm tracking-widest text-center px-4">Wgraj plik michal.jpg do folderu public</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-[#00FFD1]"></span>
              Michał Pakuła — Założyciel VisiLogo
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
                Stworzyłem VisiLogo z myślą o ambitnych przedsiębiorcach, którzy potrzebują nie tylko "ładnego obrazka", ale przede wszystkim partnera biznesowego. Kogoś, kto weźmie pełną odpowiedzialność za dowożenie wyników i świetny wizerunek w internecie. Twój wzrost to nasz wzrost.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a 
                href="https://www.linkedin.com/in/micha%C5%82-paku%C5%82a-0b5b382b7/" 
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
