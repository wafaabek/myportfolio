'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { useLocale } from '@/app/contexts/locale-context';

export function Footer() {
  const { t } = useLocale();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const marqueeWords = t('footer.marquee').split(',');

  return (
    <footer className="relative border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('footer.tagline1')}
            <br />
            <span className="text-cyan-400">{t('footer.tagline2')}</span>
          </h2>
        </motion.div>

        <motion.div className="flex justify-center gap-6 mb-12 pb-12 border-b border-slate-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {[
            { icon: Github, href: 'https://github.com/wafaabek', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/wafaa-bekkhoucha-535bb1319', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:wafaabek.dev@gmail.com', label: 'Email' },
          ].map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a key={i} href={social.href} className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all border border-cyan-500/30" whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }} title={social.label}>
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div className="relative overflow-hidden py-8 mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} className="flex gap-8" animate={{ x: i % 2 === 0 ? [0, -500] : [-500, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                {marqueeWords.map((text, j) => (
                  <span key={j} className="text-5xl md:text-6xl font-black text-cyan-500/20 uppercase tracking-wider">{text.trim()}</span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
            <p className="text-slate-500 text-sm">{t('footer.copyright')}</p>
          </motion.div>
          <motion.button onClick={scrollToTop} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
            {t('footer.back_to_top')}
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}