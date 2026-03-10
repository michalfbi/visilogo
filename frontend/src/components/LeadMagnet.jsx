import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, CheckCircle, Download, Loader2 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const LeadMagnet = () => {
  const [status, setStatus] = useState('idle');

  const benefits = [
    "Dlaczego 9/10 stron nie generuje zapytań (i jak to naprawić)",
    "Jak ominąć sekretariaty dzięki algorytmowi LinkedIn 360 Brew",
    "Psychologia koloru w TSL i Budownictwie (budowanie autorytetu)",
    "Błędy niszczące zaufanie decydentów (m.in. 'Promise Gap')",
    "Gotowy plan transformacji wizerunku na pierwsze 90 dni"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = {
      form_type: "Pobranie Raportu PDF",
      email: e.target.email.value
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="report" className="py-24 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFD1]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="lg:w-7/12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Bezpłatny Raport PDF (B2B)</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Transformacja B2B: Jak przełamać <br /> <span className="text-[#00FFD1]">impas konwersji w 2026?</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Pobierz nasz autorski raport strategiczny. Poznaj mechanizmy niewydolności dzisiejszych stron i dowiedz się, jak synergia wizerunku, analityki oraz Social Sellingu może zwiększyć Twoją sprzedaż o 150%.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <CheckCircle size={18} className="text-[#00FFD1] shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-6 rounded-xl"
                >
                  <h4 className="text-white font-bold text-lg mb-2">Dostęp Odblokowany!</h4>
                  <p className="text-gray-400 text-sm mb-6">Zapisaliśmy Twój e-mail. Możesz teraz bezpiecznie pobrać raport klikając w poniższy przycisk.</p>
                  <a href="/raport.pdf" target="_blank" rel="noreferrer" className="bg-[#00FFD1] text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all inline-flex items-center justify-center gap-2">
                    <Download size={20} /> Pobierz Raport PDF teraz
                  </a>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Twój e-mail służbowy" 
                    className="bg-black border border-white/10 px-6 py-4 text-white w-full focus:outline-none focus:border-[#00FFD1] transition-colors rounded-lg"
                    required
                    disabled={status === 'loading'}
                  />
                  <button type="submit" disabled={status === 'loading'} className="bg-[#00FFD1] text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 whitespace-nowrap text-lg disabled:opacity-70">
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Pobierz Raport <ArrowRight size={20} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:w-5/12 flex justify-center relative">
            <motion.div className="relative w-64 h-80 bg-gradient-to-br from-[#00FFD1] to-blue-600 rounded-xl shadow-[0_0_50px_rgba(0,255,209,0.15)] flex flex-col p-6 items-center text-center justify-between overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-black/10 transition-colors" />
              <FileText size={64} className="text-white relative z-10 mt-8" />
              <div className="relative z-10">
                <p className="text-white font-black text-xl mb-1">STRATEGIA 2026</p>
                <p className="text-white/70 text-[10px] tracking-widest uppercase font-mono">VisiLogo Intelligence</p>
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
