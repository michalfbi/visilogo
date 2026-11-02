import React from 'react';
import { Check, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { CtaBand, PageHead } from './ui';
import { nb } from '../../lib/typo';

/* One layout for the industry landing pages: problems on the left, the answer on the right. */
const IndustryPage = ({ slug, audience, title, lead, problemsTitle, problems, solutionsTitle, solutions, cta }) => (
  <>
    <Helmet>
      <title>{`${audience} | VisiLogo`}</title>
      <meta name="description" content={lead} />
      <link rel="canonical" href={`https://visilogo.com/${slug}`} />
    </Helmet>

    <PageHead crumbs={[{ label: 'Branże' }, { label: audience }]} title={title} lead={lead} wide />

    <section className="section section--s" aria-label="Problemy i rozwiązania">
      <div className="container ledger">
        <div className="ledger__col">
          <h2 className="ledger__h">{problemsTitle}</h2>
          <ul className="ledger__list ledger__list--problems">
            {problems.map((item) => (
              <li key={item}>
                <X size={18} aria-hidden="true" />
                <span>{nb(item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ledger__col ledger__col--answer">
          <h2 className="ledger__h">{solutionsTitle}</h2>
          <ul className="ledger__list">
            {solutions.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                <span>{nb(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <CtaBand
      title={cta.title}
      text={cta.text}
      primary={{ href: '/#contact', label: 'Wypełnij formularz' }}
      secondary={{ href: '/#pricing', label: 'Zobacz pakiety lokalne' }}
    />
  </>
);

export default IndustryPage;
