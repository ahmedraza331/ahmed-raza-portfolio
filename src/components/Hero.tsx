import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

const isMobile = window.innerWidth < 768;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  /* Scroll Animation */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  /* GSAP Entrance Animation */
  useEffect(() => {
    if (!portraitRef.current) return;

    gsap.fromTo(
      portraitRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 3,
      }
    );
  }, []);

  /* Framer Motion Variants */
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.8,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-24 md:pt-20">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>

                <span className="text-xs text-[#D6D6D6] font-medium">
                  Available for Hire
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C6A96B]/10 border border-[#C6A96B]/30 text-[#C6A96B] font-semibold">
                Remote Friendly
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C6A96B]/10 border border-[#C6A96B]/30 text-[#C6A96B] font-semibold">
                Building Since 2022
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            >
              Ahmed
              <br />
              <span className="gradient-text tracking-wide">
                Raza
              </span>
            </motion.h1>

            {/* Job Title */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-[#D6D6D6] mt-5 font-light tracking-wide"
            >
              Junior Full Stack Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#A8A8A8] mt-2 max-w-md font-light"
            >
              Building Modern Digital Experiences Since 2022.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-7 py-3.5 rounded-2xl bg-[#C6A96B] hover:bg-[#E5C07B] text-black font-semibold transition-all duration-300 hover:shadow-[0_10px_35px_rgba(198,169,107,0.35)] overflow-hidden"
              >
                <span className="relative z-10">
                  Get in Touch
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-[#F8E7B5] to-[#C6A96B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl glass hover:bg-[#C6A96B]/10 text-white font-semibold transition-all duration-300"
              >
                View Projects
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mt-8"
            >
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2.5 rounded-xl glass hover:bg-[#C6A96B]/10 text-[#BDBDBD] hover:text-[#F8E7B5] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(198,169,107,0.20)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Image */}
          <div
            className="relative flex justify-center lg:justify-end"
            ref={portraitRef}
          >
            <motion.div
              style={{ y: portraitY }}
              className="relative"
            >
              {/* Glow Effects */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#C6A96B]/18 via-[#E5C07B]/8 to-transparent rounded-[3rem] backdrop-blur-2xl" />

              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C6A96B]/15 to-[#8C6A2D]/15 rounded-[2.5rem] blur-2xl" />

              {/* Portrait Card */}
              <motion.div
                className="relative rounded-3xl glass p-1.5 sm:p-2 animate-float"
                whileHover={{
                  scale: 1.03,
                  rotate: -1,
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/portrait.jpg"
                    alt="Ahmed Raza - Junior Full Stack Engineer"
                    className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] object-cover"
                    loading="eager"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/55 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating Card 1 */}
              <motion.div
                className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass flex items-center justify-center animate-float-delayed"
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-2xl sm:text-3xl">
                  💻
                </span>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass flex items-center justify-center animate-float-slow"
                animate={{ rotate: [0, -5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-xl sm:text-2xl">
                  ⚡
                </span>
              </motion.div>

              {/* Floating Card 3 */}
              <motion.div
                className="absolute top-1/2 -right-6 sm:-right-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass flex items-center justify-center animate-float"
                animate={{ rotate: [0, 3, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-lg sm:text-xl">
                  🚀
                </span>
              </motion.div>
            </motion.div>
          </div>
                  </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#C6A96B] font-medium">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown
            className="text-white/25"
            size={16}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}  
