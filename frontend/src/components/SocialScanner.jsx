import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Loader2, AlertTriangle, ArrowRight, Smartphone, Linkedin, MessageCircle, CheckCircle } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const SocialScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  const formatUrl = (inputUrl) => {
    if (!inputUrl) return '';
    let formatted = inputUrl.trim().toLowerCase();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Wpisz adres strony, aby rozpocząć skanowanie.');
      return;
    }

    setLoading(true);
    setError('');
    setPreviewData(null);
    setImageFailed(false); // Resetujemy błąd obrazka przy nowym skanowaniu

    const targetUrl = formatUrl(url);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Skaner Wizerunku",
        skanowana_strona: targetUrl,
        message: `Klient sprawdza, jak jego strona (${targetUrl}) wygląda w social mediach i wiadomościach.`
      })
    }).catch(e => console.error("Nie udało się wysłać leada", e));

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`);
      const data = await response.json();

      if (data.status === 'success') {
        setPreviewData({
          title: data.data.title || 'Brak tytułu strony',
          description: data.data.description || 'Brak opisu (Description tag). Twój link wygląda podejrzanie.',
          image: data.data.image?.url || null,
          url: data.data.url,
          publisher: data.data.publisher || new URL(targetUrl).hostname
        });
      } else {
        throw new Error("Nie udało się pobrać danych strony. Prawdopodobnie serwer blokuje dostęp lub domena nie istnieje.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasValidImage = previewData?.image && !imageFailed;

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <Eye size={16} /> Skaner Pierwszego WraĹźenia
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            SprawdĹş, czy TwĂłj link <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">odstrasza inwestorĂłw</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Wysyłasz ofertę na LinkedIn lub mailu? Zobacz dokładnie, co widzi prezes po drugiej stronie ekranu, zanim w ogĂłle kliknie w link.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleScan} 
          className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl mb-12 shadow-2xl max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Adres Twojej Strony</label>
            <input 
              type="text" 
              placeholder="np. twojafirma.pl" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 flex items-start gap-3">
              <AlertTriangle size={24} className="shrink-0 mt-0.5" /> 
              <div className="text-sm">{error}</div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-10 rounded-lg transition-all text-lg ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00FFD1] text-black hover:bg-[#00e6bc] shadow-[0_0_20px_rgba(0,255,209,0.3)]'}`}
          >
            {loading ? <><Loader2 className="animate-spin" size={24} /> Generowanie podglądu...</> : <><Smartphone size={24} /> Wygeneruj Podgląd B2B</>}
          </button>
        </motion.form>

        <AnimatePresence>
          {previewData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Podgląd: LinkedIn */}
                <div className="bg-[#1D2226] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                  <div className="p-4 border-b border-gray-700 flex items-center gap-2">
                    <Linkedin className="text-[#0A66C2]" size={20} />
                    <span className="text-white font-bold text-sm">Wiadomość LinkedIn</span>
                  </div>
                  <div className="p-4 bg-white m-4 rounded-lg overflow-hidden border border-gray-200">
                    <div className="w-full h-40 bg-gray-100 -mt-4 -mx-4 mb-4 border-b border-gray-200 relative flex items-center justify-center overflow-hidden">
                      {hasValidImage ? (
                        <img 
                          src={previewData.image} 
                          alt="OgImage" 
                          className="w-full h-full object-cover" 
                          onError={() => setImageFailed(true)}
                        />
                      ) : (
                        <div className="flex flex-col items-center text-red-500 p-4 text-center">
                          <AlertTriangle size={32} className="mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Brak lub zepsute zdjęcie</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-black text-sm line-clamp-1">{previewData.title}</h4>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{previewData.description}</p>
                    <p className="text-gray-400 text-[10px] mt-2 uppercase">{previewData.publisher}</p>
                  </div>
                </div>

                {/* Podgląd: iMessage / SMS */}
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl border border-gray-300">
                  <div className="p-4 border-b border-gray-300/50 flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm">
                    <MessageCircle className="text-green-500" size={20} />
                    <span className="text-black font-bold text-sm">iMessage / SMS Biznesowy</span>
                  </div>
                  <div className="p-6 flex flex-col items-end">
                    <div className="bg-[#E9E9EB] w-64 rounded-2xl overflow-hidden shadow-sm">
                      <div className="w-full h-32 bg-gray-300 relative flex items-center justify-center overflow-hidden">
                        {hasValidImage ? (
                          <img 
                            src={previewData.image} 
                            alt="OgImage" 
                            className="w-full h-full object-cover" 
                            onError={() => setImageFailed(true)}
                          />
                        ) : (
                          <div className="flex flex-col items-center text-red-500/60 p-4 text-center">
                            <AlertTriangle size={24} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Brak Grafiki</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-gray-200">
                        <h4 className="font-bold text-black text-sm line-clamp-2 leading-tight">{previewData.title}</h4>
                        <p className="text-gray-500 text-xs mt-1 lowercase font-mono">{previewData.publisher}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Analiza i CTA - ZMIENIA KOLOR W ZALEĹťNOŚCI OD OBECNOŚCI ZDJĘCIA */}
              <div className={`p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${hasValidImage ? 'bg-[#00FFD1]/5 border-[#00FFD1]/20' : 'bg-red-500/5 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]'}`}>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {hasValidImage ? <><CheckCircle className="text-[#00FFD1]" /> Tagi działają poprawnie</> : <><AlertTriangle className="text-red-500" /> Twój link wygląda jak SPAM!</>}
                  </h4>
                  <p className="text-gray-400 max-w-2xl">
                    {hasValidImage 
                      ? 'Technicznie Twoja strona zaciąga miniaturę. Pytanie brzmi: czy ta miniatura krzyczy "Jesteśmy ekspertami premium"? Jeśli jest to losowe zdjęcie z darmowego stocka, wciąż tracisz potencjał.'
                      : 'Krytyczny błąd: Twoja strona nie posiada działającego zdjęcia w kodzie! Kiedy wysyłasz ofertę na komunikatorze, potencjalny klient widzi zepsuty link, ktĂłry budzi zero zaufania. Profesjonalne marki tak nie wyglądają.'}
                  </p>
                </div>
                <a href="/#contact" className={`shrink-0 inline-flex items-center gap-2 font-bold py-4 px-8 rounded-lg transition-all ${hasValidImage ? 'bg-white text-black hover:bg-gray-200' : 'bg-red-600 text-white hover:bg-red-500'}`}>
                  Naprawmy to (Kontakt) <ArrowRight size={20} />
                </a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialScanner;
