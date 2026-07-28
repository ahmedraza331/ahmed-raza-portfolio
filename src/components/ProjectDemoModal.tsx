import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Code2,
  ExternalLink,
} from 'lucide-react';

interface ProjectDemoProps {
  project: {
    id: number;
    title: string;
    subtitle: string;
    description?: string;
    gradient_from: string;
    gradient_to: string;
    github_url?: string;
    live_url?: string;
    tech_list?: string[];
  };

  screenshots: {
    id: number;
    screen_label: string;
    screen_path: string;
  }[];

  onClose: () => void;
}

export default function ProjectDemoModal({
  project,
  screenshots,
  onClose,
}: ProjectDemoProps) {

  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const next = () =>
    setCurrent((prev) => (prev + 1) % screenshots.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', handleKey);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, screenshots.length]);

  if (screenshots.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        fullscreen ? '' : 'p-4 md:p-8'
      }`}
      onClick={onClose}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-2xl" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className={`relative z-10 w-full ${
          fullscreen ? 'h-full' : 'max-w-5xl'
        } bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/[0.08]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===================== Top Bar ===================== */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.gradient_from }}
            />

            <h3 className="text-sm font-semibold text-white">
              {project.title}
            </h3>

            <span className="text-[10px] text-white/25">
              {screenshots[current]?.screen_label}
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1.5">
            {/* Fullscreen */}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            >
              {fullscreen ? (
                <Minimize2 size={14} />
              ) : (
                <Maximize2 size={14} />
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ===================== Image Viewer ===================== */}
        <div
          className={`relative ${
            fullscreen
              ? 'h-[calc(100%-120px)]'
              : 'max-h-[65vh]'
          } overflow-hidden bg-[#050505]`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={screenshots[current]?.screen_path}
              alt={screenshots[current]?.screen_label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {/* ===================== Navigation Arrows ===================== */}
          {screenshots.length > 1 && (
            <>
              {/* Previous */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white/60 hover:text-white transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white/60 hover:text-white transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* ===================== Bottom Bar ===================== */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
          {/* Navigation Dots */}
          <div className="flex items-center gap-2">
            {screenshots.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-4 bg-white/60'
                    : 'bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Tech Stack */}
            {project.tech_list?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-medium rounded bg-white/[0.04] text-white/30 border border-white/[0.04]"
              >
                {tech}
              </span>
            ))}

            {/* GitHub Button */}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-white/25 hover:text-white/60 transition-colors"
              >
                <Code2 size={13} />
              </a>
            )}

            {/* Live Project Button */}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-white/25 hover:text-white/60 transition-colors"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 
