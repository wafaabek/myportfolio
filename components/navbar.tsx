'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from '@/app/contexts/locale-context';
import { LangSwitcher } from './lang-switcher';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocale(); // ✅ à l'intérieur du composant

  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="#" className="text-xl font-bold text-white group">
              <motion.span className="block text-glow" whileHover={{ color: '#00e5ff' }}>
                WAFAA.BEK
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <LangSwitcher />
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-slate-950 md:hidden pt-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-cyan-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <LangSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}