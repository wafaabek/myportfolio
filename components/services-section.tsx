'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Cpu } from 'lucide-react';
import { useLocale } from '@/app/contexts/locale-context';

const icons = [Code2, Zap, Cpu];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ServicesSection() {
  const { t } = useLocale();

  const items = [0, 1, 2].map((i) => ({
    number: t(`services.items.${i}.number`),
    title: t(`services.items.${i}.title`),
    description: t(`services.items.${i}.description`),
    icon: icons[i],
  }));

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('services.title1')} <span className="text-cyan-400">{t('services.title2')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">{t('services.subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group relative">
                <div className="relative p-6 md:p-8 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/10 rounded-xl hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl font-bold text-cyan-500/30 group-hover:text-cyan-500/60 transition-colors">{service.number}</span>
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}