export const mockServices = [
  {
    id: "branding",
    title: "Kompleksowy Branding",
    description: "Projektujemy od zera unikalny i spójny wizerunek Twojej firmy. Tworzymy nowoczesne logo, dobieramy firmowe kolory, typografię i oddajemy Ci gotową księgę znaku.",
    details: "Dzięki temu Twoja firma wygląda profesjonalnie i od razu budzi zaufanie klientów.",
    icon: "Palette"
  },
  {
    id: "social-media",
    title: "Grafiki na Social Media",
    description: "Tworzymy profesjonalne, przyciągające wzrok pakiety grafik na Twojego Facebooka, Instagrama czy LinkedIna. Zdejmujemy z Ciebie ciężar wymyślania postów.",
    details: "Spójny wygląd profili społecznościowych, który angażuje odbiorców i buduje Twoją markę.",
    icon: "Smartphone"
  },
  {
    id: "websites",
    title: "Zaawansowane Strony WWW",
    description: "Budujemy nowoczesne, szybkie i piękne strony internetowe. Od prostych wizytówek po mocno rozbudowane serwisy z animacjami.",
    details: "Strona nie tylko świetnie wygląda, ale jest zaprojektowana tak, by łatwo zamieniać odwiedzających w klientów.",
    icon: "Layout"
  },
  {
    id: "campaigns",
    title: "Kampanie Wizualne i Reklamowe",
    description: "Kiedy masz już świetny wizerunek i stronę, pomagamy Ci go pokazać światu. Ustawiamy i prowadzimy płatne reklamy w Google i Meta (Facebook/Instagram).",
    details: "Docieramy dokładnie do tych osób, które już teraz szukają Twoich produktów lub usług.",
    icon: "MousePointerClick"
  }
];

export const mockProcess = [
  {
    step: "01",
    title: "Rozmowa i Planowanie",
    desc: "Zaczynamy od prostej rozmowy. Chcemy dowiedzieć się, co sprzedajesz, do kogo chcesz trafić i jakiego wizerunku potrzebujesz."
  },
  {
    step: "02",
    title: "Branding i Grafika",
    desc: "Nasz zespół graficzny bierze się do pracy. Tworzymy logo, dobieramy kolory i przygotowujemy kompleksowe grafiki na Twoje social media."
  },
  {
    step: "03",
    title: "Budowa Strony WWW",
    desc: "Mając gotowy wizerunek, programujemy i projektujemy Twoją nową, zaawansowaną stronę internetową, która stanie się Twoją najlepszą wizytówką."
  },
  {
    step: "04",
    title: "Kampanie i Zyski",
    desc: "Odpalamy reklamy internetowe, które ściągają ludzi na nową stronę. Ty cieszysz się z nowych zapytań i skupiasz na obsłudze klientów."
  }
];

export const mockBlogPosts = [];

export const pricingPlans = [
  {
    id: "start",
    name: "Start / Podstawa",
    price: "2 900",
    range: "do 4 200 PLN",
    desc: "Idealny na start. Zyskaj spójny, podstawowy wizerunek, by móc wejść na rynek z klasą.",
    features: [
      "Projekt podstawowego Logo (2 koncepcje)",
      "Prosta Strona WWW (One-Page / Wizytówka)",
      "Konfiguracja firmowych profili",
      "Podstawowe grafiki na start (np. Tło FB)",
      "Dobór palety kolorów firmowych",
      "Optymalizacja strony na ekrany telefonów (RWD)",
      "Podpięcie statystyk strony (Google Analytics)"
    ],
    highlight: false
  },
  {
    id: "rozwoj",
    name: "Rozwój / Profesjonalny",
    price: "6 500",
    range: "do 9 900 PLN",
    desc: "Dla firm chcących wyglądać mocno. Zaawansowana strona i pełny branding.",
    features: [
      "Zaawansowana, rozbudowana Strona WWW",
      "Pełny Branding i Podstawowa Księga Znaku",
      "Szablony do tworzenia grafik na Social Media",
      "Projektowanie pod kątem UX i generowania leadów",
      "Integracja formularzy z Twoim mailem/CRM",
      "Podstawowa optymalizacja pod wyszukiwarkę (SEO)",
      "Instalacja tagów śledzących zachowania klientów",
      "Wsparcie techniczne na czas wdrożenia"
    ],
    highlight: true
  },
  {
    id: "dominacja",
    name: "Kompleksowy / Dominacja",
    price: "11 900",
    range: "do 18 500 PLN+",
    desc: "Pełna obsługa. My robimy dla Ciebie wszystko: od logo po pozyskiwanie nowych klientów.",
    features: [
      "Zaawansowana Strona WWW (interakcje, premium design)",
      "Pełny copywriting biznesowy (my piszemy teksty na stronę)",
      "Rozbudowana Księga Znaku i Key Visual",
      "Setup pierwszych kampanii w Google Ads / Meta Ads",
      "Miesiąc pełnej opieki nad postami Social Media",
      "Wdrożenie systemów kwalifikowania leadów (formularze)",
      "Architektura SEO do budowy autorytetu tematycznego",
      "Dedykowane konsultacje strategiczne i opieka menedżera"
    ],
    highlight: false
  }
];
