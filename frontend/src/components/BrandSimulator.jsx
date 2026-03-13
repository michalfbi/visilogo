import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ArrowRight, Lock, Sparkles, Wand2, CheckCircle, Paintbrush } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const BrandSimulator = () => {
  const [formData, setFormData] = useState({
    companyName: 'Twoja Firma',
    slogan: 'Lider innowacji w sektorze B2B',
    email: ''
  });
  const [unlocked, setUnlocked] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Przymierzalnia Marki",
        email_klienta: formData.email,
        firma: formData.companyName,
        message: `Mocny Lead Designowy! Klient (${formData.email}) "przymierza" wizerunek dla firmy "${formData.companyName}". Jego obecna strona na pewno potrzebuje rebrandingu. Dzwoń i sprzedawaj projekt!`
      })
    }).catch(err => console.error("Webhook error", err));

    setUnlocked(true);
  };

  const themes = [
    {
      id: 'tech',
      title: 'Nowoczesna Technologia (Cyber)',
      bg: 'bg-zinc-950',
      text: 'text-white',
      accent: 'text-[#00FFD1]',
      border: 'border-[#00FFD1]/30',
      font: 'font-mono tracking-tight',
      button: 'bg-[#00FFD1] text-black',
      colors: ['#09090B', '#FFFFFF', '#00FFD1'],
      fontName: 'JetBrains Mono / Inter'
    },
    {
      id: 'premium',
      title: 'Zaufanie & Premium (Corporate)',
      bg: 'bg-[#0F172A]',
      text: 'text-[#F8FAFC]',
      accent: 'text-[#94A3B8]',
      border: 'border-slate-700',
      font: 'font-serif tracking-wide',
      button: 'bg-transparent border border-[#F8FAFC] text-[#F8FAFC]',
      colors: ['#0F172A', '#F8FAFC', '#94A3B8'],
      fontName: 'Playfair Display / Lora'
    },
    {
      id: 'industry',
      title: 'Siła & Przemysł (Industrial)',
      bg: 'bg-[#F3F4F6]',
      text: 'text-[#111827]',
      accent: 'text-[#EA580C]',
      border: 'border-gray-300',
      font: 'font-sans font-black uppercase',
      button: 'bg-[#EA580C] text-white rounded-none',
      colors: ['#F3F4F6', '#111827', '#EA580C'],
      fontName: 'Montserrat Bold'
    },
    {
      id: 'eco',
      title: 'Eko & Innowacja (Clean)',
      bg: 'bg-white',
      text: 'text-[#064E3B]',
      accent: 'text-[#10B981]',
      border: 'border-emerald-100',
      font: 'font-sans font-light',
      button: 'bg-[#10B981] text-white rounded-full shadow-lg shadow-emerald-500/20',
      colors: ['#FFFFFF', '#064E3B', '#10B981'],
      fontName: 'Outfit / Poppins'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-fuchsia-500/10 text-fuchsia-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-fuchsia-500/20"
          >
            <Sparkles size={16} /> Narzędzie Brandingowe
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Wirtualna Przymierzalnia <br/><span className="text-fuchsia-500">Marek B2B</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Zły wizerunek odstrasza klientów zanim zdążą przeczytać Twoją ofertę. Wpisz nazwę swojej firmy i sprawdź, jak wyglądałaby z designem wartym dziesiątki tysięcy złotych.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Formularz - Podstawowe dane */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl">
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Wand2 size={16} className="text-fuchsia-500"/> Nazwa Twojej Firmy</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" 
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Palette size={16} className="text-fuchsia-500"/> Krótkie hasło (Slogan)</label>
                <input 
                  type="text" 
                  name="slogan" 
                  value={formData.slogan} 
                  onChange={handleChange} 
                  className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" 
                />
              </div>
            </div>

            {/* Haczyk Sprzedażowy (pojawia się obok w kolumnie) */}
            <div className="bg-[#0A0A0A] border border-fuchsia-500/30 p-8 rounded-2xl flex flex-col justify-center shadow-xl">
              <div className="bg-fuchsia-500/10 w-12 h-12 rounded-full flex items-center justify-center text-fuchsia-500 mb-4">
                <Paintbrush size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Widzisz różnicę?</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Wizerunek to Twoja najcichsza sprzedaż. Jeśli Twój obecny design mówi "tanio", klienci nie zapłacą Ci stawek premium. <strong className="text-white">Zbudujmy markę, która sprzedaje od pierwszego wejrzenia.</strong>
              </p>
              <a href="/#contact" className="inline-flex items-center gap-2 text-fuchsia-400 font-bold hover:text-white transition-colors group text-sm border-b border-transparent hover:border-fuchsia-400 pb-1 w-fit">
                Zamów Rebranding / Stronę WWW <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Podgląd "Przymierzalni" */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8 flex flex-col gap-6 relative"
          >
            <div className="grid sm:grid-cols-2 gap-6 relative z-0">
              {themes.map((theme) => (
                <div key={theme.id} className={`${theme.bg} border ${theme.border} p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}>
                  <div className={`text-xs uppercase font-bold tracking-wider mb-8 opacity-50 ${theme.text}`}>{theme.title}</div>
                  
                  <div className={theme.font}>
                    <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>{formData.companyName || 'Twoja Firma'}</h3>
                    <p className={`text-sm mb-8 ${theme.accent}`}>{formData.slogan || 'Twój krótki slogan reklamowy'}</p>
                    <button className={`px-6 py-2.5 text-sm font-bold transition-transform ${theme.button}`}>
                      Nawiąż kontakt
                    </button>
                  </div>

                  {/* Zablokowane detale pod spodem */}
                  <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 relative">
                    {!unlocked && (
                      <div className="absolute inset-0 backdrop-blur-[6px] bg-black/5 z-10 flex items-center justify-center rounded-b-xl cursor-not-allowed">
                        <Lock size={20} className="text-gray-500" />
                      </div>
                    )}
                    <div className="flex justify-between items-center opacity-70">
                      <div className="flex gap-2">
                        {theme.colors.map((color, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border border-gray-500/30" style={{ backgroundColor: color }} title={color}></div>
                        ))}
                      </div>
                      <div className={`text-xs ${theme.text} font-mono`}>{theme.fontName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Formularz odblokowania */}
            <AnimatePresence>
              {!unlocked && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-[#0A0A0A]/95 backdrop-blur-xl border border-fuchsia-500/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20"
                >
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-white mb-1">Pobierz Specyfikację (Za darmo)</h4>
                    <p className="text-xs text-gray-400">Podaj e-mail, aby odblokować kody kolorów HEX i nazwy użytych fontów we wszystkich stylach.</p>
                  </div>
                  <form onSubmit={handleUnlock} className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Twój e-mail..." 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors text-sm"
                    />
                    <button type="submit" className="shrink-0 font-bold py-3 px-6 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-500 text-sm transition-colors flex items-center gap-2">
                      <Lock size={14} /> Odblokuj
                    </button>
                  </form>
                </motion.div>
              )}

              {unlocked && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl flex items-center justify-center gap-2 text-green-500 text-sm font-bold"
                >
                  <CheckCircle size={18} /> Pomyślnie odblokowano specyfikację dla programisty/grafika!
                </motion.div>
              )}
            </AnimatePresence>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandSimulator;
