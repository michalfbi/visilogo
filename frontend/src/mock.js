export const mockServices = [
  {
    id: "branding",
    title: "Kompleksowy branding",
    description: "Projektujemy od zera unikalny i spójny wizerunek Twojej firmy. Tworzymy nowoczesne logo, dobieramy firmowe kolory, typografię i oddajemy Ci gotową księgę znaku.",
    details: "Dzięki temu Twoja firma wygląda profesjonalnie i od razu budzi zaufanie klientów.",
    icon: "Palette"
  },
  {
    id: "social-media",
    title: "Grafiki na social media",
    description: "Tworzymy profesjonalne, przyciągające wzrok pakiety grafik na Twojego Facebooka, Instagrama czy LinkedIna. Zdejmujemy z Ciebie ciężar wymyślania postów.",
    details: "Spójny wygląd profili społecznościowych, który angażuje odbiorców i buduje Twoją markę.",
    icon: "Smartphone"
  },
  {
    id: "websites",
    title: "Zaawansowane strony WWW",
    description: "Budujemy nowoczesne, szybkie i piękne strony internetowe. Od prostych wizytówek po mocno rozbudowane serwisy z animacjami.",
    details: "Strona nie tylko świetnie wygląda, ale jest zaprojektowana tak, by łatwo zamieniać odwiedzających w klientów.",
    icon: "Layout"
  },
  {
    id: "campaigns",
    title: "Kampanie wizualne i reklamowe",
    description: "Kiedy masz już świetny wizerunek i stronę, pomagamy Ci go pokazać światu. Ustawiamy i prowadzimy płatne reklamy w Google i Meta (Facebook/Instagram).",
    details: "Docieramy dokładnie do tych osób, które już teraz szukają Twoich produktów lub usług.",
    icon: "MousePointerClick"
  }
];

export const mockProcess = [
  { step: "01", title: "Rozmowa i planowanie", desc: "Zaczynamy od prostej rozmowy. Chcemy dowiedzieć się, co sprzedajesz, do kogo chcesz trafić i jakiego wizerunku potrzebujesz." },
  { step: "02", title: "Branding i grafika", desc: "Nasz zespół graficzny bierze się do pracy. Tworzymy logo, dobieramy kolory i przygotowujemy kompleksowe grafiki na Twoje social media." },
  { step: "03", title: "Budowa strony WWW", desc: "Mając gotowy wizerunek, programujemy i projektujemy Twoją nową, zaawansowaną stronę internetową, która stanie się Twoją najlepszą wizytówką." },
  { step: "04", title: "Kampanie i zyski", desc: "Odpalamy reklamy internetowe, które ściągają ludzi na nową stronę. Ty cieszysz się z nowych zapytań i skupiasz na obsłudze klientów." }
];

// 1. PAKIETY PROJEKTOWE (3 PAKIETY)
export const pricingPlans = [
  {
    id: "start",
    name: "Start",
    price: "2 900",
    range: "zwykle do 4 200 zł, zależnie od liczby sekcji i grafik",
    desc: "Dla firm, które startują albo nie mają jeszcze logo i strony.",
    features: ["Logo w wersji podstawowej", "Strona WWW na jednej podstronie", "Konfiguracja profili firmowych", "Podstawowe grafiki na start", "Dobór palety kolorów", "Strona dopasowana do telefonów", "Podpięcie statystyk (Google Analytics)"],
    time: "2–3 tygodnie",
    revisions: "2 rundy w cenie",
    steps: [{ title: "Brief", desc: "Analiza wizji" }, { title: "Logo", desc: "2 koncepcje" }, { title: "Kodowanie", desc: "Uruchomienie strony" }],
    highlight: false
  },
  {
    id: "rozwoj",
    name: "Rozwój",
    price: "6 500",
    range: "zwykle do 9 900 zł, zależnie od liczby podstron i integracji",
    desc: "Dla firm, które mają klientów, ale ich wizerunek jeszcze nie sprzedaje.",
    features: ["Rozbudowana strona WWW z podstronami", "Pełna identyfikacja z księgą znaku", "Szablony grafik do social mediów", "Układ strony zaprojektowany pod zapytania", "Połączenie formularzy z CRM lub pocztą", "Optymalizacja pod Google (SEO)", "Pomiar ruchu i zapytań (tagi śledzące)"],
    time: "4–6 tygodni",
    revisions: "3 rundy w cenie",
    steps: [{ title: "Audyt", desc: "Architektura UX" }, { title: "Branding", desc: "Pełny Brand Book" }, { title: "Dev", desc: "Pełne wdrożenie" }],
    highlight: true
  },
  {
    id: "dominacja",
    name: "Dominacja",
    price: "11 900",
    range: "duże serwisy od 18 500 zł, zależnie od skali i liczby kampanii",
    desc: "Dla firm, które chcą oddać cały marketing w jedne ręce: od logo po nowych klientów.",
    features: ["Duży serwis WWW z indywidualnym projektem", "Teksty na całą stronę od copywritera", "Rozbudowany system graficzny marki", "Uruchomienie kampanii Google Ads i Meta Ads", "Miesiąc prowadzenia social mediów", "Formularze, które odsiewają słabe zapytania", "Jeden stały opiekun projektu"],
    time: "6–8 tygodni",
    revisions: "3 rundy w cenie",
    steps: [{ title: "Strategia", desc: "Warsztat B2B" }, { title: "Content", desc: "Pisanie tekstów" }, { title: "Growth", desc: "Skalowanie sprzedaży" }],
    highlight: false
  }
];

// 2. PAKIETY DRUKU (3 PAKIETY)
export const printPricingPlans = [
  {
    id: "druk-podstawowy",
    name: "Druk Podstawowy",
    price: "450",
    range: "za projekty; druk wyceniamy według nakładu",
    desc: "Niezbędnik każdego handlowca. Profesjonalne projekty materiałów pierwszej potrzeby.",
    features: ["Projekt Wizytówek (2-stronne)", "Projekt Ulotek A5/DL", "Przygotowanie do druku (DTP)", "Wybór podłoża i gramatury", "Zlecenie produkcji w drukarni", "Dostawa kurierem pod drzwi"],
    time: "do 5 dni roboczych",
    revisions: "2 rundy w cenie",
    fixed: true,
    steps: [{ title: "Projekt", desc: "Indywidualna grafika" }, { title: "DTP", desc: "Spady i kolory" }, { title: "Logistyka", desc: "Zlecenie i transport" }],
    highlight: false
  },
  {
    id: "druk-biznes",
    name: "Druk Biznes",
    price: "990",
    range: "za projekty; druk wyceniamy według nakładu",
    desc: "Pełna identyfikacja ofertowa. Zestaw projektów dla firm, które często wysyłają oferty.",
    features: ["Projekt Wizytówek", "Projekt Ulotek", "Projekt Teczek Ofertowych", "Projekt Banneru (do 3m)", "Nadzór nad jakością druku", "Dostawa kurierem pod drzwi"],
    time: "do 7 dni roboczych",
    revisions: "2 rundy w cenie",
    fixed: true,
    steps: [{ title: "Identyfikacja", desc: "Spójność z marką" }, { title: "Produkcja", desc: "Wybór uszlachetnień" }, { title: "Dostawa", desc: "Dostawa pod biuro" }],
    highlight: true
  },
  {
    id: "druk-premium",
    name: "Druk Premium i Flota",
    price: "1 850",
    range: "za projekty; druk wyceniamy według nakładu",
    desc: "Największy pakiet projektowy. Spójny wizerunek w biurze, na odzieży i na drodze.",
    features: ["Projekt Wizytówek i Ulotek", "Projekt Teczek Ofertowych", "Projekt Oklejenia Auta (Standard)", "Projekt Odzieży (Koszulka+Czapka)", "Projekt Banneru Wielkoformatowego", "Pełna obsługa logistyczna", "Dostawa pod drzwi"],
    time: "do 10 dni roboczych",
    revisions: "2 rundy w cenie",
    fixed: true,
    steps: [{ title: "Wymiarowanie", desc: "Pomiary pojazdu" }, { title: "Kreacja", desc: "Projekty wielkoskalowe" }, { title: "Realizacja", desc: "Koordynacja produkcji" }],
    highlight: false
  }
];

// 3. PAKIETY ABONAMENTOWE (3 PAKIETY)
export const localPricingPlans = [
  {
    id: "lokalny-start",
    name: "Lokalny Start",
    price: "290",
    range: "",
    desc: "Fundamenty w Google. Zacznij zbierać zapytania z map i wyszukiwarki lokalnej.",
    features: ["Optymalizacja Wizytówki Google", "Tarcza ochronna profilu", "Zarządzanie opiniami", "3 posty miesięcznie w Google", "1 artykuł SEO na bloga", "Raportowanie wyników"],
    unit: "zł / mies.",
    time: "start w 7 dni",
    revisions: "od 3 miesięcy",
    fixed: true,
    steps: [{ title: "Audyt", desc: "Analiza map" }, { title: "Optymalizacja", desc: "Frazy kluczowe" }, { title: "Aktywność", desc: "Posty i wpisy" }],
    highlight: false
  },
  {
    id: "lokalny-wzrost",
    name: "Lokalny Wzrost",
    price: "590",
    range: "",
    desc: "Budowanie autorytetu. Pełna obecność w Social Media połączona z Google.",
    features: ["Wszystko z pakietu Start", "Obsługa Facebook/LinkedIn", "4 posty miesięcznie (Grafika)", "Mini-audyt UX strony WWW", "2 artykuły SEO na bloga", "Bieżące doradztwo"],
    unit: "zł / mies.",
    time: "start w 7 dni",
    revisions: "od 3 miesięcy",
    fixed: true,
    steps: [{ title: "Strategia", desc: "Social Media Plan" }, { title: "Lifting", desc: "Grafiki profilowe" }, { title: "Content", desc: "Artykuły eksperckie" }],
    highlight: true
  },
  {
    id: "lokalna-dominacja",
    name: "Lokalna Dominacja",
    price: "990",
    range: "budżet reklamowy płacisz osobno w Google",
    desc: "Agresywne pozyskiwanie leadów. Omijamy algorytmy płatnym ruchem.",
    features: ["Wszystko z pakietu Wzrost", "Kampania Google Ads (Local)", "Landing Page pod reklamy", "Copywriting sprzedażowy", "4 posty Google + Social Media", "3 artykuły SEO na bloga", "Skalowanie zasięgów"],
    unit: "zł / mies.",
    time: "start w 7 dni",
    revisions: "od 3 miesięcy",
    fixed: true,
    steps: [{ title: "Keyword Research", desc: "Analiza fraz" }, { title: "Ads Setup", desc: "Uruchomienie reklam" }, { title: "Growth", desc: "Dostarczanie leadów" }],
    highlight: false
  }
];

export const singleServices = [
  {
    category: "Wizerunek i Technologie",
    items: [
      { name: "Zaawansowane Strony WWW", price: "od 600 PLN", desc: "Wizytówki, Landing Pages, serwisy UX/UI." },
      { name: "Kompleksowy Branding", price: "od 990 PLN", desc: "Logo, księga znaku, Key Visual." },
      { name: "Copywriting Biznesowy", price: "od 600 PLN", desc: "Perswazyjne teksty na stronę." },
      { name: "Setup Analityczny", price: "od 500 PLN", desc: "GA4, GTM, Pixel, Hotjar." }
    ]
  },
  {
    category: "Reklama i Lejki",
    items: [
      { name: "Kampanie Google Ads", price: "od 600 PLN", desc: "Sieć wyszukiwania i lokalne." },
      { name: "Social Media Ads", price: "od 600 PLN", desc: "Meta Ads i LinkedIn Ads." },
      { name: "Retargeting & Lejki", price: "od 800 PLN", desc: "Ścieżki konwersji i automatyzacja." }
    ]
  },
  {
    category: "Usługi Lokalne",
    items: [
      { name: "Prowadzenie Social Media", price: "od 350 PLN", desc: "Spójne posty FB/LinkedIn." },
      { name: "Wizytówka Google", price: "200 PLN", desc: "Optymalizacja i ochrona." },
      { name: "Artykuł SEO", price: "150 PLN", desc: "Eksperckie treści na bloga." }
    ]
  },
  {
    category: "Druk (Projekty)",
    items: [
      { name: "Wizytówki, Ulotki, Teczki", price: "250 PLN", desc: "Projekty graficzne do druku." },
      { name: "Bannery, Odzież, Czapki", price: "250 PLN", desc: "Grafika wielkoformatowa/odzież." },
      { name: "Oklejanie Pojazdu", price: "800 PLN", desc: "Zaawansowany projekt na auto." }
    ]
  }
];
