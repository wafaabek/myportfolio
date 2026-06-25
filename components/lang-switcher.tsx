// components/lang-switcher.tsx
'use client';

import { useLocale } from '@/app/contexts/locale-context';
import { motion } from 'framer-motion';

export function LangSwitcher() {
  const { locale, toggle } = useLocale();

  return (
    <motion.button
      onClick={toggle}
      className="text-sm font-bold text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 px-3 py-1 rounded-lg transition-all"
      whileHover={{ scale: 1.05 }}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </motion.button>
  );
}