import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';

const WEBHOOK_URL = "https://hook.eu1.make.com/we5gnbk29ew8kcg4s64vi1xon7ig4pjs"; 

const Contact = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = {
      form_type: "Główny Formularz Kontaktowy",
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
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
    <section id="contact" className="py-16 lg:py-32 bg-black relative">
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
                  className="bg-[#0A0A0A] border border-[#00FFD1]/30 p-12 flex flex-col items-center text-center rounded-xl shadow-[0_0_30px_rgba(0,255,209,0.1)]"
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
                  className="space-y-6 bg-[#0A0A0A] p-8 border border-white/5 rounded-xl shadow-2xl"
                >
                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-400 text-sm rounded">
                      <AlertCircle size={18} />
                      Nie udało się wysłać. Skontaktuj się z nami telefonicznie.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Imię i Nazwisko *</label>
                      <input type="text" name="name" className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none rounded-lg" required placeholder="np. Jan Kowalski" disabled={status === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Telefon *</label>
                      <input type="tel" name="phone" className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none rounded-lg" required placeholder="np. 500 600 700" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Twój adres e-mail *</label>
                    <input type="email" name="email" className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none rounded-lg" required placeholder="kontakt@twojafirma.pl" disabled={status === 'loading'} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">W czym możemy pomóc? (Opcjonalnie)</label>
                    <textarea name="message" rows={4} className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#00FFD1] outline-none resize-none rounded-lg" placeholder="np. Potrzebuję nowej strony WWW..." disabled={status === 'loading'} />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button type="submit" disabled={status === 'loading'} className="bg-[#00FFD1] text-black w-full md:w-auto min-w-[300px] font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
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
