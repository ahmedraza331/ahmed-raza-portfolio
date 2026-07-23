import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

interface Metric {
  id: number;
  metric_key: string;
  metric_value: string;
  metric_label: string;
  icon_name: string;
  sort_order: number;
}

const iconMap: Record<string, string> = {
  FolderGit2: '📁',
  Award: '🏆',
  Code2: '💻',
  Star: '⭐',
  GitBranch: '🌿',
  Calendar: '📅',
};

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/live-metrics')
      .then(r => r.json())
      .then(data => { setMetrics(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#0E0E0E] border border-white/[0.06] p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8B5CF6]">Live Metrics</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">By the Numbers</h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] animate-pulse">
                  <div className="h-8 w-16 rounded bg-white/[0.03] mx-auto mb-2" />
                  <div className="h-3 w-12 rounded bg-white/[0.03] mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="text-xl mb-1">{iconMap[m.icon_name] || '📊'}</div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{m.metric_value}</div>
                  <div className="text-[10px] text-white/30 mt-1 tracking-wider uppercase font-medium">{m.metric_label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}