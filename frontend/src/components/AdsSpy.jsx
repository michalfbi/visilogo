import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Crosshair, ArrowRight, ShieldAlert, Target, ExternalLink } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const AdsSpy = () => {
  const [competitor, setCompetitor] = useState('');
  const [searched, setSearched] = useState(false);
  const [spyLink, setSpyLink] = useState('');

  const handleSpy = (e) => {
    e.preventDefault();
    if (!competitor.trim()) return;

    const query = encodeURIComponent(competitor.trim());
    const link = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=PL&q=${query}&search_type=keyword_unordered&media_type=all`;
    
    setSpyLink(link);
    setSearched(true);

    // CICHY ZAPIS LEADA - Wiesz kogo podglądają!
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Szpieg Reklam",
        szpiegowana_firma: competitor.trim(),
        message: `Ktoś z Twojej strony podgląda reklamy firmy: "${competitor.trim()}". To idealny moment, by zaoferować im lepszą kampanię!`
      })
    }).catch(e => console.error("Webhook error", e));
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-red-500/20"
          >
            <Eye size={16} /> Wywiad Biznesowy B2B
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Szpieg Reklam <br/><span className="text-red-500">Konkurencji</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Chcesz wiedzieć, czy Twój największy rywal puszcza reklamy na Facebooku i Instagramie? Wpisz jego nazwę, a wprowadzimy Cię do ukrytej biblioteki reklam. Zobacz na własne oczy, jak kradną Twoich klientów.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Formularz Szpiegowania */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6 space-y-6"
          >
            <form onSubmit={handleSpy} className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full">
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Target size={16} className="text-red-500"/> Nazwa Twojego Rywala</label>
                <input 
                  type="text" 
                  placeholder="np. Nazwa Firmy Konkurencji" 
                  value={competitor}
                  onChange={(e) => setCompetitor(e.target.value)}
                  required
                  className="w-full bg-black border border-white/20 rounded-lg p-5 text-white focus:outline-none focus:border-red-500 transition-colors text-lg"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-lg transition-all text-lg bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                <Crosshair size={24} /> Przeskanuj Ich Reklamy
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500 font-mono uppercase">
                <ShieldAlert size={14} className="text-red-500" /> Analiza publicznych danych Meta Ads (W 100% legalne)
              </div>
            </form>
          </motion.div>

          {/* Podgląd i Haczyk */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <AnimatePresence>
              {!searched ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center border border-dashed border-white/20 rounded-2xl p-8 text-center text-gray-500"
                >
                  Wpisz nazwę konkurenta, aby wygenerować przepustkę do Biblioteki Reklam.
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  {/* Wynik */}
                  <div className="bg-white/5 border border-white/10 p-8 rounded-xl relative group">
                    <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-4">Twój Cel: {competitor}</div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      Baza została zlokalizowana. Kliknij poniższy przycisk, aby otworzyć nową kartę z pełnym zestawieniem aktywnych grafik i tekstów reklamowych tej firmy.
                    </p>
                    <a 
                      href={spyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 font-bold py-4 px-6 rounded-lg transition-all bg-white text-black hover:bg-gray-200"
                    >
                      Otwórz Bibliotekę Reklam <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* Haczyk Sprzedażowy */}
                  <div className="bg-[#0A0A0A] border border-red-500/30 p-8 rounded-2xl flex flex-col justify-center shadow-xl flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">Oni już tam są. A Ty?</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      Jeśli widzisz ich reklamy to znaczy, że wydają budżet, by codziennie wyświetlać się Twoim potencjalnym klientom. Nie oddawaj im rynku za darmo. <strong className="text-white">Skoro znamy już ich strategię, możemy zrobić to 10x lepiej.</strong>
                    </p>
                    <div className="space-y-4">
                      <a href="/#contact" className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-white transition-colors group text-sm">
                        Zamów lepszą kampanię dla swojej firmy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdsSpy;
