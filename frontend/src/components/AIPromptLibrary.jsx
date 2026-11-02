import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { PageHead } from './studio/ui';
import ToolsStrip from './studio/ToolsStrip';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const AIPromptLibrary = () => {
  const [formData, setFormData] = useState({
    industry: '',
    targetAudience: '',
    email: ''
  });
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const [activeCategory, setActiveCategory] = useState('marketing');
  const [unlocked, setUnlocked] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setUnlockError('Podaj adres e-mail, aby odblokować pełen dostęp.');
      return;
    }
    if (!marketingConsent) {
      setUnlockError('Aby kontynuować, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setUnlockError('');

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z Narzędzia: Baza Mega-Promptów AI",
        email_klienta: formData.email,
        marketing_consent: true,
        branza: formData.industry,
        grupa_docelowa: formData.targetAudience,
        message: `Nowy Lead z Rozbudowanej Bazy Promptów! Klient (${formData.email}) z branży "${formData.industry}" odblokował potężną bazę 18 skryptów.`
      })
    }).catch(err => console.error("Webhook error", err));

    setUnlocked(true);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3000);
    });
  };

  const industryContext = formData.industry || '[Twoja Branża]';
  const targetContext = formData.targetAudience || '[Twoja Grupa Docelowa]';

  const prompts = {
    marketing: [
      {
        title: "Edukacyjny Post na LinkedIn (Obalanie Mitów)",
        description: "Wygeneruj wiralowy post, który buduje ekspercki autorytet w ułamku sekundy.",
        text: `Działaj jak Top Voice na LinkedIn z branży ${industryContext}. Napisz angażujący post skierowany do grupy docelowej: ${targetContext}. Zastosuj ścisły schemat: 
1. Szokujący hook (do 60 znaków) obalający jeden z najpopularniejszych mitów w tej branży. 
2. Krótka historia lub przykład pokazujący, ile kosztuje wiara w ten mit. 
3. Trzy praktyczne rady (z wypunktowaniem), jak zrobić to dobrze. 
4. Wezwanie do dyskusji w komentarzu. 
Używaj krótkich zdań, dodaj dużo światła (enterów). Ton: ekspercki, stanowczy, ale bez korporacyjnego żargonu.`
      },
      {
        title: "Treść na Stronę Główną (Hero Section)",
        description: "Neuromarketing w praktyce. Tekst, który zatrzymuje klienta na stronie.",
        text: `Jesteś ekspertem od konwersji i neuromarketingu. Opracuj teksty na górną sekcję strony WWW (Above the Fold) dla firmy z branży ${industryContext}, która sprzedaje do ${targetContext}. 
Wymogi: 
1. Nagłówek H1 (maksymalnie 7 słów), który obiecuje konkretną transformację. 
2. Podtytuł (maksymalnie 3 zdania) tłumaczący bez żargonu, w jaki sposób to robimy i dlaczego to bezpieczne. 
3. Call to Action (CTA) na przycisku (bez słów 'kup', 'wyślij', 'sprawdź'). 
4. Trzy krótkie bullet-pointy pod przyciskiem zbijające najczęstsze obiekcje klienta.`
      },
      {
        title: "Zarys Artykułu SEO (Blog Post Outline)",
        description: "Struktura wpisu, który zbiera ruch z Google i uderza w intencje szukającego.",
        text: `Jesteś ekspertem SEO i copywriterem. Stwórz kompleksowy zarys (outline) artykułu na bloga dla firmy z branży ${industryContext}, kierowanego do ${targetContext}. Zarys musi zawierać: 
1. Chwytliwy tytuł z luką informacyjną (click-gap). 
2. Strukturę nagłówków H2 i H3 opartą o pytania, które klienci faktycznie wpisują w Google. 
3. Wskazówki (w nawiasach), jakie dane liczbowe i przykłady wstawić w każdym akapicie, by zbudować autorytet. 
Zignoruj lanie wody, skup się wyłącznie na intencji wyszukiwania (search intent).`
      },
      {
        title: "Skrypt Wideo (TikTok / Reels / Shorts)",
        description: 'Gotowy scenariusz na angażującą rolkę do social mediów.',
        text: `Napisz dynamiczny skrypt wideo (max 60 sekund) dla firmy z branży ${industryContext}. Odbiorca: ${targetContext}. 
Format skryptu: 
1. Hook (pierwsze 3 sekundy) - kontrowersyjne lub mocne stwierdzenie przyciągające uwagę. 
2. Wprowadzenie problemu z perspektywy widza. 
3. Szybka wartość (podanie 2 konkretnych, nieoczywistych porad). 
4. Call to Action (CTA). 
Zapisz tekst w formie tabeli: Kolumna 1 (co widać na ekranie / b-roll), Kolumna 2 (co mówi lektor / napisy wprost do kamery).`
      },
      {
        title: "Mail Powitalny (Welcome Email po pobraniu PDF)",
        description: "Jak przywitać nowego leada, by chciał czytać kolejne wiadomości.",
        text: `Napisz maila powitalnego, który zostanie automatycznie wysłany do osoby (${targetContext}), która właśnie pobrała darmowy materiał (Lead Magnet) od firmy z branży ${industryContext}. 
Cel maila: 
1. Dostarczenie pliku w przejrzysty sposób. 
2. Zbudowanie natychmiastowej relacji i pokazanie "ludzkiej twarzy" marki. 
3. Zadanie jednego, krótkiego i luźnego pytania na końcu (np. z czym masz obecnie największy problem), by zachęcić do odpowiedzi i podgrzać leada. 
Ton: ciepły, pomocny, bezpośredni i nienachalny.`
      },
      {
        title: "Studium Przypadku (Case Study)",
        description: "Rozpisz historię sukcesu, która sprzedaje lepiej niż ulotka reklamowa.",
        text: `Jesteś analitykiem biznesowym i copywriterem B2B. Napisz strukturę i treść na stronę Case Study dla firmy z branży ${industryContext}, w którym pokazujemy sukces naszego klienta z grupy docelowej: ${targetContext}. 
Użyj sprawdzonej formuły STAR (Situation, Task, Action, Result). 
Kluczowe wymogi: Zamiast pisać o tym "jacy jesteśmy wspaniali", skup się na emocjonalnym opisie wyzwania przed jakim stał klient, dokładnym procesie rozwiązania i twardych metrykach biznesowych (np. wzrost o X%, oszczędność Y godzin). Zakończ mocnym wezwaniem do akcji.`
      },
      {
        title: "Copy do reklam Paid Ads (Meta / LinkedIn / Google)",
        description: "Trzy różne warianty reklam testujących różną motywację klienta.",
        text: `Działaj jak Performance Marketer. Napisz 3 warianty tekstu reklamowego (Ad Copy) dla kampanii Lead Generation oferującej usługi z zakresu ${industryContext}. Odbiorcą jest ${targetContext}.
Wariant 1: Krótki, uderzający prosto w największy ból (Pain-point).
Wariant 2: Oparty na opowiadaniu historii (Storytelling - jak klient X przeszedł z punktu A do punktu B).
Wariant 3: Czysto logiczny, oparty na wyliczeniach, ROI i liczbach.
Do każdego wariantu zaproponuj tekst nagłówka (Headline) i sugestię grafiki.`
      }
    ],
    sales: [
      {
        title: "Zimny Mail (Cold Email) w formule PAS",
        description: "Psychologicznie zoptymalizowany tekst otwierający komunikację z leadem.",
        text: `Jesteś wybitnym specjalistą od Outbound Sales. Napisz 'Cold Email' do ${targetContext} oferując usługi z zakresu ${industryContext}. 
Użyj bezlitosnej formuły PAS: 
P (Problem) - nazwij jeden konkretny ból, który spędza im sen z powiek; 
A (Agitation) - posyp sól na ranę pokazując ukryte koszty lub stratę czasu z powodu tego problemu; 
S (Solution) - podaj nasze rozwiązanie w jednym zdaniu jako pigułkę. 
Zakończ miękkim pytaniem (np. badającym otwartość na krótką wymianę myśli, bez proszenia o 15-minutowego calla). Zakaż używania słów: innowacyjny, lider rynku, kompleksowe usługi.`
      },
      {
        title: "Bezczelnie skuteczny 'Break-up Email'",
        description: "Follow-up zdejmujący presję, używany gdy klient ignoruje poprzednie maile.",
        text: `Stwórz tzw. 'Break-up Email' (mail pożegnalny), gdy klient z grupy ${targetContext} nie odpisuje na 3 poprzednie wiadomości dotyczące ${industryContext}. 
Mail musi zdjąć z niego presję, dać mu poczucie pełnej kontroli i profesjonalnie zamknąć temat, jednocześnie zostawiając otwarte drzwi na przyszłość. 
Ma być ultrakrótki (maksymalnie 3 zdania). Musi brzmieć jak pisany z telefonu w biegu przez CEO do CEO, całkowicie odrzucając tradycyjny sprzedażowy ton.`
      },
      {
        title: "Follow-up podsumowujący po spotkaniu",
        description: "Profesjonalne resume po tzw. Discovery Call.",
        text: `Jesteś handlowcem B2B. Napisz maila typu 'Follow-up' po zakończonym przed chwilą spotkaniu sprzedażowym (tzw. discovery call) z ${targetContext}. Omawialiśmy wdrożenie ${industryContext}. 
Zastosuj strukturę: 
1. Krótkie podziękowanie za produktywny czas. 
2. Wypunktowanie 3 głównych wyzwań/bólów klienta, które zdiagnozowaliśmy na spotkaniu. 
3. Opisanie następnych kroków (next steps) ze wskazaniem, do kiedy prześlę ofertę lub podsumowanie. 
Ton ma być ultra-profesjonalny, zwięzły i udowadniający, że aktywnie słuchaliśmy ich potrzeb.`
      },
      {
        title: "Pitch na LinkedIn (Soft-Selling)",
        description: "Wiadomość do nowo dodanej osoby bez chamskiej sprzedaży.",
        text: `Stwórz pierwszą wiadomość na LinkedIn do nowo dodanego kontaktu z grupy ${targetContext}, z intencją zaproponowania usług z zakresu ${industryContext}. 
Zasady: Nie sprzedawaj w pierwszej wiadomości. Odnieś się do ich stanowiska i wyzwań na obecnym rynku. Zaproponuj wysłanie darmowego zasobu, który masz w zanadrzu (np. raportu, checklisty audytowej), który rozwiązuje ich jeden mały problem. Zakończ pytaniem o pozwolenie na wysłanie materiału, nie wrzucaj od razu linka. Bądź naturalny.`
      },
      {
        title: "Odzyskiwanie martwych leadów (9-Word Email)",
        description: "Szokująco skuteczny format wznowienia kontaktu z zeszłego roku.",
        text: `Napisz maila typu 'Re-engagement' do potencjalnego klienta z grupy ${targetContext}, który pół roku temu był zainteresowany naszą ofertą z zakresu ${industryContext}, ale ostatecznie przestał odpisywać na maile (tzw. ghosting). 
Zastosuj legendarną technikę "9-Word Email" od Deana Jacksona. Mail ma zawierać tylko powitanie i jedno ekstremalnie krótkie, bezpośrednie pytanie (np. "Cześć [Imię], czy wciąż szukacie pomocy z..."). Zero grafik, stopek i wstępów. Celem jest wymuszenie szybkiej odpowiedzi "Tak" lub "Nie".`
      },
      {
        title: "Prośba o polecenie (Referral Request)",
        description: "Jak prosić zadowolonych klientów o nowe kontakty, nie wywołując u nich dyskomfortu.",
        text: `Jesteś Account Managerem. Napisz maila z prośbą o polecenie (referral) do naszego obecnego, bardzo zadowolonego klienta z sektora ${targetContext}. Wykonaliśmy dla niego doskonałą usługę z zakresu ${industryContext}. 
Zasady: 
1. Przypomnij o wspólnym sukcesie. 
2. Zapytaj, czy w jego sieci kontaktów jest ktoś, kto boryka się z podobnym problemem. 
3. Zdejmij z niego presję (powiedz, że jeśli nikogo nie zna, to żaden problem). 
4. ZAPROPONUJ GOTOWY TEKST (Forwardable Email) - krótki szablon wiadomości, który on może po prostu skopiować i wysłać swojemu znajomemu, oszczędzając swój czas.`
      }
    ],
    strategy: [
      {
        title: "Analiza Idealnego Klienta (ICP / Buyer Persona)",
        description: "Fundament każdej strategii B2B. Zrozum, z kim naprawdę rozmawiasz.",
        text: `Działaj jak starteg biznesowy i analityk rynku. Zbuduj zaawansowany profil Idealnego Klienta (Ideal Customer Profile) dla firmy sprzedającej ${industryContext}. Grupa docelowa: ${targetContext}. 
Rozpisz szczegółowo w punktach: 
1. Bóle i frustracje (co technicznie i psychologicznie nie pozwala im spać w nocy). 
2. Aspiracje (co chcą osiągnąć zawodowo, jaki mają tajny cel osobisty). 
3. Błędy, które obecnie popełniają, próbując rozwiązać swój problem na własną rękę. 
4. Kryteria kwalifikujące (po czym mój handlowiec ma poznać, że to doskonały, zyskowny lead).`
      },
      {
        title: "Unikalna Propozycja Wartości (UVP)",
        description: "Jak wyróżnić się z tłumu i przestać konkurować tylko ceną.",
        text: `Jako dyrektor kreatywny i ekspert od pozycjonowania marek stwórz Unikalną Propozycję Wartości (UVP) dla marki z sektora ${industryContext}, celującej w ${targetContext}. 
Potrzebuję 3 różnych, przemyślanych wariantów UVP: 
Wariant 1: Oparty na drastycznej oszczędności czasu/pieniędzy (podaj szacunkowe metryki). 
Wariant 2: Oparty na minimalizacji ryzyka lub wyjątkowej gwarancji bezpieczeństwa. 
Wariant 3: Oparty na unikalnej metodologii (zbuduj nazwę dla autorskiego mechanizmu dostarczania usługi). 
Każdy wariant ma być krótki, zwięzły i gotowy do wstawienia na samą górę strony WWW.`
      },
      {
        title: "Skrypty na obiekcję 'Konkurencja ma taniej'",
        description: "Trzy gotowe struktury obrony wyceny i uświadamiania błędów.",
        text: `Wciel się w trenera twardych negocjacji B2B. Mój potencjalny klient (${targetContext}) na spotkaniu o współpracę w zakresie ${industryContext} powiedział: "Wasza oferta jest za droga, na rynku znajdę to o połowę taniej". 
Napisz 3 gotowe, konkretne skrypty odpowiedzi do wykorzystania w rozmowie na żywo: 
1. Oparta na izolacji obiekcji (sprawdzenie, czy to jedyny problem). 
2. Oparta na obnażeniu ukrytych kosztów taniej konkurencji w długim terminie. 
3. Skrypt budujący nasz autorytet przez twardą obronę marży i procesu. 
Skrypty mają być asertywne, pełne szacunku i absolutnie pewne siebie. Mają brzmieć naturalnie, jak mówione na żywo.`
      },
      {
        title: "Konstrukcja 3-poziomowych Pakietów Cenowych (Pricing Tiers)",
        description: "Zastosuj psychologię cen (Decoy Effect), by najdroższy pakiet wydawał się najatrakcyjniejszy.",
        text: `Działaj jako doradca ds. wyceny B2B (Pricing Strategist). Opracuj 3-poziomowy model cenowy (pakiety: Podstawowy, Profesjonalny, Premium) dla usług z zakresu ${industryContext} oferowanych grupie: ${targetContext}. 
Zastosuj psychologiczną metodę "Decoy Effect" (Efekt Przynęty) - pakiet środkowy (Profesjonalny) ma być najbardziej opłacalnym wyborem, a pakiet najtańszy ma jawić się jako niepełny. 
Rozpisz dokładnie nazwy pakietów, sugerowany zakres elementów (bullet points) w każdym z nich oraz strategię kontrastowania ich ze sobą podczas rozmowy handlowej.`
      },
      {
        title: "Błyskawiczna Analiza Konkurencji Rynkowej",
        description: "Framework dla ChatGPT do prześwietlenia rywali i znalezienia ich słabych punktów.",
        text: `Jesteś Analitykiem Konkurencji i Starszym Strategiem Rynkowym. Zbuduj dla mnie rygorystyczny framework analityczny do prześwietlenia moich największych rywali w branży ${industryContext}, walczących o klienta ${targetContext}. 
Wypisz:
1. 5 kluczowych obszarów (metryk), które muszę zbadać odwiedzając ich strony WWW i profile social media.
2. Jakie pułapki komunikacyjne najczęściej popełniają słabe firmy w tej branży.
3. Podaj 3 potencjalne "Blue Oceans" (luki rynkowe i przewagi konkurencyjne), na których mogę zbudować potężny wizerunek marki, podczas gdy konkurencja skupia się wyłącznie na zaniżaniu cen.`
      }
    ]
  };

  const CATS = [
    ['marketing', 'Social media i WWW', false],
    ['sales', 'Cold e-mail i sprzedaż', true],
    ['strategy', 'Strategia i negocjacje', true],
  ];
  const total = prompts.marketing.length + prompts.sales.length + prompts.strategy.length;
  const locked = (activeCategory === 'sales' || activeCategory === 'strategy') && !unlocked;

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Narzędzia' }, { label: 'Baza promptów AI' }]}
        title="Baza promptów AI dla biznesu B2B"
        lead="Słabe prompty dają słabe wyniki. Wpisz swoją branżę i klienta, a każdy prompt dopasuje się do Ciebie. Gotowe do wklejenia w ChatGPT lub Claude."
      />

      <section className="section section--s" aria-label="Prompty">
        <div className="container prompts">
          <aside className="prompts__side">
            <div className="field">
              <label htmlFor="pr-industry">Twoja branża, co sprzedajesz</label>
              <input id="pr-industry" className="input" type="text" name="industry" placeholder="np. oprogramowanie CRM" value={formData.industry} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="pr-audience">Do kogo sprzedajesz</label>
              <input id="pr-audience" className="input" type="text" name="targetAudience" placeholder="np. właściciele hurtowni" value={formData.targetAudience} onChange={handleChange} />
            </div>
            <ul className="prompts__cats" role="tablist" aria-label="Kategorie promptów">
              {CATS.map(([id, label, isLocked]) => (
                <li key={id}>
                  <button type="button" role="tab" aria-selected={activeCategory === id} aria-controls="prompts-panel" onClick={() => setActiveCategory(id)}>
                    <span>{label}</span>
                    <span className="label">
                      {isLocked && !unlocked ? 'po zapisie, ' : ''}
                      {prompts[id].length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="note-card">
              <h2 className="checkout__h">AI napisze. Ale czy ktoś kupi?</h2>
              <p className="ink-2">
                {nb('Nawet najlepszy tekst z ChatGPT nie domknie transakcji na przestarzałej stronie. Opakujmy dobre copy w wizerunek, który budzi zaufanie.')}
              </p>
              <a href="/#contact" className="link">
                Zamów bezpłatny audyt
              </a>
            </div>
          </aside>

          <div id="prompts-panel" role="tabpanel" className="prompts__main">
            {locked ? (
              <form onSubmit={handleUnlock} className="tool-card crop crop--sheet prompts__lock">
                <h2 className="checkout__h">Ta kategoria jest dostępna po zapisie</h2>
                <p className="ink-2">
                  {nb('Zaawansowane prompty sprzedażowe i strategiczne, sprawdzone w naszej pracy. Podaj e-mail, a odblokujesz je na stałe.')}
                </p>
                <div className="field">
                  <label htmlFor="pr-email">E-mail służbowy</label>
                  <input id="pr-email" className="input" type="email" name="email" autoComplete="email" inputMode="email" placeholder="imie@twojafirma.pl" value={formData.email} onChange={handleChange} required />
                </div>
                <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} />
                {unlockError && (
                  <p className="alert" role="alert">
                    {unlockError}
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--block" disabled={!marketingConsent}>
                  Odblokuj wszystkie {total} promptów
                </button>
              </form>
            ) : (
              <ol className="prompt-list">
                {prompts[activeCategory].map((prompt, index) => (
                  <li key={prompt.title} className="prompt">
                    <div className="prompt__head">
                      <div>
                        <h2>{prompt.title}</h2>
                        <p className="ink-2">{prompt.description}</p>
                      </div>
                      <button type="button" className="btn btn--sm crop" onClick={() => handleCopy(prompt.text, index)}>
                        {copiedIndex === index ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                        {copiedIndex === index ? 'Skopiowano' : 'Kopiuj'}
                      </button>
                    </div>
                    <pre className="prompt__text">{prompt.text}</pre>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      <ToolsStrip current="/baza-promptow" />
    </>
  );
};

export default AIPromptLibrary;
