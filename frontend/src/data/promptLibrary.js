/*
 * Prompt library for local businesses.
 *
 * Every prompt is HEADER + task + RULES. In the text:
 *   {firma} {usluga} {miasto} {klienci} {wyroznik} {forma}  are filled from the company fields,
 *   [WPISZ: ...]  is a short value the user types on the card,
 *   [WKLEJ: ...]  is longer text the user pastes on the card (a review, an e-mail, a list).
 */

export const FIELDS = [
  { id: 'firma', label: 'Nazwa firmy', placeholder: 'np. Pracownia Fryzur Ania', empty: '[nazwa firmy]' },
  { id: 'usluga', label: 'Czym się zajmujesz', placeholder: 'np. montaż klimatyzacji, salon fryzjerski', empty: '[czym się zajmujesz]' },
  { id: 'miasto', label: 'Miasto i okolica', placeholder: 'np. Kielce i okolice', empty: '[miasto]' },
  { id: 'klienci', label: 'Kim są Twoi klienci', placeholder: 'np. właściciele domów jednorodzinnych', empty: '[kim są klienci]' },
  {
    id: 'wyroznik',
    label: 'Co Cię wyróżnia',
    optional: true,
    placeholder: 'np. 12 lat w branży, dojazd gratis do 30 km',
    empty: '[nie podano, zapytaj mnie]',
  },
];

export const FORMS = [
  { id: 'ty', label: 'Na „Ty”', value: 'na „Ty”' },
  { id: 'pan', label: 'Per Pan / Pani', value: 'per Pan / Pani' },
];

export const HEADER = `Jesteś doświadczonym copywriterem i marketingowcem, który pracuje dla małych, lokalnych firm.

O FIRMIE
Nazwa: {firma}
Czym się zajmuje: {usluga}
Gdzie działa: {miasto}
Klienci: {klienci}
Co ją wyróżnia: {wyroznik}
Do klienta zwracamy się: {forma}`;

export const RULES = `ZASADY
- Pisz po polsku, prostym językiem, tak jak rozmawia się z klientem, a nie w urzędzie czy korporacji.
- Unikaj frazesów: „kompleksowa obsługa”, „profesjonalizm”, „najwyższa jakość”, „szeroka oferta”, „indywidualne podejście”.
- Nie wymyślaj faktów o firmie (lat działalności, liczby klientów, cen, gwarancji, nagród). Tam, gdzie ich brakuje, wstaw [do uzupełnienia].
- Jeśli bez dodatkowych informacji tekst będzie słaby, najpierw zadaj mi maksymalnie 3 krótkie pytania, chyba że zadanie mówi inaczej.`;

export const CATEGORIES = [
  { id: 'google', label: 'Wizytówka Google', gated: false },
  { id: 'www', label: 'Strona WWW', gated: false },
  { id: 'social', label: 'Social media', gated: false },
  { id: 'ads', label: 'Reklamy', gated: true },
  { id: 'clients', label: 'Klienci i sprzedaż', gated: true },
  { id: 'strategy', label: 'Pomysły i strategia', gated: true },
];

export const PROMPTS = [
  /* ---------------- Wizytówka Google ---------------- */
  {
    id: 'gbp-opis',
    cat: 'google',
    title: 'Opis firmy do wizytówki Google',
    use: 'Opis, który mówi klientom i Google, co robisz i gdzie.',
    where: 'Profil firmy w Google → Edytuj profil → Opis firmy.',
    task: `Napisz opis firmy do Profilu Firmy w Google.
- Maksymalnie 750 znaków ze spacjami. Najważniejsze informacje zmieść w pierwszych 250 znakach, bo tyle widać bez rozwijania.
- W naturalny sposób użyj nazwy usługi i miasta, ale nie powtarzaj ich na siłę.
- Bez linków, cen, haseł promocyjnych i WIELKICH LITER, bo takich opisów Google nie przepuszcza.
- Pod każdą wersją podaj liczbę znaków.
Daj 2 wersje: rzeczową i cieplejszą.`,
  },
  {
    id: 'gbp-posty',
    cat: 'google',
    title: 'Posty do wizytówki Google na cały miesiąc',
    use: 'Regularne posty pokazują klientom i Google, że firma działa.',
    where: 'Profil firmy w Google → Dodaj aktualizację.',
    task: `Przygotuj 4 posty do Profilu Firmy w Google, po jednym na każdy tydzień miesiąca: [WPISZ: miesiąc, np. marzec].
Rodzaje postów:
1. porada dla klienta,
2. realizacja lub efekt naszej pracy,
3. usługa, którą chcemy promować: [WPISZ: usługa],
4. coś sezonowego, pasującego do tego miesiąca.
Każdy post: 80–150 słów, pierwsze zdanie ma zachęcić do przeczytania reszty, miasto pojawia się naturalnie najwyżej raz.
Do każdego zaproponuj przycisk (Zadzwoń, Zarezerwuj albo Więcej informacji) i opisz, jakie zdjęcie dodać (najlepiej własne, zrobione telefonem).`,
  },
  {
    id: 'gbp-opinia-dobra',
    cat: 'google',
    title: 'Odpowiedź na dobrą opinię',
    use: 'Odpowiedzi na opinie, które nie brzmią jak kopiuj-wklej.',
    where: 'Profil firmy w Google → Opinie → Odpowiedz.',
    task: `Napisz odpowiedź na tę opinię klienta w Google:
[WKLEJ: treść opinii i imię klienta]
- 2–4 zdania. Podziękuj konkretnie za to, o czym klient napisał, a nie ogólnie.
- Jeśli to naturalne, wspomnij usługę i miasto, ale bez upychania słów kluczowych.
- Bez szablonowych zwrotów w stylu „Dziękujemy za miłe słowa i zapraszamy ponownie”.
Daj 3 różne wersje do wyboru.`,
  },
  {
    id: 'gbp-opinia-zla',
    cat: 'google',
    title: 'Odpowiedź na negatywną opinię',
    use: 'Spokojna odpowiedź, którą przeczytają też przyszli klienci.',
    where: 'Profil firmy w Google → Opinie → Odpowiedz.',
    task: `Klient wystawił nam negatywną opinię:
[WKLEJ: treść opinii]
Nasza wersja wydarzeń: [WKLEJ: co się stało z Twojej perspektywy]
Napisz publiczną odpowiedź, którą przeczytają też przyszli klienci:
- spokojną, bez kłótni i bez tłumaczenia się punkt po punkcie,
- przyznaj rację tam, gdzie klient ją ma; tam, gdzie nie ma, przedstaw fakty bez oceniania go,
- zaproponuj rozmowę poza Google (telefon lub e-mail) i konkretny następny krok,
- nie podawaj danych osobowych klienta ani szczegółów zamówienia,
- maksymalnie 5 zdań.
Daj 2 wersje: łagodniejszą i stanowczą.`,
  },
  {
    id: 'gbp-prosba',
    cat: 'google',
    title: 'Prośba o opinię (SMS i e-mail)',
    use: 'Więcej opinii od zadowolonych klientów, bez proszenia na siłę.',
    where: 'Wyślij klientowi po zakończonej usłudze. Link do opinii znajdziesz w Profilu firmy → Poproś o opinie.',
    task: `Napisz prośbę o opinię w Google do klienta, który właśnie skorzystał z naszej usługi.
1. SMS: maksymalnie 160 znaków, bez polskich liter (ą, ę, ś itd.), bo z nimi limit jednego SMS-a spada do 70 znaków. Miejsce na link oznacz [LINK].
2. E-mail: temat i 3–4 zdania, z jednym wyraźnym linkiem [LINK].
Ton osobisty, jakby pisał właściciel. Nie obiecuj nic w zamian za opinię (rabatów, prezentów), bo zabraniają tego zasady Google.
Podaj liczbę znaków SMS-a.`,
  },

  /* ---------------- Strona WWW ---------------- */
  {
    id: 'www-hero',
    cat: 'www',
    title: 'Pierwszy ekran strony głównej',
    use: 'Nagłówek i przycisk, które w 5 sekund mówią: co, gdzie i dlaczego Ty.',
    where: 'Strona główna, sam początek: nagłówek, podtytuł i przycisk.',
    task: `Napisz teksty na pierwszy ekran strony głównej.
1. Nagłówek H1: do 10 słów, mówi, co robimy i gdzie. Daj 5 wariantów.
2. Podtytuł: 1–2 zdania o tym, dlaczego warto wybrać nas, a nie konkurencję.
3. Tekst przycisku: 2–4 słowa, opisuje to, co klient dostanie (np. „Umów bezpłatny pomiar”), a nie „Wyślij” czy „Kliknij”.
4. Trzy krótkie argumenty pod przyciskiem (do 6 słów każdy), które odpowiadają na najczęstsze obawy klientów w tej branży.`,
  },
  {
    id: 'www-usluga-miasto',
    cat: 'www',
    title: 'Podstrona usługi pod frazę z miastem',
    use: 'Podstrona dla osób, które wpisują w Google nazwę usługi i miasta.',
    where: 'Nowa podstrona na Twojej stronie, np. /montaz-klimatyzacji-kielce.',
    task: `Napisz treść podstrony dla usługi: [WPISZ: konkretna usługa]. Ma odpowiadać osobom, które wpisują w Google nazwę tej usługi razem z miastem: {miasto}.
Struktura:
- meta title (do 60 znaków) i meta description (do 155 znaków),
- H1 z nazwą usługi i miasta,
- krótki wstęp: dla kogo jest ta usługa i jaki problem rozwiązuje,
- H2: Jak wygląda współpraca (kroki),
- H2: Ile to kosztuje (od czego zależy cena; jeśli nie znasz cen, wstaw [do uzupełnienia]),
- H2: Gdzie działamy (miasto i okoliczne miejscowości, bez listy pięćdziesięciu nazw),
- H2: Najczęstsze pytania (5 pytań z odpowiedziami),
- zakończenie z zaproszeniem do kontaktu.
Długość 500–800 słów. Nie powtarzaj frazy z miastem w każdym akapicie, pisz dla ludzi.`,
  },
  {
    id: 'www-o-nas',
    cat: 'www',
    title: 'Sekcja „O nas”',
    use: 'Tekst o firmie, który buduje zaufanie konkretami, a nie frazesami.',
    where: 'Strona WWW → O nas. Krótka wersja przyda się w opisie na Facebooku.',
    task: `Napisz sekcję „O nas” na podstawie tych faktów:
[WKLEJ: kto prowadzi firmę, od kiedy, ile mniej więcej zrobiliście realizacji, jak pracujecie, z czego jesteście dumni]
- 150–250 słów; w liczbie mnogiej („robimy”), a jeśli firmę prowadzi jedna osoba, w pierwszej osobie.
- Każde zdanie ma zawierać konkret: liczbę, nazwę, miejsce albo przykład.
- Dodaj krótką wersję (2 zdania) do social mediów.`,
  },
  {
    id: 'www-faq',
    cat: 'www',
    title: 'Najczęstsze pytania klientów (FAQ)',
    use: 'Odpowiedzi na pytania, które dziś słyszysz przez telefon.',
    where: 'Strona WWW, sekcja FAQ. Pojedyncze odpowiedzi nadają się też na posty.',
    task: `Wypisz 10 pytań, które klienci w tej branży najczęściej zadają przed zakupem (cena, termin, dojazd, gwarancja, płatność, przygotowanie, co jeśli coś pójdzie nie tak). Na każde odpowiedz w 2–4 zdaniach.
Tam, gdzie odpowiedź zależy od naszych zasad (ceny, terminy, gwarancja), wstaw [do uzupełnienia] zamiast zgadywać.
Na końcu dopisz 3 pytania, które powinieneś mi zadać, żeby uzupełnić braki.`,
  },
  {
    id: 'www-meta',
    cat: 'www',
    title: 'Tytuły i opisy stron w Google',
    use: 'Tytuł i opis, które widać w wynikach wyszukiwania pod adresem strony.',
    where: 'Ustawienia SEO podstrony (np. Yoast lub Rank Math w WordPressie) albo przekaż osobie, która prowadzi Ci stronę.',
    task: `Oto lista podstron mojej strony:
[WKLEJ: nazwy podstron, np. Strona główna, Oferta, Cennik, Kontakt]
Dla każdej napisz meta title (do 60 znaków) i meta description (do 155 znaków). Na stronie głównej i podstronach usług uwzględnij miasto. Opis ma zachęcać do kliknięcia konkretem (np. termin, bezpłatna wycena, dojazd), ale tylko takim, który wynika z danych o firmie.
Wynik podaj w tabeli: podstrona | title | liczba znaków | description | liczba znaków.`,
  },

  /* ---------------- Social media ---------------- */
  {
    id: 'sm-plan',
    cat: 'social',
    title: 'Plan postów na miesiąc',
    use: 'Koniec z wymyślaniem posta w ostatniej chwili.',
    where: 'Facebook i Instagram. Posty zaplanujesz z góry w Meta Business Suite.',
    task: `Przygotuj plan 12 postów na Facebooka i Instagrama na miesiąc: [WPISZ: miesiąc] (3 posty tygodniowo).
Wymieszaj rodzaje: realizacje i efekty pracy, porady, praca od kuchni, opinie klientów, oferta, coś lokalnego lub sezonowego z naszej okolicy.
Wynik w tabeli: dzień | rodzaj | temat | pierwsze zdanie posta | jakie zdjęcie lub wideo zrobić telefonem.
Najwyżej 2 z 12 postów mogą otwarcie sprzedawać.`,
  },
  {
    id: 'sm-realizacja',
    cat: 'social',
    title: 'Post z realizacją (przed i po)',
    use: 'Pokaż efekt swojej pracy, zamiast o nim opowiadać.',
    where: 'Facebook, Instagram oraz aktualizacje w Profilu firmy w Google.',
    task: `Napisz post o tej realizacji:
[WKLEJ: co zrobiliście, dla kogo (bez danych osobowych), w jakiej miejscowości, ile to trwało, co było trudne, jaki jest efekt]
- Wersja na Facebooka: 80–150 słów. Zacznij od efektu albo problemu klienta, a nie od „Z przyjemnością prezentujemy”.
- Wersja na Instagram: krótsza, z 5–8 hashtagami, w tym 2–3 lokalnymi.
- Na koniec jedno zdanie zachęcające do kontaktu, bez nachalności.`,
  },
  {
    id: 'sm-rolki',
    cat: 'social',
    title: 'Pomysły na krótkie filmy',
    use: 'Rolki, które nagrasz telefonem w kwadrans, bez montażysty.',
    where: 'Instagram Reels, Facebook, TikTok, YouTube Shorts.',
    task: `Daj 8 pomysłów na krótkie filmy (15–40 sekund), które da się nagrać telefonem, bez montażu, a w razie potrzeby bez pokazywania twarzy.
Dla każdego: tytuł, co dokładnie nagrać (ujęcie po ujęciu), tekst na ekran (do 8 słów) i opis pod filmem (1–2 zdania).
Co najmniej 2 pomysły mają pokazywać pracę od kuchni, a 2 odpowiadać na pytania klientów.`,
  },
  {
    id: 'sm-komentarz',
    cat: 'social',
    title: 'Odpowiedź na trudny komentarz',
    use: 'Spokojna odpowiedź, gdy ktoś krytykuje albo pyta o cenę pod postem.',
    where: 'Komentarze na Facebooku i Instagramie.',
    task: `Pod naszym postem ktoś napisał:
[WKLEJ: treść komentarza]
Napisz 3 wersje odpowiedzi (do 3 zdań każda): rzeczową, cieplejszą i z lekkim humorem (tę ostatnią tylko wtedy, gdy komentarz nie jest skargą).
Jeśli to pytanie o cenę, podaj widełki albo powiedz, od czego zależy cena, zamiast odpisywać samo „zapraszamy na priv”.`,
  },

  /* ---------------- Reklamy ---------------- */
  {
    id: 'ads-google',
    cat: 'ads',
    title: 'Reklama w wyszukiwarce Google',
    use: 'Komplet tekstów do reklamy Google Ads, z policzonymi znakami.',
    where: 'Google Ads → kampania w sieci wyszukiwania → elastyczna reklama w wyszukiwarce.',
    task: `Przygotuj teksty do elastycznej reklamy w wyszukiwarce Google dla usługi: [WPISZ: usługa, którą chcesz reklamować].
- 15 nagłówków, każdy do 30 znaków. Co najmniej 3 z nazwą miasta, 3 z korzyścią dla klienta i 2 z wezwaniem do działania.
- 4 teksty reklamy, każdy do 90 znaków.
- Przy każdym podaj liczbę znaków i popraw te, które przekraczają limit.
- 15 słów kluczowych, które wpisują osoby gotowe kupić (z miastem i bez), oraz 15 wykluczających słów kluczowych (np. „praca”, „darmowe”, „jak zrobić samemu”).
Wynik podaj w tabelach.`,
  },
  {
    id: 'ads-meta',
    cat: 'ads',
    title: 'Reklama na Facebooku i Instagramie',
    use: 'Trzy wersje reklamy do przetestowania na mieszkańcach Twojej okolicy.',
    where: 'Menedżer reklam Meta albo przycisk „Promuj” na stronie firmy na Facebooku.',
    task: `Napisz 3 wersje reklamy na Facebooka i Instagram, skierowanej do mieszkańców okolicy: {miasto}. Reklama promuje: [WPISZ: usługa lub oferta].
Wersja 1 zaczyna się od problemu klienta, wersja 2 od efektu, wersja 3 od nazwy miejscowości albo lokalnego konkretu.
Dla każdej podaj:
- tekst główny (najważniejsze w pierwszych 125 znakach, bo resztę Facebook chowa pod „Zobacz więcej”),
- nagłówek do 40 znaków,
- przycisk (np. Wyślij wiadomość, Zadzwoń),
- opis grafiki albo zdjęcia.
Na koniec zaproponuj ustawienia odbiorców: zasięg w kilometrach od firmy, wiek i zainteresowania, z krótkim uzasadnieniem.`,
  },
  {
    id: 'ads-ulotka',
    cat: 'ads',
    title: 'Ulotka, plakat lub baner',
    use: 'Tekst, który da się przeczytać w 3 sekundy, także z daleka.',
    where: 'Ulotka DL lub A5, plakat w lokalu, baner na ogrodzeniu.',
    task: `Napisz tekst na ulotkę promującą: [WPISZ: oferta, termin ważności i warunki].
- Nagłówek do 6 słów, czytelny z daleka.
- 3–4 punkty z konkretami: co, ile, do kiedy.
- Jedno wezwanie do działania i miejsce na dane kontaktowe: [TELEFON], [ADRES], [KOD QR].
- Wersja skrócona na baner: najwyżej 10 słów razem z nagłówkiem.`,
  },

  /* ---------------- Klienci i sprzedaż ---------------- */
  {
    id: 'cl-wycena',
    cat: 'clients',
    title: 'Odpowiedź na pytanie o cenę',
    use: 'Odpowiedź, po której klient oddzwania, a nie znika.',
    where: 'E-mail, Messenger albo formularz kontaktowy.',
    task: `Klient napisał do nas:
[WKLEJ: treść zapytania]
Napisz odpowiedź, która:
- dziękuje i pokazuje, że przeczytaliśmy, o co pyta,
- podaje widełki cenowe albo wyjaśnia, od czego zależy cena (jeśli nie znasz naszych cen, wstaw [do uzupełnienia]),
- zadaje najwyżej 3 pytania potrzebne do dokładnej wyceny,
- proponuje konkretny następny krok (telefon, pomiar, spotkanie) z dwoma terminami do wyboru.
Maksymalnie 150 słów. Daj wersję na e-mail i krótszą na Messengera.`,
  },
  {
    id: 'cl-followup',
    cat: 'clients',
    title: 'Przypomnienie po wysłanej wycenie',
    use: 'Trzy krótkie wiadomości, gdy klient dostał wycenę i milczy.',
    where: 'E-mail i SMS, wysyłane ręcznie lub z przypomnieniem w kalendarzu.',
    task: `Klient dostał od nas wycenę na: [WPISZ: usługa i kwota] i nie odpowiada.
Napisz 3 wiadomości:
1. po 3 dniach (e-mail): czy wycena dotarła i czy coś jest niejasne,
2. po 7 dniach (SMS do 160 znaków, bez polskich liter): krótkie pytanie, czy temat jest aktualny,
3. po 14 dniach (e-mail): uprzejme zamknięcie tematu, z otwartymi drzwiami na przyszłość.
Bez presji i bez sztucznych terminów typu „oferta ważna tylko do jutra”.`,
  },
  {
    id: 'cl-sms-wizyta',
    cat: 'clients',
    title: 'SMS z przypomnieniem o wizycie',
    use: 'Mniej nieodwołanych wizyt i spóźnień.',
    where: 'SMS z systemu rezerwacji albo z telefonu, dzień przed wizytą.',
    task: `Napisz 3 wersje SMS-a przypominającego o wizycie lub terminie usługi, wysyłanego dzień wcześniej.
- Każda do 160 znaków, bez polskich liter, żeby zmieściła się w jednym SMS-ie.
- Zawiera nazwę firmy, dzień i godzinę ([DATA], [GODZINA]) oraz prośbę o wiadomość w razie odwołania.
- Jedna wersja dodatkowo z krótką wskazówką, jak się przygotować: [WPISZ: np. zabrać dokumenty, przyjechać 10 minut wcześniej].
Przy każdej wersji podaj liczbę znaków.`,
  },
  {
    id: 'cl-reklamacja',
    cat: 'clients',
    title: 'Odpowiedź na reklamację',
    use: 'Odpowiedź, która uspokaja klienta i nie obiecuje więcej, niż możesz dać.',
    where: 'E-mail albo pismo do klienta.',
    task: `Klient złożył reklamację:
[WKLEJ: treść reklamacji]
Co możemy zaproponować: [WPISZ: np. poprawkę, wymianę, zwrot części kwoty]
Napisz odpowiedź:
- zacznij od zrozumienia sytuacji klienta, bez formułki „przepraszamy za niedogodności”,
- opisz, co sprawdziliśmy i co proponujemy, z terminem,
- nie przyznawaj winy tam, gdzie jej nie ma, i nie obiecuj nic ponad to, co wpisałem wyżej,
- maksymalnie 200 słów.
Na końcu, osobno, wskaż wątki prawne, które warto skonsultować z prawnikiem, jeśli takie widzisz.`,
  },
  {
    id: 'cl-stali',
    cat: 'clients',
    title: 'Wiadomość do stałych klientów',
    use: 'Powód, żeby wrócić: sezon, nowa usługa albo wolne terminy.',
    where: 'E-mail lub SMS do klientów, którzy zgodzili się na wiadomości marketingowe.',
    task: `Napisz krótką wiadomość do naszych stałych klientów. Powód: [WPISZ: np. zbliża się sezon, nowa usługa, wolne terminy w przyszłym tygodniu].
- Temat e-maila: 3 warianty, do 45 znaków.
- Treść: 80–150 słów, osobista, z jedną konkretną propozycją i jednym linkiem lub przyciskiem.
- Wersja na SMS: do 160 znaków, bez polskich liter.`,
  },

  /* ---------------- Pomysły i strategia ---------------- */
  {
    id: 'st-konkurencja',
    cat: 'strategy',
    title: 'Analiza lokalnej konkurencji',
    use: 'Porównanie z firmami, które klienci widzą obok Ciebie w Mapach Google.',
    where: 'Wpisz w Google swoją usługę i miasto, spisz 3–5 pierwszych firm z mapy i wklej ich dane na karcie.',
    task: `Oto firmy, które konkurują z nami w okolicy (dane spisane z Google i z ich stron):
[WKLEJ: dla 3–5 firm: nazwa, liczba i średnia ocen, czy mają stronę, co obiecują, ceny, jeśli są podane]
1. Zrób tabelę porównawczą: firma | opinie | co obiecują | czego brakuje.
2. Wskaż, co powtarzają wszyscy (tego nie warto kopiować), a czego nie mówi nikt.
3. Zaproponuj 3 sposoby, żeby się wyróżnić bez obniżania cen, każdy z pierwszym krokiem do zrobienia w tym tygodniu.
Opieraj się tylko na danych, które wkleiłem.`,
  },
  {
    id: 'st-90-dni',
    cat: 'strategy',
    title: 'Plan marketingu na 90 dni',
    use: 'Co robić tydzień po tygodniu, przy Twoim budżecie i czasie.',
    where: 'Wydrukuj albo przepisz do kalendarza i wracaj do niego co tydzień.',
    task: `Przygotuj plan marketingu na 90 dni.
Budżet na reklamy: [WPISZ: kwota w zł miesięcznie, może być 0]
Czas, który mogę na to poświęcić: [WPISZ: godziny tygodniowo]
Co już mamy: [WPISZ: np. stronę, wizytówkę Google, Facebooka, bazę klientów]
- Rozpisz plan na 12 tygodni w tabeli: tydzień | zadanie | ile czasu | jak sprawdzić, czy działa.
- Najpierw rzeczy darmowe i najszybsze (wizytówka Google, opinie, poprawki na stronie), potem płatne.
- Nie dawaj więcej zadań, niż zmieści się w podanym czasie.
- Na końcu podaj 3 liczby, które warto sprawdzać co miesiąc.`,
  },
  {
    id: 'st-wyroznik',
    cat: 'strategy',
    title: 'Co Cię wyróżnia na tle konkurencji',
    use: 'Jedno zdanie, którym odpowiesz na pytanie „dlaczego wy?”.',
    where: 'Nagłówek strony, opis wizytówki, rozmowa z klientem.',
    task: `Pomóż mi znaleźć, czym nasza firma naprawdę różni się od konkurencji w okolicy.
1. Najpierw zadaj mi 6 pytań (o klientów, za co najczęściej nas chwalą, jak pracujemy, gwarancje, dostępność, historię firmy) i poczekaj na odpowiedzi.
2. Na ich podstawie zaproponuj 5 wariantów jednego zdania „dlaczego my”, każdy oparty na innym argumencie.
3. Przy każdym oceń, czy konkurencja może łatwo powiedzieć to samo. Jeśli tak, odrzuć go albo popraw.`,
  },
  {
    id: 'st-pakiety',
    cat: 'strategy',
    title: 'Pakiety i cennik usług',
    use: 'Trzy pakiety, spośród których klientowi łatwo wybrać.',
    where: 'Cennik na stronie, oferta wysyłana e-mailem, rozmowa przy wycenie.',
    task: `Oto nasze usługi i obecne ceny:
[WKLEJ: lista usług z cenami]
Zaproponuj 3 pakiety (podstawowy, średni i pełny):
- proste nazwy, które mówią, dla kogo jest pakiet, zamiast „Gold” i „Platinum”,
- zakres każdego w 4–6 punktach, językiem klienta,
- sugerowane ceny z uzasadnieniem, oparte tylko na cenach, które wkleiłem,
- który pakiet wyróżnić jako polecany i dlaczego.
Dodaj 3 pytania, które warto zadać klientowi, żeby dobrać mu pakiet.`,
  },
];

/* ---------------- helpers ---------------- */

const TOKEN = /(\{(?:firma|usluga|miasto|klienci|wyroznik|forma)\}|\[(?:WPISZ|WKLEJ):[^\]]*\])/g;

/* The [WPISZ: …] / [WKLEJ: …] slots in a prompt, in order. */
export const slotsOf = (prompt) =>
  (prompt.task.match(/\[(?:WPISZ|WKLEJ):[^\]]*\]/g) || []).map((raw) => ({
    raw,
    paste: raw.startsWith('[WKLEJ'),
    hint: raw.replace(/^\[(?:WPISZ|WKLEJ):\s*/, '').replace(/\]$/, ''),
  }));

const fill = (template, fields, forma, slotValues, slotStart = 0) => {
  const formLabel = (FORMS.find((f) => f.id === forma) || FORMS[0]).value;
  let slotIndex = slotStart;
  return template
    .split(TOKEN)
    .filter((piece) => piece !== '')
    .map((piece) => {
      if (piece.startsWith('{')) {
        const id = piece.slice(1, -1);
        if (id === 'forma') return { kind: 'field', text: formLabel, filled: true };
        const value = (fields[id] || '').trim();
        const def = FIELDS.find((f) => f.id === id);
        return { kind: 'field', text: value || def.empty, filled: Boolean(value) };
      }
      if (/^\[(WPISZ|WKLEJ):/.test(piece)) {
        const value = (slotValues[slotIndex] || '').trim();
        slotIndex += 1;
        return { kind: 'slot', text: value || piece, filled: Boolean(value) };
      }
      return { kind: 'text', text: piece };
    });
};

/*
 * A prompt split for display and copying: header (company), task, rules.
 * Each is a list of parts; kind is 'text' | 'field' (company field) | 'slot' (per-card input).
 */
export const sectionsOf = (prompt, fields, forma, slotValues = []) => ({
  header: fill(HEADER, fields, forma, slotValues),
  task: fill(prompt.task, fields, forma, slotValues),
  rules: fill(RULES, fields, forma, slotValues),
});

const join = (parts) => parts.map((p) => p.text).join('');

export const textOf = ({ header, task, rules }) => `${join(header)}\n\nZADANIE\n${join(task)}\n\n${join(rules)}`;
