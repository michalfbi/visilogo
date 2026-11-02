import React, { useEffect, useRef, useState } from 'react';
import { nb } from '../lib/typo';
import { useToolsDialog } from './studio/formfield';

const HEADLINE = 'Marka, strona i reklamy w jednych rękach.';
const LEAD = 'Projektujemy logo, budujemy strony WWW i prowadzimy kampanie dla firm B2B.';

const FRAME = 1 / 24;
const EASE = 0.14;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* Reveals `total` characters one by one after a delay. Returns how many are shown. */
const useTypewriter = (total, speed = 38, startDelay = 600) => {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? total : 0));

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(total);
      return undefined;
    }
    let interval;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c + 1 >= total) window.clearInterval(interval);
          return Math.min(c + 1, total);
        });
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [total, speed, startDelay]);

  return { count, done: count >= total };
};

/*
 * The film never plays. Horizontal pointer movement sets a target time; a rAF loop eases the
 * shown time towards it (x0.14 per frame), quantises to 24 fps and seeks one frame at a time.
 */
const useFilmScrub = (videoRef, heroRef, enabled) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return undefined;

    const s = {
      duration: 0,
      targetTime: 0,
      displayedTime: 0,
      queuedSeek: null,
      isSeeking: false,
      freezeSeeks: false,
      prevX: 0,
      prevY: 0,
      ignoreNext: true,
      nonMouseActive: false,
      inView: true,
    };
    let raf = 0;

    const clamp = (t) => Math.min(Math.max(t, 0), Math.max(0, s.duration - FRAME * 0.25));

    const seek = (t) => {
      if (s.freezeSeeks) return;
      if (s.isSeeking) {
        s.queuedSeek = t;
        return;
      }
      try {
        s.isSeeking = true;
        video.currentTime = t;
      } catch (e) {
        s.isSeeking = false;
        s.freezeSeeks = true;
      }
    };

    const onSeeked = () => {
      s.isSeeking = false;
      if (s.queuedSeek !== null) {
        const next = s.queuedSeek;
        s.queuedSeek = null;
        if (Math.abs(next - video.currentTime) >= FRAME * 0.35) seek(next);
      }
    };

    const onMeta = () => {
      s.duration = Number.isFinite(video.duration) ? video.duration : 0;
      s.targetTime = 0;
      s.displayedTime = 0;
      try {
        video.currentTime = 0;
      } catch (e) {
        /* keep the poster */
      }
    };

    const move = (x, y) => {
      if (!s.duration || !s.inView) return;
      if (s.ignoreNext) {
        s.ignoreNext = false;
        s.prevX = x;
        s.prevY = y;
        return;
      }
      const dx = x - s.prevX;
      const dy = y - s.prevY;
      s.prevX = x;
      s.prevY = y;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      s.freezeSeeks = false;
      s.targetTime = clamp(s.targetTime + (dx / window.innerWidth) * 0.8 * s.duration);
    };

    const onMouseMove = (e) => move(e.clientX, e.clientY);
    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' || !e.isPrimary) return;
      s.nonMouseActive = true;
      s.ignoreNext = true;
      move(e.clientX, e.clientY);
    };
    const onPointerMove = (e) => {
      if (e.pointerType === 'mouse' || !s.nonMouseActive || !e.isPrimary) return;
      move(e.clientX, e.clientY);
    };
    const reset = () => {
      s.nonMouseActive = false;
      s.ignoreNext = true;
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') s.ignoreNext = true;
    };

    const tick = () => {
      if (s.duration && s.inView) {
        const delta = s.targetTime - s.displayedTime;
        if (Math.abs(delta) < FRAME * 0.12) s.displayedTime = s.targetTime;
        else s.displayedTime += delta * EASE;
        const q = clamp(Math.round(s.displayedTime / FRAME) * FRAME);
        if (Math.abs(q - video.currentTime) >= FRAME * 0.35) seek(q);
      }
      raf = window.requestAnimationFrame(tick);
    };

    let observer;
    if ('IntersectionObserver' in window && heroRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        s.inView = entry.isIntersecting;
        s.ignoreNext = true;
      });
      observer.observe(heroRef.current);
    }

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    if (video.readyState >= 1) onMeta();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', reset);
    window.addEventListener('pointercancel', reset);
    window.addEventListener('touchcancel', reset);
    document.addEventListener('visibilitychange', onVisibility);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', reset);
      window.removeEventListener('pointercancel', reset);
      window.removeEventListener('touchcancel', reset);
      document.removeEventListener('visibilitychange', onVisibility);
      s.queuedSeek = null;
    };
  }, [videoRef, heroRef, enabled]);
};

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const { openTools } = useToolsDialog();

  const [reduced, setReduced] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState('loading'); // loading | ready | failed
  const [filmVisible, setFilmVisible] = useState(false);
  const [pillsIn, setPillsIn] = useState(false);

  const headline = nb(HEADLINE);
  const lead = nb(LEAD);
  const { count, done } = useTypewriter(headline.length + lead.length);

  useEffect(() => {
    const rm = prefersReducedMotion();
    setReduced(rm);
    setCoarse(window.matchMedia?.('(pointer: coarse)').matches ?? false);
    setMounted(true);
    if (rm) {
      setPillsIn(true);
      return undefined;
    }
    const t = window.setTimeout(() => setPillsIn(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  useFilmScrub(videoRef, heroRef, mounted && !reduced && status !== 'failed');

  const showFilm = () => {
    if (reduced) return;
    window.setTimeout(() => setFilmVisible(true), 40);
  };
  const markReady = () => setStatus((s) => (s === 'loading' ? 'ready' : s));

  const hShown = Math.min(count, headline.length);
  const lShown = Math.max(0, count - headline.length);
  const cursor = !done && !reduced ? <span className="ff-cursor" aria-hidden="true" /> : null;

  return (
    <section ref={heroRef} className="ff-hero" aria-labelledby="hero-title">
      <div className="ff-media" aria-hidden="true">
        <img className="ff-media__frame" src="/hero-poster.jpg" alt="" width="1920" height="1080" fetchpriority="high" onLoad={markReady} />
        {mounted && !reduced && (
          <video
            ref={videoRef}
            className={`ff-media__frame${filmVisible ? ' is-visible' : ''}${status === 'failed' ? ' is-failed' : ''}`}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/hero-poster.jpg"
            onLoadedMetadata={markReady}
            onCanPlay={showFilm}
            onLoadedData={showFilm}
            onError={(e) => {
              // React bubbles <source> errors up to here; only the video's own error counts.
              if (e.target === e.currentTarget) setStatus('failed');
            }}
          >
            {/* A source skipped by its media query also fires "error", so only the last one counts as failure. */}
            <source src="/hero-film-scrub-960.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/hero-film-scrub.mp4" type="video/mp4" onError={() => setStatus('failed')} />
          </video>
        )}
        <div className="ff-media__tint" />
        <div className="ff-media__vignette" />
        <div className="ff-media__veil" />
      </div>

      <p className="ff-status" aria-live="polite">
        {status === 'loading' && 'Wczytywanie kadru…'}
        {status === 'failed' && 'Film niedostępny — pokazujemy kadr.'}
      </p>

      <div className="ff-copy">
        <p className="ff-intro" aria-hidden="true">
          Branding, social media, strony WWW i kampanie —
          <br />
          VisiLogo, jeden zespół dla firm B2B.
        </p>

        {/* Full text is always in the DOM (search, screen readers); untyped characters are transparent. */}
        <div className="ff-type">
          <h1 id="hero-title" className="ff-type__h">
            {headline.slice(0, hShown)}
            {lShown === 0 && cursor}
            <span className="ff-type__rest">{headline.slice(hShown)}</span>
          </h1>
          <p className="ff-type__p">
            {lead.slice(0, lShown)}
            {lShown > 0 && cursor}
            <span className="ff-type__rest">{lead.slice(lShown)}</span>
          </p>
        </div>

        {coarse && !reduced && <p className="ff-hint">Przeciągnij w poziomie, aby obejrzeć</p>}

        <div className={`ff-pills${pillsIn ? ' is-in' : ''}`}>
          <a href="#contact" className="pill">
            Umów bezpłatną konsultację
          </a>
          <a href="#pricing" className="pill">
            Zobacz pakiety i ceny
          </a>
          <a href="/skonfiguruj-projekt" className="pill">
            Skonfiguruj projekt
          </a>
          <a href="/proces" className="pill">
            Poznaj szczegóły procesu
          </a>
          <button type="button" className="pill pill--outline" aria-haspopup="dialog" onClick={(e) => openTools(e.currentTarget)}>
            Darmowe narzędzia
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
