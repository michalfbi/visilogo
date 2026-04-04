import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, TrendingUp, Users, Target, Lock, Mail, Activity, CheckCircle, BarChart3 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const FunnelCalculator = () => {
  const [formData, setFormData] = useState({
    targetRevenue: 50000,
    avgOrderValue: 5000,
    closingRate: 20,
    email: ''
  });
  const [status, setStatus] = useState('idle'); // idle, calculating, complete
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) || e.target.value });
  };

  const calculateFunnel = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus('calculating');

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z燦arz臋dzia: Kalkulator Bud偶etu",
        email_klienta: formData.email,
        cel_sprzedazowy: formData.targetRevenue,
        wartosc_klienta: formData.avgOrderValue,
        skutecznosc_sprzedazy: formData.closingRate,
        message: `Wysokiej jako艣ci lead! Klient (${formData.email}) chce zarobi膰 dodatkowe ${formData.targetRevenue} z艂. Sprzedaje us艂ugi za ${formData.avgOrderValue} z艂 i爖amyka ${formData.closingRate}% lead贸w. Zadzwo艅 i爖aproponuj mu kampani臋!`
      })
    }).catch(err => console.error("Webhook error", err));

    setTimeout(() => {
      const targetRev = Number(formData.targetRevenue);
      const aov = Number(formData.avgOrderValue);
      const closeRate = Number(formData.closingRate) / 100;

      const clientsNeeded = Math.ceil(targetRev / aov);
      const leadsNeeded = Math.ceil(clientsNeeded / closeRate);
      
      // Estymacja dla B2B (艣redni koszt pozyskania leada = 150 z艂)
      const estimatedCPL = 150; 
      const recommendedBudget = leadsNeeded * estimatedCPL;
      const cac = recommendedBudget / clientsNeeded; // Koszt Pozyskania Klienta
      const roi = Math.round(((targetRev - recommendedBudget) / recommendedBudget) * 100);

      setResults({
        clientsNeeded,
        leadsNeeded,
        recommendedBudget,
        cac: Math.round(cac),
        roi
      });
      setStatus('complete');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-emerald-500/20"
          >
            <Calculator size={16} /> Narz臋dzie Analityczne B2B
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Kalkulator Bud偶etu <br/><span className="text-emerald-500">Marketingowego</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Przesta艅 zgadywa膰, ile powiniene艣 wydawa膰 na reklamy. Wpisz swoje cele finansowe, a爏krypt obliczy dok艂adnie, ilu zapyta艅 potrzebujesz i爅aki bud偶et zagwarantuje Ci wzrost.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Formularz */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            <form onSubmit={calculateFunnel} className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full relative overflow-hidden">
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Target size={16} className="text-emerald-500"/> Cel: Dodatkowy Przych贸d (Miesi臋cznie)</label>
                <div className="relative">
                  <input type="number" name="targetRevenue" value={formData.targetRevenue} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pl-6 text-white focus:outline-none focus:border-emerald-500 transition-colors text-xl font-bold" />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><TrendingUp size={16} className="text-emerald-500"/> 艢rednia Warto艣膰 1 Klienta (Koszyk)</label>
                <div className="relative">
                  <input type="number" name="avgOrderValue" value={formData.avgOrderValue} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pl-6 text-white focus:outline-none focus:border-emerald-500 transition-colors text-xl font-bold" />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Users size={16} className="text-emerald-500"/> Skuteczno艣膰 Zamkni臋膰 (Win Rate)</label>
                <div className="relative">
                  <input type="number" name="closingRate" max="100" min="1" value={formData.closingRate} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pl-6 text-white focus:outline-none focus:border-emerald-500 transition-colors text-xl font-bold" />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Ilu ze 100 zainteresowanych zostaje Twoim klientem?</p>
              </div>

              <div className="mb-8 border-t border-white/10 pt-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Mail size={16} className="text-emerald-500"/> E-mail do odblokowania raportu</label>
                <input type="email" name="email" placeholder="Tw贸j e-mail" value={formData.email} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>

              <button type="submit" disabled={status === 'calculating'} className={`w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-lg transition-all text-lg ${status === 'calculating' ? 'bg-gray-800 text-gray-500' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'} mt-auto`}>
                {status === 'calculating' ? <><Activity size={20} className="animate-pulse" /> Przeliczanie...</> : <><Calculator size={20} /> Oblicz M贸j Bud偶et</>}
              </button>
            </form>
          </motion.div>

          {/* Wynik i燞aczyk Sprzeda偶owy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-2xl p-8 text-center text-gray-500 relative overflow-hidden"
                >
                  <Lock size={48} className="mb-4 opacity-20" />
                  <h3 className="text-lg font-bold text-white mb-2">Raport Zablokowany</h3>
                  <p className="max-w-md">Uzupe艂nij parametry swojego biznesu po lewej stronie, aby system przeprowadzi艂 in偶ynieri臋 wsteczn膮 Twojego lejka sprzeda偶owego.</p>
                </motion.div>
              )}

              {status === 'calculating' && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Analiza Modeli B2B...</h3>
                  <p className="text-emerald-500 text-sm font-mono">Obliczanie optymalnego Kosztu Pozyskania Klienta (CAC)</p>
                </motion.div>
              )}

              {status === 'complete' && results && (
                <motion.div 
                  key="unlocked"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  {/* Wyniki */}
                  <div className="bg-emerald-500/5 border border-emerald-500/30 p-8 rounded-xl relative shadow-2xl">
                    <div className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2"><CheckCircle size={14}/> Tw贸j Raport Gotowy</div>
                    
                    <div className="grid sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Potrzebujesz nowych klient贸w</div>
                        <div className="text-3xl font-black text-white">{results.clientsNeeded} <span className="text-sm font-normal text-gray-500">os贸b/mc</span></div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Potrzebujesz zapyta艅 (Leads)</div>
                        <div className="text-3xl font-black text-emerald-400">{results.leadsNeeded} <span className="text-sm font-normal text-gray-500">lead贸w/mc</span></div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                          <div className="text-gray-400 text-sm mb-1">Rekomendowany Bud偶et na Reklamy</div>
                          <div className="text-4xl font-black text-white">{results.recommendedBudget.toLocaleString('pl-PL')} <span className="text-lg text-emerald-500">PLN</span></div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500 text-xs font-mono mb-1">Szacowany CAC: ~{results.cac} PLN</div>
                          <div className="text-emerald-500 text-xs font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-full">Prognozowany ROI: {results.roi}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Haczyk Sprzeda偶owy */}
                  <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl flex flex-col justify-center shadow-xl relative overflow-hidden flex-grow">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                      <BarChart3 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Matematyka si臋 zgadza. Kto to dowiezie?</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      Wiesz ju偶, 偶e potrzebujesz dok艂adnie <strong className="text-white">{results.leadsNeeded} zapyta艅</strong>, aby osi膮gn膮膰 sw贸j cel finansowy. Nie spalaj tego bud偶etu na przypadkowe dzia艂ania. <strong className="text-white">Zbudujemy dla Ciebie zyskowny lejek i爏tron臋, kt贸ra wygeneruje te leady w爖a艂o偶onym bud偶ecie.</strong>
                    </p>
                    <a href="/#contact" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-white transition-colors group text-sm border-b border-transparent hover:border-emerald-400 pb-1 w-fit">
                      Zarezerwuj darmow膮 rozmow臋 o爏trategii <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
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

export default FunnelCalculator;
