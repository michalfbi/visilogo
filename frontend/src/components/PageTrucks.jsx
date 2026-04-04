import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageTrucks = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/" className="text-gray-500 hover:text-[#00FFD1] flex items-center gap-2 mb-12 transition-colors">
            <ArrowLeft size={20}/> Wróć
        </Link>
        
        <header className="mb-20">
            <span className="text-[#00FFD1] uppercase tracking-widest font-bold text-sm">Dla Dealerów Ciężarówek i�Naczep (B2B)</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
                Docieraj do <span className="text-[#00FFD1]">Firm Transportowych</span>, <br />
                które szukają taboru.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Sprzedaż ciągnika siodłowego to nie to samo co sprzedaż Golfa. 
                Wiemy, jak docierać do właścicieli firm transportowych i�dyrektorów logistyki.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Wyzwania B2B:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Długi proces decyzyjny klienta.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Trudność w�dotarciu do decydenta (nie kierowcy).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-gray-400">Konieczność eksponowania leasingu i�odliczeń VAT.</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Strategia VisiLogo:</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Google Ads na frazy techniczne (np. "Scania R450 Streamline cena", "Leasing naczepy wywrotki").</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">LinkedIn Ads targetowany na "Właściciel Firmy Transportowej".</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00FFD1] mt-1 shrink-0" size={20} />
                        <span className="text-gray-300">Landing pages z�kalkulatorami leasingowymi i�pełną specyfikacją.</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Masz plac pełen ciężarówek?</h3>
            <p className="text-gray-400 mb-8">Pomożemy Ci go opróżnić. Sprawdź naszą strategię B2B.</p>
            <a href="/#contact" className="btn-primary">Wypełnij Formularz</a>
        </div>
      </div>
    </div>
  );
};

export default PageTrucks;
