import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, ArrowRight, Loader2, ShieldCheck, Mail, User, Phone, CheckCircle, Tag, Plus } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

// Lista usług zsynchronizowana z cennikiem + nowa kategoria druku
const servicesList = [
  // Wizerunek i Technologie
  { id: 'www', category: 'Wizerunek i Technologie', name: 'Zaawansowane Strony WWW', price: 600, desc: 'Wizytówki, Landing Pages, rozbudowane serwisy z animacjami UX/UI.' },
  { id: 'brand', category: 'Wizerunek i Technologie', name: 'Kompleksowy Branding', price: 990, desc: 'Logo, księga znaku, dobór typografii, paleta barw, Key Visual.' },
  { id: 'copy', category: 'Wizerunek i Technologie', name: 'Copywriting Biznesowy B2B', price: 600, desc: 'Perswazyjne teksty zbijające obiekcje na Twoją stronę.' },
  { id: 'analytics', category: 'Wizerunek i Technologie', name: 'Pełny Setup Analityczny', price: 500, desc: 'GA4, GTM, Pixel Meta, LinkedIn Insight, Hotjar.' },

  // Akwizycja i Generowanie Leadów
  { id: 'google_ads', category: 'Akwizycja i Generowanie Leadów', name: 'Kampanie Google Ads', price: 600, desc: 'Sieć wyszukiwania (Search), lokalne, dynamiczne (DSA).' },
  { id: 'social_ads', category: 'Akwizycja i Generowanie Leadów', name: 'Social Media Ads (Meta/LinkedIn)', price: 600, desc: 'Precyzyjne docieranie do decydentów B2B.' },
  { id: 'funnels', category: 'Akwizycja i Generowanie Leadów', name: 'Retargeting & Lejki', price: 800, desc: 'Ścieżki konwersji, formularze kwalifikujące, kampanie przypominające.' },

  // Usługi Lokalne i Content
  { id: 'social_mgmt', category: 'Usługi Lokalne i Content', name: 'Prowadzenie Social Media', price: 350, desc: 'Spójne wizualnie posty FB/LinkedIn (ok. 4 szt/mc).' },
  { id: 'gmb', category: 'Usługi Lokalne i Content', name: 'Optymalizacja Wizytówki Google', price: 200, desc: 'Nasycenie frazami, tarcza ochronna, odpowiadanie na opinie.' },
  { id: 'seo_article', category: 'Usługi Lokalne i Content', name: 'Artykuł SEO na bloga', price: 150, desc: 'Eksperckie treści budujące widoczność w wyszukiwarce.' },

  // Materiały Reklamowe i Druk
  { id: 'print_wizytowki', category: 'Materiały Reklamowe i Druk', name: 'Wizytówki (Projekt)', price: 250, desc: 'Indywidualny projekt graficzny. Koszt druku wyceniany osobno.' },
  { id: 'print_ulotki', category: 'Materiały Reklamowe i Druk', name: 'Ulotki (Projekt)', price: 250, desc: 'Skuteczny projekt graficzny ulotki. Koszt druku wyceniany osobno.' },
  { id: 'print_bannery', category: 'Materiały Reklamowe i Druk', name: 'Bannery Reklamowe (Projekt)', price: 250, desc: 'Projekt reklamy wielkoformatowej. Koszt druku wyceniany osobno.' },
  { id: 'print_teczki', category: 'Materiały Reklamowe i Druk', name: 'Teczki Firmowe (Projekt)', price: 250, desc: 'Projekt profesjonalnych teczek ofertowych. Koszt druku wyceniany osobno.' },
  { id: 'print_koszulki', category: 'Materiały Reklamowe i Druk', name: 'Koszulki Firmowe (Projekt)', price: 250, desc: 'Projekt nadruku na odzież roboczą/reklamową. Koszt odzieży i druku wyceniany osobno.' },
  { id: 'print_czapki', category: 'Materiały Reklamowe i Druk', name: 'Czapki z Logo (Projekt)', price: 250, desc: 'Projekt haftu lub nadruku. Koszt materiału i realizacji wyceniany osobno.' },
  { id: 'print_pojazd', category: 'Materiały Reklamowe i Druk', name: 'Oklejanie Pojazdu (Projekt)', price: 800, desc: 'Zaawansowany projekt graficzny na auto firmowe. Koszt folii i aplikacji wyceniany osobno.' }
];

const Configurator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleToggleService = (id) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logika rabatowa
  const count = selectedServices.length;
  let discountPercent = 0;
  if (count > 5) {
    discountPercent = 20; // 6+ usług -> 20%
  } else if (count > 4) {
    discountPercent = 15; // 5 usług -> 15%
  }

  const basePrice = selectedServices.reduce((sum, id) => {
    const service = servicesList.find(s => s.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const discountAmount = basePrice * (discountPercent / 100);
  const finalPrice = basePrice - discountAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (count === 0 || !formData.email) return;
    setStatus('loading');

    const selectedDetails = selectedServices.map(id => {
      const s = servicesList.find(serv => serv.id === id);
      return `${s.name} (${s.price} PLN)`;
    }).join(", ");

    const payload = {
      form_type: "Skonfiguruj Swoje Zamówienie z Widocznym Rabatem",
      name: formData.name, email: formData.email, phone: formData.phone,
      wybrane_uslugi: selectedDetails, 
      ilosc_uslug: count,
      cena_bazowa: `${basePrice} PLN`,
      przyznany_rabat: `${discountPercent}%`,
      szacowana_wycena: `${finalPrice} PLN netto`,
      message: `Lead z Konfiguratora! Klient wyklikał ${count} usług(i). Cena bazowa: ${basePrice} PLN, rabat: ${discountPercent}%. Do zapłaty: ${finalPrice} PLN netto. Wybrane usługi: ${selectedDetails}.`
    };

    try {
      await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const categories = [...new Set(servicesList.map(s => s.category))];

  return (
    <div className="min-h-screen bg-[#020202] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20">
            <Calculator size={16} /> Kreator Pakietów A La Carte
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Skonfiguruj <span className="text-[#00FFD1]">swoje zamówienie</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400">
            Wybierz usługi, których dokładnie potrzebujesz. <strong className="text-white">Im większy pakiet zbudujesz, tym większy rabat automatycznie naliczy system:</strong>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap justify-center gap-4 bg-[#0A0A0A] border border-white/10 p-5 rounded-xl max-w-2xl mx-auto shadow-inner"
          >
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-2 rounded-lg">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-white font-bold text-sm">5 usług = <span className="text-[#00FFD1]">Rabat -15%</span></span>
            </div>
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-2 rounded-lg">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-white font-bold text-sm">6 <Plus size={14} className="inline"/> usług = <span className="text-[#00FFD1]">Rabat -20%</span></span>
            </div>
            <div className="text-xs text-gray-500 w-full mt-2">*Rabat naliczany jest automatycznie na cały pakiet netto.</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 space-y-10">
            {categories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 border-b border-white/10 pb-2">{category}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servicesList.filter(s => s.category === category).map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div key={service.id} onClick={() => handleToggleService(service.id)} className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col ${isSelected ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.15)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-bold text-sm pr-6 leading-snug">{service.name}</h4>
                          <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${isSelected ? 'bg-[#00FFD1] border-[#00FFD1] text-black' : 'border-gray-600 bg-black'}`}>
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-grow">{service.desc}</p>
                        <div className="text-sm font-mono font-bold text-gray-200 mt-auto">
                          {service.category === 'Materiały Reklamowe i Druk' ? `${service.price.toLocaleString('pl-PL')} PLN` : `od ${service.price.toLocaleString('pl-PL')} PLN`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl sticky top-32 overflow-hidden">
              <div className="p-8 border-b border-white/10 bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Szacowana Wartość</p>
                  <div className="text-xs font-bold bg-white/10 text-white px-2 py-1 rounded">
                    Wybrano: {count} usług
                  </div>
                </div>
                
                <div className="flex items-end gap-2 text-[#00FFD1] mt-4">
                  <span className="text-5xl font-black">{finalPrice.toLocaleString('pl-PL')}</span>
                  <span className="text-xl font-mono mb-1 font-bold">PLN</span>
                </div>

                <AnimatePresence>
                  {discountPercent > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mt-3 flex items-center gap-3"
                    >
                      <span className="text-gray-500 line-through text-lg">{basePrice.toLocaleString('pl-PL')} PLN</span>
                      <span className="bg-[#00FFD1] text-black font-bold px-3 py-1 rounded text-xs tracking-widest flex items-center gap-1">
                        <Tag size={12} /> RABAT -{discountPercent}%
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-xs text-gray-500 mt-4">*Kwota netto za projekty. Koszty druku lub dodatkowych materiałów wyceniane są osobno.</p>
              </div>
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><CheckCircle size={32} /></div>
                      <h3 className="text-2xl font-bold text-white mb-2">Zamówienie Wysłane!</h3>
                      <p className="text-gray-400 text-sm">Otrzymaliśmy Twoją konfigurację. Przeanalizujemy ją i skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-white font-bold text-lg mb-4">Prześlij konfigurację do wyceny:</h3>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><User size={12}/> Imię i Nazwisko / Nazwa Firmy</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Mail size={12}/> Adres E-mail *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Phone size={12}/> Telefon kontaktowy</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <button type="submit" disabled={status === 'loading' || selectedServices.length === 0} className="w-full mt-6 bg-[#00FFD1] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Prześlij zamówienie <ArrowRight size={18} /></>}
                      </button>
                      <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest"><ShieldCheck size={12} className="text-[#00FFD1]" /> Niezobowiązująca konfiguracja</div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
