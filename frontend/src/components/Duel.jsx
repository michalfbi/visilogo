import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CtaBand, PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const Duel = () => {
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // ==========================================
  // TUTAJ WKLEJ SWÓJ KLUCZ API OD GOOGLE
  // ==========================================
  const GOOGLE_API_KEY = 'AIzaSyCzr8S4AguqMXV6cqpG2YjUjGaIXFUkuAo';

  const formatUrl = (url) => {
    if (!url) return '';
    let formatted = url.trim().toLowerCase();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const fetchScore = async (url) => {
    const targetUrl = formatUrl(url);
    const keyParam = GOOGLE_API_KEY !== 'TUTAJ_WKLEJ_SWOJ_KLUCZ' ? `&key=${GOOGLE_API_KEY}` : '';
    const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${keyParam}`;
    
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.error?.message || `Odpowiedź serwera: ${response.status}`);
      }
      
      if (!data.lighthouseResult?.categories?.performance?.score) {
        throw new Error("Google zwróciło pusty wynik wydajności dla tej strony.");
      }
      
      const audits = data.lighthouseResult.audits;
      
      return {
        score: Math.round(data.lighthouseResult.categories.performance.score * 100),
        metrics: {
          fcp: audits['first-contentful-paint']?.displayValue || 'Brak',
          lcp: audits['largest-contentful-paint']?.displayValue || 'Brak',
          tbt: audits['total-blocking-time']?.displayValue || 'Brak',
          cls: audits['cumulative-layout-shift']?.displayValue || 'Brak',
        }
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleDuel = async (e) => {
    e.preventDefault();
    if (!yourUrl || !competitorUrl) {
      setError('Wprowadź oba adresy URL, aby rozpocząć pojedynek.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    // CICHY ZAPIS LEADA - wysyłamy adresy na Twój Webhook w tle
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Pojedynek Stron",
        twoja_strona: yourUrl,
        strona_konkurencji: competitorUrl,
        message: `Klient testuje swoją stronę (${yourUrl}) przeciwko rywalowi (${competitorUrl}). Sprawdź to i przygotuj uderzenie!`
      })
    }).catch(e => console.error("Nie udało się wysłać leada", e));

    try {
      const yourDataPromise = fetchScore(yourUrl).catch(e => { throw new Error(`Błąd Twojej strony (${yourUrl}): ${e.message}`) });
      const competitorDataPromise = fetchScore(competitorUrl).catch(e => { throw new Error(`Błąd strony rywala (${competitorUrl}): ${e.message}`) });

      const [yourData, competitorData] = await Promise.all([yourDataPromise, competitorDataPromise]);

      setResults({
        you: { url: yourUrl, ...yourData },
        competitor: { url: competitorUrl, ...competitorData },
        youWon: yourData.score >= competitorData.score
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verdict = (score) => (score >= 90 ? 'szybka' : score >= 50 ? 'średnia' : 'wolna');
  const tone = (score) => (score >= 90 ? 'good' : score >= 50 ? 'mid' : 'bad');
  const METRICS = [
    ['fcp', 'Pierwsza treść (FCP)'],
    ['lcp', 'Główny element (LCP)'],
    ['tbt', 'Czas blokady (TBT)'],
    ['cls', 'Przesunięcia układu (CLS)'],
  ];

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Pojedynek stron' }]}
        title="Sprawdź, czy konkurencja kradnie Twoich klientów."
        lead="Pobieramy dane bezpośrednio z Google PageSpeed Insights. Wpisz swój adres i adres rywala, a w kilkanaście sekund zobaczysz, czyja strona ładuje się szybciej na telefonie."
        wide
      >
        <form onSubmit={handleDuel} className="tool-form tool-form--duel">
          <div className="field">
            <label htmlFor="duel-you">Twoja strona</label>
            <input id="duel-you" className="input" type="text" inputMode="url" placeholder="np. twojafirma.pl" value={yourUrl} onChange={(e) => setYourUrl(e.target.value)} required disabled={loading} />
          </div>
          <span className="tool-form__vs" aria-hidden="true">
            kontra
          </span>
          <div className="field">
            <label htmlFor="duel-rival">Strona konkurenta</label>
            <input id="duel-rival" className="input" type="text" inputMode="url" placeholder="np. konkurent.pl" value={competitorUrl} onChange={(e) => setCompetitorUrl(e.target.value)} required disabled={loading} />
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" size={18} aria-hidden="true" /> Trwa analiza
              </>
            ) : (
              'Rozpocznij pojedynek'
            )}
          </button>
        </form>
        {loading && <p className="note" role="status">Łączenie z Google PageSpeed Insights, to potrwa do 30 sekund.</p>}
        {error && (
          <p className="alert" role="alert">
            {error}
          </p>
        )}
      </PageHead>

      {results && (
        <section className="section section--s" aria-labelledby="duel-result">
          <div className="container">
            <h2 id="duel-result" className="visually-hidden">
              Wynik pojedynku
            </h2>
            <div className="duel">
              {[
                ['Twoja strona', results.you, results.youWon],
                ['Konkurencja', results.competitor, !results.youWon],
              ].map(([label, side, won]) => (
                <div key={label} className={`duel__side${won ? ' duel__side--won' : ''}`}>
                  <p className="label">
                    {label}
                    {won ? ', szybsza' : ''}
                  </p>
                  <p className="duel__url">{side.url}</p>
                  <p className={`figure duel__score duel__score--${tone(side.score)}`}>
                    {side.score}
                    <small>/100</small>
                  </p>
                  <div className="meter" aria-hidden="true">
                    <span className={`meter__fill meter__fill--${tone(side.score)}`} style={{ transform: `scaleX(${side.score / 100})` }} />
                  </div>
                  <p className="ink-2">Google ocenia tę stronę jako {verdict(side.score)}.</p>
                </div>
              ))}
            </div>

            <div className="table-wrap">
              <table className="table duel__table">
                <thead>
                  <tr>
                    <th scope="col">Wskaźnik (telefon)</th>
                    <th scope="col" className="num">Twoja strona</th>
                    <th scope="col" className="num">Konkurencja</th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map(([key, name]) => (
                    <tr key={key}>
                      <th scope="row">{name}</th>
                      <td className="num">{results.you.metrics[key]}</td>
                      <td className="num">{results.competitor.metrics[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {results ? (
        <CtaBand
          title={results.youWon ? 'Wygrywasz technologicznie, ale…' : 'Przegrywasz wyścig o klienta w Google'}
          text={
            results.youWon
              ? 'Wynik techniczny masz bardzo dobry. Pytanie, czy w B2B sam kod wystarczy. Jeśli design nie buduje zaufania, a kampanie nie generują zapytań, zróbmy to porządnie.'
              : 'Konkurent ma szybszą stronę, więc Google promuje go wyżej, a jego klienci nie uciekają przez długie ładowanie. Tracisz budżet każdego dnia.'
          }
          primary={{ href: '/#contact', label: results.youWon ? 'Porozmawiajmy o rebrandingu' : 'Zamów audyt i naprawę' }}
        />
      ) : (
        <ToolsStrip current="/pojedynek" />
      )}
    </>
  );
};

export default Duel;
