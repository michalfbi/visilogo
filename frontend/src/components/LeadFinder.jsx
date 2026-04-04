import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, ArrowRight, ShieldAlert, Target, ExternalLink, Mail, Lock, Activity, CheckCircle, Database } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const LeadFinder = () => {
  const [targetRole, setTargetRole] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, complete
  const [progress, setProgress] = useState(0);
  const [searchLink, setSearchLink] = useState('');

  useEffect(() => {
    if (status === 'scanning') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStatus('complete'), 600);
        }
        setProgress(currentProgress);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!targetRole.trim() || !location.trim() || !email.trim()) return;

    setStatus('scanning');
    setProgress(0);

    // X-Ray Search / Google Dorking dla polskiego LinkedIna
    const role = `"${targetRole.trim()}"`;
    const loc = `"${location.trim()}"`;
    const query = `site:pl.linkedin.com/in/ ${role} ${loc}`;
    const link = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    setSearchLink(link);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z�Narzędzia: Wyszukiwarka Leadów B2B",
        email_klienta: email.trim(),
        szuka_stanowiska: targetRole.trim(),
        szuka_w_miescie: location.trim(),
        message: `MOCNY LEAD! Klient (${email}) szuka kontaktów do: ${targetRole} w�${location}. Zamiast tracić czas na szukanie w�Google, powinni zlecić nam kampanię Ads!`
      })
    }).catch(e => console.error("Webhook error", e));
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-indigo-500/20"
          >
            <Users size={16} /> Narzędzie Prospectingowe
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Wyszukiwarka Ukrytych <br/><span className="text-indigo-500">Leadów B2B</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Płacisz za dostęp do bazy firm? Przestań. Wpisz kogo szukasz, a�nasze narzędzie wygeneruje komendę omijającą blokady i�pokaże Ci listę idealnych klientów prosto z�Google.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Formularz */}
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
                    onSubmit={handleSearch} 
                    className="flex flex-col h-full"
                  >
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Target size={16} className="text-indigo-500"/> Kogo dokładnie szukasz?</label>
                      <input 
                        type="text" 
                        placeholder="np. Dyrektor Finansowy, Prezes, Architekt" 
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                        className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Search size={16} className="text-indigo-500"/> W�jakim mieście/regionie?</label>
                      <input 
                        type="text" 
                        placeholder="np. Warszawa, Śląsk, Polska" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="mb-8 border-t border-white/10 pt-6">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><Mail size={16} className="text-indigo-500"/> Podaj e-mail, aby odblokować bazę</label>
                      <input 
                        type="email" 
                        placeholder="Twój adres e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-lg transition-all text-lg bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] mt-auto"
                    >
                      <Lock size={20} /> Generuj Listę Leadów
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 font-mono uppercase text-center">
                      <ShieldAlert size={14} className="text-indigo-500 shrink-0" /> Używamy metody X-Ray Search (100% legalne dorkingowanie)
                    </div>
                  </motion.form>
                )}

                {status === 'scanning' && (
                  <motion.div 
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-10"
                  >
                    <Activity size={48} className="text-indigo-500 mb-6 animate-pulse" />
                    <h3 className="text-xl font-bold text-white mb-2">Filtrowanie Indeksu...</h3>
                    <p className="text-indigo-400 text-sm font-mono h-6 mb-8">Omijanie ograniczeń bazy publicznej...</p>
                    
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-500"
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
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Baza Odblokowana</h3>
                    <p className="text-gray-400 text-sm mb-6">Skrypt wyszukiwania został pomyślnie wygenerowany. Zobacz wyniki w�oknie obok.</p>
                    <button 
                      onClick={() => { setStatus('idle'); setTargetRole(''); setLocation(''); setEmail(''); }}
                      className="text-indigo-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                    >
                      Szukaj innej branży
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Wynik i�Haczyk Sprzedażowy */}
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
                  <p className="max-w-xs">Panel dostępu do wyników jest zablokowany. Wypełnij parametry wyszukiwania, aby odblokować bezpieczny link.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="unlocked"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  {/* Wynik */}
                  <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-xl relative group">
                    <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><Database size={14}/> Twoja Baza Klientów</div>
                    <p className="text-white text-sm leading-relaxed mb-6">
                      Twój zaawansowany link wyszukiwania jest gotowy. Po kliknięciu otworzy się wyszukiwarka Google z�przefiltrowaną listą profili publicznych pasujących do Twoich kryteriów.
                    </p>
                    <a 
                      href={searchLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 font-bold py-4 px-6 rounded-lg transition-all bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                    >
                      Otwórz Wyszukiwarkę Leadów <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* Haczyk Sprzedażowy */}
                  <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl flex flex-col justify-center shadow-xl flex-grow relative overflow-hidden">
                    <h3 className="text-xl font-bold text-white mb-3">Znalazłeś ich. Ale czy oni wybiorą Ciebie?</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      Masz już na tacy idealnych klientów B2B. Problem w�tym, że zanim Ci odpiszą na wiadomość, sprawdzą z�kim mają do czynienia. <strong className="text-white">Jeśli wejdą na Twoją stronę i�zobaczą projekt sprzed lat – zignorują Cię.</strong> Zbudujmy witrynę, która wzbudzi zaufanie od pierwszych sekund.
                    </p>
                    <div className="space-y-4">
                      <a href="/#contact" className="inline-flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition-colors group text-sm border-b border-white hover:border-indigo-400 pb-1 w-fit">
                        Zaprojektujmy wizerunek, który domyka sprzedaż <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

export default LeadFinder;
