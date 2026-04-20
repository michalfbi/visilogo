import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Loader2, ShieldQuestion } from 'lucide-react';
import { fadeUp, sectionViewport, springCard, staggerContainer } from '../lib/motion';
import ConsentCheckbox from './ConsentCheckbox';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  const resetCaptcha = () => {
    setCaptchaAnswer('');
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setStatus('captcha_error');
      return;
    }

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone) {
      setStatus('error');
      return;
    }

    if (!marketingConsent) {
      setStatus('consent_error');
      return;
    }

    setStatus('loading');

    const formData = {
      form_type: 'Główny Formularz Kontaktowy',
      form_location: 'Sekcja Contact (Dół Strony)',
      page_url: window.location.href,
      name,
      email,
      phone,
      message,
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

  const fields = [
    {
      label: 'Imię i nazwisko *',
      name: 'name',
      type: 'text',
      placeholder: 'np. Jan Kowalski',
    },
    {
      label: 'Telefon *',
      name: 'phone',
      type: 'tel',
      placeholder: 'np. 500 600 700',
    },
  ];

  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-black py-16 lg:py-32">
      <div className="pointer-events-none absolute bottom-[-8%] right-[-4%] h-[420px] w-[420px] rounded-full bg-[#00FFD1]/6 blur-[140px]" />
      <div className="pointer-events-none absolute left-[4%] top-[10%] h-72 w-72 rounded-full bg-blue-500/8 blur-[130px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-14 bg-gradient-to-r from-[#00FFD1] to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00FFD1]">Porozmawiajmy</span>
              </div>

              <h2 className="max-w-[11ch] text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                Porozmawiajmy o <span className="text-brand-gradient">Twoim biznesie</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Zostaw kontakt. Oddzwonimy, porozmawiamy o tym, czego potrzebujesz i powiemy wprost, co warto zrobić najpierw, żeby poprawić wizerunek, stronę i skuteczność działań online.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Konkret', 'bez ogólników i bez marketingowej mgły'],
                  ['Strategia', 'ustalamy priorytet zamiast robić wszystko naraz'],
                  ['Wdrożenie', 'pomagamy przejść od decyzji do efektu'],
                ].map(([title, desc]) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={springCard}
                    className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">{title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-300">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden border border-[#00FFD1]/25 bg-[#0A0A0A]/95 p-10 shadow-[0_20px_80px_rgba(0,255,209,0.08)] md:p-12"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00FFD1]/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="mb-8 flex h-20 w-20 items-center justify-center border border-[#00FFD1]/25 bg-[#00FFD1]/10 text-[#00FFD1]">
                        <Check size={38} />
                      </div>
                      <h3 className="text-3xl font-bold tracking-[-0.03em] text-white">Wiadomość wysłana</h3>
                      <p className="mt-4 max-w-lg text-lg leading-relaxed text-gray-400">
                        Dziękujemy. Skontaktujemy się z Tobą telefonicznie w najbliższym czasie i zaproponujemy najlepszy kolejny krok.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          resetCaptcha();
                        }}
                        className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-[#00FFD1] transition-colors duration-300 hover:text-white"
                      >
                        Wyślij jeszcze jedną wiadomość
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]/96 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-10"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1]/85 to-transparent" />
                    <div className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-[#00FFD1]/10 blur-3xl" />

                    <div className="relative z-10">
                      {(status === 'error' || status === 'captcha_error') && (
                        <div className={`mb-6 flex items-center gap-3 border p-4 text-sm ${status === 'error' ? 'border-red-500/20 bg-red-500/10 text-red-400' : 'border-orange-500/20 bg-orange-500/10 text-orange-300'}`}>
                          {status === 'error' ? <AlertCircle size={18} /> : <ShieldQuestion size={18} />}
                          <span>
                            {status === 'error'
                              ? 'Uzupełnij poprawnie wszystkie wymagane pola.'
                              : 'Zły wynik równania. Popraw odpowiedź, aby potwierdzić, że nie jesteś robotem.'}
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {fields.map((field) => (
                          <div key={field.name} className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              required
                              placeholder={field.placeholder}
                              disabled={status === 'loading'}
                              className="h-14 w-full border border-white/10 bg-black/60 px-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45 focus:bg-black"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">
                          Twój adres e-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="kontakt@twojafirma.pl"
                          disabled={status === 'loading'}
                          className="h-14 w-full border border-white/10 bg-black/60 px-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45 focus:bg-black"
                        />
                      </div>

                      <div className="mt-6 space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">
                          W czym możemy pomóc? (opcjonalnie)
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="np. Potrzebuję nowej strony WWW, lepszego brandingu albo uporządkowania lejka konwersji..."
                          disabled={status === 'loading'}
                          className="w-full border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/45 focus:bg-black"
                        />
                      </div>

                      <div className="mt-6 flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                            <ShieldQuestion size={18} />
                          </div>
                          <label className="text-sm font-bold text-gray-300">
                            Ochrona przed spamem: ile to jest {num1} + {num2}? *
                          </label>
                        </div>
                        <input
                          type="number"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          required
                          disabled={status === 'loading'}
                          className="h-12 w-24 border border-white/15 bg-black px-3 text-center text-white outline-none transition-all duration-300 focus:border-[#00FFD1]/45"
                        />
                      </div>

                      <ConsentCheckbox
                        marketingConsent={marketingConsent}
                        setMarketingConsent={setMarketingConsent}
                        disabled={status === 'loading'}
                      />
                      {status === 'consent_error' && (
                        <p className="text-sm text-red-400">Aby wysłać formularz, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.</p>
                      )}
                      <div className="mt-8 flex flex-col items-center gap-4">
                        <motion.button
                          type="submit"
                          disabled={status === 'loading' || !marketingConsent}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          transition={springCard}
                          className="btn-primary min-w-[280px] text-lg font-black disabled:opacity-60"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="animate-spin" size={18} /> Wysyłanie
                            </>
                          ) : (
                            'Wyślij wiadomość'
                          )}
                        </motion.button>
                        <p className="text-center text-xs text-gray-600">
                          Twoje dane są u nas bezpieczne i służą wyłącznie do kontaktu w sprawie zapytania.
                        </p>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
