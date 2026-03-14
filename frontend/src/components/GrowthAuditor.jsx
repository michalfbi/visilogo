import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, ArrowRight, CheckCircle, Database, LineChart, Loader2, ShieldQuestion, Target, Filter, Zap, DollarSign } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const GrowthAuditor = () => {
  const [formData, setFormData] = useState({
    traffic: 500,
    leads: 5,
    clients: 1,
    profit: 3000,
    email: '',
    phone: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const analyzeBottleneck = (e) => {
    e.preventDefault();
    
    // Walidacja logiczna wejścia
    if (formData.leads > formData.traffic || formData.clients > formData.leads || formData.traffic <= 0) {
      alert("Dane są nielogiczne. Ilość leadów nie może być większa niż ruch, a klientów większa niż leadów.");
      return;
    }

    setStatus('analyzing');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 200);

    setTimeout(() => {
      const { traffic, leads, clients, profit } = formData;
      
      // Obliczenia konwersji
      const trafficToLeadCR = (leads / traffic) * 100;
      const leadToClientCR = leads > 0 ? (clients / leads) * 100 : 0;
      const currentRevenue = clients * profit;

      // Zmienne wynikowe
      let bottleneck = '';
      let diagnosis = '';
      let actionPlan = '';
      let potentialRevenue = 0;
      let lostRevenue = 0;
      let recommendedModule = '';

      // Twarde Standardy Rynkowe (Benchmarks)
      const BENCHMARK_TRAFFIC = 500;
      const BENCHMARK_TCR = 3.5; // Dobra strona konwertuje ruch na zapytania na poziomie 3.5%
      const BENCHMARK_CLR = 25.0; // Dobry handlowiec/oferta zamyka 25% zapytań internetowych

      // Logika Szukania Wąskiego Gardła (Theory of Constraints)
      if (trafficToLeadCR < 2.0) {
        // Wąskie Gardło 1: SŁABA STRONA WWW / OFERTA
        bottleneck = 'Wizerunek i Strona WWW';
        diagnosis = `Twój ruch (${traffic} wizyt) jest przepalany. Konwersja na poziomie ${trafficToLeadCR.toFixed(1)}% to czerwona flaga. Klienci wchodzą, ale Twoja strona ich odstrasza lub jest nieczytelna.`;
        actionPlan = `Natychmiast wstrzymaj płatne reklamy! Skierowanie ruchu na tę stronę to wyrzucanie pieniędzy w błoto. Potrzebujesz nowej strony WWW zaprojektowanej pod konwersję (UX) oraz silnego copywritingu.`;
        recommendedModule = "Strona WWW & Copywriting";
        
        // Symulacja naprawy
        const fixedLeads = traffic * (BENCHMARK_TCR / 100);
        const fixedClients = fixedLeads * (leadToClientCR / 100); // Zakładamy ten sam win rate
        potentialRevenue = fixedClients * profit;
        
      } else if (leadToClientCR < 15.0 && leads >= 5) {
        // Wąskie Gardło 2: BRAK ZAUFANIA DO MARKI / ZŁE LEAD-Y
        bottleneck = 'Zaufanie do Marki (Branding)';
        diagnosis = `Strona generuje zapytania (Konwersja: ${trafficToLeadCR.toFixed(1)}%), ale Twoja skuteczność sprzedaży to zaledwie ${leadToClientCR.toFixed(1)}%. Ściągasz "oglądaczy" albo konkurencja wygląda bardziej profesjonalnie i odbiera Ci zlecenia.`;
        actionPlan = `Musisz podnieść autorytet. Profesjonalny branding i odświeżenie wizerunku sprawią, że klienci przestaną negocjować o każdą złotówkę. Należy też wdrożyć na stronie formularz kwalifikujący, by odsiewać słabe leady.`;
        recommendedModule = "Branding Premium & Kwalifikacja";

        const fixedClients = leads * (BENCHMARK_CLR / 100);
        potentialRevenue = fixedClients * profit;

      } else if (traffic < 300) {
        // Wąskie Gardło 3: BRAK RUCHU (OBSCURITY)
        bottleneck = 'Brak Wystarczającego Ruchu (Niewidzialność)';
        diagnosis = `Twoja strona radzi sobie dobrze (Konwersja: ${trafficToLeadCR.toFixed(1)}%), ale nikt o Tobie nie wie. Przy ruchu na poziomie ${traffic} wizyt, Twój biznes po prostu dusi się z braku tlenu.`;
        actionPlan = `Masz zdrowy fundament. To idealny moment na dociśnięcie gazu! Zainwestuj w kampanie Google Ads lub Meta Ads, aby wpompować na stronę wysokojakościowy ruch. Każda wydana złotówka szybko Ci się zwróci.`;
        recommendedModule = "Kampanie Google/Meta Ads";

        const fixedTraffic = BENCHMARK_TRAFFIC;
        const fixedLeads = fixedTraffic * (trafficToLeadCR / 100);
        const fixedClients = fixedLeads * (leadToClientCR / 100);
        potentialRevenue = fixedClients * profit;
      } else {
        // Wszystko działa w miarę dobrze - czas na skalowanie
        bottleneck = 'Skalowalność (Bariera Szklanego Sufitu)';
        diagnosis = `Twoje wskaźniki są w normie! Konwersja: ${trafficToLeadCR.toFixed(1)}%, Domknięcia: ${leadToClientCR.toFixed(1)}%. Masz zdrowy biznes, który jest gotowy na agresywne skalowanie.`;
        actionPlan = `Czas wyjść poza lokalny rynek lub odpalić zaawansowane lejki automatyczne (Marketing Automation), aby podwoić obecne wyniki bez dodawania Ci godzin pracy.`;
        recommendedModule = "Pełne Skalowanie (Ads + Automatyzacje)";
        
        potentialRevenue = currentRevenue * 2; // Założenie podwojenia przy skalowaniu
      }

      lostRevenue = Math.max(0, potentialRevenue - currentRevenue);

      setResults({
        tcr: trafficToLeadCR,
        clr: leadToClientCR,
        currentRevenue,
        bottleneck,
        diagnosis,
        actionPlan,
        potentialRevenue,
        lostRevenue,
        recommendedModule
      });
      
      setStatus('results');
    }, 1800);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (e.target.honeypot && e.target.honeypot.value !== '') { setStatus('success'); return; }
    if (parseInt(captchaAnswer) !== num1 + num2) { alert('Zły wynik równania!'); return; }
    if (!formData.email.trim()) return;

    setStatus('sending');
    
    const payload = {
      form_type: "Diagnoza Wąskich Gardeł (Growth Auditor)",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      ruch: formData.traffic,
      leady: formData.leads,
      klienci: formData.clients,
      zysk_z_klienta: formData.profit,
      wykryty_problem: results.bottleneck,
      strata_miesieczna: Math.round(results.lostRevenue),
      rekomendacja: results.recommendedModule,
      message: `DIAGNOZA BIZNESU! \nZdiagnozowano firmę. Zysk z klienta: ${formData.profit} PLN. \nWąskie Gardło: ${results.bottleneck}. \nTracą przez to ok. ${Math.round(results.lostRevenue)} PLN miesięcznie! \nNasza rekomendacja dla nich to: ${results.recommendedModule}. \n\nZadzwoń i powiedz, że dokładnie wiesz, gdzie ich biznes przecieka!`
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
    <div className="min-h-screen bg-[#050505] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden font-sans">
      <div className="absolute top-[0%] right-[0%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
            <Filter size={16} /> Wykrywacz Wąskich Gardeł (TOC)
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Znajdź Wyciek <span className="text-blue-400">Pieniędzy.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Przestań wydawać w ciemno na losowe działania reklamowe. Podaj nam 4 kluczowe liczby Twojego biznesu. System matematycznie zdiagnozuje, w którym dokładnie miejscu Twojego lejka uciekają zlecenia.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={analyzeBottleneck} className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <LineChart size={14} className="text-blue-500"/> Ile osób wchodzi na Twoją stronę (mc)?
                    </label>
                    <input type="number" name="traffic" min="1" value={formData.traffic} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:border-blue-500 outline-none transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Target size={14} className="text-blue-500"/> Ile z tego dostajesz zapytań/telefonów?
                    </label>
                    <input type="number" name="leads" min="0" value={formData.leads} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:border-blue-500 outline-none transition-colors font-mono" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle size={14} className="text-blue-500"/> Ile zapytań staje się ostatecznie klientem?
                    </label>
                    <input type="number" name="clients" min="0" value={formData.clients} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:border-blue-500 outline-none transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <DollarSign size={14} className="text-blue-500"/> Jaki jest Twój średni czysty zysk z 1 klienta?
                    </label>
                    <div className="relative">
                      <input type="number" name="profit" min="1" value={formData.profit} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pr-12 text-white focus:border-blue-500 outline-none transition-colors font-mono" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">PLN</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <button type="submit" className="bg-blue-600 text-white font-bold text-lg py-5 px-10 rounded-lg hover:bg-blue-500 transition-all inline-flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  <Database size={20} /> Diagnozuj Mój Biznes
                </button>
                <p className="text-gray-500 text-xs mt-4">Narzędzie wykorzystuje algorytmy Theory of Constraints (ToC) oraz rynkowe benchmarki B2B.</p>
              </div>
            </motion.form>
          )}

          {status === 'analyzing' && (
            <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl py-16 flex flex-col items-center justify-center text-center">
              <Loader2 size={48} className="text-blue-500 mb-6 animate-spin" />
              <h3 className="text-2xl font-bold text-white mb-2">Kompilacja Danych Lejka...</h3>
              <p className="text-gray-500 text-sm mb-8 font-mono">Porównywanie wskaźników z rynkowym progiem rentowności...</p>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
              </div>
            </motion.div>
          )}

          {status === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-12 gap-8">
              
              {/* LEWA: DIAGNOZA (WĄSKIE GARDŁO) */}
              <div className="lg:col-span-7 bg-[#0A0A0A] border border-red-500/30 rounded-2xl p-8 flex flex-col relative shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                <div className="inline-flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest mb-6 bg-red-500/10 px-3 py-1 rounded-full w-fit border border-red-500/20">
                  <AlertTriangle size={14} /> Wykryte Wąskie Gardło
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                  Problem: <span className="text-red-500">{results.bottleneck}</span>
                </h3>
                
                <div className="bg-black border border-white/10 rounded-xl p-5 mb-6 text-gray-300 text-sm leading-relaxed border-l-4 border-l-red-500">
                  {results.diagnosis}
                </div>
                
                <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Zap size={18} className="text-blue-400"/> Zalecany Plan Akcji:</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {results.actionPlan}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-4">
                   <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Twój Przychód</p>
                      <p className="text-xl font-bold text-white">{Math.round(results.currentRevenue).toLocaleString('pl-PL')} PLN</p>
                   </div>
                   <div className="bg-red-500/10 rounded-lg p-4 text-center border border-red-500/20">
                      <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold mb-1">Utracony Potencjał</p>
                      <p className="text-xl font-bold text-red-500">-{Math.round(results.lostRevenue).toLocaleString('pl-PL')} PLN</p>
                   </div>
                </div>
              </div>

              {/* PRAWA: WIZUALIZACJA I FORMULARZ */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Wizualizacja Wskaźników */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Analityka Wskaźników (CR)</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Konwersja Strony (Ruch -> Lead)</span>
                        <span className={`font-bold ${results.tcr < 2.0 ? 'text-red-500' : 'text-green-500'}`}>{results.tcr.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${results.tcr < 2.0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(results.tcr * 10, 100)}%` }}></div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 text-right">Standard rynkowy: ~3.5%</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Skuteczność Sprzedaży (Lead -> Klient)</span>
                        <span className={`font-bold ${results.clr < 15.0 ? 'text-red-500' : 'text-green-500'}`}>{results.clr.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${results.clr < 15.0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(results.clr * 2, 100)}%` }}></div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 text-right">Standard rynkowy: ~25.0%</p>
                    </div>
                  </div>
                </div>

                {/* Haczyk Sprzedażowy i Formularz */}
                <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 rounded-2xl p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">Zatamujmy ten wyciek!</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    Wiesz już, gdzie tracisz pieniądze. Zablokuj wyciek. Rekomendujemy wdrożenie modułu: <strong className="text-blue-400">{results.recommendedModule}</strong>. Zostaw kontakt, omówimy jak to wdrożyć.
                  </p>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4 mt-auto">
                    <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                    
                    <div className="flex gap-4">
                      <input type="email" required value={formData.email} onChange={handleChange} name="email" className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-blue-500 rounded-lg text-sm transition-colors" placeholder="Twój e-mail" disabled={status === 'sending' || status === 'success'} />
                    </div>
                    <div className="flex gap-4">
                      <input type="tel" required value={formData.phone} onChange={handleChange} name="phone" className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-blue-500 rounded-lg text-sm transition-colors" placeholder="Telefon" disabled={status === 'sending' || status === 'success'} />
                    </div>

                    <div className="bg-black/50 border border-white/10 p-3 rounded-lg flex items-center justify-between mt-2">
                      <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1"><ShieldQuestion size={12} className="text-blue-500" /> {num1} + {num2} = ?</label>
                      <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-12 bg-black border border-white/20 p-1 text-center text-white focus:border-blue-500 outline-none rounded text-xs" disabled={status === 'sending' || status === 'success'} />
                    </div>

                    <button type="submit" disabled={status === 'sending' || status === 'success'} className="w-full mt-2 bg-blue-600 text-white font-bold text-sm py-4 rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {status === 'sending' ? <Loader2 className="animate-spin" /> : status === 'success' ? <><CheckCircle size={16}/> Wysłano!</> : <>Naprawmy to razem <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrowthAuditor;
