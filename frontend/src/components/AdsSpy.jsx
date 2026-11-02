import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { CtaBand, PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const SCAN_STEPS = [
  'Łączymy się z publiczną Biblioteką reklam Meta…',
  'Ustawiamy filtr: Polska, wszystkie formaty…',
  'Szukamy reklam pod podaną nazwą…',
  'Przygotowujemy link do wyników…',
  'Gotowe.',
];

const AdsSpy = () => {
  const [competitor, setCompetitor] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, complete
  const [progress, setProgress] = useState(0);
  const [spyLink, setSpyLink] = useState('');
  const [scanText, setScanText] = useState('');

  useEffect(() => {
    if (status === 'scanning') {
      let currentProgress = 0;
      let stepIndex = 0;
      setScanText(SCAN_STEPS[0]);

      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStatus('complete'), 500);
        }
        
        setProgress(currentProgress);

        const newStepIndex = Math.min(Math.floor((currentProgress / 100) * SCAN_STEPS.length), SCAN_STEPS.length - 1);
        if (newStepIndex !== stepIndex) {
          stepIndex = newStepIndex;
          setScanText(SCAN_STEPS[stepIndex]);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSpy = (e) => {
    e.preventDefault();
    if (!competitor.trim() || !email.trim()) {
      setFormError('Wpisz dokładną nazwę firmy i adres e-mail, aby kontynuować.');
      return;
    }

    if (!marketingConsent) {
      setFormError('Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setFormError('');
    setStatus('scanning');
    setProgress(0);

    const query = encodeURIComponent(competitor.trim());
    const link = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=PL&q=${query}&search_type=keyword_unordered&media_type=all`;
    setSpyLink(link);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Szpieg Reklam",
        email_klienta: email.trim(),
        marketing_consent: true,
        szpiegowana_firma: competitor.trim(),
        message: `BINGO! Klient zostawił maila: ${email.trim()} i szpieguje reklamy firmy: "${competitor.trim()}". To idealny moment na uderzenie z ofertą!`
      })
    }).catch(e => console.error("Webhook error", e));
  };

  const scanning = status === 'scanning';

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Szpieg reklam' }]}
        title="Zobacz reklamy, które puszcza Twoja konkurencja."
        lead="Wpisz nazwę rywala, a przygotujemy wyszukiwanie w oficjalnej, publicznej Bibliotece reklam Meta. Zobaczysz wszystkie jego aktywne reklamy na Facebooku i Instagramie."
        aside={
          <div className="tool-card crop crop--sheet">
            {status === 'idle' && (
              <form onSubmit={handleSpy} style={{ display: 'grid', gap: 'var(--space-md)' }}>
                <div className="field">
                  <label htmlFor="spy-name">Nazwa firmy konkurencji</label>
                  <input id="spy-name" className="input" type="text" placeholder="np. Firma Przykładowa" value={competitor} onChange={(e) => setCompetitor(e.target.value)} required />
                </div>
                <div className="field">
                  <label htmlFor="spy-email">Twój adres e-mail</label>
                  <input id="spy-email" className="input" type="email" autoComplete="email" inputMode="email" placeholder="kontakt@twojafirma.pl" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} />
                {formError && (
                  <p className="alert" role="alert">
                    {formError}
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--block" disabled={!marketingConsent}>
                  Przygotuj wyszukiwanie
                </button>
                <p className="note">Korzystamy wyłącznie z publicznych danych Meta.</p>
              </form>
            )}
            {scanning && (
              <div className="contact__done" role="status">
                <h2 className="checkout__h">Przygotowujemy wyszukiwanie</h2>
                <p className="ink-2">{scanText}</p>
                <div className="meter" aria-hidden="true">
                  <span className="meter__fill" style={{ transform: `scaleX(${progress / 100})` }} />
                </div>
                <p className="label num">{progress}%</p>
              </div>
            )}
            {status === 'complete' && (
              <div className="contact__done">
                <h2 className="checkout__h">Gotowe: {competitor}</h2>
                <p className="ink-2">
                  Otwórz oficjalny panel Meta i zobacz wszystkie aktywne reklamy tej firmy w Polsce.
                </p>
                <a href={spyLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block">
                  Otwórz Bibliotekę reklam Meta <ExternalLink size={18} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className="link"
                  style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                  onClick={() => {
                    setStatus('idle');
                    setCompetitor('');
                    setEmail('');
                  }}
                >
                  Sprawdź inną firmę
                </button>
              </div>
            )}
          </div>
        }
      >
        <ol className="mini-steps">
          <li>Wpisujesz nazwę konkurenta.</li>
          <li>Przygotowujemy wyszukiwanie w Bibliotece reklam Meta, z filtrem na Polskę.</li>
          <li>Widzisz jego kreacje, teksty i od kiedy je emituje.</li>
        </ol>
      </PageHead>

      {status === 'complete' ? (
        <CtaBand
          title="Oni już tam są. A Ty?"
          text="Jeśli widzisz ich reklamy, wydają budżet, żeby codziennie pokazywać się Twoim klientom. Skoro znasz już ich strategię, zbudujmy kampanię, która przejmie ten ruch."
          primary={{ href: '/#contact', label: 'Zleć nam zbadanie Twojego rynku' }}
          secondary={null}
        />
      ) : (
        <ToolsStrip current="/szpieg-reklam" />
      )}
    </>
  );
};

export default AdsSpy;
