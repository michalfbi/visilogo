import React from 'react';
import IndustryPage from './studio/IndustryPage';

const PageVans = () => (
  <IndustryPage
    slug="busy"
    audience="Dealerzy aut dostawczych i busów"
    title="Sprzedaż aut użytkowych na pełnych obrotach."
    lead="Klient szukający busa potrzebuje go „na wczoraj” do pracy. Twoja oferta musi być widoczna dokładnie w momencie, gdy zepsuje mu się stare auto."
    problemsTitle="Specyfika rynku"
    problems={[
      'Bardzo duża rotacja (dobre sztuki znikają w 24 h).',
      'Klient szuka konkretnych zabudów (chłodnia, plandeka, brygadówka).',
    ]}
    solutionsTitle="Co proponujemy"
    solutions={[
      'Dynamiczne reklamy w wyszukiwarce (DSA) pod konkretne zabudowy.',
      'Targetowanie lokalne na firmy budowlane, instalacyjne i kurierskie.',
      'Szybkie strony lądowania dla kategorii (np. „Busy do 3,5 t”).',
    ]}
    cta={{ title: 'Sprzedajesz dostawczaki?', text: 'Zwiększ obroty dzięki precyzyjnemu marketingowi.' }}
  />
);

export default PageVans;
