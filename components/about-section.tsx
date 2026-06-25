'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/app/contexts/locale-context';

export function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-cyan-400">{t('about.title1')}</span> {t('about.title2')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-96 md:h-[500px] rounded-xl overflow-hidden border border-cyan-500/30"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-40 bg-slate-700/50 rounded-lg mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Professional Photo</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('about.role1')}
              </h3>
              <h4 className="text-3xl md:text-4xl text-cyan-400 font-bold mb-6">
                {t('about.role2')}
              </h4>
            </div>

            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}