import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Monitor, Map, Palette } from 'lucide-react';
import { mockServices } from '../mock';

const iconMap = {
  BarChart: BarChart,
  Monitor: Monitor,
  Map: Map,
  Palette: Palette
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Rozwiązania <span className="text-[#00FFD1]">Automotive</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Nie oferujemy "wszystkiego dla wszystkich". Mamy gotowe, sprawdzone procesy, 
            które generują sprzedaż dla komisów, dealerów i importerów pojazdów.
          </motion.p>
        </div>

        {/* Differentiators / Why Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="p-6 border border-white/10 bg-white/5">
                <h3 className="text-[#00FFD1] font-bold text-lg mb-2">Inventory-Based Marketing</h3>
                <p className="text-gray-400 text-sm">Twoja oferta się zmienia codziennie. Nasze reklamy też. Automatyzacja pod konkretne auta na placu.</p>
            </div>
            <div className="p-6 border border-white/10 bg-white/5">
                <h3 className="text-[#00FFD1] font-bold text-lg mb-2">Optymalizacja pod Marżę</h3>
                <p className="text-gray-400 text-sm">Nie ściągamy "klikaczy". Skupiamy budżet na modelach, na których zarabiasz najwięcej i które muszą zniknąć.</p>
            </div>
            <div className="p-6 border border-white/10 bg-white/5">
                <h3 className="text-[#00FFD1] font-bold text-lg mb-2">Jakość ponad Ilość</h3>
                <p className="text-gray-400 text-sm">Filtrujemy "Januszy". Stosujemy formularze kwalifikujące, by Twój handlowiec rozmawiał tylko z konkretnymi kupcami.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockServices.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0A0A0A] border border-white/5 p-10 hover:border-[#00FFD1]/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-500">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00FFD1] transition-colors">{service.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{service.description}</p>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:bg-[#00FFD1]/20 transition-colors" />
                  
                  <p className="text-sm text-gray-500 font-mono">{service.details}</p>
                  
                  <div className="mt-8">
                    <a href="#contact" className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/20 pb-1 hover:text-[#00FFD1] hover:border-[#00FFD1] transition-all">
                        Zamów wycenę
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
