import React, { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { CtaBand, PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const SocialScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState('');
  const [imageFailed, setImageFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const formatUrl = (inputUrl) => {
    if (!inputUrl) return '';

    let formatted = inputUrl.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }

    return formatted;
  };

  const validateUrl = (inputUrl) => {
    try {
      const parsed = new URL(formatUrl(inputUrl));
      return Boolean(parsed.hostname && parsed.hostname.includes('.'));
    } catch {
      return false;
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Wpisz adres strony, aby rozpocząć skanowanie.');
      return;
    }

    if (!validateUrl(url)) {
      setError('Wpisz poprawny adres domeny, np. twojafirma.pl lub https://twojafirma.pl.');
      return;
    }

    if (!email.trim()) {
      setError('Podaj adres e-mail, aby otrzymać wynik i dalsze informacje.');
      return;
    }

    if (!marketingConsent) {
      setError('Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setLoading(true);
    setError('');
    setPreviewData(null);
    setImageFailed(false);

    const targetUrl = formatUrl(url);

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'Lead z Narzędzia: Skaner Wizerunku',
        skanowana_strona: targetUrl,
        email_klienta: email.trim(),
        marketing_consent: true,
        message: `Klient sprawdza, jak jego strona (${targetUrl}) wygląda w social mediach i wiadomościach.`,
      }),
    }).catch((leadError) => console.error('Nie udało się wysłać leada', leadError));

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`);

      if (!response.ok) {
        throw new Error('Usługa podglądu chwilowo nie odpowiada. Spróbuj ponownie za moment.');
      }

      const data = await response.json();

      if (data.status !== 'success' || !data.data) {
        throw new Error('Nie udało się pobrać danych strony. Serwer może blokować odczyt metadanych albo domena jest nieprawidłowa.');
      }

      const parsedUrl = new URL(targetUrl);
      const publisher = data.data.publisher || parsedUrl.hostname.replace(/^www\./, '');

      setPreviewData({
        title: data.data.title || 'Brak tytułu strony',
        description:
          data.data.description ||
          'Brakuje opisu meta description. Dla odbiorcy taki link wygląda mniej wiarygodnie i mniej zachęcająco.',
        image: data.data.image?.url || data.data.logo?.url || null,
        url: data.data.url || targetUrl,
        publisher,
      });
    } catch (err) {
      setError(err.message || 'Wystąpił nieoczekiwany błąd podczas generowania podglądu.');
    } finally {
      setLoading(false);
    }
  };

  const hasValidImage = previewData?.image && !imageFailed;

  const analysisCopy = useMemo(() => {
    if (!previewData) return null;

    if (hasValidImage) {
      return {
        title: 'Podstawy techniczne działają poprawnie',
        body:
          'Twoja strona zwraca obraz podglądu, więc link nie wygląda na uszkodzony. Teraz najważniejsze jest to, czy miniatura, tytuł i opis rzeczywiście budują wrażenie marki premium i zachęcają do kliknięcia.',
        tone: 'success',
      };
    }

    return {
      title: 'Podgląd linku osłabia wiarygodność marki',
      body:
        'Brakuje poprawnej grafiki podglądu lub serwis nie potrafi jej odczytać. W praktyce oznacza to słabsze pierwsze wrażenie w LinkedInie, komunikatorach i wiadomościach sprzedażowych.',
      tone: 'danger',
    };
  }, [hasValidImage, previewData]);

  const PreviewImage = ({ alt }) =>
    hasValidImage ? (
      <img src={previewData.image} alt={alt} onError={() => setImageFailed(true)} />
    ) : (
      <span className="lp__missing">Brak poprawnej grafiki podglądu</span>
    );

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Skaner linków' }]}
        title="Sprawdź, czy Twój link budzi zaufanie, czy odstrasza."
        lead="Wysyłasz ofertę na LinkedIn lub mailem? Zobacz, co odbiorca widzi po drugiej stronie ekranu, zanim kliknie w link do Twojej strony."
        aside={
          <form onSubmit={handleScan} className="tool-card crop crop--sheet">
            <div className="field">
              <label htmlFor="scan-url">Adres Twojej strony</label>
              <input id="scan-url" className="input" type="text" inputMode="url" placeholder="np. twojafirma.pl" value={url} onChange={(e) => setUrl(e.target.value)} required disabled={loading} />
              <span className="note">Pełny adres albo sama domena, np. visilogo.com.</span>
            </div>
            <div className="field">
              <label htmlFor="scan-email">Adres e-mail</label>
              <input id="scan-email" className="input" type="email" autoComplete="email" inputMode="email" placeholder="kontakt@twojafirma.pl" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
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
                  <Loader2 className="spin" size={18} aria-hidden="true" /> Generowanie podglądu
                </>
              ) : (
                'Wygeneruj podgląd'
              )}
            </button>
          </form>
        }
      >
        <dl className="facts">
          <div>
            <dt>LinkedIn</dt>
            <dd>czy karta linku wygląda wiarygodnie w wiadomości sprzedażowej</dd>
          </div>
          <div>
            <dt>SMS i komunikatory</dt>
            <dd>czy podgląd nie wygląda na pusty albo uszkodzony</dd>
          </div>
          <div>
            <dt>Ocena jakości</dt>
            <dd>brak miniatury, słaby tytuł i inne sygnały obniżające zaufanie</dd>
          </div>
        </dl>
      </PageHead>

      {previewData && (
        <section className="section section--s" aria-labelledby="scan-result">
          <div className="container">
            <div className="head">
              <h2 id="scan-result">Tak wygląda Twój link przed kliknięciem</h2>
              <p className="lead">Analizowany adres: {previewData.publisher}</p>
            </div>
            <div className="previews">
              <figure className="previews__item">
                <figcaption className="label">Wiadomość na LinkedIn</figcaption>
                <div className="lp lp--card">
                  <div className="lp__img">
                    <PreviewImage alt="Podgląd strony w karcie linku" />
                  </div>
                  <div className="lp__text">
                    <strong>{previewData.title}</strong>
                    <span>{previewData.publisher}</span>
                  </div>
                </div>
              </figure>
              <figure className="previews__item">
                <figcaption className="label">SMS lub komunikator na telefonie</figcaption>
                <div className="lp lp--bubble">
                  <div className="lp__img">
                    <PreviewImage alt="Podgląd strony w komunikatorze" />
                  </div>
                  <div className="lp__text">
                    <strong>{previewData.title}</strong>
                    <span>{previewData.description}</span>
                    <span>{previewData.publisher}</span>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>
      )}

      {previewData ? (
        <CtaBand
          title={analysisCopy.title}
          text={analysisCopy.body}
          primary={{ href: '/#contact', label: 'Chcę poprawić ten link' }}
          secondary={null}
        />
      ) : (
        <ToolsStrip current="/skaner" />
      )}
    </>
  );
};

export default SocialScanner;
