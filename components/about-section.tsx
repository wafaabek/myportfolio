'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/app/contexts/locale-context';
import Image from 'next/image';

export function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            <span className="text-cyan-400">{t('about.title1')}</span>{' '}
            {t('about.title2')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ================= PHOTO ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-[340px] h-[340px] md:w-[430px] md:h-[430px]">

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl scale-110" />

              {/* Outer dotted circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: 'linear',
                }}
                className="absolute -inset-5 rounded-full border border-cyan-400/20 border-dashed"
              />

              {/* Main glowing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full border-[4px] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.8)]"
              />

              {/* Orbit dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'linear',
                }}
                className="absolute inset-0"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee]" />
              </motion.div>

              {/* Photo */}
              <div className="absolute inset-[32px] rounded-full overflow-hidden">
                <Image
                  src="/assets/profile-pic.png"
                  alt="Wafaa Bekkhoucha"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* ================= TEXT ================= */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {t('about.role1')}
              </h3>

              <h4 className="text-3xl md:text-4xl font-bold text-cyan-400">
                {t('about.role2')}
              </h4>
            </div>

            <div className="space-y-5 text-slate-400 text-lg leading-8">
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