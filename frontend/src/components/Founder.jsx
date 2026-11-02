import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { nb } from '../lib/typo';

const highlights = [
  ['Partnerstwo', 'pracujemy jak rozszerzenie Twojego zespołu'],
  ['Odpowiedzialność', 'nie kończymy na estetyce, liczy się efekt'],
  ['Spójność', 'branding, strona i komunikacja działają razem'],
];

const Founder = () => (
  <section id="founder" className="section section--l" aria-labelledby="founder-title">
    <div className="container founder">
      <figure className="portrait crop crop--sheet">
        <div className="portrait__frame">
          <picture>
            <source srcSet="/michal-960.webp" type="image/webp" />
            <img src="/michal-960.jpg" alt="Michał Pakuła, założyciel VisiLogo" width="960" height="1439" loading="lazy" decoding="async" />
          </picture>
        </div>
        <figcaption className="label">
          <span>Michał Pakuła, założyciel VisiLogo</span>
          <span className="redline">4 : 5</span>
        </figcaption>
      </figure>

      <div className="founder__text">
        <h2 id="founder-title">{nb('Nie jesteśmy anonimową korporacją. Gramy w jednej drużynie.')}</h2>
        <p>{nb('Większość agencji traktuje swoich klientów jak kolejne pozycje w arkuszu kalkulacyjnym. Prace są rozpraszane, odpowiedzialność się rozmywa, a kontakt urywa zaraz po wystawieniu faktury. My działamy inaczej.')}</p>
        <p>{nb('VisiLogo powstało z myślą o ambitnych przedsiębiorcach, którzy potrzebują nie tylko estetyki, ale przede wszystkim partnera biznesowego. Kogoś, kto bierze odpowiedzialność za dowiezienie jakości, spójnego wizerunku i lepszego efektu sprzedażowego w internecie.')}</p>
        <blockquote className="founder__quote">{nb('Marka ma wyglądać premium, ale przede wszystkim pomagać sprzedawać.')}</blockquote>
        <dl className="facts">
          {highlights.map(([title, description]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
        <div className="actions">
          <a
            href="https://www.linkedin.com/in/michał-pakuła-0b5b382b7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn crop"
          >
            Poznajmy się na LinkedIn
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="/#cases" className="link" style={{ alignSelf: 'center' }}>
            Zobacz realizacje
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Founder;
