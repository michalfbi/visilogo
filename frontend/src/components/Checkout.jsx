import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pricingPlans } from '../mock';
import { ArrowLeft, CheckCircle, ShieldCheck, Loader2, Info, Award, Clock, Users, TrendingUp, Phone } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

const Checkout = () => {
  const { planId } = useParams();
  const plan = pricingPlans.find(p => p.id === planId);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    nip: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!plan) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      if (!supabase) throw new Error("Brak podłączenia do bazy danych.");

      const fullMessage = `[ZAMÓWIENIE PAKIETU: ${plan.name.toUpperCase()}]\nNIP: ${formState.nip}\n\nWiadomość: ${formState.message}`;

      const { error } = await supabase.from('leads').insert([{
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: fullMessage,
        source: 'visilogo_checkout',
        business_type: 'Rezerwacja Pakietu',
        location: 'Brak danych',
        inventory_size: 'Brak danych',
        budget_range: plan.price
      }]);

      if (error) throw error;
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <Link to="/#pricing" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] transition-colors mb-12 uppercase tracking-widest text-sm font-bold">
          <ArrowLeft size={18} /> Wróć do cennika
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Lewa kolumna */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#00FFD1] uppercase tracking-widest text-xs font-bold bg-[#00FFD1]/10 px-3 py-1 rounded-full">
                Wybrany Pakiet
              </span>
              <h1 className="text-4xl font-bold text-white mt-4 mb-2">{plan.name}</h1>
              <p className="text-gray-400 text-lg">{plan.desc}</p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-2xl">
              <div className="border-b border-white/10 pb-6 mb-6">
                <span className="text-gray-400 text-sm block mb-1">Inwestycja od:</span>
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 ml-2 font-mono">PLN netto</span>
              </div>

              <h3 className="text-white font-bold mb-6">Co dokładnie zrobimy w ramach pakietu?</h3>
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
               <h3 className="text-white font-bold mb-8 text-xl">Harmonogram wdrożenia</h3>
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#00FFD1] before:to-transparent">
                  {plan.steps.map((step, index) => (
                     <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0A0A0A] bg-[#00FFD1] text-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,255,209,0.5)] z-10">
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-white/5 p-4 rounded-lg border border-white/5">
                           <h4 className="font-bold text-white mb-1 text-sm">{index + 1}. {step.title}</h4>
                           <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg text-sm text-gray-400">
              <Info className="text-[#00FFD1] shrink-0" size={24} />
              <p>To nie jest płatność online. Zostawiasz dane, my analizujemy projekt i przygotowujemy spersonalizowaną umowę bez zobowiązań na tym etapie.</p>
            </div>
          </motion.div>

          {/* Prawa kolumna - Formularz + Trust Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:sticky lg:top-32 h-fit space-y-8"
          >
            {/* Boks z formularzem */}
            <div className="bg-black border border-white/10 p-8 md:p-10 rounded-xl shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-[#00FFD1] text-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck size={32} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Rozpocznijmy współpracę</h3>
              <p className="text-gray-400 mb-8">Wypełnij dane firmy. Odezwiemy się, aby ustalić harmonogram prac.</p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FFD1]">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Rezerwacja przyjęta!</h3>
                    <p className="text-gray-400">
                      Świetna decyzja. Nasz zespół skontaktuje się z Tobą na podany numer w ciągu kilku godzin roboczych, aby omówić szczegóły umowy.
                    </p>
                    <Link to="/" className="inline-block mt-8 text-[#00FFD1] border-b border-[#00FFD1]/30 pb-1 hover:border-[#00FFD1] transition-colors">Wróć na stronę główną</Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Nazwa Firmy / Imię i Nazwisko *</label>
                      <input type="text" name="name" value={formState.name} onChange={handleChange} required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] outline-none transition-all rounded-lg" placeholder="Jan Kowalski Sp. z o.o." disabled={status === 'loading'} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email *</label>
                        <input type="email" name="email" value={formState.email} onChange={handleChange} required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] outline-none transition-all rounded-lg" placeholder="biuro@firma.pl" disabled={status === 'loading'} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Telefon *</label>
                        <input type="tel" name="phone" value={formState.phone} onChange={handleChange} required className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] outline-none transition-all rounded-lg" placeholder="+48 000 000 000" disabled={status === 'loading'} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">NIP Firmy (opcjonalnie)</label>
                      <input type="text" name="nip" value={formState.nip} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] outline-none transition-all rounded-lg" placeholder="000-000-00-00" disabled={status === 'loading'} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Dodatkowe informacje dla nas</label>
                      <textarea name="message" value={formState.message} onChange={handleChange} rows={3} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] outline-none transition-all rounded-lg resize-none" placeholder="Np. Mam już logo, potrzebuję tylko nowej strony..." disabled={status === 'loading'}></textarea>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-sm">Wystąpił problem techniczny. Spróbuj ponownie.</p>
                    )}

                    <button type="submit" disabled={status === 'loading'} className="w-full bg-[#00FFD1] text-black font-bold text-lg py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Zarezerwuj Pakiet i Omów Umowę'}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                      <ShieldCheck size={14} className="text-[#00FFD1]" />
                      <span>Twoje dane są u nas w 100% bezpieczne.</span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* BOKS Zaufanie i Gwarancje B2B z Twoim numerem */}
            <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl flex flex-col gap-6 shadow-2xl">
              <h4 className="text-white font-bold text-lg flex items-center gap-3">
                <Award className="text-[#00FFD1]" size={24} />
                Standard Premium B2B
              </h4>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/5 p-2 rounded text-[#00FFD1] h-fit">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Żelazne Terminy</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Szanujemy Twój czas. Harmonogram dołączony do umowy jest dla nas świętością i zawsze się go trzymamy.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/5 p-2 rounded text-[#00FFD1] h-fit">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Dedykowany Opiekun</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Zapomnij o infoliniach. Przez cały proces masz bezpośredni, szybki kontakt z jedną osobą decyzyjną z naszej agencji.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/5 p-2 rounded text-[#00FFD1] h-fit">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Fokus na Zysk (ROI)</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Nie robimy sztuki dla sztuki. Każdy projekt jest projektowany tak, aby ostatecznie generować zapytania dla Twojej firmy.</p>
                  </div>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-white/5 mt-2">
                <p className="text-gray-500 text-xs mb-3 uppercase tracking-widest font-bold">Wolisz ustalić to telefonicznie?</p>
                {/* Zaktualizowany numer telefonu */}
                <a href="tel:+48536837946" className="text-white font-bold text-lg hover:text-[#00FFD1] transition-colors flex items-center gap-3">
                  <Phone size={20} className="text-[#00FFD1]" />
                  Zadzwoń: +48 536 837 946
                </a>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
