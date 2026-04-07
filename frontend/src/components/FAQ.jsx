import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { fadeUp, sectionViewport, springCard, staggerContainer } from '../lib/motion';

const faqs = [
  {
    question: 'Ile czasu zajmuje stworzenie nowej strony i pełnego wizerunku?',
    answer:
      'Najczęściej cały proces — od strategii, przez projekt logo i architekturę informacji, aż po wdrożenie strony — zamykamy w 4 do 6 tygodni. Pracujemy sprintami, więc na bieżąco widzisz postęp i podejmujesz decyzje bez chaosu.',
  },
  {
    question: 'Czy muszę samodzielnie pisać teksty na stronę internetową?',
    answer:
      'Nie. W wyższych pakietach copywriting biznesowy jest częścią współpracy. Zbieramy od Ciebie kontekst, ofertę i przewagi, a następnie przygotowujemy teksty dopasowane do sprzedaży, wizerunku i SEO.',
  },
  {
    question: 'Mogę zlecić stronę freelancerowi za 1500 zł. Dlaczego u Was jest drożej?',
    answer:
      'Bo nie sprzedajemy samego “ładnego widoku”. Projektujemy całą ścieżkę decyzji użytkownika: strukturę, przekaz, design, punkty kontaktu i mechanikę konwersji. Tania strona często tylko istnieje. Dobra strona ma pracować na zapytania i wizerunek marki.',
  },
  {
    question: 'Czy po uruchomieniu strony pomagacie w pozyskiwaniu klientów?',
    answer:
      'Tak — i właśnie dlatego budujemy stronę w określony sposób. Docelowo ma ona współpracować z kampaniami Google Ads, Meta Ads, social sellingiem i materiałami sprzedażowymi. Dzięki temu witryna nie jest oderwanym bytem, tylko częścią systemu wzrostu.',
  },
  {
    question: 'Jak wyglądają kwestie techniczne: hosting, domena i bezpieczeństwo?',
    answer:
      'Pomagamy dobrać i skonfigurować domenę, hosting oraz podstawowe zabezpieczenia, w tym certyfikat SSL. Finalnie dostajesz produkt gotowy do działania, bez potrzeby samodzielnego rozwiązywania technicznych detali po drodze.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-shell relative overflow-hidden border-t border-white/5 bg-[#020202] py-16 lg:py-32">
      <div className="pointer-events-none absolute left-[6%] top-[12%] h-72 w-72 rounded-full bg-[#00FFD1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-[4%] bottom-[8%] h-80 w-80 rounded-full bg-blue-500/8 blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mb-14 text-center lg:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border border-[#00FFD1]/20 bg-[#00FFD1]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#00FFD1]">
            Najczęstsze pytania
          </motion.div>

          <motion.h2 variants={fadeUp} className="mt-6 text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
            Często zadawane <span className="text-brand-gradient">pytania</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 lg:text-xl">
            Zdejmujemy z Ciebie ryzyko i porządkujemy najczęstsze wątpliwości. Poniżej zobaczysz, jak podchodzimy do czasu realizacji, tekstów, wdrożenia i odpowiedzialności za efekt końcowy.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.article
                key={faq.question}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.003 }}
                transition={springCard}
                className="group relative overflow-hidden border border-white/10 bg-[#0A0A0A]/92"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,209,0.14),_transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="relative z-10 flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-8"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center border text-[11px] font-black uppercase tracking-[0.16em] transition-all duration-300 ${isOpen ? 'border-[#00FFD1]/40 bg-[#00FFD1]/10 text-[#00FFD1]' : 'border-white/10 bg-white/[0.03] text-gray-500 group-hover:border-[#00FFD1]/20 group-hover:text-[#00FFD1]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className={`pr-2 text-lg font-bold leading-snug transition-colors duration-300 md:text-xl ${isOpen ? 'text-white' : 'text-white group-hover:text-[#00FFD1]'}`}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`shrink-0 ${isOpen ? 'text-[#00FFD1]' : 'text-gray-500 group-hover:text-[#00FFD1]'}`}
                  >
                    <ChevronDown size={22} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="border-t border-white/8 px-6 pb-6 pt-5 text-base leading-relaxed text-gray-400 md:px-8 md:pb-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mt-14 text-center lg:mt-16"
        >
          <p className="mb-5 text-gray-400">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springCard}
            className="inline-flex items-center gap-2 border-b border-[#00FFD1]/30 pb-1 text-sm font-bold uppercase tracking-[0.22em] text-[#00FFD1] transition-colors duration-300 hover:border-[#00FFD1]"
          >
            Zadaj je nam bezpośrednio
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
