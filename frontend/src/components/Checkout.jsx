import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { localPricingPlans, pricingPlans, printPricingPlans } from '../mock';
import { PageHead } from './studio/ui';
import { nb } from '../lib/typo';

const WEBHOOK_URL = 'https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs';

const trustPoints = [
  {
    title: 'Precyzyjny zakres prac',
    desc: 'Od początku wiesz, co dokładnie zawiera pakiet i jaki efekt ma dowieźć.',
  },
  {
    title: 'Nacisk na wynik',
    desc: 'Każdy etap wdrożenia jest podporządkowany jakości, konwersji i dalszej skalowalności.',
  },
  {
    title: 'Realna współpraca',
    desc: 'Proces jest uporządkowany tak, abyś nie musiał koordynować wszystkiego samodzielnie.',
  },
];

const Checkout = () => {
  const { planId } = useParams();
  const allPlans = [...pricingPlans, ...printPricingPlans, ...localPricingPlans];
  const plan = allPlans.find((item) => item.id === planId);

  const [status, setStatus] = useState('idle');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  if (!plan) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setStatus('captcha_error');
      return;
    }

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const nip = e.target.nip.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    const formData = {
      form_type: 'Rezerwacja pakietu',
      form_location: 'Formularz zamówienia - checkout',
      page_url: window.location.href,
      pakiet: plan.name,
      cena: plan.price,
      name,
      email,
      phone,
      nip,
      message,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const busy = status === 'loading';
  const [planName, planSub] = plan.name.split(' / ');

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Pakiety', to: '/#pricing' }, { label: plan.name }]}
        title={planSub ? `${planName}, ${planSub}` : planName}
        lead={plan.desc}
        aside={
          <div className="price-tag">
            <span className="label">Inwestycja od</span>
            <span className="figure">
              {plan.price}
              <small>PLN netto</small>
            </span>
            <span className="label">{plan.range}</span>
          </div>
        }
      />

      <section className="section section--s" aria-label="Zakres i rezerwacja">
        <div className="container checkout">
          <div className="checkout__info">
            <section aria-labelledby="scope-title">
              <h2 id="scope-title" className="checkout__h">Co dokładnie realizujemy</h2>
              <ul className="ticks ticks--cols">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="plan-steps-title">
              <h2 id="plan-steps-title" className="checkout__h">Harmonogram wdrożenia</h2>
              <ol className="steps steps--compact">
                {plan.steps.map((step, index) => (
                  <li key={`${step.title}-${index}`}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </li>
                ))}
              </ol>
            </section>

            <dl className="facts facts--loose">
              {trustPoints.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{nb(item.desc)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="contact__form crop crop--sheet checkout__form">
            {status === 'success' ? (
              <div className="contact__done" role="status">
                <h2 className="checkout__h">Rezerwacja przyjęta</h2>
                <p className="ink-2">Nasz zespół skontaktuje się z Tobą w ciągu kilku godzin roboczych.</p>
                <Link to="/" className="btn crop">
                  Wróć na stronę główną
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
                  <h2 className="checkout__h">Rozpocznijmy współpracę</h2>
                  <p className="ink-2">
                    {nb('Wypełnij dane firmy. Odezwiemy się, aby potwierdzić zakres, harmonogram i dalsze kroki wdrożenia.')}
                  </p>
                </div>
                <p className="alert alert--warn">
                  Wysyłasz niezobowiązujące zapytanie. Finalny zakres doprecyzujemy wspólnie po kontakcie.
                </p>
                {status === 'error' && (
                  <p className="alert" role="alert">
                    Uzupełnij poprawnie wszystkie wymagane pola.
                  </p>
                )}
                {status === 'captcha_error' && (
                  <p className="alert" role="alert">
                    Niepoprawny wynik równania zabezpieczającego.
                  </p>
                )}
                <div className="field">
                  <label htmlFor="co-name">Nazwa firmy lub imię i nazwisko *</label>
                  <input id="co-name" className="input" type="text" name="name" autoComplete="organization" required disabled={busy} />
                </div>
                <div className="contact__pair">
                  <div className="field">
                    <label htmlFor="co-email">E-mail *</label>
                    <input id="co-email" className="input" type="email" name="email" autoComplete="email" inputMode="email" required disabled={busy} />
                  </div>
                  <div className="field">
                    <label htmlFor="co-phone">Telefon *</label>
                    <input id="co-phone" className="input" type="tel" name="phone" autoComplete="tel" inputMode="tel" required disabled={busy} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="co-nip">NIP firmy</label>
                  <input id="co-nip" className="input" type="text" name="nip" inputMode="numeric" disabled={busy} />
                </div>
                <div className="field">
                  <label htmlFor="co-msg">Wiadomość</label>
                  <textarea id="co-msg" className="input" name="message" rows={4} disabled={busy} />
                </div>
                <div className="contact__captcha">
                  <label htmlFor="co-captcha" style={{ fontWeight: 500 }}>
                    Zabezpieczenie: ile to {num1} + {num2}?
                  </label>
                  <input
                    id="co-captcha"
                    className="input input--narrow"
                    type="number"
                    inputMode="numeric"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    required
                    disabled={busy}
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="spin" size={18} aria-hidden="true" /> Wysyłanie
                    </>
                  ) : (
                    'Zarezerwuj pakiet'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
