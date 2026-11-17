import React from 'react';
import { Apple, HardHat, Mountain, Stethoscope, Store, UtensilsCrossed } from 'lucide-react';
import { nb } from '../lib/typo';

const industries = [
  {
    icon: Mountain,
    title: 'Noclegi, turystyka i uzdrowiska',
    text: 'Sandomierz, Busko-Zdrój, Solec-Zdrój i Góry Świętokrzyskie. Strony z rezerwacją, wizytówki Google, które łapią turystów, i kampanie ustawione przed sezonem, feriami i długimi weekendami.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restauracje, kawiarnie i catering',
    text: 'Menu na stronie, mapa, rezerwacja stolika i opinie w Google. Tak, żeby ktoś, kto wpisuje „obiad Kielce” albo „pizza Ostrowiec”, trafił do Ciebie, a nie do sąsiada.',
  },
  {
    icon: Stethoscope,
    title: 'Gabinety i specjaliści zdrowia',
    text: 'Stomatolodzy, fizjoterapeuci, weterynarze, kosmetolodzy. Strona, która buduje zaufanie, czytelny cennik usług, zapisy online i widoczność w Mapach Google w Twoim mieście.',
  },
  {
    icon: HardHat,
    title: 'Budowlanka, kamień i instalacje',
    text: 'Świętokrzyskie stoi na kamieniu, cemencie i budowlance. Wykonawcom, firmom wykończeniowym, instalatorom i producentom materiałów robimy strony z realizacjami i reklamy na konkretne powiaty.',
  },
  {
    icon: Apple,
    title: 'Sady i producenci żywności',
    text: 'Ziemia Sandomierska to jeden z największych regionów sadowniczych w kraju. Gospodarstwom, grupom producenckim i przetwórniom projektujemy logo, etykiety i strony dla hurtowych odbiorców.',
  },
  {
    icon: Store,
    title: 'Sklepy, warsztaty i usługi',
    text: 'Firmy, które dziś żyją z poleceń, a chcą, żeby telefon dzwonił także z Google. Prosta strona, dopracowana wizytówka i reklama ograniczona do Twojego miasta i okolicy.',
  },
];

const LocalIndustries = () => (
  <section id="branze" className="section" aria-labelledby="local-title">
    <div className="container">
      <div className="head">
        <h2 id="local-title">{nb('Dla kogo pracujemy w Kielcach i regionie')}</h2>
        <p className="lead">
          {nb('Najczęściej dla lokalnych firm, które mają dobrą usługę, ale w internecie przegrywają z konkurencją z tej samej ulicy.')}
        </p>
      </div>

      <ul className="local-grid">
        {industries.map(({ icon: Icon, title, text }) => (
          <li key={title} className="local-card">
            <span className="local-card__icon" aria-hidden="true">
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <h3>{nb(title)}</h3>
            <p>{nb(text)}</p>
          </li>
        ))}
      </ul>

      <p className="local-more ink-2">
        {nb('Obsługujemy też handel pojazdami: ')}
        <a href="/komisy" className="link">komisy samochodowe</a>,{' '}
        <a href="/trucki" className="link">sprzedawców ciężarówek</a> i{' '}
        <a href="/busy" className="link">aut dostawczych</a>.
      </p>
    </div>
  </section>
);

export default LocalIndustries;
