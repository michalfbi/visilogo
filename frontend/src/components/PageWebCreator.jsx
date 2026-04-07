import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Layout,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Tag,
  Target,
  User,
  Zap,
} from 'lucide-react';
import { fadeUp, revealLeft, revealRight, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const highlights = [
  {
    icon: Zap,
    title: 'Błyskawiczne ładowanie',
    desc: 'Architektura strony jest projektowana pod wydajność, dzięki czemu pierwsze wrażenie jest natychmiastowe i bardziej sprzedażowe.',
  },
  {
    icon: Target,
    title: 'UX nastawiony na decyzję',
    desc: 'Projektujemy ścieżki uwagi, sekcje i CTA tak, aby użytkownik naturalnie przechodził do kontaktu lub zapytania.',
  },
  {
    icon: Search,
    title: 'Solidne fundamenty SEO',
    desc: 'Porządna struktura informacji, semantyczny kod i przygotowanie pod dalszy wzrost ruchu organicznego.',
  },
];

const PageWebCreator = () => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    style: '',
    colors: '',
    goal: '',
    inspirations: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus('loading');

    const payload = {
      form_type: 'Kreator zaawansowanej strony WWW',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `Lead z dedykowanego kreatora WWW. Styl: ${formData.style}. Kolory: ${formData.colors}. Cel: ${formData.goal}. Inspiracje: ${formData.inspirations}`,
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
      <div className="pointer-events-none absolute right-[-10%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#00FFD1]/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-[-6%] bottom-[8%] h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <motion.div variants={revealLeft} initial="hidden" animate="show" className="mb-8">
          <Link
            to="/skonfiguruj-projekt"
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-gray-400 transition-all duration-300 hover:border-[#00FFD1]/20 hover:text-[#00FFD1]"
          >
            <ChevronLeft size={16} /> Wróć do konfiguratora usług
          </Link>
        </motion.div>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
              <Layout size={16} /> Zaawansowana strona WWW
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
              Zbudujmy stronę, która wygląda premium i <span className="text-brand-gradient">pracuje na leady</span>.
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-gray-400">
              Nie projektujemy zwykłych wizytówek. Tworzymy szybkie, nowoczesne i konwersyjne serwisy B2B, które porządkują komunikację marki i zamieniają ruch w konkretne zapytania.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              className="grid gap-4"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={index % 2 === 0 ? revealLeft : revealRight}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={springCard}
                    className="group relative overflow-hidden border border-white/10 bg-[#0A0A0A]/95 p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10 flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.008 }}
              transition={springCard}
              className="relative overflow-hidden border border-[#00FFD1]/20 bg-[#00FFD1]/6 p-6"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[#00FFD1]/10 blur-[30px]" />
              <div className="relative z-10">
                <h4 className="flex items-center gap-2 text-lg font-bold text-white">
                  <Tag size={20} className="text-[#00FFD1]" /> Chcesz zyskać nawet 20% rabatu?
                </h4>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
                  Sama strona to mocny fundament, ale największy efekt daje w pakiecie z kampaniami, analityką i contentem. Dobierz więcej usług i obniż koszt całego wdrożenia.
                </p>

                <motion.div whileHover={{ x: 2 }} transition={springCard} className="mt-5 inline-flex">
                  <Link
                    to="/skonfiguruj-projekt"
                    state={{ preselectedService: 'www_adv' }}
                    className="inline-flex items-center justify-center gap-2 border border-[#00FFD1]/30 bg-[#0A0A0A] px-6 py-3 font-bold text-[#00FFD1] transition-all duration-300 hover:bg-[#00FFD1] hover:text-black"
                  >
                    <Plus size={18} /> Dobierz usługi i obniż koszty
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            variants={revealRight}
            initial="hidden"
            animate="show"
            className="sticky top-32"
          >
            <div className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]/96 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-90" />
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00FFD1]/10 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                  Opowiedz nam o swojej wizji
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  Wypełnij krótki brief. Na jego podstawie przygotujemy dokładniejszą wycenę, kierunek kreatywny i rekomendację dla Twojej marki.
                </p>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      className="py-10 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                        <CheckCircle size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-white">Wizja przyjęta</h3>
                      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400">
                        Nasz zespół przeanalizuje Twoje wytyczne i wróci z propozycją kierunku wdrożenia oraz dalszych kroków.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onSubmit={handleSubmit}
                      className="mt-8 space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Styl wizualny</label>
                          <select
                            name="style"
                            value={formData.style}
                            onChange={handleInputChange}
                            className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                          >
                            <option value="">Wybierz...</option>
                            <option value="Nowoczesny i odważny">Nowoczesny i odważny</option>
                            <option value="Minimalistyczny i czysty">Minimalistyczny i czysty</option>
                            <option value="Biznesowy i korporacyjny">Biznesowy i korporacyjny</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Kolorystyka</label>
                          <select
                            name="colors"
                            value={formData.colors}
                            onChange={handleInputChange}
                            className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                          >
                            <option value="">Wybierz...</option>
                            <option value="Ciemny motyw">Ciemny motyw</option>
                            <option value="Jasny i przejrzysty">Jasny i przejrzysty</option>
                            <option value="Na bazie obecnego logo">Na bazie obecnego logo</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Główny cel strony</label>
                        <select
                          name="goal"
                          value={formData.goal}
                          onChange={handleInputChange}
                          className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                        >
                          <option value="">Wybierz...</option>
                          <option value="Generowanie leadów B2B">Generowanie leadów B2B</option>
                          <option value="Wizerunek i portfolio">Wizerunek i portfolio</option>
                          <option value="Sprzedaż e-commerce">Sprzedaż e-commerce</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Linki do inspiracji</label>
                        <textarea
                          name="inspirations"
                          value={formData.inspirations}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="np. apple.com, stripe.com, linear.app"
                          className="w-full resize-none border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="space-y-4 border-t border-white/10 pt-5">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                            <User size={12} /> Imię i nazwisko / firma
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                              <Mail size={12} /> E-mail *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                              <Phone size={12} /> Telefon
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="h-12 w-full border border-white/15 bg-black/60 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45"
                            />
                          </div>
                        </div>
                      </div>

                      {status === 'error' && (
                        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          Nie udało się wysłać briefu. Spróbuj ponownie za chwilę.
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springCard}
                        className="btn-primary mt-4 w-full justify-center text-sm font-black uppercase tracking-[0.22em]"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Wysyłanie briefu
                          </>
                        ) : (
                          <>
                            Wyślij brief i zapytaj o wycenę <ArrowRight size={18} />
                          </>
                        )}
                      </motion.button>

                      <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gray-500">
                        <ShieldCheck size={12} className="text-[#00FFD1]" /> 100% darmowa wycena
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PageWebCreator;
