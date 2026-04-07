export const fallbackBlogPosts = [
  {
    _id: "ai-w-marketingu-2025",
    slug: "ai-w-marketingu-2025",
    title: "AI w Marketingu: Jak automatyzacja zmienia zasady gry w 2025 roku",
    excerpt:
      "Sztuczna inteligencja to nie przyszłość, to teraźniejszość. Zobacz, jak wykorzystujemy AI do personalizacji i optymalizacji kampanii.",
    category: "AI & Tech",
    date: "2025-08-10",
    content:
      "Sztuczna inteligencja przestała być buzzwordem, a stała się fundamentem nowoczesnych strategii marketingowych. W VisiLogo nie boimy się technologii – wykorzystujemy ją, by nasi klienci wyprzedzali konkurencję o lata świetlne. Od generowania hyper-spersonalizowanego contentu, przez predykcyjną analitykę zachowań konsumentów, aż po automatyzację obsługi klienta. W 2025 roku marketing bez AI jest jak jazda dorożką po autostradzie. Jest klimatycznie, ale wszyscy Cię wyprzedzają. W tym artykule pokażemy konkretne case study wdrożeń, które zwiększyły ROI o ponad 300%."
  },
  {
    _id: "psychologia-koloru-w-sprzedazy",
    slug: "psychologia-koloru-w-sprzedazy",
    title: "Ciemny motyw w UX: Dlaczego marki premium wybierają czerń?",
    excerpt:
      "Czerń to kolor luksusu, tajemnicy i elegancji. Dowiedz się, dlaczego dark mode to coś więcej niż trend.",
    category: "Branding",
    date: "2025-08-05",
    content:
      "Czy zastanawiałeś się, dlaczego najdroższe karty kredytowe są czarne? Dlaczego aplikacje tradingowe i high-tech stawiają na dark mode? Ciemne tło zmniejsza zmęczenie oczu, ale przede wszystkim buduje atmosferę ekskluzywności i skupienia. W VisiLogo stosujemy zasadę 90/10 – 90% głębokiej czerni i 10% jaskrawego akcentu. To kieruje uwagę użytkownika dokładnie tam, gdzie chcemy: na Call to Action. Przeanalizujemy psychologię koloru w digital designie i podpowiemy, kiedy warto zgasić światło na swojej stronie www."
  },
  {
    _id: "seo-przyszlosci",
    slug: "seo-przyszlosci",
    title: "Koniec SEO jakie znasz. Era Search Generative Experience",
    excerpt:
      "Jak pozycjonować się w czasach, gdy odpowiedzi udziela AI, a nie lista linków? Nowa strategia widoczności.",
    category: "Strategia",
    date: "2025-07-28",
    content:
      "Google zmienia się na naszych oczach. SGE (Search Generative Experience) sprawia, że walka o pierwsze miejsce w wynikach wyszukiwania zmienia się w walkę o bycie źródłem wiedzy dla AI. Tradycyjne słowa kluczowe tracą na znaczeniu na rzecz autorytetu tematycznego. W tym wpisie rozbieramy na czynniki pierwsze nowe algorytmy i pokazujemy, jak budować content huby, które przetrwają każdą aktualizację. Spoiler: jakość jest ważniejsza niż ilość."
  },
  {
    _id: "skuteczny-landing-page",
    slug: "skuteczny-landing-page",
    title: "Anatomia Landing Page'a, który konwertuje na zimnym ruchu",
    excerpt:
      "Bez zbędnych ozdobników. Tylko psychologia, UX i copywriting, który zamyka sprzedaż.",
    category: "Web Design",
    date: "2025-07-15",
    content:
      "Piękna strona to za mało. Strona musi sprzedawać. Wielu klientów przychodzi do nas z witrynami, które wyglądają jak dzieła sztuki, ale nie generują ani jednego leada. Dlaczego? Bo zapominają o użytkowniku. W tym artykule przeprowadzimy Cię przez autorską strukturę sekcji: Hero, Problem, Agitacja, Rozwiązanie, Social Proof i CTA. Pokażemy, jak sterować wzrokiem odwiedzającego i jakich błędów unikać, by nie przepalać budżetu reklamowego."
  }
];

export const getFallbackBlogPostBySlug = (slug) =>
  fallbackBlogPosts.find((post) => post.slug === slug) || null;
