'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/app/contexts/locale-context';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export function ExperienceSection() {
  const { t } = useLocale();

  const experiences = [0, 1].map((i) => ({
    period: t(`experience.items.${i}.period`),
    position: t(`experience.items.${i}.position`),
    description: t(`experience.items.${i}.description`),
    badges: String(t(`experience.items.${i}.badges`)).split(','),
  }));

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('experience.title1')} <span className="text-cyan-400">{t('experience.title2')}</span>
          </h2>
        </motion.div>

        <motion.div className="space-y-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative pl-8 md:pl-12 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors">
              <motion.div className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 rounded-full transform -translate-x-1.5 mt-2" whileHover={{ scale: 1.3 }} />
              <div className="space-y-4">
                <div>
                  <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">{exp.period}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{exp.position}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed max-w-2xl">{exp.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.badges.map((badge, i) => (
                    <motion.span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}>
                      {badge.trim()}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}