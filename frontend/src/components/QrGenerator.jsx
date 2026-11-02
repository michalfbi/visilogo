import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { CtaBand, PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const QrGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatUrl = (val) => {
    let formatted = val.trim();
    if (!formatted) return '';
    if (!formatted.startsWith('http') && formatted.includes('.')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputValue || !email.trim() || !marketingConsent) {
      setError(!inputValue ? 'Wpisz adres do wygenerowania kodu QR.' : !email.trim() ? 'Podaj adres e-mail.' : 'Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setError('');
    setLoading(true);
    setQrUrl(null);
    
    const targetData = formatUrl(inputValue);

    // CICHY ZAPIS LEADA
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Generator QR",
        email_klienta: email.trim(),
        marketing_consent: true,
        wpisane_dane: targetData,
        message: `Klient właśnie generuje kod QR dla adresu: ${targetData}. Prawdopodobnie robi wizytówki, baner lub okleja auto!`
      })
    }).catch(e => console.error("Webhook error", e));

    // Symulacja ładowania
    setTimeout(() => {
      const generatedUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(targetData)}&format=png&margin=20`;
      setQrUrl(generatedUrl);
      setLoading(false);
    }, 800);
  };

  const downloadQR = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'VisiLogo_QRCode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      // Jeśli przeglądarka zablokuje pobieranie, otworzy grafikę w nowej karcie
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Generator QR' }]}
        title="Darmowy generator kodów QR"
        lead="Potrzebujesz kodu na wizytówki, ulotki albo firmowe auto? Wpisz adres strony i pobierz gotowy plik do druku w kilka sekund."
        aside={
          <div className="tool-card crop crop--sheet qr-card">
            {qrUrl ? (
              <>
                <img src={qrUrl} alt={`Kod QR prowadzący do ${inputValue}`} width="500" height="500" className="qr-card__img" />
                <button type="button" className="btn btn--primary btn--block" onClick={downloadQR}>
                  <Download size={18} aria-hidden="true" /> Pobierz PNG 500 × 500
                </button>
                <button type="button" className="link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', justifySelf: 'start' }} onClick={() => setQrUrl(null)}>
                  Stwórz kolejny kod
                </button>
              </>
            ) : (
              <form onSubmit={handleGenerate} style={{ display: 'grid', gap: 'var(--space-md)' }}>
                <div className="field">
                  <label htmlFor="qr-data">Adres WWW lub telefon</label>
                  <input id="qr-data" className="input" type="text" placeholder="np. visilogo.com" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required disabled={loading} />
                </div>
                <div className="field">
                  <label htmlFor="qr-email">Adres e-mail</label>
                  <input id="qr-email" className="input" type="email" autoComplete="email" inputMode="email" placeholder="kontakt@twojafirma.pl" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                </div>
                <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} disabled={loading} />
                {error && (
                  <p className="alert" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--block" disabled={loading || !marketingConsent}>
                  {loading ? (
                    <>
                      <Loader2 className="spin" size={18} aria-hidden="true" /> Generowanie pliku
                    </>
                  ) : (
                    'Stwórz kod QR'
                  )}
                </button>
                <p className="note">Bez znaków wodnych, gotowe do druku.</p>
              </form>
            )}
          </div>
        }
      />

      {qrUrl ? (
        <CtaBand
          title="Kod działa. Ale czy strona sprzedaje?"
          text="Klient zeskanuje kod telefonem. Jeśli strona ładuje się wolno albo wygląda przestarzale, kod zadziała, ale klient ucieknie."
          primary={{ href: '/#contact', label: 'Zamów nowoczesną stronę mobilną' }}
          secondary={{ href: '/pojedynek', label: 'Sprawdź szybkość obecnej strony' }}
        />
      ) : (
        <ToolsStrip current="/generator-qr" />
      )}
    </>
  );
};

export default QrGenerator;
