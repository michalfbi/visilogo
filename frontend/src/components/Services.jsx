import React from 'react';
import { mockServices } from '../mock';
import { nb } from '../lib/typo';

// The lowest single-service price for each service, from the a la carte list in mock.js.
const fromPrice = {
  branding: 'od 990 PLN',
  'social-media': 'od 350 PLN',
  websites: 'od 600 PLN',
  campaigns: 'od 600 PLN',
};

const Services = () => (
  <section id="services" className="section" aria-labelledby="services-title">
    <div className="container services">
      <div className="services__head">
        <h2 id="services-title">{nb('Cztery usługi, jeden zespół')}</h2>
        <p className="lead">{nb('Nie musisz szukać grafika w Kielcach, programisty w Krakowie i agencji reklamowej w Warszawie. Logo, strona i reklamy powstają w jednym miejscu, z jedną osobą do kontaktu.')}</p>
        <a href="#pricing" className="link">
          Ceny pakietów i pojedynczych usług
        </a>
      </div>

      <ol className="services__grid">
        {mockServices.map((service) => (
          <li key={service.id} className="service">
            <h3>{nb(service.title)}</h3>
            <p>{nb(service.description)}</p>
            <p className="service__gain">{nb(service.details)}</p>
            <p className="service__price">
              <span className="label">Jako pojedyncza usługa</span>
              <span>{fromPrice[service.id]}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Services;
