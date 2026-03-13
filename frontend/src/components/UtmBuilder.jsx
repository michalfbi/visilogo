import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, CheckCircle, BarChart, ArrowRight, MousePointer2, Settings2 } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const UtmBuilder = () => {
  const [formData, setFormData] = useState({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildUrl = (e) => {
    e.preventDefault();
    if (!formData.url) return;

    try {
      // Upewnijmy się, że URL ma http/https
      let rawUrl = formData.url.trim();
      if (!/^https?:\/\//i.test(rawUrl)) {
        rawUrl = 'https://' + rawUrl;
      }

      const urlObj = new URL(rawUrl);
      
      if (formData.source) urlObj.searchParams.set('utm_source', formData.source.trim());
      if (formData.medium) urlObj.searchParams.set('utm_medium', formData.medium.trim());
      if (formData.campaign) urlObj.searchParams.set('utm_campaign', formData.campaign.trim());
      if (formData.term) urlObj.searchParams.set('utm_term', formData.term.trim());
      if (formData.content) urlObj.searchParams.set('utm_content', formData.content.trim());

      const finalUrl = urlObj.toString();
      setGeneratedLink(finalUrl);
      setCopied(false);

      // CICHY ZAPIS LEADA
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: "Lead z Narzędzia: Kreator UTM",
          docelowy_url: formData.url,
          zrodlo_kampanii: formData.source,
          message: `Przedsiębiorca tworzy link UTM dla domeny "${formData.url}" (źródło: ${formData.source}). Szykuje się jakaś kampania – może potrzebuje pomocy przy analityce lub reklamach?`
        })
      }).catch(err => console.error("Webhook error", err));
      
    } catch (err) {
      alert("Wpisz poprawny adres URL (np. twojafirma.pl)");
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-orange-500/20"
          >
            <Settings2 size={16} /> Narzędzie Analityczne B2B
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Kreator Linków <br/><span className="text-orange-500">Śledzących (UTM)</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Chcesz wiedzieć, czy klient przyszedł z Facebooka, maila czy z LinkedIna? Oznacz swoje linki tagami UTM, a Google Analytics powie Ci dokładnie, która kampania przynosi zyski.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Formularz UTM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 space-y-6"
          >
            <form onSubmit={buildUrl} className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col h-full">
              
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">Adres docelowy strony (URL) *</label>
                <input 
                  type="text" name="url" placeholder="np. https://visilogo.com/oferta" value={formData.url} onChange={handleChange} required
                  className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Pełen adres strony, na którą chcesz kierować ruch.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Źródło kampanii (utm_source) *</label>
                  <input 
                    type="text" name="source" placeholder="np. facebook, newsletter, google" value={formData.source} onChange={handleChange} required
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Medium kampanii (utm_medium) *</label>
                  <input 
                    type="text" name="medium" placeholder="np. cpc, email, social" value={formData.medium} onChange={handleChange} required
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Nazwa kampanii (utm_campaign) *</label>
                <input 
                  type="text" name="campaign" placeholder="np. wiosenna_wyprzedaz_b2b" value={formData.campaign} onChange={handleChange} required
                  className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8 border-t border-white/10 pt-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">Słowo kluczowe (utm_term) - opcjonalnie</label>
                  <input 
                    type="text" name="term" placeholder="np. agencja+marketingowa" value={formData.term} onChange={handleChange}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">Treść reklamy (utm_content) - opcjonalnie</label>
                  <input 
                    type="text" name="content" placeholder="np. niebieski_baner_logo" value={formData.content} onChange={handleChange}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-3 font-bold py-4 px-8 rounded-lg transition-all text-lg bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)] mt-auto">
                <Link2 size={20} /> Wygeneruj Link Śledzący
              </button>
            </form>
          </motion.div>

          {/* Wynik i Haczyk Sprzedażowy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {!generatedLink ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center border border-dashed border-white/20 rounded-2xl p-8 text-center text-gray-500 bg-white/5"
                >
                  Wypełnij parametry kampanii po lewej stronie, aby stworzyć poprawny link dla Google Analytics.
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  <div className="bg-white/5 border border-orange-500/30 p-6 rounded-xl relative shadow-2xl">
                    <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><MousePointer2 size={14}/> Twój gotowy link UTM</div>
                    
                    <div className="bg-black border border-white/10 p-4 rounded-lg break-all font-mono text-sm text-gray-300 mb-6 max-h-[150px] overflow-y-auto">
                      {generatedLink}
                    </div>

                    <button 
                      onClick={handleCopy}
                      className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                      {copied ? <><CheckCircle size={18} /> Skopiowano!</> : <><Copy size={18} /> Kopiuj Link</>}
                    </button>
                  </div>

                  {/* Haczyk Sprzedażowy */}
                  <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl flex flex-col justify-center shadow-xl relative overflow-hidden flex-grow">
                    <div className="bg-orange-500/10 w-12 h-12 rounded-full flex items-center justify-center text-orange-500 mb-4">
                      <BarChart size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Wiesz skąd klikają. Ale wiesz, dlaczego nie kupują?</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      Śledzenie ruchu to świetny pierwszy krok. Jednak jeśli ściągasz ludzi na stronę za pomocą drogich reklam, a ona nie jest zoptymalizowana pod konwersje – tracisz ten budżet. <strong className="text-white">Zbudujmy Ci lejek, który zamieni te kliknięcia w prawdziwe zyski.</strong>
                    </p>
                    <a href="/#contact" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-white transition-colors group text-sm">
                      Darmowa analiza Twojej analityki <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

export default UtmBuilder;
