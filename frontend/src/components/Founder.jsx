import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowRight } from 'lucide-react';

const Founder = () => {
  return (
    <section className="relative pt-60 pb-32 bg-black overflow-hidden">
      {/* Duży napis w tle - jeszcze niżej, by nie kolidował z nagłówkiem */}
      <div className="absolute top-32 left-0 w-full text-center pointer-events-none z-0 opacity-10 select-none">
        <h2 className="text-[18vw] font-black text-[#00FFD1] leading-none tracking-tighter">
          VISILOGO
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Zdjęcie - usunięto grayscale i dodano object-top */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] max-w-md mx-auto">
              <img 
                src="/michal.jpg" 
                alt="Michał Pakuła - Założyciel VisiLogo" 
                className="w-full h-full object-cover object-top transition-all duration-700"
              />
            </div>
            {/* Dekoracyjna ramka pod zdjęciem */}
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#00FFD1]/20 rounded-2xl z-0" />
          </motion.div>

          {/* Treść */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#00FFD1]"></span>
              <span className="text-[#00FFD1] uppercase tracking-[0.2em] text-sm font-bold">Michał Pakuła — Założyciel VisiLogo</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Nie jesteśmy anonimową korporacją. <br />
              <span className="text-gray-500 font-medium italic">Gramy w jednej drużynie.</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-400 leading-relaxed mb-10">
              <p>
                Większość agencji traktuje swoich klientów jak kolejne pozycje w arkuszu kalkulacyjnym. Zrzucają pracę na stażystów i znikają po wystawieniu faktury. My działamy inaczej.
              </p>
              <p>
                Stworzyłem VisiLogo z myślą o ambitnych przedsiębiorcach, którzy potrzebują nie tylko "ładnego obrazka", ale przede wszystkim partnera biznesowego. Kogoś, kto weźmie pełną odpowiedzialność za dowożenie wyników i świetny wizerunek w internecie. Twój wzrost to nasz wzrost.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <a 
                href="https://www.linkedin.com/in/michał-pakuła-0b5b382b7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-[#0077B5] text-white font-bold rounded-lg hover:bg-[#0077B5]/80 transition-all"
              >
                <Linkedin size={20} />
                Poznajmy się na LinkedIn
              </a>
              <button className="flex items-center gap-2 text-white font-bold hover:text-[#00FFD1] transition-colors group">
                ZOBACZ NASZE WYNIKI
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
