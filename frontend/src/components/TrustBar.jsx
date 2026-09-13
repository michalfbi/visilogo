import { useEffect, useState } from 'react';

const fallbackReviews = [
  {
    author: 'Michał',
    rating: 5,
    text: 'Profesjonalna obsługa, świetny design i bardzo dobre zrozumienie potrzeb firmy. Efekt końcowy naprawdę robi wrażenie.',
  },
  {
    author: 'Karolina',
    rating: 5,
    text: 'Współpraca była bardzo szybka i konkretnie nastawiona na rezultat. Strona i komunikacja marki wyglądały dużo lepiej niż wcześniej.',
  },
  {
    author: 'Piotr',
    rating: 5,
    text: 'Dobrze zrobione, estetycznie i z naciskiem na sprzedaż. Dużo łatwiej było budować zaufanie klientów po wdrożeniu.',
  },
];

const TrustBar = () => {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [rating, setRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to load reviews');

        const data = await response.json();
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews.slice(0, 3));
        }

        if (data.rating) {
          setRating(Number(data.rating));
        }

        if (data.totalReviews) {
          setTotalReviews(Number(data.totalReviews));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setReviews(fallbackReviews);
          setRating(5);
          setTotalReviews(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => controller.abort();
  }, []);

  const renderStars = (value) =>
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.round(value) ? 'text-[#00FFD1]' : 'text-white/20'}>
        ★
      </span>
    ));

  return (
    <section className="section-shell relative z-20 overflow-hidden border-y border-white/5 bg-[#040404] py-14 lg:py-20">
      <div className="pointer-events-none absolute left-[8%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#00FFD1]/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-10 flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#00FFD1]">Opinie Google</span>
          <h2 className="max-w-2xl text-3xl font-bold tracking-[-0.05em] text-white md:text-4xl lg:text-5xl">
            Klienci polecają nas jako partnera do rozwoju marki i sprzedaży.
          </h2>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-1 text-lg">{renderStars(rating)}</div>
            <span className="font-semibold text-white">{rating.toFixed(1)}</span>
            {totalReviews > 0 && <span className="text-gray-400">({totalReviews} opinii)</span>}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-56 animate-pulse border border-white/10 bg-white/[0.03]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <article
                key={`${review.author}-${index}`}
                className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent" />
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-white">{review.author}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">Google review</p>
                  </div>
                  <div className="flex items-center gap-1 text-base">{renderStars(review.rating || 5)}</div>
                </div>
                <p className="text-base leading-relaxed text-gray-300">“{review.text}”</p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.google.com/maps/place/Visilogo/@51.8423743,13.85696,6z/data=!3m1!4b1!4m6!3m5!1s0x4719d3297fbdd97d:0xac90ba0d53d04fed!8m2!3d51.953761!4d19.1343692!16s%2Fg%2F11xv_g46sn?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Zobacz profil Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
