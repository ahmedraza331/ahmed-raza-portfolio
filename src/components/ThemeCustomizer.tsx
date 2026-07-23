import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Palette, Zap, MousePointer, Layers, RotateCcw } from 'lucide-react';

interface ThemeSettings {
  accentColor: string;
  glassIntensity: 'light' | 'medium' | 'premium';
  animationSpeed: 'slow' | 'normal' | 'fast';
  cursorStyle: 'default' | 'custom' | 'none';
  borderRadius: 'light' | 'medium' | 'premium';
}

const defaults: ThemeSettings = {
  accentColor: '#8B5CF6',
  glassIntensity: 'premium',
  animationSpeed: 'normal',
  cursorStyle: 'custom',
  borderRadius: 'premium',
};

const accentColors = [
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' },
];

function RadioGroup<T extends string>({ options, value, onChange, labels }: { options: T[]; value: T; onChange: (v: T) => void; labels?: Record<T, string> }) {
  return (
    <div className="flex gap-1.5">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
            value === opt
              ? 'bg-white/[0.08] text-white border border-white/[0.12]'
              : 'bg-white/[0.02] text-white/30 border border-white/[0.04] hover:text-white/50'
          }`}
        >
          {labels?.[opt] || opt}
        </button>
      ))}
    </div>
  );
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved ? JSON.parse(saved) : defaults;
    } catch { return defaults; }
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', JSON.stringify(settings));
    const root = document.documentElement;
    root.style.setProperty('--accent-color', settings.accentColor);
  }, [settings]);

  const reset = () => {
    setSettings(defaults);
    localStorage.removeItem('portfolio-theme');
  };

  const update = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-20 right-4 md:right-6 z-40 p-2 rounded-lg bg-[#0E0E0E]/60 border border-white/[0.06] text-white/20 hover:text-white/50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Customize theme"
      >
        <Settings size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-[#0A0A0A] border border-white/[0.08] shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Palette size={16} className="text-white/30" />
                  <h3 className="text-sm font-semibold text-white">Customize</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={reset} className="p-1.5 rounded-lg text-white/20 hover:text-white/50 transition-colors" title="Reset">
                    <RotateCcw size={13} />
                  </button>
                  <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-white/20 hover:text-white/50 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div className="p-5 space-y-6">
                {/* Accent Color */}
                <div>
                  <label className="text-[11px] font-semibold text-white/40 tracking-wider uppercase mb-3 block">Accent Color</label>
                  <div className="flex gap-2">
                    {accentColors.map(c => (
                      <button
                        key={c.value}
                        onClick={() => update('accentColor', c.value)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                          settings.accentColor === c.value ? 'border-white/40 scale-110' : 'border-transparent hover:border-white/15'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Glass Intensity */}
                <div>
                  <label className="text-[11px] font-semibold text-white/40 tracking-wider uppercase mb-3 flex items-center gap-1.5"><Layers size={11} /> Glass Intensity</label>
                  <RadioGroup
                    options={['light', 'medium', 'premium'] as const}
                    value={settings.glassIntensity}
                    onChange={v => update('glassIntensity', v)}
                    labels={{ light: 'Light', medium: 'Medium', premium: 'Premium' }}
                  />
                </div>

                {/* Animation Speed */}
                <div>
                  <label className="text-[11px] font-semibold text-white/40 tracking-wider uppercase mb-3 flex items-center gap-1.5"><Zap size={11} /> Animation Speed</label>
                  <RadioGroup
                    options={['slow', 'normal', 'fast'] as const}
                    value={settings.animationSpeed}
                    onChange={v => update('animationSpeed', v)}
                    labels={{ slow: 'Slow', normal: 'Normal', fast: 'Fast' }}
                  />
                </div>

                {/* Cursor Style */}
                <div>
                  <label className="text-[11px] font-semibold text-white/40 tracking-wider uppercase mb-3 flex items-center gap-1.5"><MousePointer size={11} /> Cursor Style</label>
                  <RadioGroup
                    options={['default', 'custom', 'none'] as const}
                    value={settings.cursorStyle}
                    onChange={v => update('cursorStyle', v)}
                    labels={{ default: 'Default', custom: 'Custom', none: 'Hidden' }}
                  />
                </div>

                {/* Border Radius */}
                <div>
                  <label className="text-[11px] font-semibold text-white/40 tracking-wider uppercase mb-3 block">Rounded Corners</label>
                  <RadioGroup
                    options={['light', 'medium', 'premium'] as const}
                    value={settings.borderRadius}
                    onChange={v => update('borderRadius', v)}
                    labels={{ light: 'Light', medium: 'Medium', premium: 'Premium' }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/[0.04] text-[10px] text-white/15 text-center">
                Preferences saved automatically
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}