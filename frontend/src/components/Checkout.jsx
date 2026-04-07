import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { localPricingPlans, pricingPlans } from '../mock';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle,
  Clock,
  Info,
  Loader2,
  Phone,
  ShieldCheck,
  ShieldQuestion,
  TrendingUp,
  Users,
} from 'lucide-react';
import { fadeUp, revealLeft, revealRight, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const trustPoints = [
  {
    icon: Award,
    title: 'Precyzyjny zakres prac',
    desc: 'Od początku wiesz, co dokładnie zawiera pakiet i jaki efekt ma dowieźć.',
  },
  {
    icon: TrendingUp,
    title: 'Nacisk na wynik',
    desc: 'Każdy etap wdrożenia jest podporządkowany jakości, konwersji i dalszej skalowalności.',
  },
  {
    icon: Users,
    title: 'Realna współpraca',
    desc: 'Proces jest uporządkowany tak, abyś nie musiał koordynować wszystkiego samodzielnie.',
  },
];

const Checkout = () => {
  const { planId } = useParams();
  const allPlans = [...pricingPlans, ...localPricingPlans];
  const plan = allPlans.find((item) => item.id === planId);

  const [status, setStatus] = useState('idle');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  if (!plan) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setStatus('captcha_error');
      return;
    }

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const nip = e.target.nip.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    const formData = {
      form_type: 'Rezerwacja pakietu',
      form_location: 'Formularz zamówienia - checkout',
      page_url: window.location.href,
      pakiet: plan.name,
      cena: plan.price,
      name,
      email,
      phone,
      nip,
      message,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="section-shell relative min-h-screen overflow-hidden bg-[#020202] pb-12 pt-24 lg:pb-20 lg:pt-32">
      <div className="pointer-events-none absolute right-[-8%] top-0 h-[800px] w-[800px] rounded-full bg-[#00FFD1]/6 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[5%] left-[-8%] h-[480px] w-[480px] rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <motion.div variants={revealLeft} initial="hidden" animate="show">
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-gray-400 transition-all duration-300 hover:border-[#00FFD1]/20 hover:text-[#00FFD1]"
          >
            <ArrowLeft size={16} /> Wróć do cennika
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
                <ShieldCheck size={16} /> Wybrany pakiet
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl">
                {plan.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-400">
                {plan.desc}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.004 }}
              transition={springCard}
              className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]/95 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_36%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-90" />

              <div className="relative z-10 border-b border-white/10 pb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">
                  Inwestycja od
                </div>
                <div className="mt-4 flex flex-wrap items-end gap-2">
                  <span className="text-5xl font-black tracking-[-0.05em] text-white">{plan.price}</span>
                  <span className="mb-1 font-mono text-gray-500">PLN netto</span>
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="text-xl font-bold text-white">Co dokładnie realizujemy?</h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={sectionViewport}
                  className="mt-6 space-y-4"
                >
                  {plan.features.map((feature) => (
                    <motion.li key={feature} variants={fadeUp} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                      <CheckCircle className="mt-0.5 shrink-0 text-[#00FFD1]" size={18} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              className="grid gap-4 sm:grid-cols-3"
            >
              {trustPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={index % 2 === 0 ? revealLeft : revealRight}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={springCard}
                    className="border border-white/10 bg-[#0A0A0A]/95 p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                  </motion.article>
                );
              })}
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.004 }}
              transition={springCard}
              className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]/95 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.24)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-80" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white md:text-2xl">Harmonogram wdrożenia</h3>
                <div className="relative mt-8 space-y-6 before:absolute before:left-[11px] before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-[#00FFD1] before:via-[#00FFD1]/25 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
                  {plan.steps.map((step, index) => (
                    <motion.div
                      key={`${step.title}-${index}`}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={sectionViewport}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                    >
                      <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-4 border-[#0A0A0A] bg-[#00FFD1] text-black shadow-[0_0_18px_rgba(0,255,209,0.45)] md:order-1 md:odd:-translate-x-1/2 md:even:translate-x-1/2" />
                      <div className="w-[calc(100%-3rem)] border border-white/8 bg-white/[0.03] p-4 md:w-[calc(50%-1.5rem)]">
                        <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#00FFD1]">
                          <Clock size={12} /> Etap {index + 1}
                        </div>
                        <h4 className="text-sm font-bold text-white md:text-base">{step.title}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-gray-400 md:text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            variants={revealRight}
            initial="hidden"
            animate="show"
            className="space-y-8 lg:sticky lg:top-32 lg:h-fit"
          >
            <div className="relative overflow-hidden border border-white/10 bg-black/95 p-8 shadow-[0_24px_100px_rgba(0,0,0,0.35)] md:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-90" />
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00FFD1]/10 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                  Rozpocznijmy współpracę
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  Wypełnij dane firmy. Odezwiemy się, aby potwierdzić zakres, harmonogram i dalsze kroki wdrożenia.
                </p>

                <div className="mt-6 flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">
                  <Info size={16} className="shrink-0 text-[#00FFD1]" />
                  Wysyłasz niezobowiązujące zapytanie. Finalny zakres doprecyzujemy wspólnie po kontakcie.
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      className="py-12 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                        <CheckCircle size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Rezerwacja przyjęta</h3>
                      <p className="mt-4 text-gray-400">
                        Nasz zespół skontaktuje się z Tobą w ciągu kilku godzin roboczych.
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
                      {status === 'error' && (
                        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          <AlertCircle size={18} /> Uzupełnij poprawnie wszystkie wymagane pola.
                        </div>
                      )}

                      {status === 'captcha_error' && (
                        <div className="flex items-center gap-3 border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-300">
                          <ShieldQuestion size={18} /> Niepoprawny wynik równania zabezpieczającego.
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          Nazwa firmy / imię i nazwisko *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={status === 'loading'}
                          className="h-12 w-full border border-white/15 bg-[#0A0A0A] px-4 text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                            E-mail *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            disabled={status === 'loading'}
                            className="h-12 w-full border border-white/15 bg-[#0A0A0A] px-4 text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            disabled={status === 'loading'}
                            className="h-12 w-full border border-white/15 bg-[#0A0A0A] px-4 text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          NIP firmy
                        </label>
                        <input
                          type="text"
                          name="nip"
                          disabled={status === 'loading'}
                          className="h-12 w-full border border-white/15 bg-[#0A0A0A] px-4 text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                          Wiadomość
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          disabled={status === 'loading'}
                          className="w-full resize-none border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <div className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                            <ShieldQuestion size={18} />
                          </div>
                          <label className="text-sm font-bold text-gray-300">
                            Zabezpieczenie: ile to {num1} + {num2}?
                          </label>
                        </div>
                        <input
                          type="number"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          required
                          disabled={status === 'loading'}
                          className="h-11 w-full border border-white/15 bg-[#0A0A0A] px-4 text-center text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45 sm:w-24"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springCard}
                        className="btn-primary mt-4 w-full justify-center text-base font-black uppercase tracking-[0.18em]"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Wysyłanie
                          </>
                        ) : (
                          'Zarezerwuj pakiet'
                        )}
                      </motion.button>

                      <div className="flex flex-col items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gray-500 sm:flex-row">
                        <ShieldCheck size={12} className="text-[#00FFD1]" /> Bezpieczny kontakt
                        <span className="hidden text-gray-700 sm:inline">•</span>
                        <Phone size={12} className="text-[#00FFD1]" /> Szybka odpowiedź zespołu
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

export default Checkout;
