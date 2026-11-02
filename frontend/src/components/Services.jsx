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
    <div className="container">
      <div className="head">
        <h2 id="services-title">{nb('Cztery usługi, jeden zespół')}</h2>
        <p className="lead">{nb('Koniec z szukaniem kilku różnych wykonawców. Grafika, technologia i reklama powstają pod jednym dachem.')}</p>
      </div>

      <ol className="index set">
        {mockServices.map((service, index) => (
          <li key={service.id}>
            <details open={index === 0}>
              <summary>
                <h3>{nb(service.title)}</h3>
                <p>{nb(service.description)}</p>
                <span className="index__sign" aria-hidden="true" />
              </summary>
              <div className="index__body">
                <div>
                  <p>{nb(service.details)}</p>
                  <dl>
                    <dt>
                      Jako pojedyncza usługa
                      <small>Taniej w pakiecie, zobacz cennik niżej</small>
                    </dt>
                    <dd>{fromPrice[service.id]}</dd>
                  </dl>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Services;
