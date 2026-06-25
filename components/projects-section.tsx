'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from '@/app/contexts/locale-context';

// ✅ projectsMeta sans hook
const projectsMeta = [
  { number: '01', image: '/assets/neurevia.png', tech: ['Next.js', 'Django', 'PyTorch', 'TensorFlow', 'PostgreSQL'], type: 'type_fullstack', github: 'https://github.com/Sidel-malek/NeurevIA_frontend', demo: 'https://neurev-ia-frontend.vercel.app/' },
  { number: '02', image: '/assets/daresni.png', tech: ['Next.js', 'Spring Boot', 'MongoDB', 'Docker'], type: 'type_fullstack' },
  { number: '03', image: '/assets/student_valley.png', tech: ['React Native', 'JavaScript'], type: 'type_mobile' },
];

export function ProjectsSection() {
  const { t } = useLocale(); // ✅ à l'intérieur, avec déstructuration

  const projects = projectsMeta.map((meta, i) => ({
    ...meta,
    title: t(`projects.items.${i}.title`),
    description: t(`projects.items.${i}.description`),
    typeLabel: t(`projects.${meta.type}`),
  }));

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-24">
          <p className="text-cyan-400 uppercase tracking-[0.4em] text-sm mb-4">{t('projects.portfolio')}</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            {t('projects.title1')} <span className="text-cyan-400">{t('projects.title2')}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-[180px] top-0 bottom-0 w-[2px]">
            <div className="h-full w-full bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent" />
          </div>

          <div className="space-y-32">
            {projects.map((project) => (
              <motion.div key={project.number} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                <div className="grid lg:grid-cols-[150px_1fr] gap-10">
                  <div className="relative hidden lg:flex justify-center">
                    <div className="absolute top-10 left-1/2 -translate-x-1/2">
                      <div className="w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.8)]" />
                    </div>
                    <span className="text-6xl font-bold text-white/10">{project.number}</span>
                  </div>

                  <div className="group">
                    <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                        <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-xl" />
                      </div>
                      <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 md:p-10">
                        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="relative h-[300px] rounded-2xl overflow-hidden">
                          <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </motion.div>

                        <div className="flex flex-col justify-center">
                          <span className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">{project.typeLabel}</span>
                          <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                          <p className="mt-6 text-slate-400 leading-relaxed text-lg">{project.description}</p>
                          <div className="flex flex-wrap gap-3 mt-8">
                            {project.tech.map((tech) => (
                              <span key={tech} className="px-4 py-2 rounded-full text-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">{tech}</span>
                            ))}
                          </div>
                          <div className="flex gap-4 mt-8">
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition">
                                <Github size={18} /> {t('projects.code')}
                              </a>
                            )}
                            {project.demo && (
                              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition">
                                <ExternalLink size={18} /> {t('projects.demo')}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}