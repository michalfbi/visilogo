import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Loader2, Zap, AlertTriangle, ArrowRight, CheckCircle, Activity, LayoutTemplate, Clock, MousePointer2 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const ScoreRing = ({ score, size = 140, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2 - 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const color = score >= 90 ? '#00FFD1' : score >= 50 ? '#eab308' : '#ef4444'; 

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full overflow-visible">
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-white/10" />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
};

const MetricBox = ({ icon: Icon, label, value, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-black/50 border border-white/5 p-4 rounded-xl flex flex-col items-start"
  >
    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-bold mb-2">
      <Icon size={14} />
      {label}
    </div>
    <span className="text-white font-mono text-lg">{value}</span>
  </motion.div>
);

const Duel = () => {
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // ==========================================
  // TUTAJ WKLEJ SWÓJ KLUCZ API OD GOOGLE
  // ==========================================
  const GOOGLE_API_KEY = 'AIzaSyCzr8S4AguqMXV6cqpG2YjUjGaIXFUkuAo';

  const formatUrl = (url) => {
    if (!url) return '';
    let formatted = url.trim().toLowerCase();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const fetchScore = async (url) => {
    const targetUrl = formatUrl(url);
    const keyParam = GOOGLE_API_KEY !== 'TUTAJ_WKLEJ_SWOJ_KLUCZ' ? `&key=${GOOGLE_API_KEY}` : '';
    const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${keyParam}`;
    
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.error?.message || `Odpowiedź serwera: ${response.status}`);
      }
      
      if (!data.lighthouseResult?.categories?.performance?.score) {
        throw new Error("Google zwróciło pusty wynik wydajności dla tej strony.");
      }
      
      const audits = data.lighthouseResult.audits;
      
      return {
        score: Math.round(data.lighthouseResult.categories.performance.score * 100),
        metrics: {
          fcp: audits['first-contentful-paint']?.displayValue || 'Brak',
          lcp: audits['largest-contentful-paint']?.displayValue || 'Brak',
          tbt: audits['total-blocking-time']?.displayValue || 'Brak',
          cls: audits['cumulative-layout-shift']?.displayValue || 'Brak',
        }
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleDuel = async (e) => {
    e.preventDefault();
    if (!yourUrl || !competitorUrl) {
      setError('Wprowadź oba adresy URL, aby rozpocząć pojedynek.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    // CICHY ZAPIS LEADA - wysyłamy adresy na Twój Webhook w�tle
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z�Narzędzia: Pojedynek Stron",
        twoja_strona: yourUrl,
        strona_konkurencji: competitorUrl,
        message: `Klient testuje swoją stronę (${yourUrl}) przeciwko rywalowi (${competitorUrl}). Sprawdź to i�przygotuj uderzenie!`
      })
    }).catch(e => console.error("Nie udało się wysłać leada", e));

    try {
      const yourDataPromise = fetchScore(yourUrl).catch(e => { throw new Error(`Błąd Twojej strony (${yourUrl}): ${e.message}`) });
      const competitorDataPromise = fetchScore(competitorUrl).catch(e => { throw new Error(`Błąd strony rywala (${competitorUrl}): ${e.message}`) });

      const [yourData, competitorData] = await Promise.all([yourDataPromise, competitorDataPromise]);

      setResults({
        you: { url: yourUrl, ...yourData },
        competitor: { url: competitorUrl, ...competitorData },
        youWon: yourData.score >= competitorData.score
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <Swords size={16} /> Pojedynek na Szybkość (Core Web Vitals)
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Sprawdź, czy konkurencja <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">kradnie Twoich klientów</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Pobieramy surowe dane bezpośrednio z�serwerów Google. Wpisz swój adres oraz adres rywala i�zobacz dokładną diagnozę technologiczną w�15 sekund.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleDuel} 
          className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl mb-12 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Twoja Strona</label>
              <input 
                type="text" 
                placeholder="np. twojafirma.pl" 
                value={yourUrl}
                onChange={(e) => setYourUrl(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Strona Konkurenta</label>
              <input 
                type="text" 
                placeholder="np. konkurent.pl" 
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 flex items-start gap-3">
              <AlertTriangle size={24} className="shrink-0 mt-0.5" /> 
              <div className="text-sm font-mono break-all">{error}</div>
            </div>
          )}

          <div className="text-center">
            <button 
              type="submit" 
              disabled={loading}
              className={`inline-flex items-center gap-3 font-bold py-4 px-10 rounded-lg transition-all text-lg ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00FFD1] text-black hover:bg-[#00e6bc] hover:scale-105 shadow-[0_0_20px_rgba(0,255,209,0.3)]'}`}
            >
              {loading ? <><Loader2 className="animate-spin" size={24} /> Trwa zaawansowana analiza...</> : <><Zap size={24} /> Rozpocznij Audyt Google</>}
            </button>
            {loading && <p className="text-gray-500 text-sm mt-4 font-mono">Łączenie z�Google PageSpeed Insights API...</p>}
          </div>
        </motion.form>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Twoja Strona - Wyniki */}
                <div className={`bg-[#0A0A0A] border p-8 rounded-2xl relative overflow-hidden ${results.youWon ? 'border-[#00FFD1]/30' : 'border-white/10'}`}>
                  {results.youWon && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFD1] to-transparent" />}
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    Twoja Witryna {results.youWon && <CheckCircle size={20} className="text-[#00FFD1]" />}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                    <ScoreRing score={results.you.score} />
                    <div className="text-gray-400 text-sm">
                      Google ocenia tę stronę jako <strong className={results.you.score >= 90 ? 'text-[#00FFD1]' : results.you.score >= 50 ? 'text-yellow-500' : 'text-red-500'}>{results.you.score >= 90 ? 'SZYBKĄ' : results.you.score >= 50 ? 'ŚREDNIĄ' : 'WOLNĄ'}</strong>.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MetricBox icon={Activity} label="Pierwsza Treść (FCP)" value={results.you.metrics.fcp} delay={0.1} />
                    <MetricBox icon={LayoutTemplate} label="Główny Element (LCP)" value={results.you.metrics.lcp} delay={0.2} />
                    <MetricBox icon={Clock} label="Czas Blokady (TBT)" value={results.you.metrics.tbt} delay={0.3} />
                    <MetricBox icon={MousePointer2} label="Przesunięcia (CLS)" value={results.you.metrics.cls} delay={0.4} />
                  </div>
                </div>

                {/* Strona Konkurencji - Wyniki */}
                <div className={`bg-[#0A0A0A] border p-8 rounded-2xl relative overflow-hidden ${!results.youWon ? 'border-red-500/30' : 'border-white/10'}`}>
                  {!results.youWon && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent" />}
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    Konkurencja {!results.youWon && <CheckCircle size={20} className="text-red-500" />}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                    <ScoreRing score={results.competitor.score} />
                    <div className="text-gray-400 text-sm">
                      Google ocenia tę stronę jako <strong className={results.competitor.score >= 90 ? 'text-[#00FFD1]' : results.competitor.score >= 50 ? 'text-yellow-500' : 'text-red-500'}>{results.competitor.score >= 90 ? 'SZYBKĄ' : results.competitor.score >= 50 ? 'ŚREDNIĄ' : 'WOLNĄ'}</strong>.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MetricBox icon={Activity} label="Pierwsza Treść (FCP)" value={results.competitor.metrics.fcp} delay={0.1} />
                    <MetricBox icon={LayoutTemplate} label="Główny Element (LCP)" value={results.competitor.metrics.lcp} delay={0.2} />
                    <MetricBox icon={Clock} label="Czas Blokady (TBT)" value={results.competitor.metrics.tbt} delay={0.3} />
                    <MetricBox icon={MousePointer2} label="Przesunięcia (CLS)" value={results.competitor.metrics.cls} delay={0.4} />
                  </div>
                </div>

              </div>

              {/* Dolny Panel z�Wezwaniem do Działania */}
              <div className={`p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${results.youWon ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {results.youWon ? 'Wygrywasz technologicznie, ale...' : 'Przegrywasz wyścig o�klienta w�Google!'}
                  </h4>
                  <p className="text-gray-400 max-w-2xl">
                    {results.youWon 
                      ? 'Wynik techniczny masz fenomenalny. Pytanie jednak, czy w�B2B sam kod wystarczy? Jeśli Twój obecny design nie budzi zaufania na miano lidera, a�kampanie nie generują zapytań – zróbmy to porządnie.'
                      : 'Tragiczna wiadomość. Konkurent ma znacznie szybszą stronę, co oznacza, że Google promuje go wyżej, a�jego klienci nie uciekają z�powodu długiego ładowania. Tracisz budżet każdego dnia.'}
                  </p>
                </div>
                <a href="/#contact" className={`shrink-0 inline-flex items-center gap-2 font-bold py-4 px-8 rounded-lg transition-all ${results.youWon ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-red-600 text-white hover:bg-red-500'}`}>
                  {results.youWon ? 'Porozmawiajmy o�rebrandingu' : 'Audyt i�Naprawa (Kontakt)'} <ArrowRight size={20} />
                </a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Duel;
