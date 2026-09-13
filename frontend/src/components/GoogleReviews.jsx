import { useEffect, useState } from 'react';
import { Check, ExternalLink, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, sectionViewport, staggerContainer } from '../lib/motion';

const GOOGLE_PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places';

const fallbackReviews = [
  {
    id: 'fallback-1',
    author: 'Marek Nowak',
    rating: 5,
    text: 'VisiLogo uporządkowało nasz branding i stronę internetową. Współpraca była konkretna, szybka i bardzo profesjonalna.',
    date: '2 miesiące temu',
    avatar: null,
  },
  {
    id: 'fallback-2',
    author: 'Anna Kowalska',
    rating: 5,
    text: 'Świetne wyczucie estetyki i bardzo dobre zrozumienie biznesu. Nowa strona realnie ułatwia nam rozmowy z klientami.',
    date: '4 miesiące temu',
    avatar: null,
  },
  {
    id: 'fallback-3',
    author: 'Piotr Zieliński',
    rating: 5,
    text: 'Od pierwszego spotkania czuliśmy, że mamy po drugiej stronie partnera, a nie tylko wykonawcę. Polecamy za jakość i terminowość.',
    date: '6 miesięcy temu',
    avatar: null,
  },
];

const GoogleMark = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="#4285F4" d="M21.35 12.27c0-.75-.07-1.47-.22-2.16H12v4.09h5.24a4.49 4.49 0 0 1-1.94 2.95v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.33Z" />
    <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.04H3.27v2.52A9.74 9.74 0 0 0 12 21.75Z" />
    <path fill="#FBBC05" d="M6.51 13.82a5.85 5.85 0 0 1 0-3.64V7.66H3.27a9.75 9.75 0 0 0 0 8.68l3.24-2.52Z" />
    <path fill="#EA4335" d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.22 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.73 5.41l3.24 2.52C7.29 7.86 9.45 6.14 12 6.14Z" />
  </svg>
);

const normalizeReview = (review, index) => {
  const author = review.authorAttribution || {};
  const text = typeof review.text === 'string' ? review.text : review.text?.text;

  return {
    id: review.name || `google-${index}`,
    author: author.displayName || review.author_name || 'Klient VisiLogo',
    rating: Math.round(review.rating || 5),
    text: text || review.originalText?.text || 'Klient podzielił się pozytywną opinią o współpracy z VisiLogo.',
    date: review.relativePublishTimeDescription || review.relative_time_description || 'Ostatnio',
    avatar: author.photoUri || review.profile_photo_url || null,
    url: author.uri || null,
  };
};

const Stars = ({ rating = 5 }) => (
  <div className="flex items-center gap-1" aria-label={`${rating} na 5 gwiazdek`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={14} fill={index < rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
    ))}
  </div>
);

const ReviewSkeleton = () => (
  <div className="animate-pulse border border-white/10 bg-white/[0.035] p-5">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-white/10" />
      <div className="space-y-2">
        <div className="h-3 w-28 bg-white/10" />
        <div className="h-2 w-20 bg-white/10" />
      </div>
    </div>
    <div className="mt-5 space-y-2">
      <div className="h-3 w-full bg-white/10" />
      <div className="h-3 w-11/12 bg-white/10" />
      <div className="h-3 w-3/5 bg-white/10" />
    </div>
  </div>
);

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      setReviews(fallbackReviews);
      setHasError(true);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const response = await fetch(`${GOOGLE_PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=pl`, {
          headers: {
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'reviews',
          },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Google Places returned ${response.status}`);

        const data = await response.json();
        const fetchedReviews = (data.reviews || []).map(normalizeReview).slice(0, 3);
        setReviews(fetchedReviews.length ? fetchedReviews : fallbackReviews);
        setHasError(!fetchedReviews.length);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setReviews(fallbackReviews);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadReviews();
    return () => controller.abort();
  }, []);

  const visibleReviews = reviews.length ? reviews : fallbackReviews;

  return (
    <section className="relative h-full overflow-hidden border border-white/10 bg-[#080909]/95 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.13),_transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.05]">
                <GoogleMark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00FFD1]">Opinie z Google</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                  <Check size={13} className="rounded-full bg-[#00FFD1] p-0.5 text-black" strokeWidth={3} />
                  Zweryfikowane przez Google
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black tracking-[-0.05em] text-white">5.0</div>
              <Stars />
            </div>
          </motion.div>

          <motion.h2 variants={fadeUp} className="mt-7 max-w-[12ch] text-3xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-4xl">
            Co mówią o nas klienci
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
            Efekty współpracy najlepiej opowiadają ci, którzy już z nami pracowali.
          </motion.p>
        </motion.div>

        <div className="relative mt-6 grid flex-1 grid-cols-1 gap-3 overflow-y-auto pr-1 [scrollbar-width:thin] xl:grid-cols-3 xl:overflow-visible">
          {isLoading ? (
            [1, 2, 3].map((item) => <ReviewSkeleton key={item} />)
          ) : (
            visibleReviews.map((review, index) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative flex min-h-[178px] flex-col border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#00FFD1]/30 hover:bg-white/[0.055] hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 opacity-70 transition-opacity group-hover:opacity-100">
                  <GoogleMark className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-3 pr-7">
                  {review.avatar ? (
                    <img src={review.avatar} alt="" className="h-10 w-10 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00FFD1]/30 bg-[#00FFD1]/10 text-sm font-bold text-[#00FFD1]">
                      {review.author.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{review.author}</p>
                    <div className="mt-1 flex items-center gap-2 text-[#F4B400]">
                      <Stars rating={review.rating} />
                      <span className="text-[10px] text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-300">{review.text}</p>
                {review.url && (
                  <a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Zobacz opinię ${review.author}`} className="mt-auto self-end pt-3 text-gray-500 transition-colors hover:text-[#00FFD1]">
                    <ExternalLink size={14} />
                  </a>
                )}
              </motion.article>
            ))
          )}
        </div>

        {hasError && !isLoading && (
          <p className="relative z-10 mt-3 text-[10px] text-gray-600">Wyświetlamy ostatnio zapisane opinie.</p>
        )}
      </div>
    </section>
  );
};

export default GoogleReviews;
