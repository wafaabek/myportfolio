'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from '@/app/contexts/locale-context';

export function ContactSection() {
  const {t }= useLocale();
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-cyan-400">{t('title1')}</span>
            <br />
            {t('title2')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              {[
                { icon: Mail, label: t('email_label'), value: 'wf.bekkhoucha@esi-sba.dz' },
                { icon: Phone, label: t('whatsapp_label'), value: '+213 656 28 55 76' },
                { icon: MapPin, label: t('location_label'), value: t('location_value') },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div key={label} className="flex items-start gap-4 group cursor-pointer" whileHover={{ x: 10 }}>
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{label}</h3>
                    <p className="text-slate-400 group-hover:text-cyan-400 transition-colors">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl cyber-bg border cyber-border" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('form_email')}</label>
              <motion.input
                type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="wf.bekkhoucha@esi-sba.dz"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-500/20 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                whileFocus={{ scale: 1.01 }} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('form_message')}</label>
              <motion.textarea
                name="message" value={formData.message} onChange={handleChange}
                placeholder={t('form_placeholder_message')} rows={5}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-500/20 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
                whileFocus={{ scale: 1.01 }} required
              />
            </div>
            <motion.button type="submit" className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-cyan-500/50 transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Send className="w-5 h-5" />
              {t('form_submit')}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}