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

export const mockBlogPosts = [
  {
    id: 1,
    slug: "b2b-lead-generation",
    title: "Jak pozyskiwać wartościowe leady B2B w 2026 roku?",
    excerpt: "Zobacz, jak zbudować własny lejek sprzedaży i uniezależnić się od zewnętrznych platform pozyskujących klientów.",
    category: "Marketing B2B",
    date: "2025-08-12",
    content: "Większość firm popełnia błąd, traktując marketing jako jednorazowy wydatek. W 2026 roku kluczem jest przewidywalność..."
  },
  {
    id: 2,
    slug: "ux-w-sprzedazy",
    title: "Złe UX kosztuje Cię klientów. Jak strona wpływa na sprzedaż?",
    excerpt: "Dlaczego mimo ruchu na stronie nie masz zapytań? Prześwietlamy najczęstsze błędy w projektowaniu stron firmowych.",
    category: "Web Design",
    date: "2025-08-05",
    content: "Estetyka to za mało. Strona internetowa musi być bezlitosną maszyną sprzedażową, która prowadzi klienta za rękę..."
  },
  {
    id: 3,
    slug: "darmowe-metody-b2b",
    title: "3 darmowe sposoby na pozyskanie klienta B2B (bez budżetu reklamowego)",
    excerpt: "Brak budżetu to nie wymówka. Zobacz, jak wykorzystać Cold Emailing, Google Maps oraz LinkedIn, aby nawiązywać lukratywne relacje biznesowe.",
    category: "Skalowanie Biznesu",
    date: "2026-03-12",
    content: "Skuteczna akwizycja w B2B nie zawsze wymaga potężnego kapitału. Kluczem jest personalizacja i precyzyjne dotarcie do decydentów. Wykorzystanie lokalnej przewagi oraz bezpośredni, szczery komunikat na LinkedIn potrafią wygenerować spotkania z klientami o wysokiej wartości (High-Ticket)..."
  }
];

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
    steps: [
      { title: "Brief i Strategia", desc: "Zaczynamy od zebrania informacji o Twojej firmie i ustalenia wizji wizualnej." },
      { title: "Projektowanie Logo", desc: "Przygotowujemy 2 unikalne koncepcje znaku firmowego do Twojej akceptacji." },
      { title: "Szkic Strony (Wireframe)", desc: "Projektujemy układ wizytówki WWW i dobieramy zdjęcia oraz kolory." },
      { title: "Kodowanie i Publikacja", desc: "Programujemy stronę, podpinamy Twoją domenę i uruchamiamy projekt w sieci." }
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
    steps: [
      { title: "Audyt i Architektura", desc: "Planujemy dokładną strukturę wszystkich podstron i ścieżkę klienta (UX)." },
      { title: "Pełny Branding", desc: "Tworzymy logo, dobieramy typografię i składamy wszystko w Księgę Znaku." },
      { title: "Projektowanie UI", desc: "Rysujemy makiety graficzne strony internetowej z uwzględnieniem RWD." },
      { title: "Web Development", desc: "Kodujemy stronę, dodajemy płynne animacje i spinamy formularze kontaktowe." },
      { title: "Analityka i Start", desc: "Wdrażamy tagi Google, testujemy szybkość ładowania i oficjalnie startujemy." }
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
    steps: [
      { title: "Warsztat Strategiczny", desc: "Głęboka analiza Twojej konkurencji, profilu klienta (ICP) i celów sprzedażowych." },
      { title: "Copywriting i Branding", desc: "Piszemy przekonujące teksty ofertowe i budujemy potężny Key Visual (Brand Identity)." },
      { title: "Zaawansowany Web Design", desc: "Kodujemy portal nastawiony na najwyższą konwersję z dedykowanymi integracjami." },
      { title: "Setup Kampanii Reklamowych", desc: "Tworzymy i uruchamiamy kampanie w Google Ads i Meta Ads celujące w Twoich klientów." },
      { title: "Opieka i Skalowanie", desc: "Przez pierwszy miesiąc prowadzimy Twoje profile i optymalizujemy koszty zapytań." }
    ],
    highlight: false
  }
];
