import React from 'react';
import { nb } from '../lib/typo';

const faqs = [
  {
    question: 'Ile czasu zajmuje stworzenie nowej strony i pełnego wizerunku?',
    answer:
      'Najczęściej cały proces — od strategii, przez projekt logo i architekturę informacji, aż po wdrożenie strony — zamykamy w 4 do 6 tygodni. Pracujemy sprintami, więc na bieżąco widzisz postęp i podejmujesz decyzje bez chaosu.',
  },
  {
    question: 'Czy muszę samodzielnie pisać teksty na stronę internetową?',
    answer:
      'Nie. W wyższych pakietach copywriting biznesowy jest częścią współpracy. Zbieramy od Ciebie kontekst, ofertę i przewagi, a następnie przygotowujemy teksty dopasowane do sprzedaży, wizerunku i SEO.',
  },
  {
    question: 'Mogę zlecić stronę freelancerowi za 1500 zł. Dlaczego u Was jest drożej?',
    answer:
      'Bo nie sprzedajemy samego “ładnego widoku”. Projektujemy całą ścieżkę decyzji użytkownika: strukturę, przekaz, design, punkty kontaktu i mechanikę konwersji. Tania strona często tylko istnieje. Dobra strona ma pracować na zapytania i wizerunek marki.',
  },
  {
    question: 'Czy po uruchomieniu strony pomagacie w pozyskiwaniu klientów?',
    answer:
      'Tak — i właśnie dlatego budujemy stronę w określony sposób. Docelowo ma ona współpracować z kampaniami Google Ads, Meta Ads, social sellingiem i materiałami sprzedażowymi. Dzięki temu witryna nie jest oderwanym bytem, tylko częścią systemu wzrostu.',
  },
  {
    question: 'Jak wyglądają kwestie techniczne: hosting, domena i bezpieczeństwo?',
    answer:
      'Pomagamy dobrać i skonfigurować domenę, hosting oraz podstawowe zabezpieczenia, w tym certyfikat SSL. Finalnie dostajesz produkt gotowy do działania, bez potrzeby samodzielnego rozwiązywania technicznych detali po drodze.',
  },
];

const FAQ = () => (
  <section id="faq" className="section" aria-labelledby="faq-title">
    <div className="container faq">
      <div className="faq__head">
        <h2 id="faq-title">Pytania, które słyszymy najczęściej</h2>
        <p className="ink-2">Czas realizacji, teksty, wdrożenie i odpowiedzialność za efekt końcowy.</p>
        <p className="ink-2">
          Nie znalazłeś odpowiedzi?{' '}
          <a className="link" href="#contact">
            Zadaj pytanie bezpośrednio
          </a>
        </p>
      </div>
      <ul className="faq__list">
        {faqs.map((faq, index) => (
          <li key={faq.question}>
            <details open={index === 0}>
              <summary>
                {nb(faq.question)}
                <span className="index__sign" aria-hidden="true" />
              </summary>
              <p>{nb(faq.answer)}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default FAQ;
