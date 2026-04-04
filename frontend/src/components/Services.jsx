import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Layout, Smartphone, Palette } from 'lucide-react';
import { mockServices } from '../mock';

const iconMap = {
  MousePointerClick: MousePointerClick,
  Layout: Layout,
  Smartphone: Smartphone,
  Palette: Palette
};

const Services = () => {
  return (
    <section id="services" className="py-16 lg:py-32 bg-[#050505] relative overflow-hidden">
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
            Co dokładnie <span className="text-[#00FFD1]">dla Ciebie zrobimy?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Koniec z�szukaniem kilku różnych wykonawców. W�VisiLogo otrzymujesz pełną opiekę graficzną, technologiczną i�reklamową pod jednym dachem.
          </motion.p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-500">
                    {Icon && <Icon size={28} strokeWidth={1.5} />}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00FFD1] transition-colors">{service.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{service.description}</p>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:bg-[#00FFD1]/20 transition-colors" />
                  
                  <p className="text-sm text-gray-500 font-mono">{service.details}</p>
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
