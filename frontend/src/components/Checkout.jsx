import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pricingPlans, localPricingPlans } from '../mock';
import { ArrowLeft, CheckCircle, ShieldCheck, Loader2, Info, Award, Clock, Users, TrendingUp, Phone, ShieldQuestion, AlertCircle } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs";

const Checkout = () => {
  const { planId } = useParams();
  const allPlans = [...pricingPlans, ...localPricingPlans];
  const plan = allPlans.find(p => p.id === planId);
  const [status, setStatus] = useState('idle');

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setNum1(Math.floor(Math.random() * 5) + 1);
    setNum2(Math.floor(Math.random() * 5) + 1);
  }, []);

  if (!plan) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(captchaAnswer) !== num1 + num2) {
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
      form_type: "Rezerwacja Pakietu (Checkout)",
      form_location: "Formularz Zam贸wienia - Checkout",
      page_url: window.location.href,
      pakiet: plan.name,
      cena: plan.price,
      name: name,
      email: email,
      phone: phone,
      nip: nip,
      message: message
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] pt-24 lg:pt-32 pb-12 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Link to="/#pricing" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] transition-colors mb-12 uppercase tracking-widest text-sm font-bold">
          <ArrowLeft size={18} /> Wr贸膰 do cennika
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <span className="text-[#00FFD1] uppercase tracking-widest text-xs font-bold bg-[#00FFD1]/10 px-3 py-1 rounded-full">Wybrany Pakiet</span>
              <h1 className="text-4xl font-bold text-white mt-4 mb-2">{plan.name}</h1>
              <p className="text-gray-400 text-lg">{plan.desc}</p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-2xl">
              <div className="border-b border-white/10 pb-6 mb-6">
                <span className="text-gray-400 text-sm block mb-1">Inwestycja od:</span>
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 ml-2 font-mono">PLN netto</span>
              </div>
              <h3 className="text-white font-bold mb-6">Co dok艂adnie zrobimy w爎amach pakietu?</h3>
              <ul className="space-y-4">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00FFD1] shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-300 leading-relaxed text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-2xl mt-8">
               <h3 className="text-white font-bold mb-8 text-xl">Harmonogram wdro偶enia</h3>
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:to-transparent">
                  {plan.steps.map((step, index) => (
                      <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0A0A0A] bg-[#00FFD1] text-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,255,209,0.5)] z-10"></div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-white/5 p-4 rounded-lg border border-white/5">
                           <h4 className="font-bold text-white mb-1 text-sm">{index + 1}. {step.title}</h4>
                           <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                  ))}
               </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:sticky lg:top-32 h-fit space-y-8">
            <div className="bg-black border border-white/10 p-8 md:p-10 rounded-xl shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">Rozpocznijmy wsp贸艂prac臋</h3>
              <p className="text-gray-400 mb-8">Wype艂nij dane firmy. Odezwiemy si臋, aby ustali膰 harmonogram prac.</p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FFD1]">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Rezerwacja przyj臋ta!</h3>
                    <p className="text-gray-400">Nasz zesp贸艂 skontaktuje si臋 z燭ob膮 w燾i膮gu kilku godzin roboczych.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {status === 'error' && (
                      <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-400 text-sm rounded">
                        <AlertCircle size={18} /> Uzupe艂nij poprawnie wszystkie pola.
                      </div>
                    )}
                    {status === 'captcha_error' && (
                      <div className="bg-orange-500/10 border border-orange-500/20 p-4 flex items-center gap-3 text-orange-400 text-sm rounded">
                        <ShieldQuestion size={18} /> Z艂y wynik r贸wnania.
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Nazwa Firmy / Imi臋 i燦azwisko *</label>
                      <input type="text" name="name" required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email *</label>
                        <input type="email" name="email" required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Telefon *</label>
                        <input type="tel" name="phone" required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">NIP Firmy</label>
                      <input type="text" name="nip" className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg" disabled={status === 'loading'} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Wiadomo艣膰</label>
                      <textarea name="message" rows={3} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] outline-none rounded-lg resize-none" disabled={status === 'loading'}></textarea>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <ShieldQuestion className="text-[#00FFD1]" size={20} />
                        <label className="text-sm font-bold text-gray-300">Zabezpieczenie: Ile to {num1} + {num2}? *</label>
                      </div>
                      <input type="number" value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} className="w-20 bg-[#0A0A0A] border border-white/20 p-2 text-center text-white focus:border-[#00FFD1] outline-none rounded-lg" required disabled={status === 'loading'} />
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="w-full bg-[#00FFD1] text-black font-bold text-lg py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Zarezerwuj Pakiet'}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
