import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Check, ArrowRight, Loader2, ShieldCheck, Mail, User, Phone, CheckCircle, Tag, Plus, Layout, Megaphone, Printer } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const servicesList = [
  // --- TAB 1: Wizerunek i†Technologie ---
  { id: 'www_onepage', tab: 'Wizerunek i†Technologie', category: 'Strony WWW', name: 'Strona WWW (One-Page / Wizyt√≥wka)', price: 600, desc: 'Szybka strona lƒÖdowania, idealna na start i†do kampanii reklamowych.' },
  { id: 'www_adv', tab: 'Wizerunek i†Technologie', category: 'Strony WWW', name: 'Zaawansowana Strona WWW', price: 1100, desc: 'Rozbudowany serwis (Multi-page) z†panelem CMS i†zaawansowanym UX/UI.' },
  { id: 'www_addons', tab: 'Wizerunek i†Technologie', category: 'Strony WWW', name: 'Dodatkowe Funkcje WWW', price: 300, desc: 'Niestandardowe kalkulatory, integracje API, systemy rezerwacji lub wielojƒôzyczno≈õƒá.' },
  { id: 'brand', tab: 'Wizerunek i†Technologie', category: 'Identyfikacja i†Analityka', name: 'Kompleksowy Branding', price: 990, desc: 'Logo, ksiƒôga znaku, dob√≥r typografii, paleta barw, Key Visual.' },
  { id: 'copy', tab: 'Wizerunek i†Technologie', category: 'Identyfikacja i†Analityka', name: 'Copywriting Biznesowy', price: 600, desc: 'Perswazyjne teksty na stronƒô zbijajƒÖce obiekcje klienta B2B.' },
  { id: 'analytics', tab: 'Wizerunek i†Technologie', category: 'Identyfikacja i†Analityka', name: 'Setup Analityczny', price: 500, desc: 'Wdro≈ºenie GA4, GTM, Pixel Meta, LinkedIn Insight, Hotjar.' },

  // --- TAB 2: Marketing i†Leady ---
  { id: 'google_ads', tab: 'Marketing i†Leady', category: 'P≈Çatne Kampanie', name: 'Kampanie Google Ads', price: 600, desc: 'Sieƒá wyszukiwania (Search), lokalne, dynamiczne (DSA).' },
  { id: 'social_ads', tab: 'Marketing i†Leady', category: 'P≈Çatne Kampanie', name: 'Social Media Ads', price: 600, desc: 'Precyzyjne docieranie do decydent√≥w B2B (Meta/LinkedIn).' },
  { id: 'funnels', tab: 'Marketing i†Leady', category: 'P≈Çatne Kampanie', name: 'Retargeting & Lejki', price: 800, desc: '≈öcie≈ºki konwersji, formularze kwalifikujƒÖce, kampanie przypominajƒÖce.' },
  { id: 'social_mgmt', tab: 'Marketing i†Leady', category: 'Us≈Çugi Lokalne i†SEO', name: 'Prowadzenie Social Media', price: 350, desc: 'Sp√≥jne wizualnie posty FB/LinkedIn (ok. 4 szt/mc).' },
  { id: 'gmb', tab: 'Marketing i†Leady', category: 'Us≈Çugi Lokalne i†SEO', name: 'Wizyt√≥wka Google', price: 200, desc: 'Optymalizacja profilu, nasycenie frazami, tarcza ochronna.' },
  { id: 'seo_article', tab: 'Marketing i†Leady', category: 'Us≈Çugi Lokalne i†SEO', name: 'Artyku≈Ç SEO na bloga', price: 150, desc: 'Eksperckie tre≈õci budujƒÖce widoczno≈õƒá w†wyszukiwarce.' },

  // --- TAB 3: Druk i†Identyfikacja ---
  { id: 'print_wizytowki', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Wizyt√≥wki (Projekt)', price: 250, desc: 'Indywidualny projekt graficzny. Koszt druku wyceniany osobno.' },
  { id: 'print_ulotki', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Ulotki (Projekt)', price: 250, desc: 'Skuteczny projekt graficzny ulotki. Koszt druku wyceniany osobno.' },
  { id: 'print_bannery', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Bannery Reklamowe (Projekt)', price: 250, desc: 'Projekt reklamy wielkoformatowej. Koszt druku wyceniany osobno.' },
  { id: 'print_teczki', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Teczki Firmowe (Projekt)', price: 250, desc: 'Projekt profesjonalnych teczek ofertowych. Koszt druku wyceniany osobno.' },
  { id: 'print_koszulki', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Koszulki Firmowe (Projekt)', price: 250, desc: 'Projekt nadruku na odzie≈º roboczƒÖ/reklamowƒÖ. Koszt materia≈Çu wyceniany osobno.' },
  { id: 'print_czapki', tab: 'Druk i†Identyfikacja', category: 'Materia≈Çy Reklamowe', name: 'Czapki z†Logo (Projekt)', price: 250, desc: 'Projekt haftu lub nadruku. Koszt materia≈Çu wyceniany osobno.' },
  { id: 'print_pojazd', tab: 'Druk i†Identyfikacja', category: 'Oklejanie Floty', name: 'Oklejanie Pojazdu (Projekt)', price: 800, desc: 'Zaawansowany projekt graficzny na auto firmowe. Aplikacja folii wyceniana osobno.' }
];

const tabs = [
  { id: 'Wizerunek i†Technologie', icon: Layout },
  { id: 'Marketing i†Leady', icon: Megaphone },
  { id: 'Druk i†Identyfikacja', icon: Printer }
];

const Configurator = () => {
  const [activeTab, setActiveTab] = useState('Wizerunek i†Technologie');
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  const location = useLocation();

  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    // Sprawdzenie, czy przeszli≈õmy tu z†konkretnym wyborem (np. z†przycisku upsellingu z†kreatora WWW)
    if (location.state && location.state.preselectedService) {
      const serviceId = location.state.preselectedService;
      
      setSelectedServices(prev => {
        // Je≈õli tej us≈Çugi jeszcze nie ma, dodajemy jƒÖ
        if (!prev.includes(serviceId)) {
          let newSelection = [...prev, serviceId];
          // Usuwamy konflikt (Stronƒô Onepage), je≈õli zaznaczamy ZaawansowanƒÖ WWW
          if (serviceId === 'www_adv') {
            newSelection = newSelection.filter(s => s !== 'www_onepage');
          }
          return newSelection;
        }
        return prev;
      });
    }
  }, [location.state]);

  const handleToggleService = (id) => {
    setSelectedServices(prev => {
      let newSelection = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      if (id === 'www_onepage' && newSelection.includes('www_onepage')) {
        newSelection = newSelection.filter(s => s !== 'www_adv');
      } else if (id === 'www_adv' && newSelection.includes('www_adv')) {
        newSelection = newSelection.filter(s => s !== 'www_onepage');
      }
      return newSelection;
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const count = selectedServices.length;
  let discountPercent = 0;
  if (count > 5) discountPercent = 20;
  else if (count > 4) discountPercent = 15;

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
      form_type: "Skonfiguruj Swoje Zam√≥wienie z†Zak≈Çadkami",
      name: formData.name, email: formData.email, phone: formData.phone,
      wybrane_uslugi: selectedDetails, ilosc_uslug: count,
      cena_bazowa: `${basePrice} PLN`, przyznany_rabat: `${discountPercent}%`,
      szacowana_wycena: `${finalPrice} PLN netto`,
      message: `Lead z†Konfiguratora!\nKlient wyklika≈Ç ${count} us≈Çug(i). Cena bazowa: ${basePrice} PLN, rabat: ${discountPercent}%. Do zap≈Çaty: ${finalPrice} PLN netto.\nWybrane us≈Çugi: ${selectedDetails}.`
    };

    try {
      await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const currentTabServices = servicesList.filter(s => s.tab === activeTab);
  const currentCategories = [...new Set(currentTabServices.map(s => s.category))];

  return (
    <div className="min-h-screen bg-[#020202] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* NAG≈Å√ìWEK */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#00FFD1]/20">
            <Calculator size={16} /> Kreator Pakiet√≥w A†La Carte
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Skonfiguruj <span className="text-[#00FFD1]">swoje zam√≥wienie</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400">
            Zbuduj w≈Çasny zestaw us≈Çug nawigujƒÖc miƒôdzy zak≈Çadkami. <strong className="text-white">System automatycznie ≈ÇƒÖczy Twoje wybory i†nalicza rabaty za pakiety (15% i†20%).</strong>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap justify-center gap-4 bg-[#0A0A0A] border border-white/10 p-5 rounded-xl max-w-2xl mx-auto shadow-inner"
          >
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-2 rounded-lg">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-white font-bold text-sm">5 us≈Çug = <span className="text-[#00FFD1]">Rabat -15%</span></span>
            </div>
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-2 rounded-lg">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-white font-bold text-sm">6 <Plus size={14} className="inline"/> us≈Çug = <span className="text-[#00FFD1]">Rabat -20%</span></span>
            </div>
          </motion.div>
        </div>

        {/* TABY NAWIGACYJNE */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[#00FFD1] text-black shadow-[0_0_20px_rgba(0,255,209,0.3)]' 
                  : 'bg-[#0A0A0A] border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              <tab.icon size={18} />
              {tab.id}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LISTA US≈ÅUG DLA AKTYWNEJ ZAK≈ÅADKI */}
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} 
            className="lg:col-span-7 space-y-10"
          >
            {currentCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 border-b border-white/10 pb-2">{category}</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentTabServices.filter(s => s.category === category).map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div key={service.id} className={`p-5 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col ${isSelected ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.15)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'}`}>
                        
                        <div className="cursor-pointer flex flex-col flex-grow" onClick={() => handleToggleService(service.id)}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-bold text-sm pr-6 leading-snug">{service.name}</h4>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${isSelected ? 'bg-[#00FFD1] border-[#00FFD1] text-black' : 'border-gray-600 bg-black'}`}>
                              {isSelected && <Check size={14} strokeWidth={3} />}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-grow">{service.desc}</p>
                          <div className="text-sm font-mono font-bold text-gray-200 mt-auto">
                            od {service.price.toLocaleString('pl-PL')} PLN
                          </div>
                        </div>

                        {/* Przekierowanie do Lejka dla www_adv */}
                        <AnimatePresence>
                          {isSelected && service.id === 'www_adv' && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }} 
                              animate={{ opacity: 1, height: 'auto' }} 
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-4"
                            >
                              <div className="pt-4 border-t border-[#00FFD1]/20">
                                <Link 
                                  to="/kreator-www"
                                  className="w-full flex items-center justify-between text-xs font-bold bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] px-4 py-3 rounded-lg uppercase tracking-widest hover:bg-[#00FFD1] hover:text-black transition-all group shadow-[0_0_15px_rgba(0,255,209,0.1)]"
                                >
                                  <span>Spersonalizuj wizjƒô strony ‚ûî</span>
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          {/* PANEL KOSZYKA */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl sticky top-32 overflow-hidden">
              <div className="p-8 border-b border-white/10 bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Szacowana Warto≈õƒá</p>
                  <div className="text-xs font-bold bg-white/10 text-white px-2 py-1 rounded">
                    Ca≈Çy Koszyk: {count} us≈Çug
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

                <p className="text-xs text-gray-500 mt-4">*Kwota netto za projekty i†us≈Çugi.</p>
              </div>
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      <div className="w-16 h-16 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFD1]"><CheckCircle size={32} /></div>
                      <h3 className="text-2xl font-bold text-white mb-2">Zam√≥wienie Wys≈Çane!</h3>
                      <p className="text-gray-400 text-sm">Otrzymali≈õmy TwojƒÖ konfiguracjƒô. Przeanalizujemy jƒÖ i†skontaktujemy siƒô z†TobƒÖ najszybciej jak to mo≈ºliwe.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-white font-bold text-lg mb-4">Prze≈õlij konfiguracjƒô do wyceny:</h3>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><User size={12}/> Imiƒô i†Nazwisko / Nazwa Firmy</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Mail size={12}/> Adres E-mail *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2"><Phone size={12}/> Telefon kontaktowy</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg text-sm transition-colors" disabled={status === 'loading'} /></div>
                      
                      <button type="submit" disabled={status === 'loading' || selectedServices.length === 0} className="w-full mt-6 bg-[#00FFD1] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.2)]">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Prze≈õlij zam√≥wienie <ArrowRight size={18} /></>}
                      </button>
                      <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest"><ShieldCheck size={12} className="text-[#00FFD1]" /> NiezobowiƒÖzujƒÖca konfiguracja</div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;