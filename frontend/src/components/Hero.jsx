import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { nb } from '../lib/typo';

/*
 * Hero: one dark, rounded panel. The art behind the copy is drawn here, not loaded:
 * a field of flowing lines that tighten towards the lower right, lit by the accent.
 */
const LINES = Array.from({ length: 22 }, (_, i) => {
  const y = 120 + i * 30;
  const a = 60 + i * 9;
  return `M -60 ${y} C 220 ${y - a}, 470 ${y + a * 0.9}, 720 ${y - 30} S 1060 ${y - a * 0.8}, 1280 ${y + 40}`;
});

const HeroArt = () => (
  <svg className="hero__art" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="0.8" className="hero__art-stop" stopOpacity="0.95" />
        <stop offset="1" className="hero__art-stop" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {LINES.map((d, i) => (
      <path key={d} d={d} fill="none" stroke="url(#hero-line)" strokeWidth={i % 4 === 0 ? 1.6 : 0.9} opacity={0.18 + (i / LINES.length) * 0.5} />
    ))}
  </svg>
);

const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero__panel">
      <HeroArt />
      <div className="container hero__inner">
        <p className="hero__place">
          <MapPin size={16} aria-hidden="true" />
          Kielce, województwo świętokrzyskie
        </p>
        <h1 id="hero-title">{nb('Strony WWW, logo i reklamy dla firm z Kielc i całego świętokrzyskiego')}</h1>
        <p className="hero__lead">
          {nb('Działamy z Kielc. Projektujemy logo, budujemy strony internetowe i prowadzimy kampanie Google i Facebook dla firm z regionu: od Skarżyska i Starachowic po Sandomierz i Busko-Zdrój.')}
        </p>
        <div className="actions">
          <a href="#contact" className="btn btn--primary">
            Umów bezpłatną konsultację
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="#pricing" className="btn">
            Zobacz pakiety i ceny
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
