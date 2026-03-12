import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Loader2, Zap, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

const Duel = () => {
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const formatUrl = (url) => {
    if (!url) return '';
    let formatted = url.trim().toLowerCase();
    // Automatycznie dodajemy https, jeśli użytkownik tego nie wpisał
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const fetchScore = async (url) => {
    const targetUrl = formatUrl(url);
    const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile`;
    
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      
      if (!response.ok) {
        // Przechwytujemy dokładny błąd z Google
        throw new Error(data?.error?.message || `Odpowiedź serwera: ${response.status}`);
      }
      
      if (!data.lighthouseResult?.categories?.performance?.score) {
        throw new Error("Google zwróciło pusty wynik wydajności dla tej strony.");
      }
      
      return Math.round(data.lighthouseResult.categories.performance.score * 100);
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

    try {
      // Wyłapujemy niezależnie błędy dla obu stron, aby wiedzieć, która nawaliła
      const yourScorePromise = fetchScore(yourUrl).catch(e => { throw new Error(`Błąd analizy TWOjej strony (${yourUrl}): ${e.message}`) });
      const competitorScorePromise = fetchScore(competitorUrl).catch(e => { throw new Error(`Błąd analizy KONKURENTA (${competitorUrl}): ${e.message}`) });

      const [yourScore, competitorScore] = await Promise.all([yourScorePromise, competitorScorePromise]);

      setResults({
        you: { url: yourUrl, score: yourScore },
        competitor: { url: competitorUrl, score: competitorScore },
        youWon: yourScore >= competitorScore
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <Swords size={16} /> Pojedynek na Szybkość
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
            Algorytmy Google bezlitośnie promują szybsze i nowocześniejsze strony. Wpisz swój adres oraz adres rywala i zobaczcie prawdę w 15 sekund.
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
              className={`inline-flex items-center gap-3 font-bold py-4 px-10 rounded-lg transition-all text-lg ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00FFD1] text-black hover:bg-[#00e6bc] hover:scale-105'}`}
            >
              {loading ? <><Loader2 className="animate-spin" size={24} /> Trwa głęboka analiza Google...</> : <><Zap size={24} /> Rozpocznij Starcie</>}
            </button>
            {loading && <p className="text-gray-500 text-sm mt-4">Łączenie z serwerami Google. To potrwa około 10-15 sekund.</p>}
          </div>
        </motion.form>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center border-b border-white/10 pb-6">Wynik Audytu Mobilnego (Skala 0-100)</h3>
              
              <div className="space-y-8 mb-12">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold flex items-center gap-2">Twoja witryna {results.youWon && <CheckCircle size={18} className="text-[#00FFD1]" />}</span>
                    <span className={`font-bold text-2xl ${results.you.score > 70 ? 'text-[#00FFD1]' : 'text-yellow-500'}`}>{results.you.score} pkt</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${results.you.score}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-4 rounded-full ${results.you.score > 70 ? 'bg-[#00FFD1]' : 'bg-yellow-500'}`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 font-bold flex items-center gap-2">Konkurencja {!results.youWon && <CheckCircle size={18} className="text-red-500" />}</span>
                    <span className="font-bold text-2xl text-red-500">{results.competitor.score} pkt</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${results.competitor.score}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-4 rounded-full bg-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl border ${results.youWon ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <h4 className="text-xl font-bold text-white mb-2">
                  {results.youWon ? 'Wygrywasz technologicznie, ale...' : 'Przegrywasz wyścig o klienta!'}
                </h4>
                <p className="text-gray-300 mb-6">
                  {results.youWon 
                    ? 'Wynik techniczny masz lepszy. Jednak w B2B liczy się też zaufanie i wizerunek. Czy Twój obecny branding i design przekładają się na zapytania ofertowe? Jeśli nie – zróbmy to porządnie.'
                    : 'Tragiczna wiadomość. Konkurent ma szybszą stronę, co oznacza, że Google promuje go wyżej, a klienci nie uciekają z powodu długiego ładowania. Tracisz pieniądze każdego dnia.'}
                </p>
                <a href="/#contact" className={`inline-flex items-center gap-2 font-bold py-3 px-6 rounded-lg transition-all ${results.youWon ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-red-600 text-white hover:bg-red-500'}`}>
                  {results.youWon ? 'Porozmawiajmy o rebrandingu' : 'Naprawmy Twoją stronę (Audyt)'} <ArrowRight size={18} />
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
