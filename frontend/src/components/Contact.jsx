import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { nb } from '../lib/typo';

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

  const busy = status === 'loading';

  return (
    <section id="contact" className="section section--l" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact__text">
          <h2 id="contact-title">{nb('Porozmawiajmy o Twoim biznesie')}</h2>
          <p className="lead">{nb('Zostaw kontakt. Oddzwonimy i powiemy wprost, co warto zrobić najpierw, żeby poprawić wizerunek, stronę i skuteczność działań online.')}</p>
          <dl className="facts">
            <div>
              <dt>Konkret</dt>
              <dd>bez ogólników i bez marketingowej mgły</dd>
            </div>
            <div>
              <dt>Strategia</dt>
              <dd>ustalamy priorytet zamiast robić wszystko naraz</dd>
            </div>
            <div>
              <dt>Wdrożenie</dt>
              <dd>pomagamy przejść od decyzji do efektu</dd>
            </div>
          </dl>
        </div>

        <div className="contact__form crop crop--sheet">
          {status === 'success' ? (
            <div className="contact__done" role="status">
              <h3>Wiadomość wysłana</h3>
              <p className="ink-2">{nb('Dziękujemy. Skontaktujemy się z Tobą telefonicznie w najbliższym czasie i zaproponujemy najlepszy kolejny krok.')}</p>
              <button
                type="button"
                className="btn crop"
                onClick={() => {
                  setStatus('idle');
                  resetCaptcha();
                }}
              >
                Wyślij jeszcze jedną wiadomość
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-lg)' }}>
              {(status === 'error' || status === 'captcha_error') && (
                <p className={`alert${status === 'captcha_error' ? ' alert--warn' : ''}`} role="alert">
                  {status === 'error'
                    ? 'Uzupełnij poprawnie wszystkie wymagane pola.'
                    : 'Zły wynik równania. Popraw odpowiedź, aby potwierdzić, że nie jesteś robotem.'}
                </p>
              )}

              <div className="contact__pair">
                <div className="field">
                  <label htmlFor="contact-name">Imię i nazwisko *</label>
                  <input id="contact-name" className="input" type="text" name="name" autoComplete="name" required placeholder="np. Jan Kowalski" disabled={busy} />
                </div>
                <div className="field">
                  <label htmlFor="contact-phone">Telefon *</label>
                  <input id="contact-phone" className="input" type="tel" name="phone" autoComplete="tel" inputMode="tel" required placeholder="np. 500 600 700" disabled={busy} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-email">Twój adres e-mail *</label>
                <input id="contact-email" className="input" type="email" name="email" autoComplete="email" inputMode="email" required placeholder="kontakt@twojafirma.pl" disabled={busy} />
              </div>

              <div className="field">
                <label htmlFor="contact-message">W czym możemy pomóc? (opcjonalnie)</label>
                <textarea
                  id="contact-message"
                  className="input"
                  name="message"
                  rows={5}
                  placeholder="np. Potrzebuję nowej strony WWW, lepszego brandingu albo uporządkowania lejka konwersji…"
                  disabled={busy}
                />
              </div>

              <div className="contact__captcha">
                <label htmlFor="contact-captcha" className="field__label" style={{ fontWeight: 500 }}>
                  Ochrona przed spamem: ile to jest {num1} + {num2}? *
                </label>
                <input
                  id="contact-captcha"
                  className="input input--narrow"
                  type="number"
                  inputMode="numeric"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>

              <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} disabled={busy} />

              {status === 'consent_error' && (
                <p className="alert" role="alert">{nb('Aby wysłać formularz, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.')}</p>
              )}

              <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
                <button type="submit" className="btn btn--primary btn--block" disabled={busy || !marketingConsent}>
                  {busy ? (
                    <>
                      <Loader2 className="spin" size={18} aria-hidden="true" /> Wysyłanie
                    </>
                  ) : (
                    'Wyślij wiadomość'
                  )}
                </button>
                <p className="note">{nb('Twoje dane są u nas bezpieczne i służą wyłącznie do kontaktu w sprawie zapytania.')}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
