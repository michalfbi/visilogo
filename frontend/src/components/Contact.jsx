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

      // Przesyłamy proste dane. API zignoruje brakujące stare pola (inventory_size itp.) jeśli są opcjonalne lub zostaną zignorowane w bazie.
      const { data, error } = await supabase.from('leads').insert([{
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message,
        source: 'visilogo_simple_contact',
        business_type: 'Nie dotyczy',
        location: 'Brak danych',
        inventory_size: 'Brak danych',
        budget_range: 'Brak danych'
      }]);

      if (error) throw error;
      
      setStatus('success');
      setFormState({ 
          name: '', email: '', phone: '', message: '' 
      });
      
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage("Wystąpił błąd. Spróbuj ponownie lub zadzwoń do nas.");
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FFD1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Porozmawiajmy o <br/> <span className="text-[#00FFD1]">Twoim biznesie</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Zostaw kontakt. Oddzwonimy, porozmawiamy o tym, czego potrzebujesz i powiemy wprost, co możemy dla Ciebie przygotować.
            </p>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#0A0A0A] border border-[#00FFD1]/30 p-12 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-[#00FFD1]/10 rounded-full flex items-center justify-center mb-8 text-[#00FFD1]">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Wiadomość Wysłana!</h3>
                  <p className="text-gray-400 text-lg mb-8">Skontaktujemy się z Tobą telefonicznie w najbliższym czasie.</p>
                  <button onClick={() => setStatus('idle')} className="text-[#00FFD1] hover:text-white underline">Wyślij jeszcze jedną</button>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Imię i Nazwisko *</label>
                      <input type="text" name="name" value={formState.name} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="np. Jan Kowalski" disabled={status === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Telefon *</label>
                      <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="np. 500 600 700" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Twój adres e-mail *</label>
                    <input type="email" name="email" value={formState.email} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none" required placeholder="kontakt@twojafirma.pl" disabled={status === 'loading'} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">W czym możemy pomóc? (Opcjonalnie)</label>
                    <textarea name="message" value={formState.message} onChange={handleChange} rows={4} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none resize-none" placeholder="np. Potrzebuję nowej strony WWW i ładnych grafik na Facebooka..." disabled={status === 'loading'} />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full md:w-auto min-w-[300px] font-bold text-lg">
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Wyślij Wiadomość'}
                    </button>
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    Twoje dane są u nas w 100% bezpieczne. Nie wysyłamy spamu.
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
