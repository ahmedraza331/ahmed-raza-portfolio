import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Screenshot {
  id: number;
  screen_label: string;
  screen_path: string;
}

interface DeviceMockupProps {
  type: 'laptop' | 'desktop' | 'mobile' | 'tablet';
  gradientFrom: string;
  gradientTo: string;
  screenshots: Screenshot[];
}

export default function DeviceMockup({ type, gradientFrom, gradientTo, screenshots }: DeviceMockupProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const config: Record<string, { aspect: string; radius: string; maxW: string; pad: string; screenRadius: string }> = {
    laptop:   { aspect: '16/10', radius: '1.25rem', maxW: '680px', pad: '10px', screenRadius: '0.75rem' },
    desktop:  { aspect: '16/9',  radius: '1rem', maxW: '720px', pad: '8px', screenRadius: '0.625rem' },
    mobile:   { aspect: '9/19.5', radius: '2.75rem', maxW: '300px', pad: '10px', screenRadius: '2rem' },
    tablet:   { aspect: '4/3',  radius: '1.75rem', maxW: '560px', pad: '12px', screenRadius: '1.25rem' },
  };
  const c = config[type] || config.laptop;

  const nextScreen = () => setCurrentScreen(prev => (prev + 1) % screenshots.length);
  const prevScreen = () => setCurrentScreen(prev => (prev - 1 + screenshots.length) % screenshots.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-16 rounded-3xl blur-3xl opacity-15 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      />

      {/* Device frame */}
      <div
        className="relative bg-[#111] shadow-2xl mx-auto"
        style={{
          borderRadius: c.radius,
          maxWidth: c.maxW,
          padding: c.pad,
          boxShadow: `0 50px 100px -20px rgba(0,0,0,0.7), 0 0 80px ${gradientFrom}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Dynamic island for mobile */}
        {type === 'mobile' && (
          <div className="bg-black rounded-full mx-auto mb-2" style={{ width: 90, height: 24 }} />
        )}

        {/* Camera dot for tablet/desktop */}
        {(type === 'tablet' || type === 'desktop') && (
          <div className="w-2 h-2 rounded-full bg-[#222] mx-auto mb-2 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#333]" />
          </div>
        )}

        {/* Camera dot for laptop */}
        {type === 'laptop' && (
          <div className="flex items-center justify-center mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#222]" />
          </div>
        )}

        {/* Screen */}
        <div
          className="overflow-hidden relative group/device"
          style={{
            aspectRatio: c.aspect,
            borderRadius: c.screenRadius,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentScreen}
              src={screenshots[currentScreen]?.screen_path}
              alt={screenshots[currentScreen]?.screen_label || 'Project screenshot'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </AnimatePresence>

          {/* Navigation arrows - appear on hover */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prevScreen}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200 opacity-0 group-hover/device:opacity-100"
                aria-label="Previous screen"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextScreen}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200 opacity-0 group-hover/device:opacity-100"
                aria-label="Next screen"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Subtle bottom gradient for label */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Home indicator for mobile */}
        {type === 'mobile' && (
          <div className="bg-white/20 rounded-full mx-auto mt-2" style={{ width: 100, height: 4 }} />
        )}
      </div>

      {/* Laptop base */}
      {type === 'laptop' && (
        <div className="relative mx-auto" style={{ maxWidth: c.maxW }}>
          <div className="bg-[#111] h-3.5 rounded-b-xl mx-auto" style={{ width: '115%', marginLeft: '-7.5%' }}>
            <div className="w-12 h-1 bg-[#1a1a1a] rounded-full mx-auto mt-1" />
          </div>
          <div className="bg-[#1a1a1a] h-2 rounded-b-2xl mx-auto" style={{ width: '40%' }} />
        </div>
      )}

      {/* Desktop stand */}
      {type === 'desktop' && (
        <div className="relative mx-auto" style={{ maxWidth: c.maxW }}>
          <div className="mx-auto bg-[#111]" style={{ width: 6, height: 36, borderRadius: 3 }} />
          <div className="bg-[#111] h-2.5 rounded-b-lg mx-auto" style={{ width: '45%' }} />
        </div>
      )}

      {/* Screen label + dots */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {screenshots.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentScreen(i)}
            className="group/dot flex flex-col items-center gap-1.5 transition-all duration-300"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                i === currentScreen ? 'w-6 h-2' : 'w-2 h-2 hover:w-3 hover:h-2'
              }`}
              style={{
                backgroundColor: i === currentScreen ? gradientFrom : 'rgba(255,255,255,0.15)',
                boxShadow: i === currentScreen ? `0 0 10px ${gradientFrom}40` : 'none',
              }}
            />
            <span className={`text-[9px] font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
              i === currentScreen ? 'text-white/50' : 'text-white/20 group-hover/dot:text-white/35'
            }`}>
              {s.screen_label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}