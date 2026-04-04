import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Copy, CheckCircle, ArrowRight, Lock, MessageSquare, PenTool, TrendingUp, Sparkles, Target } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const AIPromptLibrary = () => {
  const [formData, setFormData] = useState({
    industry: '',
    targetAudience: '',
    email: ''
  });
  const [activeCategory, setActiveCategory] = useState('marketing');
  const [unlocked, setUnlocked] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: "Lead z�Narzędzia: Baza Mega-Promptów AI",
        email_klienta: formData.email,
        branza: formData.industry,
        grupa_docelowa: formData.targetAudience,
        message: `Nowy Lead z�Rozbudowanej Bazy Promptów! Klient (${formData.email}) z�branży "${formData.industry}" odblokował potężną bazę 18 skryptów.`
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
        description: "Wygeneruj wiralowy post, który buduje ekspercki autorytet w�ułamku sekundy.",
        text: `Działaj jak Top Voice na LinkedIn z�branży ${industryContext}. Napisz angażujący post skierowany do grupy docelowej: ${targetContext}. Zastosuj ścisły schemat: 
1. Szokujący hook (do 60 znaków) obalający jeden z�najpopularniejszych mitów w�tej branży. 
2. Krótka historia lub przykład pokazujący, ile kosztuje wiara w�ten mit. 
3. Trzy praktyczne rady (z wypunktowaniem), jak zrobić to dobrze. 
4. Wezwanie do dyskusji w�komentarzu. 
Używaj krótkich zdań, dodaj dużo światła (enterów). Ton: ekspercki, stanowczy, ale bez korporacyjnego żargonu.`
      },
      {
        title: "Treść na Stronę Główną (Hero Section)",
        description: "Neuromarketing w�praktyce. Tekst, który zatrzymuje klienta na stronie.",
        text: `Jesteś ekspertem od konwersji i�neuromarketingu. Opracuj teksty na górną sekcję strony WWW (Above the Fold) dla firmy z�branży ${industryContext}, która sprzedaje do ${targetContext}. 
Wymogi: 
1. Nagłówek H1 (maksymalnie 7 słów), który obiecuje konkretną transformację. 
2. Podtytuł (maksymalnie 3 zdania) tłumaczący bez żargonu, w�jaki sposób to robimy i�dlaczego to bezpieczne. 
3. Call to Action (CTA) na przycisku (bez słów 'kup', 'wyślij', 'sprawdź'). 
4. Trzy krótkie bullet-pointy pod przyciskiem zbijające najczęstsze obiekcje klienta.`
      },
      {
        title: "Zarys Artykułu SEO (Blog Post Outline)",
        description: "Struktura wpisu, który zbiera ruch z�Google i�uderza w�intencje szukającego.",
        text: `Jesteś ekspertem SEO i�copywriterem. Stwórz kompleksowy zarys (outline) artykułu na bloga dla firmy z�branży ${industryContext}, kierowanego do ${targetContext}. Zarys musi zawierać: 
1. Chwytliwy tytuł z�luką informacyjną (click-gap). 
2. Strukturę nagłówków H2 i�H3 opartą o�pytania, które klienci faktycznie wpisują w�Google. 
3. Wskazówki (w nawiasach), jakie dane liczbowe i�przykłady wstawić w�każdym akapicie, by zbudować autorytet. 
Zignoruj lanie wody, skup się wyłącznie na intencji wyszukiwania (search intent).`
      },
      {
        title: "Skrypt Wideo (TikTok / Reels / Shorts)",
        description: 'Gotowy scenariusz na angażującą rolkę do social mediów.',
        text: `Napisz dynamiczny skrypt wideo (max 60 sekund) dla firmy z�branży ${industryContext}. Odbiorca: ${targetContext}. 
Format skryptu: 
1. Hook (pierwsze 3 sekundy) - kontrowersyjne lub mocne stwierdzenie przyciągające uwagę. 
2. Wprowadzenie problemu z�perspektywy widza. 
3. Szybka wartość (podanie 2 konkretnych, nieoczywistych porad). 
4. Call to Action (CTA). 
Zapisz tekst w�formie tabeli: Kolumna 1 (co widać na ekranie / b-roll), Kolumna 2 (co mówi lektor / napisy wprost do kamery).`
      },
      {
        title: "Mail Powitalny (Welcome Email po pobraniu PDF)",
        description: "Jak przywitać nowego leada, by chciał czytać kolejne wiadomości.",
        text: `Napisz maila powitalnego, który zostanie automatycznie wysłany do osoby (${targetContext}), która właśnie pobrała darmowy materiał (Lead Magnet) od firmy z�branży ${industryContext}. 
Cel maila: 
1. Dostarczenie pliku w�przejrzysty sposób. 
2. Zbudowanie natychmiastowej relacji i�pokazanie "ludzkiej twarzy" marki. 
3. Zadanie jednego, krótkiego i�luźnego pytania na końcu (np. z�czym masz obecnie największy problem), by zachęcić do odpowiedzi i�podgrzać leada. 
Ton: ciepły, pomocny, bezpośredni i�nienachalny.`
      },
      {
        title: "Studium Przypadku (Case Study)",
        description: "Rozpisz historię sukcesu, która sprzedaje lepiej niż ulotka reklamowa.",
        text: `Jesteś analitykiem biznesowym i�copywriterem B2B. Napisz strukturę i�treść na stronę Case Study dla firmy z�branży ${industryContext}, w�którym pokazujemy sukces naszego klienta z�grupy docelowej: ${targetContext}. 
Użyj sprawdzonej formuły STAR (Situation, Task, Action, Result). 
Kluczowe wymogi: Zamiast pisać o�tym "jacy jesteśmy wspaniali", skup się na emocjonalnym opisie wyzwania przed jakim stał klient, dokładnym procesie rozwiązania i�twardych metrykach biznesowych (np. wzrost o�X%, oszczędność Y godzin). Zakończ mocnym wezwaniem do akcji.`
      },
      {
        title: "Copy do reklam Paid Ads (Meta / LinkedIn / Google)",
        description: "Trzy różne warianty reklam testujących różną motywację klienta.",
        text: `Działaj jak Performance Marketer. Napisz 3 warianty tekstu reklamowego (Ad Copy) dla kampanii Lead Generation oferującej usługi z�zakresu ${industryContext}. Odbiorcą jest ${targetContext}.
Wariant 1: Krótki, uderzający prosto w�największy ból (Pain-point).
Wariant 2: Oparty na opowiadaniu historii (Storytelling - jak klient X przeszedł z�punktu A�do punktu B).
Wariant 3: Czysto logiczny, oparty na wyliczeniach, ROI i�liczbach.
Do każdego wariantu zaproponuj tekst nagłówka (Headline) i�sugestię grafiki.`
      }
    ],
    sales: [
      {
        title: "Zimny Mail (Cold Email) w�formule PAS",
        description: "Psychologicznie zoptymalizowany tekst otwierający komunikację z�leadem.",
        text: `Jesteś wybitnym specjalistą od Outbound Sales. Napisz 'Cold Email' do ${targetContext} oferując usługi z�zakresu ${industryContext}. 
Użyj bezlitosnej formuły PAS: 
P (Problem) - nazwij jeden konkretny ból, który spędza im sen z�powiek; 
A�(Agitation) - posyp sól na ranę pokazując ukryte koszty lub stratę czasu z�powodu tego problemu; 
S (Solution) - podaj nasze rozwiązanie w�jednym zdaniu jako pigułkę. 
Zakończ miękkim pytaniem (np. badającym otwartość na krótką wymianę myśli, bez proszenia o�15-minutowego calla). Zakaż używania słów: innowacyjny, lider rynku, kompleksowe usługi.`
      },
      {
        title: "Bezczelnie skuteczny 'Break-up Email'",
        description: "Follow-up zdejmujący presję, używany gdy klient ignoruje poprzednie maile.",
        text: `Stwórz tzw. 'Break-up Email' (mail pożegnalny), gdy klient z�grupy ${targetContext} nie odpisuje na 3 poprzednie wiadomości dotyczące ${industryContext}. 
Mail musi zdjąć z�niego presję, dać mu poczucie pełnej kontroli i�profesjonalnie zamknąć temat, jednocześnie zostawiając otwarte drzwi na przyszłość. 
Ma być ultrakrótki (maksymalnie 3 zdania). Musi brzmieć jak pisany z�telefonu w�biegu przez CEO do CEO, całkowicie odrzucając tradycyjny sprzedażowy ton.`
      },
      {
        title: "Follow-up podsumowujący po spotkaniu",
        description: "Profesjonalne resume po tzw. Discovery Call.",
        text: `Jesteś handlowcem B2B. Napisz maila typu 'Follow-up' po zakończonym przed chwilą spotkaniu sprzedażowym (tzw. discovery call) z�${targetContext}. Omawialiśmy wdrożenie ${industryContext}. 
Zastosuj strukturę: 
1. Krótkie podziękowanie za produktywny czas. 
2. Wypunktowanie 3 głównych wyzwań/bólów klienta, które zdiagnozowaliśmy na spotkaniu. 
3. Opisanie następnych kroków (next steps) ze wskazaniem, do kiedy prześlę ofertę lub podsumowanie. 
Ton ma być ultra-profesjonalny, zwięzły i�udowadniający, że aktywnie słuchaliśmy ich potrzeb.`
      },
      {
        title: "Pitch na LinkedIn (Soft-Selling)",
        description: "Wiadomość do nowo dodanej osoby bez chamskiej sprzedaży.",
        text: `Stwórz pierwszą wiadomość na LinkedIn do nowo dodanego kontaktu z�grupy ${targetContext}, z�intencją zaproponowania usług z�zakresu ${industryContext}. 
Zasady: Nie sprzedawaj w�pierwszej wiadomości. Odnieś się do ich stanowiska i�wyzwań na obecnym rynku. Zaproponuj wysłanie darmowego zasobu, który masz w�zanadrzu (np. raportu, checklisty audytowej), który rozwiązuje ich jeden mały problem. Zakończ pytaniem o�pozwolenie na wysłanie materiału, nie wrzucaj od razu linka. Bądź naturalny.`
      },
      {
        title: "Odzyskiwanie martwych leadów (9-Word Email)",
        description: "Szokująco skuteczny format wznowienia kontaktu z�zeszłego roku.",
        text: `Napisz maila typu 'Re-engagement' do potencjalnego klienta z�grupy ${targetContext}, który pół roku temu był zainteresowany naszą ofertą z�zakresu ${industryContext}, ale ostatecznie przestał odpisywać na maile (tzw. ghosting). 
Zastosuj legendarną technikę "9-Word Email" od Deana Jacksona. Mail ma zawierać tylko powitanie i�jedno ekstremalnie krótkie, bezpośrednie pytanie (np. "Cześć [Imię], czy wciąż szukacie pomocy z..."). Zero grafik, stopek i�wstępów. Celem jest wymuszenie szybkiej odpowiedzi "Tak" lub "Nie".`
      },
      {
        title: "Prośba o�polecenie (Referral Request)",
        description: "Jak prosić zadowolonych klientów o�nowe kontakty, nie wywołując u nich dyskomfortu.",
        text: `Jesteś Account Managerem. Napisz maila z�prośbą o�polecenie (referral) do naszego obecnego, bardzo zadowolonego klienta z�sektora ${targetContext}. Wykonaliśmy dla niego doskonałą usługę z�zakresu ${industryContext}. 
Zasady: 
1. Przypomnij o�wspólnym sukcesie. 
2. Zapytaj, czy w�jego sieci kontaktów jest ktoś, kto boryka się z�podobnym problemem. 
3. Zdejmij z�niego presję (powiedz, że jeśli nikogo nie zna, to żaden problem). 
4. ZAPROPONUJ GOTOWY TEKST (Forwardable Email) - krótki szablon wiadomości, który on może po prostu skopiować i�wysłać swojemu znajomemu, oszczędzając swój czas.`
      }
    ],
    strategy: [
      {
        title: "Analiza Idealnego Klienta (ICP / Buyer Persona)",
        description: "Fundament każdej strategii B2B. Zrozum, z�kim naprawdę rozmawiasz.",
        text: `Działaj jak starteg biznesowy i�analityk rynku. Zbuduj zaawansowany profil Idealnego Klienta (Ideal Customer Profile) dla firmy sprzedającej ${industryContext}. Grupa docelowa: ${targetContext}. 
Rozpisz szczegółowo w�punktach: 
1. Bóle i�frustracje (co technicznie i�psychologicznie nie pozwala im spać w�nocy). 
2. Aspiracje (co chcą osiągnąć zawodowo, jaki mają tajny cel osobisty). 
3. Błędy, które obecnie popełniają, próbując rozwiązać swój problem na własną rękę. 
4. Kryteria kwalifikujące (po czym mój handlowiec ma poznać, że to doskonały, zyskowny lead).`
      },
      {
        title: "Unikalna Propozycja Wartości (UVP)",
        description: "Jak wyróżnić się z�tłumu i�przestać konkurować tylko ceną.",
        text: `Jako dyrektor kreatywny i�ekspert od pozycjonowania marek stwórz Unikalną Propozycję Wartości (UVP) dla marki z�sektora ${industryContext}, celującej w�${targetContext}. 
Potrzebuję 3 różnych, przemyślanych wariantów UVP: 
Wariant 1: Oparty na drastycznej oszczędności czasu/pieniędzy (podaj szacunkowe metryki). 
Wariant 2: Oparty na minimalizacji ryzyka lub wyjątkowej gwarancji bezpieczeństwa. 
Wariant 3: Oparty na unikalnej metodologii (zbuduj nazwę dla autorskiego mechanizmu dostarczania usługi). 
Każdy wariant ma być krótki, zwięzły i�gotowy do wstawienia na samą górę strony WWW.`
      },
      {
        title: "Skrypty na obiekcję 'Konkurencja ma taniej'",
        description: "Trzy gotowe struktury obrony wyceny i�uświadamiania błędów.",
        text: `Wciel się w�trenera twardych negocjacji B2B. Mój potencjalny klient (${targetContext}) na spotkaniu o�współpracę w�zakresie ${industryContext} powiedział: "Wasza oferta jest za droga, na rynku znajdę to o�połowę taniej". 
Napisz 3 gotowe, konkretne skrypty odpowiedzi do wykorzystania w�rozmowie na żywo: 
1. Oparta na izolacji obiekcji (sprawdzenie, czy to jedyny problem). 
2. Oparta na obnażeniu ukrytych kosztów taniej konkurencji w�długim terminie. 
3. Skrypt budujący nasz autorytet przez twardą obronę marży i�procesu. 
Skrypty mają być asertywne, pełne szacunku i�absolutnie pewne siebie. Mają brzmieć naturalnie, jak mówione na żywo.`
      },
      {
        title: "Konstrukcja 3-poziomowych Pakietów Cenowych (Pricing Tiers)",
        description: "Zastosuj psychologię cen (Decoy Effect), by najdroższy pakiet wydawał się najatrakcyjniejszy.",
        text: `Działaj jako doradca ds. wyceny B2B (Pricing Strategist). Opracuj 3-poziomowy model cenowy (pakiety: Podstawowy, Profesjonalny, Premium) dla usług z�zakresu ${industryContext} oferowanych grupie: ${targetContext}. 
Zastosuj psychologiczną metodę "Decoy Effect" (Efekt Przynęty) - pakiet środkowy (Profesjonalny) ma być najbardziej opłacalnym wyborem, a�pakiet najtańszy ma jawić się jako niepełny. 
Rozpisz dokładnie nazwy pakietów, sugerowany zakres elementów (bullet points) w�każdym z�nich oraz strategię kontrastowania ich ze sobą podczas rozmowy handlowej.`
      },
      {
        title: "Błyskawiczna Analiza Konkurencji Rynkowej",
        description: "Framework dla ChatGPT do prześwietlenia rywali i�znalezienia ich słabych punktów.",
        text: `Jesteś Analitykiem Konkurencji i�Starszym Strategiem Rynkowym. Zbuduj dla mnie rygorystyczny framework analityczny do prześwietlenia moich największych rywali w�branży ${industryContext}, walczących o�klienta ${targetContext}. 
Wypisz:
1. 5 kluczowych obszarów (metryk), które muszę zbadać odwiedzając ich strony WWW i�profile social media.
2. Jakie pułapki komunikacyjne najczęściej popełniają słabe firmy w�tej branży.
3. Podaj 3 potencjalne "Blue Oceans" (luki rynkowe i�przewagi konkurencyjne), na których mogę zbudować potężny wizerunek marki, podczas gdy konkurencja skupia się wyłącznie na zaniżaniu cen.`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-blue-500/20"
          >
            <Bot size={16} /> Sztuczna Inteligencja
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Baza Mega-Promptów <br/><span className="text-blue-500">Dla Biznesu B2B</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Słabe prompty dają słabe wyniki. Wypełnij zmienne po lewej stronie i�odbierz wysoce zaawansowane inżynieryjne komendy dla ChatGPT/Claude.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Konfigurator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Personalizacja AI</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Twoja Branża / Co sprzedajesz?</label>
                  <input 
                    type="text" name="industry" placeholder="np. Oprogramowanie CRM..." 
                    value={formData.industry} onChange={handleChange} 
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Do kogo sprzedajesz?</label>
                  <input 
                    type="text" name="targetAudience" placeholder="np. Właściciele hurtowni..." 
                    value={formData.targetAudience} onChange={handleChange} 
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-2 rounded-xl flex flex-col gap-2">
              <button onClick={() => setActiveCategory('marketing')} className={`flex items-center gap-3 p-4 rounded-lg font-bold transition-all text-sm ${activeCategory === 'marketing' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
                <PenTool size={18} /> Social Media i�WWW <span className="ml-auto bg-white/10 text-xs py-1 px-2 rounded-full">{prompts.marketing.length}</span>
              </button>
              <button onClick={() => setActiveCategory('sales')} className={`flex items-center justify-between p-4 rounded-lg font-bold transition-all text-sm ${activeCategory === 'sales' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
                <div className="flex items-center gap-3"><TrendingUp size={18} /> Cold Email & Sprzedaż <span className="bg-white/10 text-xs py-1 px-2 rounded-full">{prompts.sales.length}</span></div>
                {!unlocked && <Lock size={14} className="text-gray-500" />}
              </button>
              <button onClick={() => setActiveCategory('strategy')} className={`flex items-center justify-between p-4 rounded-lg font-bold transition-all text-sm ${activeCategory === 'strategy' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
                <div className="flex items-center gap-3"><Target size={18} /> Strategia i�Negocjacje <span className="bg-white/10 text-xs py-1 px-2 rounded-full">{prompts.strategy.length}</span></div>
                {!unlocked && <Lock size={14} className="text-gray-500" />}
              </button>
            </div>

            {/* Haczyk Sprzedażowy */}
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 p-6 rounded-2xl shadow-xl mt-6">
              <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center text-blue-500 mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI napisze. Ale czy ktoś kupi?</h3>
              <p className="text-gray-400 mb-4 text-xs leading-relaxed">
                Nawet najlepsze teksty wygenerowane przez ChatGPT nie domkną transakcji, jeśli zaprezentujesz je na przestarzałej stronie. <strong className="text-white">Opakujmy świetne copy w�wizerunek, który budzi respekt u największych graczy na rynku.</strong>
              </p>
              <a href="/#contact" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors group text-xs uppercase tracking-wider border-b border-transparent hover:border-blue-400 pb-0.5">
                Zobacz nasze darmowe audyty <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Podgląd Promptów */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {(activeCategory === 'sales' || activeCategory === 'strategy') && !unlocked ? (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-2xl p-10 text-center relative overflow-hidden"
                >
                  <Lock size={48} className="text-blue-500/50 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Kategoria Ekspercka Zablokowana</h3>
                  <p className="text-gray-400 mb-8 max-w-md">
                    Oto nasz "Tajemny Sos". Znajdziesz tu zaawansowane inżynieryjne prompty wypracowane w�boju sprzedażowym i�strategicznym. Odblokuj pełen dostęp na stałe.
                  </p>
                  <form onSubmit={handleUnlock} className="w-full max-w-sm bg-black p-6 rounded-xl border border-white/10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <h4 className="text-sm font-bold text-white mb-4">Podaj e-mail, aby uzyskać dostęp</h4>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Twój adres e-mail biznesowy" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0A0A0A] border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors mb-4 text-sm text-center"
                    />
                    <button type="submit" className="w-full font-bold py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-sm transition-colors flex items-center justify-center gap-2">
                      <Lock size={16} /> Odblokuj wszystkie {prompts.marketing.length + prompts.sales.length + prompts.strategy.length} promptów
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="unlocked"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {prompts[activeCategory].map((prompt, index) => (
                    <div key={index} className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-lg group">
                      <div className="bg-white/5 border-b border-white/10 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <h4 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                            <MessageSquare size={18} className="text-blue-500 shrink-0" /> {prompt.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{prompt.description}</p>
                        </div>
                        <button 
                          onClick={() => handleCopy(prompt.text, index)}
                          className={`shrink-0 flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-md transition-all ${copiedIndex === index ? 'bg-green-500 text-white' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white'}`}
                        >
                          {copiedIndex === index ? <CheckCircle size={14} /> : <Copy size={14} />} 
                          {copiedIndex === index ? 'Skopiowano' : 'Kopiuj Prompt'}
                        </button>
                      </div>
                      <div className="p-5 bg-black">
                        <div className="text-gray-300 text-[13px] leading-relaxed font-mono whitespace-pre-wrap border-l-2 border-blue-500 pl-4">
                          {prompt.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIPromptLibrary;
