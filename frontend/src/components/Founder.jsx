import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { nb } from '../lib/typo';

const highlights = [
  ['Z Kielc', 'baza w Kielcach, klienci z całego świętokrzyskiego'],
  ['Na żywo', 'pierwsze spotkanie u Ciebie w firmie jest bezpłatne, w całym województwie'],
  ['Lokalnie w Google', 'wizytówka, Mapy i reklamy ustawione na Twoje miasto'],
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
        <h2 id="founder-title">{nb('Działamy z Kielc. Spotykamy się w całym regionie.')}</h2>
        <p>{nb('VisiLogo prowadzi Michał Pakuła. Pracujemy z Kielc dla firm z całego województwa świętokrzyskiego i rozmawiamy tak, jak rozmawia się z kimś z sąsiedztwa: konkretnie, bez korporacyjnego żargonu i bez znikania po wystawieniu faktury.')}</p>
        <p>{nb('Wiemy, że pensjonat pod Łysicą żyje z weekendów i ferii, gabinet w Ostrowcu z Map Google, a firma budowlana z Jędrzejowa z poleceń, które trzeba przenieść do internetu. Dlatego stronę i reklamy ustawiamy pod Twoje miasto i Twoich klientów, a nie pod całą Polskę.')}</p>
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
