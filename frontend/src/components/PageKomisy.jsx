import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageKomisy = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/" className="text-gray-500 hover:text-[#00FFD1] flex items-center gap-2 mb-12 transition-colors">
            <ArrowLeft size={20}/> Wróć
        </Link>
        
        <header className="mb-20">
            <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Dla Komisów i Dealerów Aut Używanych</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
                Przestań konkurować ceną na OTOMOTO. <br />
                Zbuduj <span className="text-[#00FFD1]">Własny Lejek Sprzedaży</span>.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Większość komisów czeka na telefon. My sprawiamy, że telefon dzwoni. 
                Wdrażamy systemy, które wyłapują klienta, zanim ten w ogóle wejdzie na portal ogłoszeniowy.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Problemy, które rozwiązujemy:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Rosnące ceny ogłoszeń i spadające zasięgi.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Telefony od "Januszy" i marudnych klientów ("daję 10k i biorę").</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Auta stojące na placu powyżej 60 dni (zamrożona gotówka).</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Nasze Rozwiązanie:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Własne reklamy Facebook/Instagram targetowane na lokalny rynek (+50km).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Formularze kwalifikujące klientów (Budżet, Termin, Finansowanie).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Kampanie "Wyprzedaż Rocznika" i "Nowa Dostawa" generujące szybki pik sprzedaży.</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Chcesz sprzedawać więcej aut?</h3>
            <p className="text-gray-400 mb-8">Umów się na bezpłatną analizę Twojego stoku.</p>
            <a href="/#contact" className="btn-primary">Wypełnij Formularz</a>
        </div>
      </div>
    </div>
  );
};

export default PageKomisy;
