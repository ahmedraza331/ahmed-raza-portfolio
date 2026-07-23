import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, Code2, Shield, Database, Cloud, Cpu, Layout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const responsibilities = [
  { icon: Layout, text: 'Develop responsive web applications' },
  { icon: Globe, text: 'Build REST APIs' },
  { icon: Shield, text: 'Create secure authentication systems' },
  { icon: Code2, text: 'Develop PHP Laravel applications' },
  { icon: Cpu, text: 'React and Next.js interfaces' },
  { icon: Database, text: 'Integrate databases' },
  { icon: Cloud, text: 'Deploy cloud applications' },
  { icon: Briefcase, text: 'Maintain clean scalable code' },
];

const milestones = [
  { year: '2024', title: 'Next.js & TypeScript', desc: 'Adopted Next.js App Router and TypeScript for production applications' },
  { year: '2023', title: 'Full Stack Expansion', desc: 'Expanded to Node.js, Express.js and MongoDB for full-stack projects' },
  { year: '2022', title: 'Started Coding Journey', desc: 'Began with React, PHP and Laravel — built first production applications' },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, x: i % 2 === 0 ? -40 : 40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Experience" title="Professional" titleAccent="Journey" description="Building and shipping modern web applications since 2022." />
        <div ref={timelineRef} className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8B5CF6] via-[#3B82F6] to-[#8B5CF6]/20" />
          <div className="relative mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="ml-14 md:ml-0 md:w-[calc(50%-2rem)] md:mr-auto glass rounded-2xl p-6 md:p-8 hover:border-[#8B5CF6]/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/20">2022 – Present</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Junior Full Stack Engineer</h3>
              <p className="text-white/40 text-sm mb-6">Full-stack development with modern technologies</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {responsibilities.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex items-center gap-3 text-sm text-white/60 group">
                    <item.icon size={14} className="text-[#8B5CF6]/60 group-hover:text-[#8B5CF6] transition-colors shrink-0" />
                    <span className="group-hover:text-white/80 transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          {milestones.map((milestone, i) => (
            <div key={milestone.year} className="relative mb-12 last:mb-0 timeline-item">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-[#0E0E0E] border-2 border-[#3B82F6]/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                </div>
              </div>
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-5 md:p-6 hover:border-[#3B82F6]/20 transition-all duration-500 ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 mb-3">{milestone.year}</span>
                <h4 className="text-lg font-bold text-white mb-1">{milestone.title}</h4>
                <p className="text-sm text-white/45">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}