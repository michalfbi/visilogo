import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2, ShieldCheck, Mail, User, Phone, Layout, Zap, Search, Target, ChevronLeft, Tag, Plus } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const PageWebCreator = () => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', 
    style: '', colors: '', goal: '', inspirations: '' 
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setStatus('loading');

    const payload = {
      form_type: "Kreator Zaawansowanej Strony WWW (Closer)",
      name: formData.name, email: formData.email, phone: formData.phone,
      message: `Lead z燿edykowanego kreatora WWW!\n\n--- Brief Klienta ---\nStyl: ${formData.style}\nKolory: ${formData.colors}\nCel: ${formData.goal}\nInspiracje: ${formData.inspirations}`
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
    <div className="min-h-screen bg-[#020202] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#00FFD1]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Przycisk powrotu */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/skonfiguruj-projekt" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#00FFD1] transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Wr贸膰 do konfiguratora us艂ug
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Sekcja Sprzeda偶owa (Copywriting) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-[#00FFD1]/20">
              <Layout size={16} /> Zaawansowana Strona WWW
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Zbudujmy maszyn臋 do <span className="text-[#00FFD1]">generowania lead贸w</span>.
            </h1>
            
            <p className="text-lg text-gray-400">
              Nie robimy zwyk艂ych "wizyt贸wek". Projektujemy zoptymalizowane pod konwersj臋 serwisy B2B, kt贸re 艂aduj膮 si臋 b艂yskawicznie i爏kutecznie zamieniaj膮 ruch z爎eklam w爖apytania ofertowe.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shrink-0 text-[#00FFD1]"><Zap size={24} /></div>
                <div>
                  <h3 className="text-white font-bold mb-1">B艂yskawiczne 艂adowanie</h3>
                  <p className="text-sm text-gray-400">Architektura gwarantuje maksymalne wyniki w燝oogle PageSpeed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shrink-0 text-[#00FFD1]"><Target size={24} /></div>
                <div>
                  <h3 className="text-white font-bold mb-1">Neuromarketing i燯X</h3>
                  <p className="text-sm text-gray-400">Projektujemy 艣cie偶ki u偶ytkownika, kt贸re naturalnie prowadz膮 do kontaktu.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shrink-0 text-[#00FFD1]"><Search size={24} /></div>
                <div>
                  <h3 className="text-white font-bold mb-1">Optymalizacja SEO (On-Site)</h3>
                  <p className="text-sm text-gray-400">Struktura kodu i爊ag艂贸wk贸w zgodna z爓ytycznymi wyszukiwarek.</p>
                </div>
              </div>
            </div>

            {/* UPSELL BANNER */}
            <div className="mt-10 p-6 bg-[#00FFD1]/5 border border-[#00FFD1]/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FFD1]/10 rounded-full blur-[30px] -mr-10 -mt-10 pointer-events-none" />
              <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-lg">
                <Tag size={20} className="text-[#00FFD1]" /> Chcesz zyska膰 nawet 20% rabatu?
              </h4>
              <p className="text-sm text-gray-400 mb-5 relative z-10">
                Strona WWW to silny fundament, ale najlepiej dzia艂a w爌akiecie z爌艂atnymi kampaniami lub analityk膮. Dobierz wi臋cej us艂ug i爋bni偶 cen臋 ca艂ego zestawu!
              </p>
              
              {/* TUTAJ ZMIANA: Dodajemy parametr state do linku, aby przekaza膰 informacj臋 do konfiguratora */}
              <Link 
                to="/skonfiguruj-projekt" 
                state={{ preselectedService: 'www_adv' }}
                className="relative z-10 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#0A0A0A] border border-[#00FFD1]/30 text-[#00FFD1] font-bold rounded-lg hover:bg-[#00FFD1] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,209,0.1)]"
              >
                <Plus size={18} /> Dobierz us艂ugi i爋bni偶 koszty
              </Link>
            </div>

          </motion.div>

          {/* Formularz - "Pok贸j zwierze艅" */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="sticky top-32">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Opowiedz nam o爏wojej wizji</h3>
              <p className="text-sm text-gray-400 mb-8">Wype艂nij niezobowi膮zuj膮cy brief. Na jego podstawie przygotujemy dok艂adn膮 wycen臋 i爏trategi臋 dla Twojej marki.</p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FFD1]"><CheckCircle size={40} /></div>
                    <h3 className="text-3xl font-bold text-white mb-4">Wizja przyj臋ta!</h3>
                    <p className="text-gray-400">Nasz zesp贸艂 przeanalizuje Twoje wytyczne i爓kr贸tce si臋 z燭ob膮 skontaktuje, aby om贸wi膰 szczeg贸艂y wdro偶enia.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Styl wizualny</label>
                        <select name="style" value={formData.style} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-3 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm">
                          <option value="">Wybierz...</option>
                          <option value="Nowoczesny i爋dwa偶ny">Nowoczesny i爋dwa偶ny</option>
                          <option value="Minimalistyczny (czysty)">Minimalistyczny (czysty)</option>
                          <option value="Biznesowy / Korporacyjny">Biznesowy / Korporacyjny</option>
                        </select>
                      </div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Kolorystyka</label>
                        <select name="colors" value={formData.colors} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-3 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm">
                          <option value="">Wybierz...</option>
                          <option value="Ciemny motyw (Dark Mode)">Ciemny motyw (Dark Mode)</option>
                          <option value="Jasny, przejrzysty">Jasny, przejrzysty</option>
                          <option value="Zgodnie z爉oim logo">Zgodnie z爉oim logo</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">G艂贸wny cel strony</label>
                      <select name="goal" value={formData.goal} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-3 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm">
                        <option value="">Wybierz...</option>
                        <option value="Generowanie lead贸w (B2B)">Generowanie lead贸w (B2B)</option>
                        <option value="Wizerunek / Portfolio">Wizerunek / Portfolio</option>
                        <option value="Sprzeda偶 e-commerce">Sprzeda偶 e-commerce</option>
                      </select>
                    </div>

                    <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Linki do inspiracji (opcjonalnie)</label>
                      <textarea name="inspirations" value={formData.inspirations} onChange={handleInputChange} rows="2" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm resize-none" placeholder="np. apple.com, stripe.com"></textarea>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><User size={12}/> Imi臋 i燦azwisko / Firma</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Mail size={12}/> E-mail *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm" />
                        </div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Phone size={12}/> Telefon</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm" />
                        </div>
                      </div>
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="w-full mt-4 bg-[#00FFD1] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Wy艣lij brief i爖apytaj o爓ycen臋 <ArrowRight size={18} /></>}
                    </button>
                    <div className="flex justify-center items-center gap-2 mt-2 text-[10px] text-gray-500 uppercase tracking-widest"><ShieldCheck size={12} className="text-[#00FFD1]" /> 100% darmowa wycena</div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PageWebCreator;