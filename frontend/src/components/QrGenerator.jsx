import React, { useState } from 'react';
import ConsentCheckbox from './ConsentCheckbox';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Download, ArrowRight, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const QrGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatUrl = (val) => {
    let formatted = val.trim();
    if (!formatted) return '';
    if (!formatted.startsWith('http') && formatted.includes('.')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputValue || !email.trim() || !marketingConsent) {
      setError(!inputValue ? 'Wpisz adres do wygenerowania kodu QR.' : !email.trim() ? 'Podaj adres e-mail.' : 'Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setError('');
    setLoading(true);
    setQrUrl(null);
    
    const targetData = formatUrl(inputValue);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Generator QR",
        email_klienta: email.trim(),
        marketing_consent: true,
        wpisane_dane: targetData,
        message: `Klient właśnie generuje kod QR dla adresu: ${targetData}. Prawdopodobnie robi wizytówki, baner lub okleja auto!`
      })
    }).catch(e => console.error("Webhook error", e));

    // Symulacja ładowania
    setTimeout(() => {
      const generatedUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(targetData)}&format=png&margin=20`;
      setQrUrl(generatedUrl);
      setLoading(false);
    }, 800);
  };

  const downloadQR = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'VisiLogo_QRCode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      // Jeśli przeglądarka zablokuje pobieranie, otworzy grafikę w nowej karcie
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] bg-[#00FFD1]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20"
          >
            <QrCode size={16} /> Narzędzie B2B
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Darmowy Generator <br/><span className="text-[#00FFD1]">Kodów QR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Potrzebujesz kodu na nowe wizytówki, ulotki albo firmowe auto? Wpisz adres swojej strony internetowej i pobierz gotowy plik do druku w 3 sekundy.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleGenerate} 
          className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl mb-12 shadow-2xl max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Adres WWW lub Telefon</label>
            <input 
              type="text" 
              placeholder="np. visilogo.com" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Adres e-mail</label>
            <input
              type="email"
              placeholder="kontakt@twojafirma.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
              required
              disabled={loading}
            />
          </div>

          <ConsentCheckbox
            marketingConsent={marketingConsent}
            setMarketingConsent={setMarketingConsent}
            disabled={loading}
          />
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <button 
            type="submit" 
            disabled={loading || !marketingConsent}
            className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-10 rounded-lg transition-all text-lg ${loading || !marketingConsent ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00FFD1] text-black hover:bg-white shadow-[0_0_20px_rgba(0,255,209,0.3)]'}`}
          >
            {loading ? <><Loader2 className="animate-spin" size={24} /> Generowanie pliku...</> : <><QrCode size={24} /> Stwórz Kod QR</>}
          </button>
          <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-500 font-mono">
            <ShieldCheck size={14} className="text-[#00FFD1]" /> 100% darmowe. Bez znaków wodnych. Gotowe do druku.
          </div>
        </motion.form>

        <AnimatePresence>
          {qrUrl && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Sekcja z kodem */}
              <div className="bg-white p-8 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                <div className="w-56 h-56 bg-gray-100 rounded-xl mb-8 p-4 border-2 border-dashed border-gray-300">
                  <img src={qrUrl} alt="Twój Kod QR" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <button 
                  type="button"
                  onClick={downloadQR}
                  className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 w-full justify-center"
                >
                  <Download size={18} /> Pobierz PNG (Wysoka Jakość)
                </button>
              </div>

              {/* Sekcja sprzedażowa (Haczyk) */}
              <div className="bg-[#0A0A0A] border border-[#00FFD1]/30 p-8 rounded-2xl flex flex-col justify-center">
                <div className="bg-[#00FFD1]/10 w-12 h-12 rounded-full flex items-center justify-center text-[#00FFD1] mb-6">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Twój kod działa. Ale czy strona sprzedaje?</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Kiedy potencjalny klient zeskanuje ten kod z Twojej wizytówki, trafi na stronę za pomocą smartfona. Jeśli witryna wolno się ładuje, jest nieczytelna lub wygląda przestarzale – <strong className="text-white">kod zadziała, ale klient ucieknie.</strong>
                </p>
                <div className="space-y-4">
                  <a href="/#contact" className="inline-flex items-center gap-2 text-[#00FFD1] font-bold hover:text-white transition-colors group">
                    Zamów nowoczesną stronę mobilną <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="w-full h-[1px] bg-white/10" />
                  <a href="/pojedynek" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-white transition-colors group text-sm">
                    Przetestuj szybkość obecnej strony <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QrGenerator;
