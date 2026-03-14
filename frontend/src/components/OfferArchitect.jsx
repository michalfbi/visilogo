import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, ArrowRight, Loader2, ShieldQuestion, Briefcase, DollarSign, Activity, AlertOctagon, Sparkles, CheckCircle, Clock } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const OfferArchitect = () => {
  const [formData, setFormData] = useState({
    profession: '',
    servicePrice: 150,
    targetIncome: 10000,
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

  // Silnik Pakietyzacji Oferty
  const generateOffer = (e) => {
    e.preventDefault();
    if (!formData.profession || formData.servicePrice <= 0 || formData.targetIncome <= 0) return;

    setStatus('calculating');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 200);

    setTimeout(() => {
      const { servicePrice, targetIncome, profession } = formData;
      
      // Koszmar (Obecna Sytuacja)
      const currentClientsNeeded = Math.ceil(targetIncome / servicePrice);
      
      // Magia (Nowa Oferta)
      // Mnożnik pakietu (np. sprzedajemy 3 miesiące z rzędu lub kompleksowy system)
      const packageMultiplier = servicePrice < 500 ? 12 : 4; 
      const premiumPrice = servicePrice * packageMultiplier * 1.2; // +20% premii za "pakietyzację" i wygodę
      const roundedPremiumPrice = Math.round(premiumPrice / 10) * 10;
      
      const premiumClientsNeeded = (targetIncome / roundedPremiumPrice).toFixed(1);

      // Generowanie nazw i bonusów w zależności od wpisanego słowa (proste AI regex)
      let newName = `Kompleksowy Program: ${profession} Premium`;
      let bonus1 = "Audyt i diagnoza problemu na start (Wartość: 500 zł)";
      let bonus2 = "Stałe wsparcie na komunikatorze 24/7 (Wartość: 1000 zł)";

      const profLower = profession.toLowerCase();
      if (profLower.includes('trener') || profLower.includes('diet') || profLower.includes('fizjo')) {
        newName = `12-Tygodniowy Program Transformacji Systemowej`;
        bonus1 = "Personalizowany plan żywieniowy i nawyków (Wartość: 600 zł)";
        bonus2 = "Dostęp do zamkniętej aplikacji z wideo (Wartość: 400 zł)";
      } else if (profLower.includes('budow') || profLower.includes('remont') || profLower.includes('wykończ') || profLower.includes('płytk')) {
        newName = `Realizacja 'Pod Klucz' z Gwarancją Spokoju`;
        bonus1 = "Darmowy projekt koncepcyjny 3D (Wartość: 1500 zł)";
        bonus2 = "Sprzątanie przemysłowe po pracy (Wartość: 800 zł)";
      } else if (profLower.includes('księg') || profLower.includes('prawn') || profLower.includes('finans')) {
        newName = `Abonament Bezpieczeństwa Podatkowego 360°`;
        bonus1 = "Tarcza Antykontrolna i reprezentacja przed US (Wartość: 2000 zł)";
        bonus2 = "Kwartalna konsultacja optymalizacyjna (Wartość: 1000 zł)";
      }

      setResults({
        oldClients: currentClientsNeeded,
        newPrice: roundedPremiumPrice,
        newClients: premiumClientsNeeded,
        newName,
        bonus1,
        bonus2
      });
      setStatus('results');
    }, 1500);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (e.target.honeypot && e.target.honeypot.value !== '') { setStatus('success'); return; }
    if (parseInt(captchaAnswer) !== num1 + num2) { alert('Zły wynik równania!'); return; }
    if (!formData.email.trim()) return;

    setStatus('sending');
    
    const payload = {
      form_type: "Architekt Ofert Premium (Lead z Virala)",
      page_url: window.location.href,
      email: formData.email,
      phone: formData.phone,
      branza_klienta: formData.profession,
      stara_cena: formData.servicePrice,
      cel_finansowy: formData.targetIncome,
      zaproponowana_nowa_cena: results.newPrice,
      message: `POTĘŻNY LEAD MIKRO! \nKlient to: ${formData.profession}. Dotychczas harował za ${formData.servicePrice} PLN, by zarobić ${formData.targetIncome} PLN. Nasz system pokazał mu, że może sprzedawać Pakiety po ${results.newPrice} PLN. Jest napalony na nową strategię. Sprzedaj mu Stronę, która uwiarygodni tak drogą ofertę!`
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
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-purple-500/20">
            <Sparkles size={16} /> Symulator Ofert High-Ticket
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Przestań konkurować <span className="text-purple-400">najniższą ceną.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-2xl mx-auto">
            Wpisz swoje obecne stawki. Sztuczna Inteligencja przebuduje Twój model biznesowy tak, abyś pracował z mniejszą ilością klientów za znacznie większe pieniądze.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={generateOffer} className="max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase size={16} className="text-purple-500"/> Czym się zajmujesz?</label>
                  <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="np. Trener, Kosmetyczka, Montaż Klimatyzacji..." required className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><DollarSign size={16} className="text-purple-500"/> Ile średnio bierzesz za usługę?</label>
                    <div className="relative">
                      <input type="number" name="servicePrice" value={formData.servicePrice} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pr-12 text-white focus:border-purple-500 outline-none transition-colors font-mono" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Target size={16} className="text-purple-500"/> Ile chcesz zarabiać miesięcznie?</label>
                    <div className="relative">
                      <input type="number" name="targetIncome" value={formData.targetIncome} onChange={handleChange} required className="w-full bg-black border border-white/20 rounded-lg p-4 pr-12 text-white focus:border-purple-500 outline-none transition-colors font-mono" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PLN</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white font-bold text-lg py-5 rounded-lg hover:bg-purple-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(147,51,234,0.3)] mt-4">
                  <Activity size={20} /> Zbuduj mi Ofertę Premium
                </button>
              </div>
            </motion.form>
          )}

          {status === 'calculating' && (
            <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl py-16 flex flex-col items-center justify-center text-center">
              <Loader2 size={48} className="text-purple-500 mb-6 animate-spin" />
              <h3 className="text-2xl font-bold text-white mb-2">Przebudowa Modelu Biznesowego...</h3>
              <p className="text-gray-500 text-sm mb-8 font-mono">Nakładanie mnożników wartości i strategii wyceny...</p>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-purple-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
              </div>
            </motion.div>
          )}

          {status === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
              
              {/* STARA RZECZYWISTOŚĆ */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-6 bg-red-500/10 px-3 py-1 rounded-full w-fit">
                  <AlertOctagon size={14} /> Twój obecny koszmar
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Walka Cenowa</h3>
                <p className="text-gray-400 text-sm mb-8">Aby osiągnąć Twój cel finansowy na obecnych stawkach, musisz pracować jak maszyna.</p>
                
                <div className="bg-black/50 border border-white/5 rounded-xl p-6 mb-auto text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Potrzebujesz co miesiąc:</p>
                  <div className="text-6xl font-black text-red-500 mb-2">{results.oldClients}</div>
                  <p className="text-lg font-bold text-white">nowych klientów</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed border-t border-white/5 pt-4">
                    Jeśli choć jeden z nich zrezygnuje, nie dopniesz budżetu. Jesteś o krok od wypalenia zawodowego.
                  </p>
                </div>
              </div>

              {/* NOWA RZECZYWISTOŚĆ */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-8 flex flex-col relative shadow-[0_0_50px_rgba(147,51,234,0.15)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest mb-6 bg-purple-500/20 px-3 py-1 rounded-full w-fit">
                  <Sparkles size={14} /> Nowy Model (High-Ticket)
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Oferta Nie Do Odrzucenia</h3>
                <p className="text-gray-400 text-sm mb-6">Pakietujemy Twoją usługę w rozwiązanie, za które klienci płacą z góry duże kwoty.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-black/40 border border-purple-500/20 p-4 rounded-lg">
                    <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">Nowa Nazwa Usługi:</p>
                    <p className="font-bold text-white text-lg">{results.newName}</p>
                  </div>
                  <div className="bg-black/40 border border-purple-500/20 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">Cena Twojego Pakietu:</p>
                      <p className="font-black text-white text-3xl">{results.newPrice} <span className="text-base text-gray-500 font-normal">PLN</span></p>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-purple-500/20 p-4 rounded-lg">
                    <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-2">Bonusy zbijające obiekcje cenowe (Wartość Dodana):</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle size={16} className="text-purple-500 shrink-0 mt-0.5"/> {results.bonus1}</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle size={16} className="text-purple-500 shrink-0 mt-0.5"/> {results.bonus2}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-600 rounded-xl p-6 text-center shadow-lg mt-auto">
                  <p className="text-purple-200 text-xs uppercase tracking-widest font-bold mb-2">Teraz potrzebujesz tylko:</p>
                  <div className="text-5xl font-black text-white mb-1">{results.newClients}</div>
                  <p className="font-bold text-white text-sm">klienta miesięcznie, by zarobić {formData.targetIncome} PLN</p>
                </div>
              </div>

              {/* HACZYK SPRZEDAŻOWY */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 mt-4 shadow-2xl">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4">Liczby się zgadzają. <br/>Ale jest jeden problem.</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Gdy zażądasz od klienta {results.newPrice} PLN, on pierwszą rzeczą jaką zrobi, będzie sprawdzenie Twojej strony WWW. Jeśli Twoja strona wygląda jak ulotka za 150 zł... klient wyśmieje tę ofertę i pójdzie do konkurencji.
                  </p>
                  <p className="text-white font-bold">
                    Zostaw kontakt. Zbudujemy dla Ciebie wizerunek i stronę, która sprawi, że klienci będą błagać, by zapłacić Ci te {results.newPrice} PLN.
                  </p>
                </div>
                
                <div className="md:w-1/2 w-full bg-black p-6 rounded-xl border border-white/5">
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 p-4 text-white focus:outline-none focus:border-purple-500 rounded-lg text-sm" placeholder="Twój e-mail służbowy" disabled={status === 'sending' || status === 'success'} />
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 p-4 text-white focus:outline-none focus:border-purple-500 rounded-lg text-sm" placeholder="Numer telefonu" disabled={status === 'sending' || status === 'success'} />
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                        <ShieldQuestion className="text-purple-500" size={14} />
                        {num1} + {num2} = ?
                      </div>
                      <input type="number" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} className="w-16 bg-black border border-white/20 p-1.5 text-center text-white focus:border-purple-500 outline-none rounded-lg text-sm" disabled={status === 'sending' || status === 'success'} />
                    </div>

                    <button type="submit" disabled={status === 'sending' || status === 'success'} className="w-full mt-4 bg-purple-600 text-white font-bold py-4 rounded-lg hover:bg-purple-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {status === 'sending' ? <Loader2 className="animate-spin" /> : status === 'success' ? <><CheckCircle /> Wysłano! Odbierzemy.</> : <>Zbudujcie moją markę Premium <ArrowRight size={18} /></>}
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

export default OfferArchitect;
