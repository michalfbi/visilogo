import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    location: '',
    inventory_size: '',
    budget_range: '',
    vehicle_focus: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formState.name.trim()) return "Imię jest wymagane";
    if (!formState.email.trim()) return "Email jest wymagany";
    if (!formState.phone.trim()) return "Telefon jest wymagany";
    if (!formState.business_type) return "Wybierz typ działalności";
    if (!formState.location.trim()) return "Lokalizacja jest wymagana";
    if (!formState.inventory_size) return "Określ wielkość stoku";
    if (!formState.budget_range) return "Określ budżet";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (!supabase) {
        throw new Error("Supabase credentials missing.");
      }

      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: formState
      });

      if (error) throw error;
      
      setStatus('success');
      setFormState({ 
          name: '', email: '', phone: '', business_type: '', 
          location: '', inventory_size: '', budget_range: '', 
          vehicle_focus: '', message: '' 
      });
      
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FFD1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Zwiększ Sprzedaż <br/> <span className="text-[#00FFD1]">Pojazdów</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Wypełnij formularz. Przygotujemy bezpłatną analizę Twojego potencjału w regionie i plan kampanii na najbliższy kwartał.
            </p>
          </div>

          {/* Trust Indicators / Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12 border-b border-white/10 pb-12">
            <div className="text-center md:text-right md:pr-8 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
                <h4 className="text-white font-bold mb-2">Dla kogo jesteśmy?</h4>
                <p className="text-gray-400 text-sm">Dealerzy aut, komisy, importerzy ciężarówek i maszyn, firmy z budżetem reklamowym min. 2000 PLN/mies.</p>
            </div>
            <div className="text-center md:text-left md:pl-8">
                <h4 className="text-white font-bold mb-2">Dla kogo NIE jesteśmy?</h4>
                <p className="text-gray-400 text-sm">Osoby prywatne sprzedające 1 auto, warsztaty samochodowe, sklepy z częściami, biznesy bez budżetu.</p>
            </div>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#0A0A0A] border border-[#00FFD1]/30 p-12 flex flex-col items-center text-center max-w-2xl mx-auto"
                >
                  <div className="w-20 h-20 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mb-8 text-[#00FFD1]">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Zgłoszenie Przyjęte</h3>
                  <p className="text-gray-400 text-lg mb-8">Twój opiekun skontaktuje się z Tobą telefonicznie w ciągu 24h, aby omówić szczegóły.</p>
                  <button onClick={() => setStatus('idle')} className="text-[#00FFD1] hover:text-white underline">Wyślij kolejne</button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6 bg-[#0A0A0A] p-8 border border-white/5"
                >
                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-400 text-sm">
                      <AlertCircle size={18} />
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Imię i Nazwisko *</label>
                      <input type="text" name="name" value={formState.name} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="Jan Kowalski" disabled={status === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Email Firmowy *</label>
                      <input type="email" name="email" value={formState.email} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="biuro@autokomis.pl" disabled={status === 'loading'} />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Telefon *</label>
                      <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="+48 123 456 789" disabled={status === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Lokalizacja (Miasto) *</label>
                      <input type="text" name="location" value={formState.location} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="np. Poznań" disabled={status === 'loading'} />
                    </div>
                  </div>

                  {/* Row 3 - Selects */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Typ Biznesu *</label>
                      <select name="business_type" value={formState.business_type} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none cursor-pointer" required disabled={status === 'loading'}>
                         <option value="">Wybierz...</option>
                         <option value="Komis Samochodowy">Komis Samochodowy</option>
                         <option value="Dealer Truck/Heavy">Dealer Truck/Heavy</option>
                         <option value="Dealer Busy/Dostawcze">Dealer Busy/Dostawcze</option>
                         <option value="Import Pojazdów">Import Pojazdów</option>
                         <option value="Inne">Inne</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Wielkość Stocku *</label>
                        <select name="inventory_size" value={formState.inventory_size} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none cursor-pointer" required disabled={status === 'loading'}>
                            <option value="">Wybierz...</option>
                            <option value="do 10 pojazdów">do 10 pojazdów</option>
                            <option value="10-50 pojazdów">10-50 pojazdów</option>
                            <option value="50-100 pojazdów">50-100 pojazdów</option>
                            <option value="100+ pojazdów">100+ pojazdów</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Budżet Marketingowy *</label>
                        <select name="budget_range" value={formState.budget_range} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none cursor-pointer" required disabled={status === 'loading'}>
                            <option value="">Miesięcznie...</option>
                            <option value="< 2000 PLN">Poniżej 2k PLN</option>
                            <option value="2000 - 5000 PLN">2k - 5k PLN</option>
                            <option value="5000 - 10000 PLN">5k - 10k PLN</option>
                            <option value="10000+ PLN">10k+ PLN</option>
                        </select>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Co sprzedajesz najczęściej? (Marki/Typy)</label>
                    <input type="text" name="vehicle_focus" value={formState.vehicle_focus} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" placeholder="np. BMW, Audi, Ciągniki DAF..." disabled={status === 'loading'} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Główny Problem / Cel *</label>
                    <textarea name="message" value={formState.message} onChange={handleChange} rows={3} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none resize-none" required placeholder="np. Mam dużo zapytań, ale słabej jakości..." disabled={status === 'loading'} />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full md:w-auto min-w-[300px] font-bold text-lg">
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Odbierz Bezpłatny Plan'}
                    </button>
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    Klikając przycisk akceptujesz politykę prywatności. Twoje dane są bezpieczne.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
