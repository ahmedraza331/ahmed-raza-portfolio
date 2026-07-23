import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Target, Lightbulb, Zap, BarChart3, Palette, Code2, Play } from 'lucide-react';
import DeviceMockup from './projects/DeviceMockup';
import ProjectDemoModal from './ProjectDemoModal';
import SectionHeading from './ui/SectionHeading';

interface Screenshot {
  id: number;
  project_id: number;
  screen_label: string;
  screen_path: string;
  sort_order: number;
}

interface Feature {
  title: string;
  description: string;
}
interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
interface Result {
  value: string;
  label: string;
}
interface ProjectCase {
  id: number;
  title: string;
  subtitle: string;
  overview: string;
  challenge: string;
  solution: string;
  features: Feature[];
  process_steps: ProcessStep[];
  results: Result[];
  color_palette: string[];
  tech_list: string[];
  device_type: 'laptop' | 'desktop' | 'mobile' | 'tablet';
  layout_variant: number;
  gradient_from: string;
  gradient_to: string;
  sort_order: number;
  github_url: string;
  live_url: string;
}

/* ─── Floating Metric Card ─── */
function FloatingCard({ value, label, className = '', delay = 0, color }: { value: string; label: string; className?: string; delay?: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={`glass rounded-xl px-4 py-3 absolute z-20 ${className}`}
      style={{ animation: `float ${5 + delay}s ease-in-out ${delay}s infinite` }}
    >
      <div className="text-lg font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px] text-white/35 font-medium tracking-wider uppercase">{label}</div>
    </motion.div>
  );
}

/* ─── Project Case Study ─── */
function ProjectCaseStudy({ project, screenshots, index, onWatchDemo }: { project: ProjectCase; screenshots: Screenshot[]; index: number; onWatchDemo: (p: ProjectCase) => void }) {
  const isReversed = project.layout_variant % 2 === 0;
  const isCentered = project.layout_variant === 3;
  const num = String(index + 1).padStart(2, '0');
  const projectScreens = screenshots.filter(s => s.project_id === project.id);

  return (
    <div className="project-case">
      {/* ═══════ HERO SECTION ═══════ */}
      <div className="relative min-h-screen flex items-center overflow-hidden py-20">
        {/* Background gradient accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${project.gradient_from}, ${project.gradient_to})` }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          {isCentered ? (
            /* Centered layout */
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="mb-8"
              >
                <span className="text-8xl md:text-9xl font-black text-white/[0.03] absolute -top-8 left-1/2 -translate-x-1/2 select-none">{num}</span>
                <span className="relative text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: project.gradient_from }}>Case Study {num}</span>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 tracking-tight">{project.title}</h3>
                <p className="text-lg md:text-xl text-white/45 mt-2 font-light">{project.subtitle}</p>
              </motion.div>

              <div className="relative w-full max-w-2xl mx-auto mb-8">
                <DeviceMockup
                  type={project.device_type}
                  gradientFrom={project.gradient_from}
                  gradientTo={project.gradient_to}
                  screenshots={projectScreens}
                />
                <FloatingCard value={project.results[0]?.value || ''} label={project.results[0]?.label || ''} className="-top-2 -right-4 md:-right-8" delay={0.3} color={project.gradient_from} />
                <FloatingCard value={project.results[1]?.value || ''} label={project.results[1]?.label || ''} className="-bottom-2 -left-4 md:-left-8" delay={0.6} color={project.gradient_to} />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base md:text-lg text-white/40 max-w-xl font-light leading-relaxed"
              >
                {project.overview}
              </motion.p>
            </div>
          ) : (
            /* Side-by-side layout */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Device side — takes up 60% visually */}
              <div className={`relative ${isReversed ? 'order-2' : 'order-1'}`}>
                <DeviceMockup
                  type={project.device_type}
                  gradientFrom={project.gradient_from}
                  gradientTo={project.gradient_to}
                  screenshots={projectScreens}
                />
                <FloatingCard value={project.results[0]?.value || ''} label={project.results[0]?.label || ''} className="-top-4 -right-4 md:-right-6 hidden md:block" delay={0.3} color={project.gradient_from} />
                <FloatingCard value={project.results[1]?.value || ''} label={project.results[1]?.label || ''} className="-bottom-4 -left-4 md:-left-6 hidden md:block" delay={0.6} color={project.gradient_to} />
              </div>

              {/* Content side */}
              <div className={`${isReversed ? 'order-1' : 'order-2'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-8xl md:text-9xl font-black text-white/[0.03] absolute -top-8 select-none">{num}</span>
                  <span className="relative text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: project.gradient_from }}>Case Study {num}</span>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 tracking-tight leading-[1.05]">{project.title}</h3>
                  <p className="text-lg md:text-xl text-white/45 mt-2 font-light">{project.subtitle}</p>
                  <p className="text-base text-white/35 mt-4 font-light leading-relaxed max-w-lg">{project.overview}</p>

                  <div className="flex items-center gap-3 mt-6">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300">
                        <Github size={16} /> Source Code
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]" style={{ background: `linear-gradient(135deg, ${project.gradient_from}, ${project.gradient_to})` }}>
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ CHALLENGE & SOLUTION ═══════ */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-red-500/15 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Target size={18} className="text-red-400" />
                </div>
                <h4 className="text-lg font-bold text-white">The Challenge</h4>
              </div>
              <p className="text-white/45 text-sm md:text-base leading-relaxed font-light">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-emerald-500/15 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Lightbulb size={18} className="text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white">The Solution</h4>
              </div>
              <p className="text-white/45 text-sm md:text-base leading-relaxed font-light">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════ FEATURES ═══════ */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: project.gradient_from }}>Features</span>
            <h4 className="text-2xl md:text-3xl font-bold text-white mt-2">Key Capabilities</h4>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass rounded-xl p-5 group transition-all duration-300 hover:border-white/[0.12]"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${project.gradient_from}15, ${project.gradient_to}15)`, border: `1px solid ${project.gradient_from}20` }}>
                  <Zap size={14} style={{ color: project.gradient_from }} />
                </div>
                <h5 className="text-sm font-semibold text-white mb-1.5">{feature.title}</h5>
                <p className="text-xs text-white/35 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ DESIGN PROCESS ═══════ */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: project.gradient_from }}>Process</span>
            <h4 className="text-2xl md:text-3xl font-bold text-white mt-2">Design Journey</h4>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-6 right-6 h-[2px] hidden md:block" style={{ background: `linear-gradient(90deg, ${project.gradient_from}30, ${project.gradient_to}30)` }} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {project.process_steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center group"
                >
                  <div className="relative z-10 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center glass group-hover:border-white/[0.15] transition-all duration-300" style={{ boxShadow: i === 0 ? `0 0 20px ${project.gradient_from}20` : 'none' }}>
                    <span className="text-xs font-bold" style={{ color: project.gradient_from }}>{String(step.step).padStart(2, '0')}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-white/70 mb-1">{step.title}</h5>
                  <p className="text-[10px] text-white/30 leading-relaxed hidden lg:block">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ TECH + RESULTS + COLORS ═══════ */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={16} style={{ color: project.gradient_from }} />
                <h5 className="text-sm font-semibold text-white/60 tracking-wide uppercase">Development Stack</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech_list.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] text-white/50 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/70 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={16} style={{ color: project.gradient_from }} />
                <h5 className="text-sm font-semibold text-white/60 tracking-wide uppercase">Results</h5>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.results.map((result, i) => (
                  <div key={i} className="text-center p-2">
                    <div className="text-xl md:text-2xl font-bold" style={{ color: project.gradient_from }}>{result.value}</div>
                    <div className="text-[10px] text-white/30 font-medium tracking-wider uppercase mt-0.5">{result.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Palette size={16} style={{ color: project.gradient_from }} />
                <h5 className="text-sm font-semibold text-white/60 tracking-wide uppercase">Visual Identity</h5>
              </div>
              <div className="flex gap-2 mb-3">
                {project.color_palette.map((color) => (
                  <div key={color} className="group/swatch relative">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/[0.08] cursor-pointer transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-white/20 opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap">{color}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/25 mt-6">Hover swatches for hex values</p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300">
                <Github size={16} /> View Source
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]" style={{ background: `linear-gradient(135deg, ${project.gradient_from}, ${project.gradient_to})` }}>
                Explore Live <ArrowRight size={14} />
              </a>
            )}
            <button
              onClick={() => onWatchDemo(project)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
            >
              <Play size={14} /> Watch Demo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </div>
  );
}

/* ─── Project Navigation Dots ─── */
function ProjectNav({ projects, activeIndex }: { projects: ProjectCase[]; activeIndex: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('projects');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3"
        >
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => {
                const cases = document.querySelectorAll('.project-case');
                cases[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group flex items-center gap-3 transition-all duration-300"
            >
              <span className={`text-[10px] font-medium transition-all duration-300 ${activeIndex === i ? 'text-white/70 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'}`}>
                {project.title.split(' ')[0]}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5 group-hover:w-2 group-hover:h-2'
                }`}
                style={{
                  backgroundColor: activeIndex === i ? project.gradient_from : 'rgba(255,255,255,0.15)',
                  boxShadow: activeIndex === i ? `0 0 10px ${project.gradient_from}40` : 'none',
                }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Projects Component ─── */
export default function Projects() {
  const [projects, setProjects] = useState<ProjectCase[]>([]);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [demoProject, setDemoProject] = useState<ProjectCase | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/project-cases').then(r => r.json()),
      fetch('/api/project-screenshots').then(r => r.json()),
    ])
      .then(([projectsData, screenshotsData]) => {
        setProjects(projectsData);
        setScreenshots(screenshotsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cases = document.querySelectorAll('.project-case');
      cases.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          setActiveIndex(i);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]);

  return (
    <section id="projects" className="relative">
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            label="Projects"
            title="Featured"
            titleAccent="Work"
            description="Each project is a story — from problem to solution, crafted with precision and purpose."
          />
        </div>
      </div>

      <ProjectNav projects={projects} activeIndex={activeIndex} />

      {loading ? (
        <div className="space-y-32">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
                  <div className="glass rounded-2xl p-4 animate-pulse">
                    <div className="aspect-[16/10] rounded-xl bg-white/[0.03]" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 rounded bg-white/[0.03]" />
                    <div className="h-4 w-1/2 rounded bg-white/[0.03]" />
                    <div className="h-4 w-full rounded bg-white/[0.03]" />
                    <div className="h-4 w-5/6 rounded bg-white/[0.03]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        projects.map((project, i) => (
          <ProjectCaseStudy key={project.id} project={project} screenshots={screenshots} index={i} onWatchDemo={setDemoProject} />
        ))
      )}
      {/* Demo Modal */}
      <AnimatePresence>
        {demoProject && (
          <ProjectDemoModal
            project={demoProject}
            screenshots={screenshots.filter(s => s.project_id === demoProject.id)}
            onClose={() => setDemoProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}