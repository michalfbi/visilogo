import React from 'react';
import IndustryPage from './studio/IndustryPage';

const PageTrucks = () => (
  <IndustryPage
    slug="trucki"
    audience="Dealerzy ciężarówek i naczep"
    title="Docieraj do firm transportowych, które szukają taboru."
    lead="Sprzedaż ciągnika siodłowego to nie to samo co sprzedaż Golfa. Wiemy, jak docierać do właścicieli firm transportowych i dyrektorów logistyki."
    problemsTitle="Wyzwania B2B"
    problems={[
      'Długi proces decyzyjny klienta.',
      'Trudność w dotarciu do decydenta (nie kierowcy).',
      'Konieczność eksponowania leasingu i odliczeń VAT.',
    ]}
    solutionsTitle="Strategia VisiLogo"
    solutions={[
      'Google Ads na frazy techniczne (np. „Scania R450 Streamline cena”, „Leasing naczepy wywrotki”).',
      'LinkedIn Ads targetowany na właścicieli firm transportowych.',
      'Landing pages z kalkulatorami leasingowymi i pełną specyfikacją.',
    ]}
    cta={{ title: 'Masz plac pełen ciężarówek?', text: 'Pomożemy Ci go opróżnić. Sprawdź naszą strategię B2B.' }}
  />
);

export default PageTrucks;
