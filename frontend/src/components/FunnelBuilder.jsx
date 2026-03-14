import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Check, Zap, Target, TrendingUp, Layout, FileText, Palette, ArrowRight, Loader2, ShieldCheck, ShieldQuestion, AlertTriangle, Users, DollarSign, Activity, Search, Info, Briefcase, PhoneCall, Building2 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

// Definicja Modułów
const availableModules = [
  { id: 'logo', name: 'Nowoczesne Logo & Branding', desc: 'Buduje autorytet. Zwiększa odsetek domykanych umów o 20% (względem bazy).', oneTime: 2900, monthly: 0, icon: Palette },
  { id: 'web', name: 'Strona WWW (Maszyna Leadów)', desc: 'Skuteczny UX podnosi bazową konwersję strony 3-krotnie.', oneTime: 6500, monthly: 0, icon: Layout },
  { id: 'copy', name: 'Perswazyjny Copywriting B2B', desc: 'Zbijanie obiekcji. Dodaje solidne wzrosty do współczynnika konwersji.', oneTime: 2500, monthly: 0, icon: FileText },
  { id: 'google', name: 'Kampania Google Ads', desc: 'Ruch z intencją. (1500 zł obsługa + 1500 zł na kliknięcia).', adSpend: 1500, oneTime: 1500, monthly: 3000, icon: Search },
  { id: 'meta', name: 'Kampania Meta Ads', desc: 'Retargeting i świadomość. (1500 zł obsługa + 1000 zł kliknięcia).', adSpend: 1000, oneTime: 1500, monthly: 2500, icon: Target },
  { id: 'seo', name: 'Strategia Content & SEO', desc: 'Skalowalny ruch organiczny z Google bez płacenia za klik.', organicBoost: 300, oneTime: 0, monthly: 2500, icon: TrendingUp },
];

const FunnelBuilder = () => {
  // Nowe, szczegółowe dane od klienta
  const [aov, setAov] = useState(15000); 
  const [audience, setAudience] = useState('smb');
  const [salesMethod, setSalesMethod] = useState('video');
  const [currentSource, setCurrentSource] = useState('referral');

  const [selectedModules, setSelectedModules] = useState(['web', 'google']);
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
    setSelectedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  // --- ZAAWANSOWANY SILNIK MATEMATYCZNY ---
  
  // 1. Ustalanie profilu klienta docelowego (Wpływa na CPC i trudność sprzedaży)
  let cpcMultiplier = 1;
  let baseWinRate = 10;
  if (audience === 'micro') { cpcMultiplier = 3.5; baseWinRate = 20; } // Łatwiej zamknąć, tanie kliki
  if (audience === 'smb') { cpcMultiplier = 7.0; baseWinRate = 12; } // Średnio
  if (audience === 'enterprise') { cpcMultiplier = 16.0; baseWinRate = 4; } // Trudno zamknąć, drogie kliki (korpo)

  // 2. Wpływ metody sprzedaży
  if (salesMethod === 'live') baseWinRate += 5;
  if (salesMethod === 'video') baseWinRate += 2;
  if (salesMethod === 'phone') baseWinRate -= 3; // Sprzedaż "na zimno" przez telefon ucieka

  // 3. Bazowe zaufanie / Konwersja (CR)
  let baseCR = 0.3; // Domyślnie słabo
  if (currentSource === 'start') baseCR = 0.1; // Nikt ich nie zna
  if (currentSource === 'referral') baseCR = 0.5; // Mają szczątkowe polecenia

  const currentSelection = availableModules.filter(m => selectedModules.includes(m.id));
  const hasWeb = selectedModules.includes('web');
  const trafficModules = currentSelection.filter(m => m.id === 'google' || m.id === 'meta' || m.id === 'seo');
  
  const totalOneTime = currentSelection.reduce((sum, m) => sum + m.oneTime, 0);
  const totalMonthly = currentSelection.reduce((sum, m) => sum + m.monthly, 0);

  // Wyliczenie Ruchu
  let totalTraffic = currentSource === 'referral' ? 80 : 30; 
  currentSelection.forEach(m => {
    if (m.adSpend) totalTraffic += Math.floor(m.adSpend / cpcMultiplier); // CPC zależy od wybranej grupy docelowej!
    if (m.organicBoost) totalTraffic += m.organicBoost;
  });

  // Wyliczenie finalnej konwersji
  let currentCR = baseCR;
  if (selectedModules.includes('web')) currentCR += 1.0;
  if (selectedModules.includes('copy')) currentCR += 0.5;

  // Skuteczność Zamknięć (Win Rate)
  let finalWinRate = baseWinRate;
  if (selectedModules.includes('logo')) finalWinRate = baseWinRate * 1.2; // +20% skuteczności dzięki marce premium

  // Wyniki
  const leads = totalTraffic * (currentCR / 100);
  const clients = leads * (finalWinRate / 100);
  const revenue = clients * aov;
  const roi = totalMonthly > 0 ? ((revenue - totalMonthly) / totalMonthly) * 100 : (revenue > 0 ? 100 : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.honeypot && e.target.honeypot.value !== '') { setStatus('success'); return; }
    if (parseInt(captchaAnswer) !== num1 + num2) { setStatus('captcha_error'); return; }
    if (!formData.email.trim() || !formData.phone.trim()) { setStatus('error'); return; }

    setStatus('loading');
    
    const payload = {
      form_type: "Kalkulator B2B (Złożony Wywiad)",
      form_location: "Podstrona Konfiguratora",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      koszyk_klienta: aov,
      target_grupa: audience,
      metoda_sprzedazy: salesMethod,
      obecne_zrodlo: currentSource,
      win_rate_obliczony: baseWinRate,
      cpc_obliczone: cpcMultiplier,
      wybrane_moduly: currentSelection.map(m => m.name).join(", "),
      inwestycja_start: totalOneTime,
      inwestycja_miesieczna: totalMonthly,
      prognoza_leadow: leads.toFixed(1),
      prognoza_klientow: clients.toFixed(1),
      prognoza_przychodu: Math.round(revenue),
      message: `POTĘŻNY WYWIAD BIZNESOWY! \nKlient celuje w ${audience}, sprzedaje przez ${salesMethod} (Koszyk: ${aov} PLN). Obliczony WinRate: ${baseWinRate}%. \n\nWybrany pakiet za ${totalOneTime} PLN jednorazowo + ${totalMonthly} PLN miesięcznie. \nPrognoza: ${Math.round(revenue)} PLN przychodu.`
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
            <Settings2 size={16} /> Business Intelligence Tool
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Symulator Modelu <span className="text-[#00FFD1]">Sprzedaży</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Algorytm dopasuje koszty kliknięć i realia konwersji dokładnie do Twojej specyfiki. Wypełnij wywiad biznesowy, a system w czasie rzeczywistym zbuduje dla Ciebie lejki przychodowe.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEWA STRONA - KONFIGURACJA */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 flex flex-col gap-8">
            
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Wywiad Strategiczny</h3>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><DollarSign size={14}/> Średni zysk z 1 klienta</label>
                  <div className="relative">
                    <input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value) || 0)} className="w-full bg-black border border-white/20 rounded-lg p-3 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">PLN</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Building2 size={14}/> Kto jest klientem docelowym?</label>
                  <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#00FFD1] transition-colors appearance-none cursor-pointer">
                    <option value="micro">Lokalne firmy i Mikrobiznesy</option>
                    <option value="smb">Średnie Firmy (B2B MŚP)</option>
                    <option value="enterprise">Korporacje / Duży Biznes</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><PhoneCall size={14}/> Główna metoda sprzedaży</label>
                  <select value={salesMethod} onChange={(e) => setSalesMethod(e.target.value)} className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#00FFD1] transition-colors appearance-none cursor-pointer">
                    <option value="live">Spotkania na żywo (Teren)</option>
                    <option value="video">Rozmowy Wideo (Zoom/Teams)</option>
                    <option value="phone">Tylko Telefon / Mail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase size={14}/> Obecne źródło klientów</label>
                  <select value={currentSource} onChange={(e) => setCurrentSource(e.target.value)} className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#00FFD1] transition-colors appearance-none cursor-pointer">
                    <option value="referral">Głównie z poleceń (Word of mouth)</option>
                    <option value="old_site">Mamy starą stronę, mało zapytań</option>
                    <option value="start">Dopiero zaczynamy działania</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-transparent">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Wybierz architekturę systemu</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {availableModules.map((module) => {
                  const isSelected = selectedModules.includes(module.id);
                  return (
                    <div 
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`cursor-pointer border p-5 rounded-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full ${isSelected ? 'bg-[#00FFD1]/5 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.1)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}
                    >
                      {isSelected && <div className="absolute top-4 right-4 text-[#00FFD1]"><Check size={20} strokeWidth={3} /></div>}
                      <module.icon size={24} className={`mb-3 transition-colors ${isSelected ? 'text-[#00FFD1]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <h4 className={`font-bold text-sm mb-1 transition-colors pr-6 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{module.name}</h4>
                      <p className="text-gray-500 text-xs mb-4 leading-relaxed flex-grow pr-2">{module.desc}</p>
                      
                      <div className="mt-auto border-t border-white/10 pt-3 flex flex-col gap-1">
                           {module.oneTime > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Start: {module.oneTime} PLN</span>}
                           {module.monthly > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Abonament: {module.monthly} PLN/mc</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {trafficModules.length > 0 && !hasWeb && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-4">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-orange-400 text-xs leading-relaxed">
                      <strong>Zagrożenie dla budżetu:</strong> Wybrałeś płatny ruch, ale pominąłeś nową stronę. Konwersja starych witryn to zazwyczaj ok. {currentCR}%. Oznacza to, że ze 100 kliknięć zdobędziesz blisko 0 zapytań. Dodaj "Stronę WWW", aby odblokować premię UX do konwersji i nie przepalać budżetu.
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
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><Activity size={20} className="text-[#00FFD1]"/> Inteligentna Kalkulacja</h3>
                
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.2rem] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:to-emerald-600">
                  
                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00FFD1] border-4 border-black" />
                    <div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center justify-between">
                        Ruch Miesięczny 
                      </div>
                      <div className="text-xl font-bold text-white">{totalTraffic.toLocaleString('pl-PL')} <span className="text-xs font-normal text-gray-500">wizyt</span></div>
                      <div className="text-[9px] text-gray-600 mt-1 font-mono">Dopasowano CPC do branży: ~{cpcMultiplier.toFixed(1)} PLN</div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00FFD1] border-4 border-black" />
                    <div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Zapytania (Leady)</div>
                      <div className="text-2xl font-black text-[#00FFD1]">{leads.toFixed(1)} <span className="font-normal text-sm text-gray-500">/miesiąc</span></div>
                      <div className="text-[9px] text-gray-600 mt-1 font-mono">Zakładana konwersja (CR): {currentCR.toFixed(1)}%</div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between z-10 pl-12 bg-black border border-white/5 p-4 rounded-xl">
                    <div className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black" />
                    <div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Dopięte Umowy</div>
                      <div className="text-2xl font-black text-emerald-400">{clients.toFixed(1)} <span className="font-normal text-sm text-gray-500">B2B</span></div>
                      <div className="text-[9px] text-gray-600 mt-1 font-mono">Szacowany Win Rate: {finalWinRate.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/50 p-6 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col">
                  <div className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><DollarSign size={14}/> Potencjalny Przychód Miesięczny</div>
                  <div className="text-4xl font-black text-white">{Math.round(revenue).toLocaleString('pl-PL')} <span className="text-xl text-emerald-500 font-mono">PLN</span></div>
                  {roi > 0 && <div className="mt-3 text-xs text-emerald-400/80 font-mono">Szacowany zwrot z abonamentu (ROI): {Math.round(roi)}%</div>}
                </div>

                <div className="mt-6 flex justify-between gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1"><Info size={10}/> Wycena: Start</div>
                    <div className="text-white font-mono text-lg">{totalOneTime.toLocaleString('pl-PL')} PLN</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 justify-end">Wycena: Miesięcznie <Info size={10}/></div>
                    <div className="text-white font-mono text-lg">{totalMonthly.toLocaleString('pl-PL')} PLN</div>
                  </div>
                </div>
              </div>

              {/* Formularz Zapisywania */}
              <div className="p-6 md:p-8 bg-black flex-grow">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><Check size={32} /></div>
                      <h4 className="text-xl font-bold text-white mb-2">Projekt Zabezpieczony!</h4>
                      <p className="text-gray-400 text-sm">Otrzymaliśmy architekturę Twojego lejka. Zadzwonimy, aby omówić szczegóły i potwierdzić te wyliczenia.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {status === 'error' && <div className="text-red-500 text-sm">Uzupełnij poprawnie dane kontaktowe.</div>}
                      {status === 'captcha_error' && <div className="text-orange-400 text-sm">Błędny wynik działania matematycznego.</div>}
                      
                      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Twój e-mail" disabled={status === 'loading'} />
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Numer telefonu" disabled={status === 'loading'} />
                      </div>

                      <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <ShieldQuestion className="text-[#00FFD1]" size={14} />
                          <label className="text-xs font-bold text-gray-300">Zabezpieczenie: {num1} + {num2} = ?</label>
                        </div>
                        <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-16 bg-black border border-white/20 p-1.5 text-center text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm" disabled={status === 'loading'} />
                      </div>

                      <button type="submit" disabled={status === 'loading' || selectedModules.length === 0} className="w-full mt-4 bg-[#00FFD1] text-black font-bold text-base py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Prześlij wywiad do bezpłatnej analizy <ArrowRight size={18} /></>}
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
