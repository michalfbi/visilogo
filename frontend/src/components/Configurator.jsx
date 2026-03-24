import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, ArrowRight, Loader2, ShieldCheck, Mail, User, Phone, CheckCircle } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const servicesList = [
  { id: 'www', category: 'Technologia', name: 'Zaawansowana Strona WWW', price: 4500, desc: 'Indywidualny projekt UX/UI, pełna optymalizacja pod konwersję i RWD.' },
  { id: 'lp', category: 'Technologia', name: 'Szybki Landing Page', price: 2000, desc: 'Strona typu One-Page nastawiona na agresywne zbieranie leadów.' },
  { id: 'brand', category: 'Wizerunek', name: 'Kompleksowy Branding', price: 3500, desc: 'Profesjonalne logo, księga znaku, typografia i Key Visual.' },
  { id: 'copy', category: 'Wizerunek', name: 'Copywriting Sprzedażowy', price: 1500, desc: 'Perswazyjne teksty na stronę zbijające obiekcje klienta B2B.' },
  { id: 'ads', category: 'Akwizycja', name: 'Setup Kampanii Ads', price: 1500, desc: 'Konfiguracja i odpalenie kampanii Google Ads lub Meta Ads.' },
  { id: 'seo', category: 'Akwizycja', name: 'Pakiety Lokalne SEO', price: 990, desc: 'Optymalizacja wizytówki Google i budowa lokalnego autorytetu.' }
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

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = servicesList.find(s => s.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedServices.length === 0 || !formData.email) return;
    setStatus('loading');

    const selectedDetails = selectedServices.map(id => {
      const s = servicesList.find(serv => serv.id === id);
      return `${s.name} (${s.price} PLN)`;
    }).join(", ");

    const payload = {
      form_type: "Kalkulator Projektu / Konfigurator",
      name: formData.name, email: formData.email, phone: formData.phone,
      wybrane_uslugi: selectedDetails, szacowana_wycena: `${totalPrice} PLN netto`,
      message: `Gorący Lead z Konfiguratora! Klient wyklikał usługi na łączną kwotę ${totalPrice} PLN. Wybrane usługi: ${selectedDetails}. Skontaktuj się z nim!`
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
            <Calculator size={16} /> Kalkulator Inwestycji
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Skonfiguruj <span className="text-[#00FFD1]">swój projekt</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400">
            Zaznacz obszary, w których potrzebujesz wsparcia. Nasz system natychmiast wygeneruje szacunkową wycenę całego wdrożenia.
          </motion.p>
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
                      <div key={service.id} onClick={() => handleToggleService(service.id)} className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 relative overflow-hidden ${isSelected ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.15)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-bold text-sm pr-6">{service.name}</h4>
                          <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${isSelected ? 'bg-[#00FFD1] border-[#00FFD1] text-black' : 'border-gray-600 bg-black'}`}>
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">{service.desc}</p>
                        <div className="text-sm font-mono font-bold text-gray-300">od {service.price.toLocaleString('pl-PL')} PLN</div>
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
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">Szacowana Wartość Projektu</p>
                <div className="flex items-end gap-2 text-[#00FFD1]"><span className="text-5xl font-black">{totalPrice.toLocaleString('pl-PL')}</span><span className="text-xl font-mono mb-1 font-bold">PLN</span></div>
                <p className="text-xs text-gray-500 mt-2">*Kwota netto. Precyzyjna wycena powstaje po bezpłatnej konsultacji.</p>
              </div>
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><CheckCircle size={32} /></div>
                      <h3 className="text-2xl font-bold text-white mb-2">Wycena Wysłana!</h3>
                      <p className="text-gray-400 text-sm">Otrzymaliśmy Twoją konfigurację. Przeanalizujemy ją i skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-white font-bold text-lg mb-4">Prześlij konfigurację do wyceny:</h3>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><User size={12}/> Imię i Nazwisko / Firma</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Mail size={12}/> Adres E-mail *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Phone size={12}/> Telefon</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <button type="submit" disabled={status === 'loading' || selectedServices.length === 0} className="w-full mt-6 bg-[#00FFD1] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Wyślij konfigurację <ArrowRight size={18} /></>}
                      </button>
                      <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest"><ShieldCheck size={12} className="text-[#00FFD1]" /> Niezobowiązująca estymacja</div>
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
