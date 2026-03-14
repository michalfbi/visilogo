import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Check, Zap, Target, TrendingUp, Layout, FileText, Palette, ArrowRight, Loader2, ShieldCheck, ShieldQuestion } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const availableModules = [
  { id: 'logo', name: 'Nowoczesne Logo & Księga Znaku', desc: 'Fundament wizerunku premium', oneTime: 2500, monthly: 0, leads: 0, icon: Palette },
  { id: 'web', name: 'Strona WWW (Maszyna Konwersji)', desc: 'Szybka, zoptymalizowana pod sprzedaż B2B', oneTime: 6500, monthly: 0, leads: 15, icon: Layout },
  { id: 'copy', name: 'Perswazyjny Copywriting', desc: 'Teksty, które rozwiązują obiekcje klienta', oneTime: 2000, monthly: 0, leads: 10, icon: FileText },
  { id: 'google', name: 'Kampania Google Ads', desc: 'Precyzyjne docieranie do szukających', oneTime: 1500, monthly: 2500, leads: 40, icon: SearchIcon },
  { id: 'meta', name: 'Kampania Meta Ads (FB/IG)', desc: 'Agresywny retargeting i budowa świadomości', oneTime: 1500, monthly: 2000, leads: 45, icon: Target },
  { id: 'seo', name: 'Strategia SEO & Content', desc: 'Budowa długoterminowego darmowego ruchu', oneTime: 0, monthly: 3000, leads: 30, icon: TrendingUp },
];

function SearchIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
}

const FunnelBuilder = () => {
  const [selectedModules, setSelectedModules] = useState(['web', 'google']); // Domyślnie zaznaczone
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  const toggleModule = (id) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const currentSelection = availableModules.filter(m => selectedModules.includes(m.id));
  const totalOneTime = currentSelection.reduce((sum, m) => sum + m.oneTime, 0);
  const totalMonthly = currentSelection.reduce((sum, m) => sum + m.monthly, 0);
  const totalLeads = currentSelection.reduce((sum, m) => sum + m.leads, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.honeypot && e.target.honeypot.value !== '') {
      setStatus('success');
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setStatus('captcha_error');
      return;
    }

    if (!formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    const payload = {
      form_type: "Konfigurator Lejka",
      form_location: "Podstrona Konfiguratora",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      wybrane_moduly: currentSelection.map(m => m.name).join(", "),
      inwestycja_start: totalOneTime,
      inwestycja_miesieczna: totalMonthly,
      prognoza_leadow: totalLeads,
      message: `BINGO! Klient wyklikał własny lejek z prognozą ${totalLeads} leadów/mc. Inwestycja startowa: ${totalOneTime} PLN, Miesięcznie: ${totalMonthly} PLN.`
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <Settings2 size={16} /> Interaktywny Kreator
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Zbuduj Własną <span className="text-[#00FFD1]">Maszynę Sprzedażową</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Kliknij w bloki poniżej, aby złożyć system dopasowany do Twojej firmy. Sztuczna inteligencja na żywo obliczy estymowane koszty oraz prognozę zapytań (leadów).
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Lewa strona - Wybór modułów */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-6">Wybierz komponenty systemu:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {availableModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <div 
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`cursor-pointer border p-6 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.15)]' 
                        : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-[#00FFD1] text-black rounded-full p-1 shadow-lg">
                        <Check size={14} strokeWidth={4} />
                      </div>
                    )}
                    <module.icon size={28} className={`mb-4 transition-colors ${isSelected ? 'text-[#00FFD1]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                    <h4 className={`font-bold text-lg mb-1 transition-colors ${isSelected ? 'text-white' : 'text-gray-300'}`}>{module.name}</h4>
                    <p className="text-gray-500 text-xs mb-4">{module.desc}</p>
                    <div className={`text-sm font-mono font-bold ${isSelected ? 'text-[#00FFD1]' : 'text-gray-600'}`}>
                      {module.oneTime > 0 && `+${module.oneTime} PLN start`}
                      {module.oneTime > 0 && module.monthly > 0 && ` | `}
                      {module.monthly > 0 && `+${module.monthly} PLN/mc`}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Prawa strona - Podsumowanie i Formularz */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl sticky top-32 overflow-hidden flex flex-col">
              
              {/* Górny panel z wynikami */}
              <div className="p-8 bg-gradient-to-b from-white/5 to-transparent border-b border-white/10">
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Symulacja Twojego Lejka</h3>
                
                <div className="flex items-end gap-4 mb-6">
                  <div className="flex-grow bg-black border border-white/10 p-4 rounded-xl">
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Inwestycja Startowa</div>
                    <div className="text-2xl font-bold text-white">{totalOneTime.toLocaleString('pl-PL')} <span className="text-sm text-gray-500 font-normal">PLN</span></div>
                  </div>
                  <div className="flex-grow bg-black border border-white/10 p-4 rounded-xl">
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Budżet Miesięczny</div>
                    <div className="text-2xl font-bold text-white">{totalMonthly.toLocaleString('pl-PL')} <span className="text-sm text-gray-500 font-normal">PLN</span></div>
                  </div>
                </div>

                <div className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-[#00FFD1] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Zap size={14}/> Prognoza Wyników</div>
                    <div className="text-sm text-gray-300">Szacowany wzrost zapytań B2B</div>
                  </div>
                  <div className="text-4xl font-black text-[#00FFD1]">+{totalLeads}</div>
                </div>
              </div>

              {/* Dolny panel z formularzem */}
              <div className="p-8 bg-black flex-grow">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]">
                        <Check size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Konfiguracja Zapisana!</h4>
                      <p className="text-gray-400 text-sm">Otrzymaliśmy Twój projekt lejka. Przeanalizujemy go i zadzwonimy w ciągu 24h z konkretnym planem działania.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {status === 'error' && <div className="text-red-500 text-sm mb-4">Uzupełnij poprawnie dane kontaktowe.</div>}
                      {status === 'captcha_error' && <div className="text-orange-400 text-sm mb-4">Błędny wynik działania matematycznego.</div>}
                      
                      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2 block">Email Służbowy *</label>
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors" placeholder="jan@twojafirma.pl" disabled={status === 'loading'} />
                      </div>
                      
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2 block">Numer Telefonu *</label>
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors" placeholder="+48 000 000 000" disabled={status === 'loading'} />
                      </div>

                      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <ShieldQuestion className="text-[#00FFD1]" size={16} />
                          <label className="text-xs font-bold text-gray-300">Zabezpieczenie: {num1} + {num2} = ?</label>
                        </div>
                        <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-16 bg-black border border-white/20 p-2 text-center text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                      </div>

                      <button type="submit" disabled={status === 'loading' || selectedModules.length === 0} className="w-full mt-6 bg-[#00FFD1] text-black font-bold text-lg py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Omów ten projekt <ArrowRight size={20} /></>}
                      </button>
                      <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest">
                        <ShieldCheck size={12} className="text-[#00FFD1]" /> Zabezpieczone połączenie SSL
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilder;
