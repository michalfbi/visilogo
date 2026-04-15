import React, { useState } from 'react';
import ConsentCheckbox from './ConsentCheckbox';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Download, FileText, Loader2 } from 'lucide-react';
import { fadeUp, floatingOrbs, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const LeadMagnet = () => {
  const [status, setStatus] = useState('idle');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const benefits = [
    'Dlaczego 9 na 10 stron nie generuje zapytań i jak to naprawić',
    'Jak omijać sekretariaty dzięki podejściu LinkedIn 360 Brew',
    'Psychologia koloru w TSL i budownictwie przy budowaniu autorytetu',
    'Błędy, które niszczą zaufanie decydentów jeszcze przed kontaktem',
    'Gotowy plan transformacji wizerunku na pierwsze 90 dni',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!marketingConsent) {
      setStatus('consent_error');
      return;
    }

    setStatus('loading');

    const formData = {
      form_type: 'Pobranie Raportu PDF',
      email: e.target.email.value,
      marketing_consent: true,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="report" className="section-shell relative overflow-hidden border-t border-white/5 bg-[#020202] py-16 lg:py-24">
      <div className="pointer-events-none absolute left-[6%] top-[12%] h-72 w-72 rounded-full bg-[#00FFD1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-[4%] bottom-[8%] h-80 w-80 rounded-full bg-blue-500/8 blur-[140px]" />
      <motion.div
        animate={floatingOrbs.animate}
        className="pointer-events-none absolute right-[18%] top-[18%] h-24 w-24 rounded-full bg-white/[0.06] blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(10,10,10,0.96),rgba(5,5,5,0.96))] p-8 md:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-90" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00FFD1]/10 blur-[110px]" />
          <div className="pointer-events-none absolute left-0 bottom-0 h-56 w-56 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:items-stretch">
            <div className="w-full lg:w-7/12">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00FFD1]" />
                </span>
                Bezpłatny raport PDF B2B
              </motion.div>

              <motion.h2 variants={fadeUp} className="mt-6 max-w-[13ch] text-3xl font-bold leading-[1.03] tracking-[-0.04em] text-white md:text-5xl">
                Transformacja B2B: jak przełamać <span className="text-brand-gradient">impas konwersji</span> w 2026 roku?
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
                Pobierz nasz autorski raport strategiczny. Zobacz, dlaczego wiele firmowych stron nie dowozi wyniku i jak połączyć wizerunek, analitykę oraz social selling w jeden, sprawniej działający system wzrostu.
              </motion.p>

              <motion.ul variants={staggerContainer} className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-white/80">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#00FFD1]" />
                    <span className="text-sm leading-relaxed md:text-base">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 border border-[#00FFD1]/25 bg-[#00FFD1]/8 p-6"
                  >
                    <h4 className="text-lg font-bold text-white">Dostęp odblokowany</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">
                      Zapisaliśmy Twój adres e-mail. Możesz teraz bezpiecznie pobrać raport klikając w przycisk poniżej.
                    </p>
                    <motion.a
                      href="/Dlaczego-9-na-10-stron-firmowych-zawodzi.pdf"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springCard}
                      className="btn-primary mt-6 inline-flex items-center gap-2"
                    >
                      <Download size={18} /> Pobierz raport PDF
                    </motion.a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="mt-10 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <input
                        type="email"
                        name="email"
                        placeholder="Twój e-mail służbowy"
                        className="h-14 w-full border border-white/10 bg-black/50 px-6 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/50 focus:bg-black"
                        required
                        disabled={status === 'loading'}
                      />
                      <motion.button
                        type="submit"
                        disabled={status === 'loading' || !marketingConsent}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springCard}
                        className="btn-primary h-14 whitespace-nowrap text-base font-black disabled:opacity-70"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Wysyłanie
                          </>
                        ) : (
                          <>
                            Pobierz raport <ArrowRight size={18} />
                          </>
                        )}
                      </motion.button>
                    </div>
                    <ConsentCheckbox
                      marketingConsent={marketingConsent}
                      setMarketingConsent={setMarketingConsent}
                      disabled={status === 'loading'}
                    />
                    {status === 'consent_error' && (
                      <p className="text-sm text-red-400">Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.</p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-red-400"
                >
                  Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.
                </motion.p>
              )}
            </div>

            <motion.div variants={fadeUp} className="flex w-full justify-center lg:w-5/12 lg:justify-end">
              <motion.div
                whileHover={{ y: -10, rotate: -1.2, scale: 1.02 }}
                transition={springCard}
                className="group relative flex h-[430px] w-full max-w-[320px] flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-br from-[#00FFD1] via-[#00cbb7] to-blue-700 p-7 shadow-[0_30px_120px_rgba(0,255,209,0.18)]"
              >
                <div className="absolute inset-0 bg-black/18 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                    <FileText size={44} className="text-white" />
                  </div>
                  <div className="border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                    Strategic PDF
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">VisiLogo Intelligence</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-white">
                    Strategia B2B 2026
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    Kompaktowy materiał dla firm, które chcą połączyć lepszy wizerunek z lepszą konwersją i sensowniejszą komunikacją online.
                  </p>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="h-2 w-full overflow-hidden bg-white/20">
                    <div className="h-full w-[72%] bg-white animate-shimmer bg-[length:200%_100%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                    <span>Raport premium</span>
                    <span>PDF download</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnet;
