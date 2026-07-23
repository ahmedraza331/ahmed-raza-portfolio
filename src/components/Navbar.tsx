import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase } from 'lucide-react';
import { useRecruiterMode } from '../contexts/RecruiterModeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.06]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#hero" onClick={e => { e.preventDefault(); handleNav('#hero'); }} className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
            AR<span className="text-white/40">.</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeSection === link.href.slice(1) ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 bg-white/[0.06] rounded-lg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleRecruiterMode}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                recruiterMode
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-white/[0.04] text-white/40 hover:text-white/60 border border-white/[0.06]'
              }`}
            >
              <Briefcase size={12} /> Recruiter
            </button>
            <a href="#contact" onClick={e => { e.preventDefault(); handleNav('#contact'); }} className="px-4 py-2 text-sm font-medium rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              Let's Talk
            </a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/60 hover:text-white transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={e => { e.preventDefault(); handleNav(link.href); }}
                  className="w-full text-center py-3 text-lg font-medium text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={e => { e.preventDefault(); handleNav('#contact'); }} className="mt-4 w-full text-center py-3 text-lg font-medium rounded-xl bg-[#8B5CF6] text-white">
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}