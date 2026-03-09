// Automotive-Specific Mock Data

export const mockServices = [
    {
      id: "ads",
      title: "Performance Ads dla Dealerów",
      description: "Kampanie Google i Meta, które sprzedają konkretne modele, a nie tylko generują 'ruch'.",
      details: "Targetowanie po marce/modelu, remarketing dynamiczny (oglądał BMW -> widzi BMW), reklamy lokalne ściągające klientów na plac.",
      icon: "BarChart"
    },
    {
      id: "landing",
      title: "Strony Sprzedażowe (Inventory)",
      description: "Szybkie landing page'e pod kampanie wyprzedażowe lub konkretne segmenty (np. 'Ciągniki Siodłowe').",
      details: "Struktura SEO pod modele, integracja z WhatsApp/Telefon, szybkość ładowania mobile-first dla kierowców i kupujących w biegu.",
      icon: "Monitor"
    },
    {
      id: "lead-system",
      title: "System Leadowy & CRM",
      description: "Przestań gubić telefony. Wdrażamy systemy śledzenia zapytań i automatyczne powiadomienia.",
      details: "Kwalifikacja leadów (B2B vs B2C), statusy sprzedaży, oddzielenie spamu od realnych kupców.",
      icon: "Map" // Using Map icon as a placeholder for Process/System
    },
    {
      id: "content",
      title: "Automotive Content & SEO",
      description: "Budujemy autorytet Twojego komisu w Google. Poradniki, testy, porównania.",
      details: "Artykuły, które ściągają ruch z wyszukiwań typu 'jakie auto do 50k', 'leasing ciężarówki opinie'.",
      icon: "Palette" // Using Palette as placeholder for Content creation
    }
];
  
export const mockProcess = [
    {
      step: "01",
      title: "Audyt Stocku i Konkurencji",
      desc: "Analizujemy Twoje inventory. Co stoi najdłużej? Gdzie jest największa marża? Sprawdzamy, jak reklamuje się konkurencja w Twoim regionie."
    },
    {
      step: "02",
      title: "Segmentacja Kampanii",
      desc: "Nie wrzucamy wszystkiego do jednego worka. Dzielimy kampanie na: Osobowe, Dostawcze, Premium, Ciężarowe. Ustawiamy budżety pod priorytety sprzedażowe."
    },
    {
      step: "03",
      title: "Launch i Agresywna Promocja",
      desc: "Uruchamiamy reklamy Google Ads i Social Ads. Docieramy do osób aktywnie szukających aut (Intewntion-Based) oraz budujemy zasięg lokalny."
    },
    {
      step: "04",
      title: "Tracking i Rotacja",
      desc: "Mierzymy koszt pozyskania telefonu i maila. Optymalizujemy reklamy co tydzień, wyłączając to, co nie sprzedaje, i skalując to, co znika z placu."
    }
];
  
export const mockBlogPosts = [
    {
      id: 1,
      slug: "marketing-dla-komisow-2025",
      title: "Jak promować komis samochodowy w 2025? Koniec z wrzucaniem tylko na OTOMOTO.",
      excerpt: "Portale ogłoszeniowe są drogie i zatłoczone. Zobacz, jak zbudować własny lejek sprzedaży i uniezależnić się od zewnętrznych platform.",
      category: "Marketing Komisów",
      date: "2025-08-12",
      content: "Większość właścicieli komisów popełnia ten sam błąd: traktuje marketing jako 'wrzucenie ogłoszenia'. W 2025 roku to za mało. Algorytmy portali tną zasięgi, a ceny rosną. W tym artykule pokażemy Ci strategię 'Own Your Traffic'. Jak wykorzystać Facebook Ads do ściągania klientów bezpośrednio na Twoją stronę? Dlaczego wideo-prezentacje aut na TikToku sprzedają szybciej niż zdjęcia? Jak budować bazę klientów, by sprzedawać im kolejne auta za 3 lata? To kompletny przewodnik dla nowoczesnego dealera."
    },
    {
      id: 2,
      slug: "sprzedaz-ciezarowek-b2b",
      title: "Sprzedaż ciągników siodłowych i naczep. Jak docierać do firm transportowych?",
      excerpt: "Rynek B2B rządzi się innymi prawami. Tutaj emocje schodzą na drugi plan, liczy się TCO, dostępność i leasing.",
      category: "Truck & Heavy",
      date: "2025-08-05",
      content: "Sprzedaż ciężarówki to proces decyzyjny trwający tygodnie, a nie godziny. Twój klient to właściciel firmy transportowej, który liczy każdy grosz z kilometra. Reklamy typu 'super okazja' tu nie działają. Musisz pokazać konkrety: historię serwisową, możliwości finansowania, dostępność od ręki. Omówimy, jak wykorzystać LinkedIn oraz Google Search (frazy typu 'Scania R450 leasing') do łowienia konkretnych decydentów, a nie przypadkowych oglądaczy."
    },
    {
      id: 3,
      slug: "lead-quality-automotive",
      title: "Dlaczego dzwonią tylko 'Janusze'? Jak filtrować słabe leady w branży auto.",
      excerpt: "Masz dość telefonów 'daję 10 tysięcy i jestem za godzinę'? Zobacz, jak ustawić bariery wejścia w reklamach.",
      category: "Jakość Leadów",
      date: "2025-07-29",
      content: "Ilość zapytań to nie to samo co jakość. Częstym problemem w marketingu komisów jest przepalanie czasu handlowców na rozmowy z marzycielami. W VisiLogo stosujemy technikę 'High-Intent Forms'. Zamiast prostego przycisku 'Wyślij', zadajemy pytania o budżet, formę finansowania i termin zakupu. To drastycznie zmniejsza liczbę spamu, ale zwiększa konwersję na sprzedaż. Pokażemy Ci przykłady formularzy, które oddzielają ziarno od plew."
    },
    {
      id: 4,
      slug: "google-ads-vs-otomoto",
      title: "Własna strona vs Portale Ogłoszeniowe – gdzie lepiej ulokować budżet?",
      excerpt: "Analiza ROI. Czy lepiej dopłacić za wyróżnienie na portalu, czy zainwestować w Google Ads?",
      category: "Budżet",
      date: "2025-07-20",
      content: "To odwieczne pytanie: płacić abonamenty gigantom czy budować własną markę? Odpowiedź brzmi: hybryda. Ale proporcje się zmieniają. Portale są świetne do 'dojnych krów' (popularnych modeli), ale przy autach niszowych lub drogich, własna kampania Google Ads często daje niższy koszt pozyskania klienta (CPA). Przeanalizujemy dane z kampanii 10 naszych klientów i pokażemy, przy jakiej skali stocku opłaca się odpalić własne Performance Ads."
    }
];
