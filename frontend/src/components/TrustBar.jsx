import React from 'react';

const TrustBar = () => {
  const partners = [
    "BRANŻA MOTORYZACYJNA", "BRANŻA FOTOWOLTAICZNA", "BRANŻA FITNESS",
    "BRANŻA IT", "BRANŻA BUDOWLANA", "BRANŻA PRAWNA", "BRANŻA E-COMMERCE",
    "BRANŻA MEDYCZNA", "BRANŻA TRANSPORTOWA",
    // Duplikujemy elementy, aby animacja płynnie zapętlała się w nieskończoność
    "BRANŻA MOTORYZACYJNA", "BRANŻA FOTOWOLTAICZNA", "BRANŻA FITNESS",
    "BRANŻA IT", "BRANŻA BUDOWLANA", "BRANŻA PRAWNA", "BRANŻA E-COMMERCE",
    "BRANŻA MEDYCZNA", "BRANŻA TRANSPORTOWA"
  ];

  return (
    <section className="bg-[#020202] border-y border-white/5 py-10 overflow-hidden flex flex-col items-center relative z-20">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            display: flex;
            width: max-content;
          }
        `}
      </style>

      <p className="text-gray-600 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8 font-bold text-center">
        Współpracujemy z firmami z tych branż
      </p>
      
      <div className="w-full relative flex items-center overflow-hidden">
        {/* Efekt płynnego zanikania po bokach */}
        <div className="absolute left-0 top-0 w-16 md:w-48 h-full bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 md:w-48 h-full bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center justify-center mx-8 md:mx-16 group cursor-default">
              <span className="text-gray-600 font-mono text-xl md:text-3xl font-bold group-hover:text-[#00FFD1] transition-colors duration-500 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
