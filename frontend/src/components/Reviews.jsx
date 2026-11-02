import React, { useEffect, useState } from 'react';

/*
 * Real Google reviews only. Two sources, as before the redesign:
 * 1. Google Places API from the browser, when REACT_APP_GOOGLE_API_KEY and
 *    REACT_APP_GOOGLE_PLACE_ID are set at build time.
 * 2. The /api/google-reviews endpoint, when it exists.
 * When neither returns reviews, the section renders nothing: no stand-in quotes.
 */
const GOOGLE_PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places';
const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/Visilogo/@51.8423743,13.85696,6z/data=!3m1!4b1!4m6!3m5!1s0x4719d3297fbdd97d:0xac90ba0d53d04fed!8m2!3d51.953761!4d19.1343692!16s%2Fg%2F11xv_g46sn?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';

const normalizeReview = (review, index) => {
  const author = review.authorAttribution || {};
  const text = typeof review.text === 'string' ? review.text : review.text?.text || review.originalText?.text;

  return {
    id: review.name || `google-${index}`,
    author: author.displayName || review.author_name || review.author || null,
    rating: Math.round(review.rating || 0),
    text: text || null,
    date: review.relativePublishTimeDescription || review.relative_time_description || null,
  };
};

const loadFromPlaces = async (signal) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const response = await fetch(`${GOOGLE_PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=pl`, {
    headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'reviews,rating,userRatingCount' },
    signal,
  });
  if (!response.ok) throw new Error(`Google Places returned ${response.status}`);
  const data = await response.json();
  return { reviews: data.reviews || [], rating: data.rating, total: data.userRatingCount };
};

const loadFromEndpoint = async (signal) => {
  const response = await fetch('/api/google-reviews', { signal });
  if (!response.ok) throw new Error('Failed to load reviews');
  const type = response.headers.get('content-type') || '';
  if (!type.includes('application/json')) return null;
  const data = await response.json();
  return { reviews: data.reviews || [], rating: data.rating, total: data.totalReviews };
};

const Reviews = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      for (const source of [loadFromPlaces, loadFromEndpoint]) {
        try {
          const result = await source(controller.signal);
          const reviews = (result?.reviews || [])
            .map(normalizeReview)
            .filter((r) => r.text && r.author)
            .slice(0, 3);
          if (reviews.length) {
            setState({ reviews, rating: Number(result.rating) || null, total: Number(result.total) || null });
            return;
          }
        } catch (error) {
          if (controller.signal.aborted) return;
        }
      }
    };

    run();
    return () => controller.abort();
  }, []);

  if (!state) return null;

  return (
    <section className="section section--s" aria-labelledby="reviews-title">
      <div className="container">
        <div className="head">
          <h2 id="reviews-title">Opinie z Google</h2>
          <p className="lead">
            {state.rating ? `Średnia ${state.rating.toFixed(1)} z 5` : 'Opinie klientów'}
            {state.total ? `, ${state.total} opinii. ` : '. '}
            <a className="link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">
              Zobacz wszystkie w Google
            </a>
          </p>
        </div>
        <ul className="reviews">
          {state.reviews.map((review) => (
            <li key={review.id}>
              <blockquote>„{review.text}”</blockquote>
              <footer>
                <strong>{review.author}</strong>
                {review.date && <span>{review.date}</span>}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
