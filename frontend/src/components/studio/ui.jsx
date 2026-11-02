import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { nb } from '../../lib/typo';

/* Shared building blocks for every subpage on the Studio system. */

export const Crumbs = ({ items }) => (
  <nav className="crumbs label" aria-label="Okruszki">
    <ol>
      <li>
        <Link to="/">VisiLogo</Link>
      </li>
      {items.map((item) => (
        <li key={item.label}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

/* Page head: crumbs, h1, one lead line, and an optional aside on the right columns. */
export const PageHead = ({ crumbs, title, lead, aside, children, wide = false }) => (
  <header className={`page-head proof${aside ? ' page-head--split' : ''}`}>
    <div className="container">
      <Crumbs items={crumbs} />
      <div className="page-head__grid">
        <div className="page-head__text">
          <h1 className={wide ? 'page-head__h1--wide' : undefined}>{nb(title)}</h1>
          {lead && <p className="lead">{nb(lead)}</p>}
          {children}
        </div>
        {aside && <div className="page-head__aside">{aside}</div>}
      </div>
    </div>
  </header>
);

/* Closing band on ink: one head, one line, two actions. */
export const CtaBand = ({
  title = 'Porozmawiajmy o Twojej firmie',
  text = 'Powiemy wprost, co warto zrobić najpierw. Rozmowa i analiza są bezpłatne.',
  primary = { href: '/#contact', label: 'Umów bezpłatną analizę' },
  secondary = { href: '/#pricing', label: 'Zobacz pakiety i ceny' },
}) => (
  <section className="section--ink cta-band" aria-labelledby="cta-title">
    <div className="container cta-band__grid">
      <h2 id="cta-title">{nb(title)}</h2>
      <p>{nb(text)}</p>
      <div className="actions">
        <a href={primary.href} className="btn btn--primary">
          {primary.label}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        {secondary && (
          <a href={secondary.href} className="btn btn--on-ink">
            {secondary.label}
          </a>
        )}
      </div>
    </div>
  </section>
);

/* A section head: h2 on the left, lead on the right. */
export const Head = ({ id, title, lead, stack = false }) => (
  <div className={`head${stack ? ' head--stack' : ''}`}>
    <h2 id={id}>{nb(title)}</h2>
    {lead && <p className="lead">{nb(lead)}</p>}
  </div>
);
