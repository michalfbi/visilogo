import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Check, Target, TrendingUp, Layout, FileText, Palette, ArrowRight, Loader2, ShieldQuestion, AlertTriangle, DollarSign, Activity, Search, Info, PieChart, Scale, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const availableModules = [
  { id: 'logo', name: 'Premium Branding', desc: 'Podnosi zaufanie, obniża koszt kliknięcia (CTR) i zwiększa skuteczność sprzedaży o ok. 20%.', oneTime: 2900, monthly: 0, icon: Palette },
  { id: 'web', name: 'Strona WWW (Silnik)', desc: 'Klucz do opłacalności. Podnosi bazową konwersję z tragicznych 0.4% do 1.5%.', oneTime: 6500, monthly: 0, icon: Layout },
  { id: 'copy', name: 'Perswazja B2B (Copy)', desc: 'Zbijanie obiekcji tekstem. Dodaje kolejne +0.7% do konwersji ze strony.', oneTime: 2500, monthly: 0, icon: FileText },
  { id: 'google', name: 'Google Ads (Search)', desc: 'Złapanie klienta w momencie szukania. (Zakładany średni koszt kliknięcia CPC: 5-8 zł).', adSpend: 1500, cpc: 6.5, oneTime: 1500, monthly: 3000, icon: Search },
  { id: 'meta', name: 'Meta Ads (Retargeting)', desc: 'Śledzenie decydentów, którzy opuścili stronę (Tanie kliki, CPC: 3-5 zł).', adSpend: 1000, cpc: 4.0, oneTime: 1500, monthly: 2500, icon: Target },
  { id: 'seo', name: 'Content Hub & SEO', desc: 'Budowa darmowego, wysoce kalorycznego ruchu. (Szacunek: ok. +300 wizyt organicznych).', organicBoost: 300, oneTime: 0, monthly: 2500, icon: TrendingUp },
];

const FunnelBuilder = () => {
  // Unit Economics - Prawdziwe dane biznesowe
  const [dealValue, setDealValue] = useState(5000); // Wartość 1 zlecenia/miesiąca
  const [lifespan, setLifespan] = useState(1); // Ile razy klient kupuje / ile miesięcy płaci
  const [margin, setMargin] = useState(40); // Marża netto klienta (%)
  const [closesPerTen, setClosesPerTen] = useState(1.5); // Skuteczność sprzedaży

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

  const toggleModule = (id) => setSelectedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  // --- ZAAWANSOWANY SILNIK UNIT ECONOMICS ---
  const currentSelection = availableModules.filter(m => selectedModules.includes(m.id));
  const hasWeb = selectedModules.includes('web');
  const trafficModules = currentSelection.filter(m => m.id === 'google' || m.id === 'meta' || m.id === 'seo');
  
  const totalOneTime = currentSelection.reduce((sum, m) => sum + m.oneTime, 0);
  const totalMonthlyMarketingCost = currentSelection.reduce((sum, m) => sum + m.monthly, 0);

  // 1. Ruch (Wizyty)
  let totalTraffic = 100; // Ruch bazowy
  currentSelection.forEach(m => {
    if (m.adSpend && m.cpc) totalTraffic += Math.floor(m.adSpend / (m.cpc * (selectedModules.includes('logo') ? 0.8 : 1.0))); // Logo obniża CPC o 20% bo reklama ma wyższy CTR (lepsza marka)
    if (m.organicBoost) totalTraffic += m.organicBoost;
  });

  // 2. Konwersja Strony (CR)
  let currentCR = 0.4; 
  if (hasWeb) currentCR = 1.5;
  if (selectedModules.includes('copy')) currentCR += 0.7;

  // 3. Konwersja Sprzedaży (Win Rate)
  const baseWinRate = closesPerTen * 10;
  const finalWinRate = selectedModules.includes('logo') ? baseWinRate * 1.2 : baseWinRate;

  // 4. Kalkulacja Wyników Biznesowych
  const leads = totalTraffic * (currentCR / 100);
  const clients = leads * (finalWinRate / 100);
  
  // Wartość Życiowa Klienta (LTV)
  const ltvRevenue = dealValue * lifespan;
  const ltvProfit = ltvRevenue * (margin / 100); // Prawdziwy zysk z 1 klienta
  
  // Koszt Pozyskania Klienta (CAC - Customer Acquisition Cost)
  const cac = clients > 0 ? (totalMonthlyMarketingCost / clients) : 0;
  
  // Stosunek Zysku do Kosztu (LTV:CAC Ratio)
  const ltvCacRatio = cac > 0 ? (ltvProfit / cac) : 0;

  // Całkowity Zysk Miesięczny (Net Profit)
  const totalMonthlyProfit = (clients * ltvProfit) - totalMonthlyMarketingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.honeypot && e.target.honeypot.value !== '') { setStatus('success'); return; }
    if (parseInt(captchaAnswer) !== num1 + num2) { setStatus('captcha_error'); return; }
    if (!formData.email.trim() || !formData.phone.trim()) { setStatus('error'); return; }

    setStatus('loading');
    
    const payload = {
      form_type: "Narzędzie: Unit Economics Simulator",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      wartosc_zlecenia: dealValue,
      cykl_zycia: lifespan,
      marza_procent: margin,
      win_rate: finalWinRate,
      ltv_zysk: ltvProfit,
      wyliczony_cac: cac,
      wybrane_moduly: currentSelection.map(m => m.name).join(", "),
      inwestycja_start: totalOneTime,
      inwestycja_mc: totalMonthlyMarketingCost,
      prognoza_leadow: leads.toFixed(1),
      prognoza_klientow: clients.toFixed(1),
      prognoza_zysku_netto: Math.round(totalMonthlyProfit),
      message: `ZAAWANSOWANY LEAD FINANSOWY! \nKlient ma LTV Profit na poziomie ${Math.round(ltvProfit)} PLN. Wyklikał system za ${totalMonthlyMarketingCost} zł/mc. Jego wyliczony koszt pozyskania klienta (CAC) to ${Math.round(cac)} PLN, co daje wskaźnik LTV:CAC = ${ltvCacRatio.toFixed(1)}x. Genialny prospekt do skalowania!`
    };

    try {
      await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20">
            <Scale size={16} /> Unit Economics Simulator
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Prześwietl opłacalność <br/><span className="text-[#00FFD1]">Twojego Marketingu.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 max-w-3xl mx-auto">
            Przedsiębiorcy skupiają się na przychodzie, zapominając o marży i Koszcie Pozyskania Klienta (CAC). Wypełnij twarde dane swojej firmy i zbuduj system, który matematycznie musi się zwrócić.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEWA STRONA - DANE */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 flex flex-col gap-8">
            
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Ekonomia Twojego Biznesu</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Wartość 1 kontraktu / abonamentu</label>
                  <div className="relative">
                    <input type="number" value={dealValue} onChange={(e) => setDealValue(Number(e.target.value) || 0)} className="w-full bg-black border border-white/20 rounded-lg p-3 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Cykl życia (Ile razy klient zapłaci?)</label>
                  <div className="relative">
                    <input type="number" min="1" value={lifespan} onChange={(e) => setLifespan(Number(e.target.value) || 1)} className="w-full bg-black border border-white/20 rounded-lg p-3 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs uppercase">Razy</span>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#00FFD1] uppercase tracking-wider mb-2 flex items-center gap-2"><PieChart size={14}/> Twoja Czysta Marża Zysku</label>
                  <div className="relative">
                    <input type="number" min="1" max="100" value={margin} onChange={(e) => setMargin(Number(e.target.value) || 0)} className="w-full bg-[#00FFD1]/5 border border-[#00FFD1]/30 rounded-lg p-3 pl-4 pr-12 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 leading-tight">Po odliczeniu podatków, pracowników i materiałów. System wyliczy tylko Twój prawdziwy zysk (Profit).</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ilu na 10 pytających kupuje?</label>
                  <div className="relative">
                    <input type="number" step="0.5" min="0.1" max="10" value={closesPerTen} onChange={(e) => setClosesPerTen(Number(e.target.value) || 0)} className="w-full bg-black border border-white/20 rounded-lg p-3 pl-4 pr-16 text-white focus:outline-none focus:border-[#00FFD1] font-mono text-lg transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">/ 10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Budowa Architektury Maszyny</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {availableModules.map((module) => {
                  const isSelected = selectedModules.includes(module.id);
                  return (
                    <div key={module.id} onClick={() => toggleModule(module.id)} className={`cursor-pointer border p-5 rounded-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full ${isSelected ? 'bg-[#00FFD1]/5 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.1)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}>
                      {isSelected && <div className="absolute top-4 right-4 text-[#00FFD1]"><Check size={20} strokeWidth={3} /></div>}
                      <module.icon size={24} className={`mb-3 transition-colors ${isSelected ? 'text-[#00FFD1]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <h4 className={`font-bold text-sm mb-1 transition-colors pr-6 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{module.name}</h4>
                      <p className="text-gray-500 text-[11px] mb-4 leading-relaxed flex-grow pr-2">{module.desc}</p>
                      <div className="mt-auto border-t border-white/10 pt-3 flex flex-col gap-1">
                           {module.oneTime > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Start: {module.oneTime} PLN</span>}
                           {module.monthly > 0 && <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-[#00FFD1]/80' : 'text-gray-600'}`}>Budżet: {module.monthly} PLN/mc</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* PRAWA STRONA - ZAAWANSOWANY KOKPIT */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl sticky top-32 overflow-hidden flex flex-col">
              
              <div className="bg-gradient-to-b from-white/5 to-transparent p-6 md:p-8 border-b border-white/10">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><Activity size={20} className="text-[#00FFD1]"/> Wyniki Unit Economics</h3>
                
                {/* Ostrzeżenia */}
                <AnimatePresence>
                  {ltvCacRatio > 0 && ltvCacRatio < 1.5 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-red-400 text-xs leading-relaxed">
                        <strong>Krytyczne zagrożenie (LTV:CAC &lt; 1.5):</strong> Koszt pozyskania klienta zjada cały Twój zysk! Zwiększ konwersję (dodając Stronę/Copywriting) lub podnieś marżę.
                      </p>
                    </motion.div>
                  )}
                  {trafficModules.length > 0 && !hasWeb && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-orange-400 text-xs leading-relaxed">
                        Kierujesz ruch na starą stronę o konwersji {currentCR}%. Dodaj Stronę WWW, by odzyskać tracone leady.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black border border-white/5 p-4 rounded-xl">
                    <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 tooltip">CAC (Koszt Pozyskania)</div>
                    <div className="text-xl font-bold text-white">{cac === 0 || cac === Infinity ? '-' : Math.round(cac)} <span className="text-xs text-gray-500">PLN</span></div>
                  </div>
                  <div className="bg-black border border-white/5 p-4 rounded-xl">
                    <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 tooltip">LTV Profit (Wartość Klienta)</div>
                    <div className="text-xl font-bold text-white">{Math.round(ltvProfit).toLocaleString('pl-PL')} <span className="text-xs text-gray-500">PLN</span></div>
                  </div>
                </div>

                <div className={`p-5 rounded-xl flex items-center justify-between border ${ltvCacRatio >= 3 ? 'bg-emerald-500/10 border-emerald-500/30' : ltvCacRatio >= 1.5 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${ltvCacRatio >= 3 ? 'text-emerald-400' : ltvCacRatio >= 1.5 ? 'text-yellow-400' : 'text-red-400'}`}><Scale size={14}/> LTV:CAC Ratio</div>
                    <div className="text-[10px] text-gray-400 leading-tight pr-4">O ile zysk z klienta przewyższa koszt jego zdobycia. (Zdrowy biznes to min. 3.0x)</div>
                  </div>
                  <div className={`text-3xl font-black ${ltvCacRatio >= 3 ? 'text-emerald-400' : ltvCacRatio >= 1.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {ltvCacRatio > 0 && ltvCacRatio !== Infinity ? ltvCacRatio.toFixed(1) + 'x' : '-'}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Nowi Klienci B2B</div>
                    <div className="text-white text-lg font-bold">{clients.toFixed(1)} <span className="text-xs font-normal text-gray-500">/mc</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2 py-1 rounded inline-block mb-1">Czysty Zysk Netto</div>
                    <div className={`text-2xl font-black font-mono ${totalMonthlyProfit > 0 ? 'text-[#00FFD1]' : 'text-red-500'}`}>
                      {totalMonthlyProfit > 0 ? '+' : ''}{Math.round(totalMonthlyProfit).toLocaleString('pl-PL')} <span className="text-sm">PLN</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Formularz */}
              <div className="p-6 md:p-8 bg-black flex-grow border-t border-white/5">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><Check size={32} /></div>
                      <h4 className="text-xl font-bold text-white mb-2">Złożone!</h4>
                      <p className="text-gray-400 text-sm">Masz świetne liczby. Oddzwonimy w 24h, żeby potwierdzić ten model i rozpocząć planowanie skalowania.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {status === 'error' && <div className="text-red-500 text-sm">Błąd. Uzupełnij dane kontaktowe.</div>}
                      {status === 'captcha_error' && <div className="text-orange-400 text-sm">Błąd matematyczny.</div>}
                      
                      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Twój e-mail" disabled={status === 'loading'} />
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00FFD1] rounded-lg transition-colors text-sm" placeholder="Numer telefonu" disabled={status === 'loading'} />
                      </div>

                      <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <ShieldQuestion className="text-[#00FFD1]" size={14} />
                          <label className="text-xs font-bold text-gray-300">Bezpieczeństwo: {num1} + {num2} = ?</label>
                        </div>
                        <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-16 bg-black border border-white/20 p-1.5 text-center text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm" disabled={status === 'loading'} />
                      </div>

                      <button type="submit" disabled={status === 'loading' || currentSelection.length === 0} className="w-full mt-4 bg-[#00FFD1] text-black font-bold text-base py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Zweryfikuj te liczby ze mną na Callu <ArrowRight size={18} /></>}
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
