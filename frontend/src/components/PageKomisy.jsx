import React from 'react';
import IndustryPage from './studio/IndustryPage';

const PageKomisy = () => (
  <IndustryPage
    slug="komisy"
    audience="Komisy i dealerzy aut używanych"
    title="Przestań konkurować ceną na OTOMOTO. Zbuduj własny lejek sprzedaży."
    lead="Większość komisów czeka na telefon. My sprawiamy, że telefon dzwoni. Wdrażamy systemy, które wyłapują klienta, zanim ten w ogóle wejdzie na portal ogłoszeniowy."
    problemsTitle="Problemy, które rozwiązujemy"
    problems={[
      'Rosnące ceny ogłoszeń i spadające zasięgi.',
      'Telefony od „Januszy” i marudnych klientów („daję 10k i biorę”).',
      'Auta stojące na placu powyżej 60 dni (zamrożona gotówka).',
    ]}
    solutionsTitle="Nasze rozwiązanie"
    solutions={[
      'Własne reklamy Facebook/Instagram targetowane na lokalny rynek (+50 km).',
      'Formularze kwalifikujące klientów (budżet, termin, finansowanie).',
      'Kampanie „Wyprzedaż rocznika” i „Nowa dostawa” generujące szybki pik sprzedaży.',
    ]}
    cta={{ title: 'Chcesz sprzedawać więcej aut?', text: 'Umów się na bezpłatną analizę Twojego stoku.' }}
  />
);

export default PageKomisy;
