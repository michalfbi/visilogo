import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Ile czasu zajmuje stworzenie nowej strony i�pełnego wizerunku?",
    answer: "Zazwyczaj cały proces – od projektu logo, przez architekturę informacji, aż po kodowanie i�uruchomienie strony – zamykamy w�4 do 6 tygodni. Pracujemy w�zwinnych sprintach, dzięki czemu na bieżąco widzisz efekty naszej pracy."
  },
  {
    question: "Czy muszę samodzielnie pisać teksty na stronę internetową?",
    answer: "Zdecydowanie nie. W�wyższych pakietach masz wliczony profesjonalny copywriting biznesowy. Przeprowadzamy z�Tobą strategiczny wywiad i�na jego podstawie sami piszemy teksty, które są zoptymalizowane pod sprzedaż i�SEO."
  },
  {
    question: "Mogę zlecić stronę freelancerowi za 1500 zł. Dlaczego u Was jest drożej?",
    answer: "Strona za 1500 zł to zazwyczaj gotowy, darmowy szablon, który ładnie wygląda, ale nie generuje zapytań. My nie sprzedajemy 'obrazków w�internecie'. Budujemy zoptymalizowane maszyny sprzedażowe, ustawiamy analitykę i�ścieżki konwersji. Nasze projekty to inwestycja, która ma Ci się szybko zwrócić w�postaci nowych klientów."
  },
  {
    question: "Czy po uruchomieniu strony pomagacie w�pozyskiwaniu klientów?",
    answer: "Tak, to nasz główny cel. Sama strona to dopiero połowa sukcesu. Tworzymy witryny po to, by kierować na nie wysoko kaloryczny ruch z�kampanii Google Ads i�Meta Ads. Docelowo przejmujemy na siebie rolę Twojego zewnętrznego działu marketingu."
  },
  {
    question: "Jak wyglądają kwestie techniczne (hosting, domena, bezpieczeństwo)?",
    answer: "Bierzemy to na siebie. Pomagamy w�zakupie i�konfiguracji domeny, podpinamy szybki, bezpieczny hosting oraz instalujemy certyfikaty SSL. Otrzymujesz od nas produkt w�100% gotowy do działania, bez martwienia się o�kwestie informatyczne."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-32 bg-[#020202] border-t border-white/5 relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Masz Wątpliwości?</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
          >
            Często zadawane <span className="text-[#00FFD1]">pytania</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Zdejmujemy z�Ciebie ryzyko. Zobacz, jak rozwiązujemy najczęstsze obiekcje naszych klientów.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 hover:border-[#00FFD1]/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-bold text-white pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-[#00FFD1]"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
            <a href="#contact" className="text-[#00FFD1] border-b border-[#00FFD1]/30 hover:border-[#00FFD1] pb-1 uppercase tracking-widest text-sm font-bold transition-colors">
                Zadaj je nam bezpośrednio
            </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
