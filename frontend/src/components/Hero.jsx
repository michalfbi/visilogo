import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { nb } from '../lib/typo';

/*
 * The VisiLogo wordmark set in Hedvig Letters Serif with its real metrics,
 * read from the font file (units per em 1000): ascender 800, cap height 700,
 * x-height 520, baseline 0, descender -247 (the p). Advances are the font's
 * own hmtx values; kerning is off so the sum is the drawn width (4014).
 */
const UPM = 1000;
const CLEAR = 520; // clear space = one x-height
const GLYPHS = [
  ['V', 691],
  ['i', 287],
  ['s', 431],
  ['i', 287],
  ['L', 582],
  ['o', 613],
  ['g', 510],
  ['o', 613],
];
const WORD_W = GLYPHS.reduce((sum, [, adv]) => sum + adv, 0);
const ASC = 800;
const DESC = 247;
const VIEW_W = CLEAR + WORD_W + CLEAR;
const BASE = CLEAR + ASC;
const VIEW_H = BASE + DESC + CLEAR;

const GUIDES = [
  { key: 'asc', y: BASE - ASC, label: 'Wydłużenia górne', value: '800', side: 'above' },
  { key: 'cap', y: BASE - 700, label: 'Wersaliki', value: '700', side: 'below' },
  { key: 'x', y: BASE - 520, label: 'Wysokość x', value: '520', side: 'below' },
  { key: 'base', y: BASE, label: 'Linia bazowa', value: '0', side: 'above' },
  { key: 'desc', y: BASE + DESC, label: 'Wydłużenia dolne', value: '−247', side: 'below' },
];

const starts = GLYPHS.reduce((acc, [, adv], i) => {
  acc.push(i === 0 ? CLEAR : acc[i - 1] + GLYPHS[i - 1][1]);
  return acc;
}, []);

const ClearBox = ({ x, y }) => (
  <g>
    <rect className="construct__box" x={x} y={y} width={CLEAR} height={CLEAR} />
    <line className="construct__x" x1={x + CLEAR / 2 - 40} y1={y + CLEAR / 2 - 40} x2={x + CLEAR / 2 + 40} y2={y + CLEAR / 2 + 40} />
    <line className="construct__x" x1={x + CLEAR / 2 + 40} y1={y + CLEAR / 2 - 40} x2={x + CLEAR / 2 - 40} y2={y + CLEAR / 2 + 40} />
  </g>
);

const Construction = ({ active, onMeasure }) => {
  const measured = active === null ? null : { x: starts[active], w: GLYPHS[active][1] };
  const tickY = CLEAR / 2 + 40;

  return (
    <div className="construct-wrap">
      <svg
        className="construct"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMinYMid meet"
        role="img"
        aria-label="Znak VisiLogo w konstrukcji: linie wydłużeń górnych, wersalików, wysokości x, linii bazowej i wydłużeń dolnych oraz pole ochronne o wielkości jednej wysokości x."
        onMouseLeave={() => onMeasure(null)}
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="none" className="construct__box" style={{ fill: 'none', strokeDasharray: '6 6' }} />
        <ClearBox x={0} y={0} />
        <ClearBox x={VIEW_W - CLEAR} y={0} />
        <ClearBox x={0} y={VIEW_H - CLEAR} />
        <ClearBox x={VIEW_W - CLEAR} y={VIEW_H - CLEAR} />

        <line className="construct__guide construct__guide--dash" x1={CLEAR} y1="0" x2={CLEAR} y2={VIEW_H} style={{ transformOrigin: 'center top', animationName: 'none' }} />
        <line className="construct__guide construct__guide--dash" x1={CLEAR + WORD_W} y1="0" x2={CLEAR + WORD_W} y2={VIEW_H} style={{ transformOrigin: 'center top', animationName: 'none' }} />

        {GUIDES.map((g, i) => (
          <line
            key={g.key}
            className="construct__guide"
            x1="0"
            y1={g.y}
            x2={VIEW_W}
            y2={g.y}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}

        <text className="construct__word" x={CLEAR} y={BASE} fontSize={UPM}>
          VisiLogo
        </text>

        {measured && (
          <g aria-hidden="true">
            <line className="construct__measure" x1={measured.x} y1={tickY} x2={measured.x + measured.w} y2={tickY} />
            <line className="construct__measure" x1={measured.x} y1={tickY - 60} x2={measured.x} y2={tickY + 60} />
            <line className="construct__measure" x1={measured.x + measured.w} y1={tickY - 60} x2={measured.x + measured.w} y2={tickY + 60} />
            <text className="construct__measure-text" x={measured.x + measured.w / 2} y={tickY - 90} fontSize="120" textAnchor="middle">
              {measured.w}
            </text>
          </g>
        )}

        {GLYPHS.map(([ch, adv], i) => (
          <rect
            key={`${ch}-${i}`}
            className="construct__hit"
            x={starts[i]}
            y={BASE - ASC}
            width={adv}
            height={ASC + DESC}
            onMouseEnter={() => onMeasure(i)}
          />
        ))}
      </svg>

      <div className="construct__readouts" aria-hidden="true">
        {GUIDES.map((g) => (
          <span key={g.key} className="construct__readout-row" data-side={g.side} style={{ top: `${(g.y / VIEW_H) * 100}%` }}>
            <span>
              {g.label} <b>{g.value}</b>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const [active, setActive] = useState(null);
  const readout =
    active === null
      ? 'Najedź na literę, by ją zmierzyć'
      : `${GLYPHS[active][0]}: szerokość ${GLYPHS[active][1]} z 1000 jednostek`;

  return (
    <section className="hero proof" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__bar label">
          <span>Konstrukcja znaku VisiLogo</span>
          <span>Hedvig Letters Serif, w jednostkach z 1000</span>
          <span aria-live="polite">{readout}</span>
        </div>

        <Construction active={active} onMeasure={setActive} />

        <div className="grid12 hero__copy">
          <h1 id="hero-title">{nb('Marka, strona i reklamy w jednych rękach.')}</h1>
          <div className="hero__side">
            <p>{nb('Projektujemy logo, budujemy strony WWW i prowadzimy kampanie dla firm B2B.')}</p>
            <div className="actions">
              <a href="#contact" className="btn btn--primary crop">
                Umów bezpłatną konsultację
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#pricing" className="btn crop">
                Zobacz pakiety i ceny
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
