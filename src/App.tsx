import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RecruiterModeProvider } from './contexts/RecruiterModeContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import MouseSpotlight from './components/ui/MouseSpotlight';
import AnimatedBackground from './components/ui/AnimatedBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import BackToTop from './components/ui/BackToTop';
import CommandPalette from './components/CommandPalette';
import DeveloperTerminal from './components/DeveloperTerminal';
import AIAssistant from './components/AIAssistant';
import ThemeCustomizer from './components/ThemeCustomizer';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import LiveMetrics from './components/LiveMetrics';
import TechStack from './components/TechStack';
import WhyHireMe from './components/WhyHireMe';
import CodingPhilosophy from './components/CodingPhilosophy';
import Certificates from './components/Certificates';
import CurrentlyLearning from './components/CurrentlyLearning';
import OpenSource from './components/OpenSource';
import GitHubAnalytics from './components/GitHubAnalytics';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Easter egg: Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === konamiCode[idx]) {
        idx++;
        if (idx === konamiCode.length) {
          idx = 0;
          const flash = document.createElement('div');
          flash.style.cssText = 'position:fixed;inset:0;z-index:99999;background:linear-gradient(135deg,#8B5CF6,#3B82F6);opacity:0.3;pointer-events:none;transition:opacity 1s';
          document.body.appendChild(flash);
          setTimeout(() => { flash.style.opacity = '0'; }, 100);
          setTimeout(() => { flash.remove(); }, 1200);
        }
      } else { idx = 0; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
    <Helmet>
      <title>Ahmed Raza | Junior Full Stack Engineer</title>

      <meta
        name="description"
        content="Ahmed Raza is a Junior Full Stack Engineer specializing in React, Node.js, Laravel, TypeScript, PHP and modern web applications."
      />

  <link
    rel="canonical"
    href="https://ahmed-raza-portfolio-six.vercel.app/"
  />

      <meta
        name="keywords"
        content="Ahmed Raza, Full Stack Engineer, React Developer, Node.js, Laravel, Portfolio, TypeScript"
      />
<meta property="og:title" content="Ahmed Raza | Full Stack Engineer" />
<meta property="og:description" content="Professional Full Stack Engineer Portfolio showcasing React, TypeScript, Node.js, Laravel, and modern web applications." />
<meta property="og:url" content="https://ahmed-raza-portfolio-six.vercel.app/" />
<meta property="og:image" content="https://ahmed-raza-portfolio-six.vercel.app/portrait.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Ahmed Raza | Full Stack Engineer" />
<meta name="twitter:description" content="Professional Full Stack Engineer Portfolio showcasing React, TypeScript, Node.js, Laravel, and modern web applications." />
<meta name="twitter:image" content="https://ahmed-raza-portfolio-six.vercel.app/portrait.jpg" />

      <meta
        name="author"
        content="Ahmed Raza"
      />
    </Helmet>

    <RecruiterModeProvider>
      <div className="bg-[#050505] min-h-screen relative">
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        <CustomCursor />
        <ScrollProgress />
        <MouseSpotlight />
        <AnimatedBackground />
        <CommandPalette />
        <AIAssistant />
        <ThemeCustomizer />
        <DeveloperTerminal />
        <BackToTop />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <LiveMetrics />
          <About />
          <WhyHireMe />
          <Experience />
          <Projects />
          <CurrentlyLearning />
          <TechStack />
          <CodingPhilosophy />
          <Certificates />
          <OpenSource />
          <GitHubAnalytics />
          <Education />
          <Contact />
        </main>

        <Footer />
            </div>
    </RecruiterModeProvider>
  </>
);
}