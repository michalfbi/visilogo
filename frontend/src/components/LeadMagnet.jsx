import React, { useState } from 'react';
import { ArrowRight, Download, Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const benefits = [
  'Dlaczego 9 na 10 stron nie generuje zapytań i jak to naprawić',
  'Jak omijać sekretariaty dzięki podejściu LinkedIn 360 Brew',
  'Psychologia koloru w TSL i budownictwie przy budowaniu autorytetu',
  'Błędy, które niszczą zaufanie decydentów jeszcze przed kontaktem',
  'Gotowy plan transformacji wizerunku na pierwsze 90 dni',
];

const LeadMagnet = () => {
  const [status, setStatus] = useState('idle');
  const [marketingConsent, setMarketingConsent] = useState(false);

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
    <section id="report" className="section section--ink" aria-labelledby="report-title">
      <div className="container report">
        <div className="report__text">
          <h2 id="report-title">{nb('Dlaczego 9 na 10 stron firmowych zawodzi')}</h2>
          <p className="lead">{nb('Bezpłatny raport PDF. Zobacz, dlaczego wiele firmowych stron nie dowozi wyniku i jak połączyć wizerunek, analitykę oraz social selling w jeden system wzrostu.')}</p>
          <ul className="report__list">
            {benefits.map((item) => (
              <li key={item}>{nb(item)}</li>
            ))}
          </ul>
        </div>

        <div className="report__card crop crop--sheet">
          {status === 'success' ? (
            <div className="contact__done" role="status">
              <h3>Dostęp odblokowany</h3>
              <p className="ink-2">{nb('Zapisaliśmy Twój adres e-mail. Możesz teraz bezpiecznie pobrać raport, klikając w przycisk poniżej.')}</p>
              <a href="/Dlaczego-9-na-10-stron-firmowych-zawodzi.pdf" target="_blank" rel="noreferrer" className="btn crop">
                <Download size={18} aria-hidden="true" />
                Pobierz raport PDF
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false} style={{ display: 'grid', gap: 'var(--space-lg)' }}>
              <h3>Wyślemy go na Twój adres</h3>
              <div className="field">
                <label htmlFor="report-email">E-mail służbowy</label>
                <input
                  id="report-email"
                  className="input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="imie@twojafirma.pl"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <ConsentCheckbox
                marketingConsent={marketingConsent}
                setMarketingConsent={setMarketingConsent}
                disabled={status === 'loading'}
              />

              {status === 'consent_error' && (
                <p className="alert" role="alert">{nb('Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.')}</p>
              )}
              {status === 'error' && (
                <p className="alert" role="alert">{nb('Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.')}</p>
              )}

              <button type="submit" className="btn btn--block crop" disabled={status === 'loading' || !marketingConsent}>
                {status === 'loading' ? (
                  <>
                    <Loader2 className="spin" size={18} aria-hidden="true" /> Wysyłanie
                  </>
                ) : (
                  <>
                    Pobierz raport <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
