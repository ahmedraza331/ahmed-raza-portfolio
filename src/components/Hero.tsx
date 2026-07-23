import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!portraitRef.current) return;
    gsap.fromTo(portraitRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3 });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 2.8 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ opacity: heroOpacity }} className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-24 md:pt-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs text-white/60 font-medium">Available for Hire</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/15 text-[10px] font-semibold text-[#3B82F6]">
                Remote Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/15 text-[10px] font-semibold text-[#8B5CF6]">
                Building Since 2022
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
              Ahmed<br /><span className="gradient-text">Raza</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-white/65 mt-5 font-light tracking-wide">
              Junior Full Stack Engineer
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-white/40 mt-2 max-w-md font-light">
              Building Modern Digital Experiences Since 2022.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-8">
              <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="group relative px-7 py-3.5 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] overflow-hidden">
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a href="#projects" onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-7 py-3.5 rounded-2xl glass hover:bg-white/[0.08] text-white font-semibold transition-all duration-300">
                View Projects
              </a>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-3 mt-8">
              {[{ icon: Github, label: 'GitHub' }, { icon: Linkedin, label: 'LinkedIn' }, { icon: Mail, label: 'Email' }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="p-2.5 rounded-xl glass hover:bg-white/[0.08] text-white/40 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
          <div className="relative flex justify-center lg:justify-end" ref={portraitRef}>
            <motion.div style={{ y: portraitY }} className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#8B5CF6]/20 via-[#3B82F6]/10 to-transparent rounded-[3rem] blur-3xl" />
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#3B82F6]/15 to-[#8B5CF6]/15 rounded-[2.5rem] blur-2xl" />
              <motion.div className="relative rounded-3xl glass p-1.5 sm:p-2 animate-float" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img src="/portrait.jpg" alt="Ahmed Raza - Junior Full Stack Engineer" className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
                </div>
              </motion.div>
              <motion.div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass flex items-center justify-center animate-float-delayed" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-2xl sm:text-3xl">💻</span>
              </motion.div>
              <motion.div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass flex items-center justify-center animate-float-slow" animate={{ rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-xl sm:text-2xl">⚡</span>
              </motion.div>
              <motion.div className="absolute top-1/2 -right-6 sm:-right-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass flex items-center justify-center animate-float" animate={{ rotate: [0, 3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-lg sm:text-xl">🚀</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="text-white/25" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}