import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Check, Zap, Target, TrendingUp, Layout, FileText, Palette, ArrowRight, Loader2, ShieldCheck, ShieldQuestion, AlertTriangle, Users, DollarSign } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

// Definicja Modułów i ich wpływu na metryki
const availableModules = [
  { id: 'logo', name: 'Nowoczesne Logo & Branding', desc: 'Buduje autorytet premium', type: 'trust', boostWinRate: 5, oneTime: 2900, monthly: 0, icon: Palette },
  { id: 'web', name: 'Strona WWW (Maszyna Leadów)', desc: 'Skuteczny UX i architektura perswazji', type: 'conversion', baseCR: 2.5, oneTime: 6500, monthly: 0, icon: Layout },
  { id: 'copy', name: 'Perswazyjny Copywriting B2B', desc: 'Zbijanie obiekcji i psychologia', type: 'conversion', boostCR: 1.5, oneTime: 2500, monthly: 0, icon: FileText },
  { id: 'google', name: 'Kampania Google Ads', desc: 'Ruch z wysoką intencją zakupową', type: 'traffic', traffic: 1200, oneTime: 1500, monthly: 3000, icon: Target },
  { id: 'meta', name: 'Kampania Meta Ads (Retargeting)', desc: 'Budowanie świadomości decydentów', type: 'traffic', traffic: 2500, oneTime: 1500, monthly: 2500, icon: Users },
  { id: 'seo', name: 'Strategia Content & SEO', desc: 'Skalowalny ruch organiczny z Google', type: 'traffic', traffic: 800, oneTime: 0, monthly: 3500, icon: TrendingUp },
];

const FunnelBuilder = () => {
  // Parametry biznesowe klienta
  const [aov, setAov] = useState(5000); // Average Order Value
  const [baseWinRate, setBaseWinRate] = useState(20); // Skuteczność sprzedaży handlowców w %

  const [selectedModules, setSelectedModules] = useState(['web', 'google']);
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  
  // Captcha
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

  // --- SILNIK SYMULACJI (ENGINE) ---
  const currentSelection = availableModules.filter(m => selectedModules.includes(m.id));
  
  // 1. Obliczanie Kosztów
  const totalOneTime = currentSelection.reduce((sum, m) => sum + m.oneTime, 0);
  const totalMonthly = currentSelection.reduce((sum, m) => sum + m.monthly, 0);

  // 2. Obliczanie Ruchu (Traffic) - zakładamy bazowy ruch 300 wizyt jeśli nie mają reklam
  const trafficModules = currentSelection.filter(m => m.type === 'traffic');
  const totalTraffic = 300 + trafficModules.reduce((sum, m) => sum + m.traffic, 0);

  // 3. Obliczanie Konwersji (CR - Conversion Rate)
  const hasWeb = selectedModules.includes('web');
  const hasCopy = selectedModules.includes('copy');
  let currentCR = hasWeb ? 2.5 : 0.5; // Stara strona = 0.5%, Nowa strona = 2.5%
  if (hasCopy) currentCR += 1.5; // Dobry copy podnosi CR o 1.5%
  
  // 4. Obliczanie Skuteczności Handlowej (Win Rate)
  const hasBranding = selectedModules.includes('logo');
  const finalWinRate = baseWinRate + (hasBranding ? 5 : 0); // Premium branding = łatwiejsze zamykanie o 5%

  // 5. Wyniki Lejka
  const estimatedLeads = Math.floor(totalTraffic * (currentCR / 100));
  const estimatedClients = Math.floor(estimatedLeads * (finalWinRate / 100));
  const estimatedRevenue = estimatedClients * aov;
  const estimatedROI = totalMonthly > 0 ? Math.round(((estimatedRevenue - totalMonthly) / totalMonthly) * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.honeypot && e.target.honeypot.value !== '') { setStatus('success'); return; }
    if (parseInt(captchaAnswer) !== num1 + num2) { setStatus('captcha_error'); return; }
    if (!formData.email.trim() || !formData.phone.trim()) { setStatus('error'); return; }

    setStatus('loading');
    
    const payload = {
      form_type: "Konfigurator Lejka 2.0 (Symulator)",
      form_location: "Podstrona Konfiguratora",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      koszyk_klienta: aov,
      win_rate: baseWinRate,
      wybrane_moduly: currentSelection.map(m => m.name).join(", "),
      inwestycja_start: totalOneTime,
      inwestycja_miesieczna: totalMonthly,
      prognoza_leadow: estimatedLeads,
      prognoza_przychodu: estimatedRevenue,
      message: `POTĘŻNY LEAD Z SYMULATORA! Klient wpisał, że zarabia średnio ${aov} PLN na kliencie i zamyka ${baseWinRate}% leadów. Zbudował system za ${totalOneTime} PLN na start + ${totalMonthly} PLN/mc, co daje mu szacunkowo ${estimatedRevenue} PLN przychodu. DZWOŃ NATYCHMIAST!`
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

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <Settings2 size={16} /> Interaktywny Symulator Biznesu
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Zbuduj Zyskowną <br/><span className="text-[#00FFD1]">Maszynę Sprzedażową</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Wpisz swoje parametry biznesowe i wyklikaj moduły marketingowe po lewej. System VisiLogo AI na żywo zasymuluje, ile zapytań i gotówki może wygenerować taka infrastruktura.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEWA STRONA - KONFIGURACJA */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Krok 1: Parametry Biznesu */}
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Twoje obecne liczby (Dane wejściowe)</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Średnia wartość klienta (Koszyk)</label>
                  <div className="relative">
                    <input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value) || 0)} className="w-full bg-black border border-white/20 rounded-lg p-4 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Skuteczność Domknięć (Win Rate)</label>
                  <div className="relative">
                    <input type="number" min="1" max="100" value={baseWinRate} onChange={(e) => setBaseWinRate(Number(e.target.value) || 0)} className="w-full bg-black border border-white/20 rounded-lg p-4 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Krok 2: Moduły */}
            <div className="bg-transparent">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Wybierz architekturę systemu</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {availableModules.map((module) => {
                  const isSelected = selectedModules.includes(module.id);
                  return (
                    <div 
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`cursor-pointer border p-6 rounded-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full ${isSelected ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.1)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}
                    >
                      {isSelected && <div className="absolute top-4 right-4 bg-[#00FFD1] text-black rounded-full p-1 shadow-lg"><Check size={14} strokeWidth={4} /></div>}
                      <module.icon size={28} className={`mb-4 transition-colors ${isSelected ? 'text-[#00FFD1]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <h4 className={`font-bold text-base mb-1 transition-colors ${isSelected ? 'text-white' : 'text-gray-300'}`}>{module.name}</h4>
                      <p className="text-gray-500 text-xs mb-6 leading-relaxed flex-grow">{module.desc}</p>
                      
                      <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center">
                        <div className="flex flex-col">
                           {module.oneTime > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Jednorazowo: {module.oneTime} PLN</span>}
                           {module.monthly > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Miesięcznie: {module.monthly} PLN</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Inteligentny Alert Braku Strony */}
              <AnimatePresence>
                {trafficModules.length > 0 && !hasWeb && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-4">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-orange-400 text-sm leading-relaxed">
                      <strong>Zagrożenie dla budżetu:</strong> Wybrałeś kampanie płatne (ruch), ale nie wybrałeś nowej Strony WWW. Jeśli skierujemy ten drogi ruch na Twoją obecną, nieprzebudowaną stronę, współczynnik konwersji wyniesie zaledwie {currentCR}%. Rozważ dodanie modułu "Strona WWW", aby zyskać premię z konwersji!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* PRAWA STRONA - KOKPIT SYMULACJI */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl sticky top-32 overflow-hidden flex flex-col">
              
              <div className="bg-gradient-to-b from-white/5 to-transparent p-6 md:p-8 border-b border-white/10">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><Activity size={20} className="text-[#00FFD1]"/> Symulacja Lejka na Żywo</h3>
                
                {/* Oś lejka */}
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.2rem] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:to-emerald-600">
                  
                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00FFD1] border-4 border-black" />
                    <div><div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Potencjalny Ruch (R/M)</div><div className="text-xl font-bold text-white">{totalTraffic.toLocaleString('pl-PL')}</div></div>
                  </div>

                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00FFD1] border-4 border-black" />
                    <div><div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Wygenerowane Leady ({currentCR}%)</div><div className="text-2xl font-black text-[#00FFD1]">{estimatedLeads} <span className="font-normal text-sm text-gray-500">/miesiąc</span></div></div>
                  </div>

                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black" />
                    <div><div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Zamknięta Sprzedaż ({finalWinRate}%)</div><div className="text-2xl font-black text-emerald-400">{estimatedClients} <span className="font-normal text-sm text-gray-500">nowych umów</span></div></div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/50 p-6 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col">
                  <div className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><DollarSign size={14}/> Estymowany Przychód Miesięczny</div>
                  <div className="text-4xl md:text-5xl font-black text-white">{estimatedRevenue.toLocaleString('pl-PL')} <span className="text-xl text-emerald-500 font-mono">PLN</span></div>
                  {estimatedROI > 0 && <div className="mt-3 text-sm text-emerald-400 font-mono">Prognozowany zwrot (ROI): {estimatedROI}%</div>}
                </div>

                <div className="mt-6 flex justify-between gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Wycena: Start</div>
                    <div className="text-white font-mono text-lg">{totalOneTime.toLocaleString('pl-PL')} PLN</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Wycena: Abonament</div>
                    <div className="text-white font-mono text-lg">{totalMonthly.toLocaleString('pl-PL')} PLN/mc</div>
                  </div>
                </div>
              </div>

              {/* Formularz Zapisywania */}
              <div className="p-6 md:p-8 bg-black flex-grow">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><Check size={32} /></div>
                      <h4 className="text-xl font-bold text-white mb-2">Projekt Przesłany!</h4>
                      <p className="text-gray-400 text-sm">Otrzymaliśmy architekturę Twojego lejka. Zadzwonimy w ciągu 24h, aby potwierdzić te wyliczenia i ułożyć plan działania.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {status === 'error' && <div className="text-red-500 text-sm">Uzupełnij poprawnie dane kontaktowe.</div>}
                      {status === 'captcha_error' && <div className="text-orange-400 text-sm">Błędny wynik działania matematycznego.</div>}
                      
                      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                      <div>
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Twój e-mail służbowy" disabled={status === 'loading'} />
                      </div>
                      
                      <div>
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Twój numer telefonu" disabled={status === 'loading'} />
                      </div>

                      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <ShieldQuestion className="text-[#00FFD1]" size={16} />
                          <label className="text-xs font-bold text-gray-300">Weryfikacja: {num1} + {num2} = ?</label>
                        </div>
                        <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-16 bg-black border border-white/20 p-2 text-center text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                      </div>

                      <button type="submit" disabled={status === 'loading' || selectedModules.length === 0} className="w-full mt-4 bg-[#00FFD1] text-black font-bold text-lg py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Omów wdrożenie na Callu <ArrowRight size={20} /></>}
                      </button>
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
