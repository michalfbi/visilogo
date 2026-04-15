import React, { useState, useEffect } from 'react';
import ConsentCheckbox from './ConsentCheckbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Crosshair, ArrowRight, ShieldAlert, Target, ExternalLink, Mail, Lock, Loader2, Activity } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";
const SCAN_STEPS = [
  "Nawiązywanie połączenia z Meta Ads API...",
  "Omijanie filtrów publicznych...",
  "Przeszukiwanie bazy aktywnych kreacji...",
  "Kompilowanie ukrytego linku dostępu...",
  "Gotowe. Otwieranie bezpiecznego kanału."
];

const AdsSpy = () => {
  const [competitor, setCompetitor] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, complete
  const [progress, setProgress] = useState(0);
  const [spyLink, setSpyLink] = useState('');
  const [scanText, setScanText] = useState('');

  useEffect(() => {
    if (status === 'scanning') {
      let currentProgress = 0;
      let stepIndex = 0;
      setScanText(SCAN_STEPS[0]);

      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStatus('complete'), 500);
        }
        
        setProgress(currentProgress);

        const newStepIndex = Math.min(Math.floor((currentProgress / 100) * SCAN_STEPS.length), SCAN_STEPS.length - 1);
        if (newStepIndex !== stepIndex) {
          stepIndex = newStepIndex;
          setScanText(SCAN_STEPS[stepIndex]);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSpy = (e) => {
    e.preventDefault();
    if (!competitor.trim() || !email.trim()) {
      setFormError('Wpisz dokładną nazwę firmy i adres e-mail, aby kontynuować.');
      return;
    }

    if (!marketingConsent) {
      setFormError('Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setFormError('');
    setStatus('scanning');
    setProgress(0);

    const query = encodeURIComponent(competitor.trim());
    const link = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=PL&q=${query}&search_type=keyword_unordered&media_type=all`;
    setSpyLink(link);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Szpieg Reklam",
        email_klienta: email.trim(),
        marketing_consent: true,
        szpiegowana_firma: competitor.trim(),
        message: `BINGO! Klient zostawił maila: ${email.trim()} i szpieguje reklamy firmy: "${competitor.trim()}". To idealny moment na uderzenie z ofertą!`
      })
    }).catch(e => console.error("Webhook error", e));
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
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
            Chcesz wiedzieć, czy Twój największy rywal puszcza reklamy na Facebooku i Instagramie? Wpisz jego nazwę, a wprowadzimy Cię do ukrytej biblioteki reklam. Zobacz na własne oczy, jak kradną Twoich klientów.
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
            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSpy} 
                    className="flex flex-col h-full"
                  >
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Target size={16} className="text-red-500"/> Kogo chcesz prześwietlić?</label>
                      <input 
                        type="text" 
                        placeholder="Nazwa Firmy Konkurencji" 
                        value={competitor}
                        onChange={(e) => setCompetitor(e.target.value)}
                        required
                        className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Mail size={16} className="text-red-500"/> Podaj e-mail, aby odblokować raport</label>
                      <input 
                        type="email" 
                        placeholder="Twój adres e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <ConsentCheckbox
                      marketingConsent={marketingConsent}
                      setMarketingConsent={setMarketingConsent}
                    />
                    {formError && (
                      <p className="text-sm text-red-400">{formError}</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={!marketingConsent}
                      className="w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-lg transition-all text-lg bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] mt-auto disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500"
                    >
                      <Lock size={20} /> Odblokuj Bibliotekę Reklam
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 font-mono uppercase text-center">
                      <ShieldAlert size={14} className="text-red-500 shrink-0" /> Analiza publicznych danych Meta (100% legalne i anonimowe)
                    </div>
                  </motion.form>
                )}

                {status === 'scanning' && (
                  <motion.div 
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-10"
                  >
                    <Activity size={48} className="text-red-500 mb-6 animate-pulse" />
                    <h3 className="text-xl font-bold text-white mb-2">Skanowanie Sieci...</h3>
                    <p className="text-red-400 text-sm font-mono h-6 mb-8">{scanText}</p>
                    
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.3 }}
                      />
                    </div>
                    <div className="text-gray-500 text-xs font-mono mt-2 text-right w-full">{progress}%</div>
                  </motion.div>
                )}

                {status === 'complete' && (
                  <motion.div 
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                      <Target size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Cel namierzony</h3>
                    <p className="text-gray-400 text-sm mb-6">Raport został odblokowany pomyślnie. Możesz teraz bezpiecznie przejrzeć aktywne reklamy konkurencji.</p>
                    <button 
                      onClick={() => { setStatus('idle'); setCompetitor(''); setEmail(''); }}
                      className="text-red-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                    >
                      Skanuj inną firmę
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Podgląd i Haczyk */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {status !== 'complete' ? (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-2xl p-8 text-center text-gray-500 relative overflow-hidden"
                >
                  <Lock size={48} className="mb-4 opacity-20" />
                  <p className="max-w-xs">Panel dostępu jest zablokowany. Wypełnij formularz po lewej stronie, aby wygenerować bezpieczny link.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="unlocked"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  {/* Wynik */}
                  <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-xl relative group">
                    <div className="text-red-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><Eye size={14}/> Aktywny Podgląd: {competitor}</div>
                    <p className="text-white text-sm leading-relaxed mb-6">
                      Uzyskaliśmy dostęp. Kliknij poniższy przycisk, aby otworzyć oficjalny panel Meta i zobaczyć wszystkie opłacone reklamy tej firmy.
                    </p>
                    <a 
                      href={spyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 font-bold py-4 px-6 rounded-lg transition-all bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    >
                      Otwórz Bibliotekę Meta <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* Haczyk Sprzedażowy */}
                  <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl flex flex-col justify-center shadow-xl flex-grow relative overflow-hidden">
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">Oni już tam są. A Ty?</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed relative z-10">
                      Jeśli widzisz ich reklamy to znaczy, że wydają budżet, by codziennie wyświetlać się Twoim potencjalnym klientom. Nie oddawaj im rynku za darmo. <strong className="text-white">Skoro znamy już ich strategię, zbudujmy kampanię, która zgarnie ich ruch.</strong>
                    </p>
                    <div className="space-y-4 relative z-10">
                      <a href="/#contact" className="inline-flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors group text-sm border-b border-white hover:border-red-500 pb-1">
                        Zleć nam zbadanie Twojego rynku <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
