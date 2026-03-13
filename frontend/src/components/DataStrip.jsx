import React from 'react';
import { motion } from 'framer-motion';

const DataStrip = () => {
  const stats = [
    {
      value: "100+",
      label: "Zrealizowanych projektów"
    },
    {
      value: "1 mln zł+",
      label: "Wygenerowanej sprzedaży"
    },
    {
      value: "80%",
      label: "Klientów zostaje na stałe"
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-[#020202] border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="py-6 md:py-0 flex flex-col items-center justify-center"
            >
              <span className="text-5xl md:text-6xl font-bold text-[#00FFD1] mb-4 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-gray-400 text-sm uppercase tracking-widest font-bold px-4">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataStrip;
