import React, { useMemo, useState } from 'react';
import ConsentCheckbox from './ConsentCheckbox';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Smartphone,
  Linkedin,
  CheckCircle,
  Globe,
  Sparkles,
  ShieldCheck,
  Link2,
} from 'lucide-react';

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pb-16 pt-24 lg:pb-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,209,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute right-[-10%] top-[-12%] h-[36rem] w-[36rem] rounded-full bg-[#00FFD1]/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[35%] h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl pt-4 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#00FFD1]"
            >
              <Eye size={16} /> Skaner pierwszego wrażenia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[0.96]"
            >
              Sprawdź, czy Twój link
              <span className="block bg-gradient-to-r from-[#ff6b57] via-[#ff7b54] to-[#ff9f43] bg-clip-text text-transparent">
                budzi zaufanie, czy odstrasza
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl"
            >
              Wysyłasz ofertę na LinkedIn lub mailem? Zobacz dokładnie, co odbiorca widzi po drugiej stronie ekranu,
              zanim kliknie w link do Twojej strony.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <Linkedin className="mb-3 text-[#0A66C2]" size={20} />
                <div className="text-sm font-bold text-white">LinkedIn</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">Sprawdź, czy karta linku wygląda wiarygodnie w wiadomości sprzedażowej.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <Smartphone className="mb-3 text-[#00FFD1]" size={20} />
                <div className="text-sm font-bold text-white">SMS i komunikatory</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">Zobacz, czy podgląd nie wygląda na pusty, losowy lub technicznie uszkodzony.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <ShieldCheck className="mb-3 text-emerald-400" size={20} />
                <div className="text-sm font-bold text-white">Ocena jakości</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">Wychwyć brak miniatury, słaby tytuł i inne sygnały obniżające zaufanie.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#00FFD1]/20 via-transparent to-blue-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />

              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00FFD1]/20 bg-[#00FFD1]/10 text-[#00FFD1]">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#00FFD1]">Link preview audit</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Wygeneruj podgląd swojej strony</h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-400">
                    Wklej domenę, a narzędzie pokaże, jak Twoja oferta może wyglądać w kanale sprzedażowym B2B.
                  </p>
                </div>
              </div>

              <form onSubmit={handleScan} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                    Adres Twojej strony
                  </label>
                  <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-4 transition-all duration-300 focus-within:border-[#00FFD1]/60 focus-within:shadow-[0_0_0_1px_rgba(0,255,209,0.15)]">
                    <Globe size={18} className="shrink-0 text-gray-500 transition-colors group-focus-within:text-[#00FFD1]" />
                    <input
                      type="text"
                      placeholder="np. twojafirma.pl"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-600"
                      required
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Obsługiwane są pełne adresy oraz same domeny, np. <span className="text-gray-300">visilogo.com</span>.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    placeholder="kontakt@twojafirma.pl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#00FFD1]/50"
                    required
                    disabled={loading}
                  />
                </div>

                <ConsentCheckbox
                  marketingConsent={marketingConsent}
                  setMarketingConsent={setMarketingConsent}
                  disabled={loading}
                />

                {error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
                    <AlertTriangle size={22} className="mt-0.5 shrink-0" />
                    <div className="text-sm leading-relaxed">{error}</div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !marketingConsent}
                  className={`inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                    loading || !marketingConsent
                      ? 'cursor-not-allowed bg-gray-800 text-gray-500'
                      : 'bg-[#00FFD1] text-black shadow-[0_0_30px_rgba(0,255,209,0.25)] hover:translate-y-[-1px] hover:bg-[#00e8bf]'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Generowanie podglądu...
                    </>
                  ) : (
                    <>
                      <Link2 size={20} /> Wygeneruj podgląd B2B
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {previewData && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-14 space-y-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00FFD1]">Wynik skanowania</div>
                  <h3 className="mt-2 text-3xl font-bold text-white">Tak wygląda Twój link przed kliknięciem</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                  Analizowany adres: <span className="font-semibold text-white">{previewData.publisher}</span>
                </div>
              </div>

              <div className="grid gap-8 xl:grid-cols-2">
                <div className="overflow-hidden rounded-[1.75rem] border border-[#2c3136] bg-[#1b2025] shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                    <Linkedin className="text-[#0A66C2]" size={20} />
                    <div>
                      <div className="text-sm font-bold text-white">Wiadomość LinkedIn</div>
                      <div className="text-xs text-gray-400">Podgląd karty linku w komunikacji B2B</div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-100">
                        {hasValidImage ? (
                          <img
                            src={previewData.image}
                            alt="Podgląd strony dla LinkedIn"
                            className="h-full w-full object-cover"
                            onError={() => setImageFailed(true)}
                          />
                        ) : (
                          <div className="flex flex-col items-center px-6 text-center text-red-500">
                            <AlertTriangle size={34} className="mb-3" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.24em]">Brak poprawnej grafiki podglądu</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 p-5">
                        <h4 className="line-clamp-2 text-base font-bold leading-tight text-black">{previewData.title}</h4>
                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">{previewData.description}</p>
                        <p className="pt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">{previewData.publisher}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.75rem] border border-gray-300/70 bg-gradient-to-b from-gray-100 to-gray-200 shadow-2xl">
                  <div className="flex items-center justify-center gap-3 border-b border-gray-300/60 bg-white/70 px-5 py-4 backdrop-blur-sm">
                    <Smartphone className="text-[#00B894]" size={20} />
                    <div className="text-center">
                      <div className="text-sm font-bold text-black">SMS / iMessage</div>
                      <div className="text-xs text-gray-500">Mobilny preview linku</div>
                    </div>
                  </div>

                  <div className="flex justify-end p-6">
                    <div className="w-full max-w-[22rem] rounded-[1.75rem] bg-[#e9e9eb] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                      <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-sm">
                        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gray-300">
                          {hasValidImage ? (
                            <img
                              src={previewData.image}
                              alt="Podgląd strony dla komunikatora"
                              className="h-full w-full object-cover"
                              onError={() => setImageFailed(true)}
                            />
                          ) : (
                            <div className="flex flex-col items-center px-5 text-center text-red-500/80">
                              <AlertTriangle size={26} className="mb-2" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.24em]">Brak grafiki</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 bg-[#f3f3f4] p-4">
                          <h4 className="line-clamp-2 text-sm font-bold leading-tight text-black">{previewData.title}</h4>
                          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{previewData.description}</p>
                          <p className="text-[11px] lowercase tracking-wide text-gray-500">{previewData.publisher}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col gap-6 rounded-[1.75rem] border p-8 md:flex-row md:items-center md:justify-between ${
                  analysisCopy.tone === 'success'
                    ? 'border-[#00FFD1]/20 bg-[#00FFD1]/6'
                    : 'border-red-500/30 bg-red-500/6 shadow-[0_0_30px_rgba(239,68,68,0.12)]'
                }`}
              >
                <div className="max-w-3xl">
                  <h4 className="flex items-center gap-3 text-2xl font-bold text-white">
                    {analysisCopy.tone === 'success' ? (
                      <CheckCircle className="text-[#00FFD1]" size={24} />
                    ) : (
                      <AlertTriangle className="text-red-400" size={24} />
                    )}
                    {analysisCopy.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-gray-300">{analysisCopy.body}</p>
                </div>

                <a
                  href="/#contact"
                  className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                    analysisCopy.tone === 'success'
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-red-600 text-white hover:bg-red-500'
                  }`}
                >
                  Chcę poprawić ten link <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialScanner;
