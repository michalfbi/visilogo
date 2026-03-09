import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';

const LeadMagnet = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-[#050505] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          {/* Dekoracja tła */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFD1]/10 blur-[100px] rounded-full" />
          
          <div className="lg:w-7/12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Bezpłatna Wiedza B2B</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Dlaczego 9/10 stron firmowych <br /> <span className="text-[#00FFD1]">nie pozyskuje klientów?</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Pobierz nasz autorski raport o marketingu B2B w 2026 roku. Dowiedz się, jak transformacja wizerunku i odpowiednia analityka mogą zwiększyć Twoją sprzedaż o 150%.
            </p>

            <ul className="space-y-4 mb-10">
              {['Błędy, które niszczą zaufanie decydentów', 'Jak ominąć "Gatekeeperów" przez Social Selling', 'Psychologia kolorów w branży TSL i Budowlanej'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle size={18} className="text-[#00FFD1]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Twój e-mail służbowy" 
                className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg text-white w-full focus:outline-none focus:border-[#00FFD1] transition-colors"
              />
              <button className="bg-[#00FFD1] text-black font-bold px-8 py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                Pobierz Raport PDF
                <ArrowRight size={20} />
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-4">Szanujemy Twoją prywatność. Zero spamu, tylko konkretna wiedza B2B.</p>
          </div>

          <div className="lg:w-5/12 flex justify-center relative">
            <motion.div 
              initial={{ rotate: -5, y: 20 }}
              whileInView={{ rotate: 0, y: 0 }}
              className="relative w-64 h-80 bg-gradient-to-br from-[#00FFD1] to-blue-600 rounded-xl shadow-2xl flex flex-col p-6 items-center text-center justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
              <FileText size={64} className="text-white relative z-10 mt-8" />
              <div className="relative z-10">
                <p className="text-white font-black text-xl mb-1">STRATEGIA 2026</p>
                <p className="text-white/70 text-[10px] tracking-widest uppercase">VisiLogo Intelligence</p>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full relative z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
