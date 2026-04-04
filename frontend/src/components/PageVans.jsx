import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageVans = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/" className="text-gray-500 hover:text-[#00FFD1] flex items-center gap-2 mb-12 transition-colors">
            <ArrowLeft size={20}/> Wróć
        </Link>
        
        <header className="mb-20">
            <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Dla Dealerów Aut Dostawczych i�Busów</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
                Sprzedaż Aut Użytkowych <br />
                na <span className="text-[#00FFD1]">Pełnych Obrotach</span>.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Klient szukający busa potrzebuje go "na wczoraj" do pracy. 
                Twoja oferta musi być widoczna dokładnie w�momencie, gdy zepsuje mu się stare auto.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Specyfika rynku:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Bardzo duża rotacja (dobre sztuki znikają w�24h).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Klient szuka konkretnych zabudów (chłodnia, plandeka, brygadówka).</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Co proponujemy:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Dynamiczne reklamy w�wyszukiwarce (DSA) pod konkretne zabudowy.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Targetowanie lokalne na firmy budowlane, instalacyjne i�kurierskie.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Szybkie strony lądowania (Landing Pages) dla kategorii (np. "Busy do 3.5t").</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Sprzedajesz dostawczaki?</h3>
            <p className="text-gray-400 mb-8">Zwiększ obroty dzięki precyzyjnemu marketingowi.</p>
            <a href="/#contact" className="btn-primary">Wypełnij Formularz</a>
        </div>
      </div>
    </div>
  );
};

export default PageVans;
