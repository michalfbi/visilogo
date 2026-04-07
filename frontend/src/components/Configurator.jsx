import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle,
  Layout,
  Loader2,
  Mail,
  Megaphone,
  Phone,
  Plus,
  Printer,
  ShieldCheck,
  Tag,
  User,
} from 'lucide-react';
import { fadeUp, menuReveal, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const servicesList = [
  { id: 'www_onepage', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Strona WWW (One-Page / Wizytówka)', price: 600, desc: 'Szybka strona lądowania, idealna na start i do kampanii reklamowych.' },
  { id: 'www_adv', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Zaawansowana strona WWW', price: 1100, desc: 'Rozbudowany serwis z panelem CMS, lepszym UX i większą elastycznością wdrożeniową.' },
  { id: 'www_addons', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Dodatkowe funkcje WWW', price: 300, desc: 'Niestandardowe kalkulatory, integracje API, systemy rezerwacji lub wersje wielojęzyczne.' },
  { id: 'brand', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Kompleksowy branding', price: 990, desc: 'Logo, księga znaku, typografia, paleta barw i Key Visual marki.' },
  { id: 'copy', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Copywriting biznesowy', price: 600, desc: 'Perswazyjne teksty na stronę dopasowane do decyzji klienta B2B.' },
  { id: 'analytics', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Setup analityczny', price: 500, desc: 'Wdrożenie GA4, GTM, Pixela Meta, LinkedIn Insight i map cieplnych.' },
  { id: 'google_ads', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Kampanie Google Ads', price: 600, desc: 'Search, kampanie lokalne oraz struktury oparte na intencji zakupowej.' },
  { id: 'social_ads', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Social Media Ads', price: 600, desc: 'Precyzyjne kampanie Meta i LinkedIn kierowane do właściwych decydentów.' },
  { id: 'funnels', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Retargeting i lejki', price: 800, desc: 'Ścieżki konwersji, formularze kwalifikujące i kampanie przypominające.' },
  { id: 'social_mgmt', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Prowadzenie social media', price: 350, desc: 'Spójne wizualnie materiały i publikacje wspierające sprzedaż i wizerunek.' },
  { id: 'gmb', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Wizytówka Google', price: 200, desc: 'Optymalizacja profilu, nasycenie frazami i uporządkowanie podstaw lokalnego SEO.' },
  { id: 'seo_article', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Artykuł SEO na bloga', price: 150, desc: 'Eksperckie treści wspierające widoczność i wiarygodność marki.' },
  { id: 'print_wizytowki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Wizytówki (projekt)', price: 250, desc: 'Indywidualny projekt graficzny. Koszt druku wyceniamy osobno.' },
  { id: 'print_ulotki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Ulotki (projekt)', price: 250, desc: 'Projekt ulotki nastawionej na czytelność i skuteczny przekaz.' },
  { id: 'print_bannery', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Bannery reklamowe (projekt)', price: 250, desc: 'Projekt reklamy wielkoformatowej. Produkcja jest wyceniana oddzielnie.' },
  { id: 'print_teczki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Teczki firmowe (projekt)', price: 250, desc: 'Projekt profesjonalnych teczek ofertowych wspierających sprzedaż.' },
  { id: 'print_koszulki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Koszulki firmowe (projekt)', price: 250, desc: 'Projekt nadruku na odzież roboczą lub reklamową.' },
  { id: 'print_czapki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Czapki z logo (projekt)', price: 250, desc: 'Projekt haftu lub nadruku na elementy identyfikacji fizycznej.' },
  { id: 'print_pojazd', tab: 'Druk i Identyfikacja', category: 'Oklejanie floty', name: 'Oklejanie pojazdu (projekt)', price: 800, desc: 'Zaawansowany projekt graficzny na auto firmowe. Aplikacja folii jest wyceniana osobno.' },
];

const tabs = [
  { id: 'Wizerunek i Technologie', icon: Layout, label: 'Wizerunek i technologie' },
  { id: 'Marketing i Leady', icon: Megaphone, label: 'Marketing i leady' },
  { id: 'Druk i Identyfikacja', icon: Printer, label: 'Druk i identyfikacja' },
];

const Configurator = () => {
  const [activeTab, setActiveTab] = useState('Wizerunek i Technologie');
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state && location.state.preselectedService) {
      const serviceId = location.state.preselectedService;

      setSelectedServices((prev) => {
        if (prev.includes(serviceId)) return prev;

        let newSelection = [...prev, serviceId];

        if (serviceId === 'www_adv') {
          newSelection = newSelection.filter((service) => service !== 'www_onepage');
        }

        if (serviceId === 'www_onepage') {
          newSelection = newSelection.filter((service) => service !== 'www_adv');
        }

        return newSelection;
      });
    }
  }, [location.state]);

  const handleToggleService = (id) => {
    setSelectedServices((prev) => {
      let next = prev.includes(id) ? prev.filter((service) => service !== id) : [...prev, id];

      if (id === 'www_onepage' && next.includes('www_onepage')) {
        next = next.filter((service) => service !== 'www_adv');
      }

      if (id === 'www_adv' && next.includes('www_adv')) {
        next = next.filter((service) => service !== 'www_onepage');
      }

      return next;
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const count = selectedServices.length;
  const discountPercent = count >= 6 ? 20 : count >= 5 ? 15 : 0;

  const basePrice = selectedServices.reduce((sum, id) => {
    const service = servicesList.find((item) => item.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const discountAmount = basePrice * (discountPercent / 100);
  const finalPrice = basePrice - discountAmount;

  const currentTabServices = useMemo(
    () => servicesList.filter((service) => service.tab === activeTab),
    [activeTab]
  );

  const currentCategories = useMemo(
    () => [...new Set(currentTabServices.map((service) => service.category))],
    [currentTabServices]
  );

  const selectedServiceDetails = useMemo(
    () => selectedServices
      .map((id) => servicesList.find((service) => service.id === id))
      .filter(Boolean),
    [selectedServices]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (count === 0 || !formData.email) return;

    setStatus('loading');

    const selectedDetails = selectedServiceDetails
      .map((service) => `${service.name} (${service.price} PLN)`)
      .join(', ');

    const payload = {
      form_type: 'Skonfiguruj swoje zamówienie z zakładkami',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      wybrane_uslugi: selectedDetails,
      ilosc_uslug: count,
      cena_bazowa: `${basePrice} PLN`,
      przyznany_rabat: `${discountPercent}%`,
      szacowana_wycena: `${finalPrice} PLN netto`,
      message: `Lead z konfiguratora. Klient wybrał ${count} usług. Cena bazowa: ${basePrice} PLN, rabat: ${discountPercent}%, kwota końcowa: ${finalPrice} PLN netto. Wybrane usługi: ${selectedDetails}.`,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="section-shell relative min-h-screen overflow-hidden bg-[#020202] pb-12 pt-24 lg:pb-20 lg:pt-32">
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[620px] w-[620px] rounded-full bg-[#00FFD1]/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-6%] h-[540px] w-[540px] rounded-full bg-blue-500/8 blur-[150px]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
            <Calculator size={16} /> Kreator pakietów a la carte
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
            Skonfiguruj <span className="text-brand-gradient">swoje zamówienie</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Zbuduj własny zestaw usług, przechodząc między kategoriami. System automatycznie łączy wybory,
            aktualizuje wycenę i nalicza rabaty za większe pakiety.
          </motion.p>

          <motion.div variants={fadeUp} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-4 border border-white/10 bg-[#0A0A0A]/90 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-3">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-sm font-bold text-white">5 usług = <span className="text-[#00FFD1]">rabat 15%</span></span>
            </div>
            <div className="flex items-center gap-3 border border-dashed border-[#00FFD1]/30 bg-[#00FFD1]/5 px-4 py-3">
              <Tag size={16} className="text-[#00FFD1]" />
              <span className="text-sm font-bold text-white">6<Plus size={14} className="mx-1 inline" />usług = <span className="text-[#00FFD1]">rabat 20%</span></span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={springCard}
                className={`inline-flex items-center gap-3 border px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'border-[#00FFD1]/40 bg-[#00FFD1] text-black shadow-[0_18px_60px_rgba(0,255,209,0.25)]'
                    : 'border-white/10 bg-[#0A0A0A]/90 text-gray-300 hover:border-[#00FFD1]/20 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={menuReveal}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-10"
              >
                {currentCategories.map((category) => (
                  <motion.section
                    key={category}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={sectionViewport}
                  >
                    <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
                      <span className="h-px w-10 bg-gradient-to-r from-[#00FFD1] to-transparent" />
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-white">{category}</h3>
                    </motion.div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {currentTabServices
                        .filter((service) => service.category === category)
                        .map((service) => {
                          const isSelected = selectedServices.includes(service.id);

                          return (
                            <motion.article
                              key={service.id}
                              variants={fadeUp}
                              whileHover={{ y: -8, scale: 1.01 }}
                              transition={springCard}
                              className={`group relative flex flex-col overflow-hidden border p-5 ${
                                isSelected
                                  ? 'border-[#00FFD1]/45 bg-[#00FFD1]/10 shadow-[0_24px_80px_rgba(0,255,209,0.08)]'
                                  : 'border-white/10 bg-[#0A0A0A]/95'
                              }`}
                            >
                              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                              <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                              <button
                                type="button"
                                onClick={() => handleToggleService(service.id)}
                                className="relative z-10 flex h-full flex-col text-left"
                              >
                                <div className="mb-3 flex items-start justify-between gap-4">
                                  <h4 className="pr-4 text-sm font-bold leading-snug text-white md:text-[0.98rem]">
                                    {service.name}
                                  </h4>
                                  <motion.div
                                    animate={isSelected ? { scale: 1, rotate: 0 } : { scale: 0.96, rotate: 0 }}
                                    transition={springCard}
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center border ${
                                      isSelected ? 'border-[#00FFD1] bg-[#00FFD1] text-black' : 'border-gray-600 bg-black text-transparent'
                                    }`}
                                  >
                                    <Check size={14} strokeWidth={3} />
                                  </motion.div>
                                </div>

                                <p className="flex-grow text-xs leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-400 md:text-sm">
                                  {service.desc}
                                </p>

                                <div className="mt-5 flex items-end justify-between gap-3">
                                  <span className="text-sm font-mono font-bold text-gray-200">
                                    od {service.price.toLocaleString('pl-PL')} PLN
                                  </span>
                                  <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${isSelected ? 'text-[#00FFD1]' : 'text-gray-600'}`}>
                                    {isSelected ? 'Wybrano' : 'Dodaj'}
                                  </span>
                                </div>
                              </button>

                              <AnimatePresence>
                                {isSelected && service.id === 'www_adv' && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10 mt-4 overflow-hidden"
                                  >
                                    <div className="border-t border-[#00FFD1]/20 pt-4">
                                      <Link
                                        to="/kreator-www"
                                        className="group inline-flex w-full items-center justify-between border border-[#00FFD1]/30 bg-[#00FFD1]/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#00FFD1] transition-all duration-300 hover:bg-[#00FFD1] hover:text-black"
                                      >
                                        <span>Spersonalizuj wizję strony</span>
                                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                      </Link>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.article>
                          );
                        })}
                    </div>
                  </motion.section>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5">
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="sticky top-32 overflow-hidden border border-white/10 bg-[#0A0A0A]/96 shadow-[0_24px_90px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-90" />
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00FFD1]/10 blur-3xl" />

              <div className="relative z-10 border-b border-white/10 bg-white/[0.03] p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">Szacowana wartość</p>
                    <div className="mt-4 flex items-end gap-2 text-[#00FFD1]">
                      <span className="text-5xl font-black tracking-[-0.05em]">{finalPrice.toLocaleString('pl-PL')}</span>
                      <span className="mb-1 text-xl font-mono font-bold">PLN</span>
                    </div>
                  </div>
                  <div className="border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                    {count} usług
                  </div>
                </div>

                <AnimatePresence>
                  {discountPercent > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 flex items-center gap-3 overflow-hidden"
                    >
                      <span className="text-lg text-gray-500 line-through">{basePrice.toLocaleString('pl-PL')} PLN</span>
                      <span className="inline-flex items-center gap-1 bg-[#00FFD1] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-black">
                        <Tag size={12} /> Rabat -{discountPercent}%
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-4 text-xs leading-relaxed text-gray-500">
                  Kwota netto za projekty i usługi. Przy obecnym wyborze oszczędzasz {discountAmount.toLocaleString('pl-PL')} PLN.
                </p>
              </div>

              <div className="relative z-10 p-8">
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">Wybrane elementy</p>
                  <div className="mt-4 space-y-3">
                    <AnimatePresence initial={false}>
                      {selectedServiceDetails.length > 0 ? (
                        selectedServiceDetails.map((service) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-start justify-between gap-4 border border-white/8 bg-white/[0.03] px-4 py-3"
                          >
                            <div>
                              <div className="text-sm font-bold text-white">{service.name}</div>
                              <div className="mt-1 text-xs text-gray-500">{service.category}</div>
                            </div>
                            <div className="text-sm font-mono text-[#00FFD1]">{service.price} PLN</div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border border-dashed border-white/10 bg-black/30 px-4 py-5 text-sm leading-relaxed text-gray-500"
                        >
                          Nie wybrano jeszcze żadnej usługi. Zaznacz elementy po lewej stronie, a koszyk zacznie budować pakiet automatycznie.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      className="border border-[#00FFD1]/20 bg-[#00FFD1]/8 p-6 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-[#00FFD1]/25 bg-[#00FFD1]/10 text-[#00FFD1]">
                        <CheckCircle size={30} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Zamówienie wysłane</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-300">
                        Otrzymaliśmy Twoją konfigurację. Przeanalizujemy ją i skontaktujemy się z Tobą tak szybko, jak to możliwe.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <h3 className="text-lg font-bold text-white">Prześlij konfigurację do wyceny</h3>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          <User size={12} /> Imię i nazwisko / nazwa firmy
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={status === 'loading'}
                          className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          <Mail size={12} /> Adres e-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={status === 'loading'}
                          className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          <Phone size={12} /> Telefon kontaktowy
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={status === 'loading'}
                          className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          Nie udało się wysłać konfiguracji. Spróbuj ponownie za chwilę.
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading' || selectedServices.length === 0}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springCard}
                        className="btn-primary mt-6 w-full justify-center text-sm font-black uppercase tracking-[0.22em] disabled:opacity-50"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Wysyłanie
                          </>
                        ) : (
                          <>
                            Prześlij zamówienie <ArrowRight size={18} />
                          </>
                        )}
                      </motion.button>

                      <div className="flex items-center justify-center gap-2 pt-1 text-[10px] uppercase tracking-[0.22em] text-gray-500">
                        <ShieldCheck size={12} className="text-[#00FFD1]" /> Niezobowiązująca konfiguracja
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
