import React, { useState } from 'react';
import { HONEYPOT_NAME, useSpamGuard } from '../lib/spamGuard';
import { Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const { isBot } = useSpamGuard();
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBot(e.target)) {
      setStatus('success');
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
          <p className="lead">{nb('Zostaw kontakt. Oddzwonimy i powiemy wprost, co warto zrobić najpierw. Wolisz rozmowę twarzą w twarz? Przyjedziemy do Twojej firmy w dowolnym miejscu w świętokrzyskim.')}</p>
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
              <dt>Na żywo</dt>
              <dd>w Kielcach albo u Ciebie, pierwsze spotkanie bezpłatne</dd>
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
                onClick={() => setStatus('idle')}
              >
                Wyślij jeszcze jedną wiadomość
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-lg)' }}>
              {status === 'error' && (
                <p className="alert" role="alert">
                  Uzupełnij poprawnie wszystkie wymagane pola.
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

              <input className="visually-hidden" type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" aria-hidden="true" />

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
