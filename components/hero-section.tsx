'use client';

import { motion } from 'framer-motion';
import { ComputersCanvas } from "./canvas";
import { useLocale } from '@/app/contexts/locale-context';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[calc(100vh-5rem)]"
        >
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
            <motion.div variants={itemVariants} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-7 h-[1.5px] bg-cyan-400" />
              <span className="text-xs font-semibold tracking-[.14em] uppercase text-cyan-400">
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
              {t('hero.heading1')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
                scalable
              </span>
              <br />{t('hero.heading2')}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.a
                href="/resume" target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400 hover:text-slate-950 transition-all text-sm text-center"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                {t('hero.resume')}
              </motion.a>
              <motion.a
                href="/cv-wafaa-bekkhoucha.pdf" download="CV-Wafaa-Bekkhoucha.pdf"
                className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all text-sm text-center"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                {t('hero.download')}
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden lg:flex items-center gap-1.5 mt-4">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay }}
                />
              ))}
            </motion.div>
          </div>

          <div className="w-full xl:w-1/2 h-[600px]">
            <motion.div variants={itemVariants} className="order-1 lg:order-2 w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[calc(100vh-5rem)] max-h-[700px]">
              <ComputersCanvas />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}