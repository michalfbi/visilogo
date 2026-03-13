import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MailX, ArrowRight, Lock, Loader2, Activity, ShieldCheck } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const SPAM_WORDS = [
  "za darmo", "darmow", "promocj", "rabat", "zniżk", "okazj", "zarabiaj", "gwarancj", 
  "kliknij", "pilne", "wygraj", "najniższa cena", "tylko teraz", "kup teraz", "bez ryzyka", 
  "100%", "inwestycj", "bezpłatn", "zysk", "oferta", "super", "szansa", "wyjątkow", "natychmiast"
];

const SpamScanner = () => {
  const [emailText, setEmailText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (status === 'scanning') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStatus('locked_results'), 600);
        }
        setProgress(currentProgress);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [status]);

  const analyzeEmail = (text) => {
    let score = 100;
    let foundIssues = [];
    let highlightedText = text;

    let spamWordsCount = 0;
    SPAM_WORDS.forEach(word => {
      const regex = new RegExp(`(${word}[a-ząćęłńóśźż]*)`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        spamWordsCount += matches.length;
        score -= (matches.length * 5);
        if (!foundIssues.includes("Użyto agresywnych słów sprzedażowych")) {
          foundIssues.push("Użyto agresywnych słów sprzedażowych");
        }
        highlightedText = highlightedText.replace(regex, '<span class="bg-red-500/20 text-red-400 font-bold px-1 rounded border border-red-500/30">$1</span>');
      }
    });

    const words = text.split(/\s+/);
    const capsWords = words.filter(w => w.length > 3 && w === w.toUpperCase());
    if (capsWords.length > 2) {
      score -= (capsWords.length * 2);
      foundIssues.push("Nadużywanie wielkich liter (CAPS LOCK)");
      capsWords.forEach(cw => {
        highlightedText = highlightedText.replace(new RegExp(`\\b${cw}\\b`, 'g'), `<span class="bg-yellow-500/20 text-yellow-400 font-bold px-1 rounded border border-yellow-500/30">${cw}</span>`);
      });
    }

    if (/(!!+|!\\?|\\?\\?+)/.test(text)) {
      score -= 10;
      foundIssues.push("Nadmierna interpunkcja (!!! lub ???)");
      highlightedText = highlightedText.replace(/(!!+|!\\?|\\?\\?+)/g, '<span class="bg-orange-500/20 text-orange-400 font-bold px-1 rounded border border-orange-500/30">$&</span>');
    }

    if (score < 0) score = 0;

    return {
      score,
      issuesCount: spamWordsCount + (capsWords.length > 2 ? 1 : 0) + (/(!!+|!\\?|\\?\\?+)/.test(text) ? 1 : 0),
      issues: foundIssues,
      highlightedText
    };
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!emailText.trim()) return;
    
    const results = analyzeEmail(emailText);
    setAnalysis(results);
    setStatus('scanning');
    setProgress(0);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Skaner SPAMu",
        email_klienta: userEmail.trim(),
        wynik_skanera: analysis.score,
        message: `Lead! Klient (${userEmail}) skanuje maile pod kątem SPAMu. Szuka sposobów na lepszą sprzedaż.`
      })
    }).catch(err => console.error("Webhook error", err));

    setStatus('complete');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-red-500/20"
          >
            <ShieldAlert size={16} /> Weryfikator Deliverability
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Skaner <span className="text-red-500">Anty-Spamowy</span> B2B
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Twoje maile trafiają w próżnię? Wklej treść wiadomości, a my w 3 sekundy wskażemy słowa, przez które wpadasz do SPAMu.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col h-full relative overflow-hidden">
              <form onSubmit={handleScan} className="flex flex-col h-full">
                <div className="mb-6 flex-grow flex flex-col">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"><MailX size={16} className="text-red-500"/> Treść Twojego Maila</label>
                  <textarea 
                    placeholder="Wklej tutaj treść wiadomości..." 
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    required
                    className="w-full h-64 bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none font-sans text-sm leading-relaxed"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status !== 'idle' && status !== 'complete'}
                  className={`w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-lg transition-all text-lg mt-auto ${status === 'scanning' ? 'bg-gray-800 text-gray-500' : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]'}`}
                >
                  <Activity size={20} /> Przeskanuj Wiadomość
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-2xl p-8 text-center text-gray-500"
                >
                  Wklej tekst wiadomości i kliknij "Przeskanuj", aby wykryć zagrożenia.
                </motion.div>
              )}

              {status === 'scanning' && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-10"
                >
                  <Loader2 size={48} className="text-red-500 mb-6 animate-spin" />
                  <h3 className="text-xl font-bold text-white mb-2">Analiza Algorytmiczna...</h3>
                  <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                    <motion.div className="h-full bg-red-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.6 }} />
                  </div>
                </motion.div>
              )}

              {status === 'locked_results' && analysis && (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-white/5 border border-red-500/30 p-8 rounded-xl relative shadow-2xl flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-2">Wynik Dostarczalności:</div>
                    <div className={`text-6xl font-black mb-2 ${getScoreColor(analysis.score)}`}>{analysis.score}<span className="text-2xl text-gray-500">/100</span></div>
                    <p className="text-white mb-8">Wykryto <strong className="text-red-500">{analysis.issuesCount} zagrożeń</strong>.</p>
                    <form onSubmit={handleUnlock} className="w-full max-w-sm bg-black p-6 rounded-xl border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                      <Lock size={32} className="mx-auto text-gray-500 mb-4" />
                      <h4 className="text-sm font-bold text-white mb-4">Odblokuj raport błędów</h4>
                      <input 
                        type="email" 
                        placeholder="Twój adres e-mail" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="w-full bg-[#0A0A0A] border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors mb-4 text-sm text-center"
                      />
                      <button type="submit" className="w-full font-bold py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-500 text-sm transition-colors">
                        Pokaż co poprawić
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {status === 'complete' && analysis && (
                <motion.div 
                  key="unlocked"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl relative shadow-xl flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Raport Analizy Tekstu</div>
                      <div className={`font-bold text-lg ${getScoreColor(analysis.score)}`}>Wynik: {analysis.score}/100</div>
                    </div>
                    {analysis.issues.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-red-500 font-bold mb-2 uppercase">Wykryte Problemy:</div>
                        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1 mb-4">
                          {analysis.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                        </ul>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded-lg text-black text-[13px] leading-relaxed font-sans overflow-y-auto max-h-[250px] border border-gray-200" dangerouslySetInnerHTML={{ __html: analysis.highlightedText }}></div>
                  </div>

                  <div className="bg-[#0A0A0A] border border-red-500/30 p-6 rounded-xl flex flex-col justify-center shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/10 p-3 rounded-full text-red-500 shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Mail dotarł. Co dalej?</h3>
                        <p className="text-gray-400 mb-4 text-xs leading-relaxed">
                          Twój mail ominął SPAM. Ale kiedy prezes w niego kliknie i zobaczy starą stronę WWW... natychmiast ją zamknie. <strong className="text-white">Nie przepalaj trudu włożonego w wiadomości słabą witryną.</strong>
                        </p>
                        <a href="/#contact" className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-white transition-colors group text-xs uppercase tracking-wider">
                          Zbudujmy stronę godną Twojej oferty <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
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

export default SpamScanner;
