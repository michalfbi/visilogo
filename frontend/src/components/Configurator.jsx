import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';
import { PageHead } from './studio/ui';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const servicesList = [
  { id: 'www_onepage', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Strona WWW (One-Page / Wizytówka)', price: 600, desc: 'Szybka strona lądowania, idealna na start i do kampanii reklamowych.' },
  { id: 'www_adv', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Zaawansowana strona WWW', price: 1100, desc: 'Rozbudowany serwis z panelem CMS, lepszym UX i większą elastycznością wdrożeniową.' },
  { id: 'www_addons', tab: 'Wizerunek i Technologie', category: 'Strony WWW', name: 'Dodatkowe funkcje WWW', price: 300, desc: 'Niestandardowe kalkulatory, integracje API, systemy rezerwacji lub wersje wielojęzyczne.' },
  { id: 'brand', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Kompleksowy branding', price: 990, desc: 'Logo, księga znaku, typografia, paleta barw i Key Visual marki.' },
  { id: 'copy', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Copywriting biznesowy', price: 600, desc: 'Perswazyjne teksty na stronę dopasowane do decyzji klienta B2B.' },
  { id: 'analytics', tab: 'Wizerunek i Technologie', category: 'Identyfikacja i Analityka', name: 'Setup analityczny', price: 500, desc: 'Wdrożenie GA4, GTM, Pixela Meta, LinkedIn Insight i map cieplnych.' },
  { id: 'google_ads', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Kampanie Google Ads', price: 600, desc: 'Search, kampanie lokalne oraz struktury oparte na intencji zakupowej.' },
  { id: 'social_ads', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Social Media Ads', price: 600, desc: 'Precyzyjne kampanie Meta i LinkedIn kierowane do właściwych decydentów.' },
  { id: 'funnels', tab: 'Marketing i Leady', category: 'Płatne kampanie', name: 'Retargeting i lejki', price: 800, desc: 'Ścieżki konwersji, formularze kwalifikujące i kampanie przypominające.' },
  { id: 'social_mgmt', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Prowadzenie social media', price: 350, desc: 'Spójne wizualnie materiały i publikacje wspierające sprzedaż i wizerunek.' },
  { id: 'gmb', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Wizytówka Google', price: 200, desc: 'Optymalizacja profilu, nasycenie frazami i uporządkowanie podstaw lokalnego SEO.' },
  { id: 'seo_article', tab: 'Marketing i Leady', category: 'Usługi lokalne i SEO', name: 'Artykuł SEO na bloga', price: 150, desc: 'Eksperckie treści wspierające widoczność i wiarygodność marki.' },
  { id: 'print_wizytowki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Wizytówki (projekt)', price: 250, desc: 'Indywidualny projekt graficzny. Koszt druku wyceniamy osobno.' },
  { id: 'print_ulotki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Ulotki (projekt)', price: 250, desc: 'Projekt ulotki nastawionej na czytelność i skuteczny przekaz.' },
  { id: 'print_bannery', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Bannery reklamowe (projekt)', price: 250, desc: 'Projekt reklamy wielkoformatowej. Produkcja jest wyceniana oddzielnie.' },
  { id: 'print_teczki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Teczki firmowe (projekt)', price: 250, desc: 'Projekt profesjonalnych teczek ofertowych wspierających sprzedaż.' },
  { id: 'print_koszulki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Koszulki firmowe (projekt)', price: 250, desc: 'Projekt nadruku na odzież roboczą lub reklamową.' },
  { id: 'print_czapki', tab: 'Druk i Identyfikacja', category: 'Materiały reklamowe', name: 'Czapki z logo (projekt)', price: 250, desc: 'Projekt haftu lub nadruku na elementy identyfikacji fizycznej.' },
  { id: 'print_pojazd', tab: 'Druk i Identyfikacja', category: 'Oklejanie floty', name: 'Oklejanie pojazdu (projekt)', price: 800, desc: 'Zaawansowany projekt graficzny na auto firmowe. Aplikacja folii jest wyceniana osobno.' },
];

const tabs = [
  { id: 'Wizerunek i Technologie', label: 'Wizerunek i technologie' },
  { id: 'Marketing i Leady', label: 'Marketing i leady' },
  { id: 'Druk i Identyfikacja', label: 'Druk i identyfikacja' },
];

const Configurator = () => {
  const [activeTab, setActiveTab] = useState('Wizerunek i Technologie');
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state && location.state.preselectedService) {
      const serviceId = location.state.preselectedService;

      setSelectedServices((prev) => {
        if (prev.includes(serviceId)) return prev;

        let newSelection = [...prev, serviceId];

        if (serviceId === 'www_adv') {
          newSelection = newSelection.filter((service) => service !== 'www_onepage');
        }

        if (serviceId === 'www_onepage') {
          newSelection = newSelection.filter((service) => service !== 'www_adv');
        }

        return newSelection;
      });
    }
  }, [location.state]);

  const handleToggleService = (id) => {
    setSelectedServices((prev) => {
      let next = prev.includes(id) ? prev.filter((service) => service !== id) : [...prev, id];

      if (id === 'www_onepage' && next.includes('www_onepage')) {
        next = next.filter((service) => service !== 'www_adv');
      }

      if (id === 'www_adv' && next.includes('www_adv')) {
        next = next.filter((service) => service !== 'www_onepage');
      }

      return next;
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const count = selectedServices.length;
  const discountPercent = count >= 6 ? 20 : count >= 5 ? 15 : 0;

  const basePrice = selectedServices.reduce((sum, id) => {
    const service = servicesList.find((item) => item.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const discountAmount = basePrice * (discountPercent / 100);
  const finalPrice = basePrice - discountAmount;

  const currentTabServices = useMemo(
    () => servicesList.filter((service) => service.tab === activeTab),
    [activeTab]
  );

  const currentCategories = useMemo(
    () => [...new Set(currentTabServices.map((service) => service.category))],
    [currentTabServices]
  );

  const selectedServiceDetails = useMemo(
    () => selectedServices
      .map((id) => servicesList.find((service) => service.id === id))
      .filter(Boolean),
    [selectedServices]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (count === 0 || !formData.email) {
      setFormError('Wybierz minimum jedną usługę i podaj adres e-mail.');
      return;
    }

    if (!marketingConsent) {
      setFormError('Aby wysłać konfigurację, musisz wyrazić zgodę na otrzymywanie materiałów marketingowych.');
      return;
    }

    setFormError('');
    setStatus('loading');

    const selectedDetails = selectedServiceDetails
      .map((service) => `${service.name} (${service.price} PLN)`)
      .join(', ');

    const payload = {
      form_type: 'Skonfiguruj swoje zamówienie z zakładkami',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      marketing_consent: true,
      wybrane_uslugi: selectedDetails,
      ilosc_uslug: count,
      cena_bazowa: `${basePrice} PLN`,
      przyznany_rabat: `${discountPercent}%`,
      szacowana_wycena: `${finalPrice} PLN netto`,
      message: `Lead z konfiguratora. Klient wybrał ${count} usług. Cena bazowa: ${basePrice} PLN, rabat: ${discountPercent}%, kwota końcowa: ${finalPrice} PLN netto. Wybrane usługi: ${selectedDetails}.`,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const busy = status === 'loading';
  const pln = (value) => `${value.toLocaleString('pl-PL')} PLN`;
  const nextTier = count < 5 ? 5 - count : count < 6 ? 1 : 0;

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Konfigurator' }]}
        title="Skonfiguruj swoje zamówienie"
        lead="Zbuduj własny zestaw usług, przechodząc między kategoriami. Wycena aktualizuje się na bieżąco, a za większe pakiety system sam nalicza rabat."
        aside={
          <table className="mini-table">
            <caption className="label">Rabaty za pakiet</caption>
            <tbody>
              <tr>
                <th scope="row">5 usług</th>
                <td>−15%</td>
              </tr>
              <tr>
                <th scope="row">6 usług i więcej</th>
                <td>−20%</td>
              </tr>
            </tbody>
          </table>
        }
      />

      <section className="section section--s" aria-label="Wybór usług">
        <div className="container builder">
          <div className="builder__list">
            <div className="seg" role="tablist" aria-label="Kategorie usług">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="builder-panel"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div id="builder-panel" role="tabpanel" className="builder__panel">
              {currentCategories.map((category) => (
                <section key={category} className="builder__group" aria-labelledby={`cat-${category}`}>
                  <h2 id={`cat-${category}`} className="builder__cat">
                    {category}
                  </h2>
                  <ul className="choices">
                    {currentTabServices
                      .filter((service) => service.category === category)
                      .map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        return (
                          <li key={service.id}>
                            <button
                              type="button"
                              className="choice"
                              aria-pressed={isSelected}
                              onClick={() => handleToggleService(service.id)}
                            >
                              <span className="choice__box" aria-hidden="true">
                                <Check size={14} strokeWidth={2.5} />
                              </span>
                              <span className="choice__text">
                                <strong>{nb(service.name)}</strong>
                                <span>{nb(service.desc)}</span>
                              </span>
                              <span className="choice__price">od {pln(service.price)}</span>
                            </button>
                            {isSelected && service.id === 'www_adv' && (
                              <Link to="/kreator-www" className="choice__extra link">
                                Spersonalizuj wizję strony w kreatorze WWW
                              </Link>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <aside className="receipt crop crop--sheet" aria-label="Twoja wycena">
            <div className="receipt__total">
              <span className="label">Szacowana wartość netto</span>
              <span className="figure receipt__sum" aria-live="polite">
                {finalPrice.toLocaleString('pl-PL')}
                <small>PLN</small>
              </span>
              <span className="label">
                {count} {count === 1 ? 'usługa' : count >= 2 && count <= 4 ? 'usługi' : 'usług'}
                {discountPercent > 0 && (
                  <>
                    {', '}
                    <s>{pln(basePrice)}</s> rabat −{discountPercent}%, oszczędzasz {pln(discountAmount)}
                  </>
                )}
              </span>
              {nextTier > 0 && count > 0 && (
                <span className="receipt__hint">
                  Dodaj {nextTier} {nextTier === 1 ? 'usługę' : 'usługi'}, a rabat wzrośnie do {count < 5 ? '15' : '20'}%.
                </span>
              )}
            </div>

            <ul className="receipt__lines">
              {selectedServiceDetails.length > 0 ? (
                selectedServiceDetails.map((service) => (
                  <li key={service.id}>
                    <span>{service.name}</span>
                    <span className="num">{pln(service.price)}</span>
                  </li>
                ))
              ) : (
                <li className="receipt__empty">
                  Nie wybrano jeszcze żadnej usługi. Zaznacz pozycje na liście, a wycena zbuduje się sama.
                </li>
              )}
            </ul>

            {status === 'success' ? (
              <div className="contact__done" role="status">
                <h3>Zamówienie wysłane</h3>
                <p className="ink-2">
                  Otrzymaliśmy Twoją konfigurację. Przeanalizujemy ją i skontaktujemy się z Tobą tak szybko, jak to możliwe.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="receipt__form">
                <h3>Prześlij konfigurację do wyceny</h3>
                <div className="field">
                  <label htmlFor="cfg-name">Imię i nazwisko lub nazwa firmy</label>
                  <input id="cfg-name" className="input" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} required disabled={busy} />
                </div>
                <div className="field">
                  <label htmlFor="cfg-email">Adres e-mail *</label>
                  <input id="cfg-email" className="input" type="email" name="email" autoComplete="email" inputMode="email" value={formData.email} onChange={handleInputChange} required disabled={busy} />
                </div>
                <div className="field">
                  <label htmlFor="cfg-phone">Telefon kontaktowy</label>
                  <input id="cfg-phone" className="input" type="tel" name="phone" autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleInputChange} disabled={busy} />
                </div>
                {status === 'error' && (
                  <p className="alert" role="alert">
                    Nie udało się wysłać konfiguracji. Spróbuj ponownie za chwilę.
                  </p>
                )}
                {formError && (
                  <p className="alert" role="alert">
                    {formError}
                  </p>
                )}
                <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} disabled={busy} />
                <button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={busy || selectedServices.length === 0 || !marketingConsent}
                >
                  {busy ? (
                    <>
                      <Loader2 className="spin" size={18} aria-hidden="true" /> Wysyłanie
                    </>
                  ) : (
                    <>
                      Prześlij zamówienie <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="note">Niezobowiązująca konfiguracja. Odezwiemy się z potwierdzeniem zakresu.</p>
              </form>
            )}
          </aside>
        </div>
      </section>
    </>
  );
};

export default Configurator;
