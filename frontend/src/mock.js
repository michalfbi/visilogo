export const mockServices = [
  {
    id: "branding",
    title: "Kompleksowy Branding",
    description: "Projektujemy od zera unikalny i爏p贸jny wizerunek Twojej firmy. Tworzymy nowoczesne logo, dobieramy firmowe kolory, typografi臋 i爋ddajemy Ci gotow膮 ksi臋g臋 znaku.",
    details: "Dzi臋ki temu Twoja firma wygl膮da profesjonalnie i爋d razu budzi zaufanie klient贸w.",
    icon: "Palette"
  },
  {
    id: "social-media",
    title: "Grafiki na Social Media",
    description: "Tworzymy profesjonalne, przyci膮gaj膮ce wzrok pakiety grafik na Twojego Facebooka, Instagrama czy LinkedIna. Zdejmujemy z燙iebie ci臋偶ar wymy艣lania post贸w.",
    details: "Sp贸jny wygl膮d profili spo艂eczno艣ciowych, kt贸ry anga偶uje odbiorc贸w i燽uduje Twoj膮 mark臋.",
    icon: "Smartphone"
  },
  {
    id: "websites",
    title: "Zaawansowane Strony WWW",
    description: "Budujemy nowoczesne, szybkie i爌i臋kne strony internetowe. Od prostych wizyt贸wek po mocno rozbudowane serwisy z燼nimacjami.",
    details: "Strona nie tylko 艣wietnie wygl膮da, ale jest zaprojektowana tak, by 艂atwo zamienia膰 odwiedzaj膮cych w爇lient贸w.",
    icon: "Layout"
  },
  {
    id: "campaigns",
    title: "Kampanie Wizualne i燫eklamowe",
    description: "Kiedy masz ju偶 艣wietny wizerunek i爏tron臋, pomagamy Ci go pokaza膰 艣wiatu. Ustawiamy i爌rowadzimy p艂atne reklamy v Google i燤eta (Facebook/Instagram).",
    details: "Docieramy dok艂adnie do tych os贸b, kt贸re ju偶 teraz szukaj膮 Twoich produkt贸w lub us艂ug.",
    icon: "MousePointerClick"
  }
];

export const mockProcess = [
  { step: "01", title: "Rozmowa i燩lanowanie", desc: "Zaczynamy od prostej rozmowy. Chcemy dowiedzie膰 si臋, co sprzedajesz, do kogo chcesz trafi膰 i爅akiego wizerunku potrzebujesz." },
  { step: "02", title: "Branding i燝rafika", desc: "Nasz zesp贸艂 graficzny bierze si臋 do pracy. Tworzymy logo, dobieramy kolory i爌rzygotowujemy kompleksowe grafiki na Twoje social media." },
  { step: "03", title: "Budowa Strony WWW", desc: "Maj膮c gotowy wizerunek, programujemy i爌rojektujemy Twoj膮 now膮, zaawansowan膮 stron臋 internetow膮, kt贸ra stanie si臋 Twoj膮 najlepsz膮 wizyt贸wk膮." },
  { step: "04", title: "Kampanie i燴yski", desc: "Odpalamy reklamy internetowe, kt贸re 艣ci膮gaj膮 ludzi na now膮 stron臋. Ty cieszysz si臋 z爊owych zapyta艅 i爏kupiasz na obs艂udze klient贸w." }
];

// 1. PAKIETY PROJEKTOWE (3 PAKIETY)
export const pricingPlans = [
  {
    id: "start",
    name: "Start / Podstawa",
    price: "2 900",
    range: "do 4 200 PLN",
    desc: "Idealny na start. Zyskaj sp贸jny, podstawowy wizerunek, by m贸c wej艣膰 na rynek z爇las膮.",
    features: ["Projekt podstawowego Logo", "Prosta Strona WWW (One-Page)", "Konfiguracja firmowych profili", "Podstawowe grafiki na start", "Dob贸r palety kolor贸w", "Optymalizacja RWD (Mobile)", "Podpi臋cie Google Analytics"],
    steps: [{ title: "Brief", desc: "Analiza wizji" }, { title: "Logo", desc: "2 koncepcje" }, { title: "Kodowanie", desc: "Uruchomienie strony" }],
    highlight: false
  },
  {
    id: "rozwoj",
    name: "Rozw贸j / Pro",
    price: "6 500",
    range: "do 9 900 PLN",
    desc: "Dla firm chc膮cych wygl膮da膰 mocno. Zaawansowana strona i爌e艂ny branding.",
    features: ["Zaawansowana Strona WWW", "Pe艂ny Branding i燢si臋ga Znaku", "Szablony Social Media", "Projektowanie UX pod leady", "Integracja z燙RM/Mail", "Optymalizacja SEO", "Instalacja tag贸w 艣ledz膮cych"],
    steps: [{ title: "Audyt", desc: "Architektura UX" }, { title: "Branding", desc: "Pe艂ny Brand Book" }, { title: "Dev", desc: "Pe艂ne wdro偶enie" }],
    highlight: true
  },
  {
    id: "dominacja",
    name: "Dominacja",
    price: "11 900",
    range: "18 500 PLN+",
    desc: "Pe艂na obs艂uga. Robimy wszystko: od logo po pozyskiwanie nowych klient贸w.",
    features: ["Portal WWW (Premium Design)", "Pe艂ny Copywriting Biznesowy", "Rozbudowany Key Visual", "Setup Google/Meta Ads", "Miesi膮c opieki Social Media", "Systemy kwalifikowania lead贸w", "Dedykowany opiekun"],
    steps: [{ title: "Strategia", desc: "Warsztat B2B" }, { title: "Content", desc: "Pisanie tekst贸w" }, { title: "Growth", desc: "Skalowanie sprzeda偶y" }],
    highlight: false
  }
];

// 2. PAKIETY DRUKU (3 PAKIETY)
export const printPricingPlans = [
  {
    id: "druk-podstawowy",
    name: "Druk / Podstawowy",
    price: "450",
    range: "jednorazowo",
    desc: "Niezb臋dnik ka偶dego handlowca. Profesjonalne projekty materia艂贸w pierwszej potrzeby.",
    features: ["Projekt Wizyt贸wek (2-stronne)", "Projekt Ulotek A5/DL", "Przygotowanie do druku (DTP)", "Wyb贸r pod艂o偶a i爂ramatury", "Zlecenie produkcji w燿rukarni", "Dostawa kurierem pod drzwi"],
    steps: [{ title: "Projekt", desc: "Indywidualna grafika" }, { title: "DTP", desc: "Spady i爇olory" }, { title: "Logistyka", desc: "Zlecenie i爐ransport" }],
    highlight: false
  },
  {
    id: "druk-biznes",
    name: "Druk / Biznes",
    price: "990",
    range: "jednorazowo",
    desc: "Pe艂na identyfikacja ofertowa. Zestaw projekt贸w dla firm, kt贸re cz臋sto wysy艂aj膮 oferty.",
    features: ["Projekt Wizyt贸wek", "Projekt Ulotek", "Projekt Teczek Ofertowych", "Projekt Banneru (do 3m)", "Nadz贸r nad jako艣ci膮 druku", "Dostawa kurierem pod drzwi"],
    steps: [{ title: "Identyfikacja", desc: "Sp贸jno艣膰 z爉ark膮" }, { title: "Produkcja", desc: "Wyb贸r uszlachetnie艅" }, { title: "Dostawa", desc: "Dostawa pod biuro" }],
    highlight: true
  },
  {
    id: "druk-premium",
    name: "Druk / Premium & Flota",
    price: "1 850",
    range: "jednorazowo",
    desc: "Najwi臋kszy pakiet projektowy. Sp贸jny wizerunek w燽iurze, na odzie偶y i爊a drodze.",
    features: ["Projekt Wizyt贸wek i燯lotek", "Projekt Teczek Ofertowych", "Projekt Oklejenia Auta (Standard)", "Projekt Odzie偶y (Koszulka+Czapka)", "Projekt Banneru Wielkoformatowego", "Pe艂na obs艂uga logistyczna", "Dostawa pod drzwi"],
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
    range: "miesi臋cznie",
    desc: "Fundamenty w燝oogle. Zacznij zbiera膰 zapytania z爉ap i爓yszukiwarki lokalnej.",
    features: ["Optymalizacja Wizyt贸wki Google", "Tarcza ochronna profilu", "Zarz膮dzanie opiniami", "3 posty miesi臋cznie w燝oogle", "1 artyku艂 SEO na bloga", "Raportowanie wynik贸w"],
    steps: [{ title: "Audyt", desc: "Analiza map" }, { title: "Optymalizacja", desc: "Frazy kluczowe" }, { title: "Aktywno艣膰", desc: "Posty i爓pisy" }],
    highlight: false
  },
  {
    id: "lokalny-wzrost",
    name: "Lokalny Wzrost",
    price: "590",
    range: "miesi臋cznie",
    desc: "Budowanie autorytetu. Pe艂na obecno艣膰 w燬ocial Media po艂膮czona z燝oogle.",
    features: ["Wszystko z爌akietu Start", "Obs艂uga Facebook/LinkedIn", "4 posty miesi臋cznie (Grafika)", "Mini-audyt UX strony WWW", "2 artyku艂y SEO na bloga", "Bie偶膮ce doradztwo"],
    steps: [{ title: "Strategia", desc: "Social Media Plan" }, { title: "Lifting", desc: "Grafiki profilowe" }, { title: "Content", desc: "Artyku艂y eksperckie" }],
    highlight: true
  },
  {
    id: "lokalna-dominacja",
    name: "Lokalna Dominacja",
    price: "990",
    range: "miesi臋cznie + bud偶et",
    desc: "Agresywne pozyskiwanie lead贸w. Omijamy algorytmy p艂atnym ruchem.",
    features: ["Wszystko z爌akietu Wzrost", "Kampania Google Ads (Local)", "Landing Page pod reklamy", "Copywriting sprzeda偶owy", "4 posty Google + Social Media", "3 artyku艂y SEO na bloga", "Skalowanie zasi臋g贸w"],
    steps: [{ title: "Keyword Research", desc: "Analiza fraz" }, { title: "Ads Setup", desc: "Uruchomienie reklam" }, { title: "Growth", desc: "Dostarczanie lead贸w" }],
    highlight: false
  }
];

export const singleServices = [
  {
    category: "Wizerunek i燭echnologie",
    items: [
      { name: "Zaawansowane Strony WWW", price: "od 600 PLN", desc: "Wizyt贸wki, Landing Pages, serwisy UX/UI." },
      { name: "Kompleksowy Branding", price: "od 990 PLN", desc: "Logo, ksi臋ga znaku, Key Visual." },
      { name: "Copywriting Biznesowy", price: "od 600 PLN", desc: "Perswazyjne teksty na stron臋." },
      { name: "Setup Analityczny", price: "od 500 PLN", desc: "GA4, GTM, Pixel, Hotjar." }
    ]
  },
  {
    category: "Reklama i燣ejki",
    items: [
      { name: "Kampanie Google Ads", price: "od 600 PLN", desc: "Sie膰 wyszukiwania i爈okalne." },
      { name: "Social Media Ads", price: "od 600 PLN", desc: "Meta Ads i燣inkedIn Ads." },
      { name: "Retargeting & Lejki", price: "od 800 PLN", desc: "艢cie偶ki konwersji i燼utomatyzacja." }
    ]
  },
  {
    category: "Us艂ugi Lokalne",
    items: [
      { name: "Prowadzenie Social Media", price: "od 350 PLN", desc: "Sp贸jne posty FB/LinkedIn." },
      { name: "Wizyt贸wka Google", price: "200 PLN", desc: "Optymalizacja i爋chrona." },
      { name: "Artyku艂 SEO", price: "150 PLN", desc: "Eksperckie tre艣ci na bloga." }
    ]
  },
  {
    category: "Druk (Projekty)",
    items: [
      { name: "Wizyt贸wki, Ulotki, Teczki", price: "250 PLN", desc: "Projekty graficzne do druku." },
      { name: "Bannery, Odzie偶, Czapki", price: "250 PLN", desc: "Grafika wielkoformatowa/odzie偶." },
      { name: "Oklejanie Pojazdu", price: "800 PLN", desc: "Zaawansowany projekt na auto." }
    ]
  }
];
