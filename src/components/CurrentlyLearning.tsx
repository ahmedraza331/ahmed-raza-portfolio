import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

interface LearningItem {
  id: number;
  technology: string;
  category: string;
  progress: number;
  resource: string;
  sort_order: number;
}

export default function CurrentlyLearning() {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/currently-learning')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Learning" title="Currently" titleAccent="Learning" description="Technologies and skills I am actively developing right now." />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#0E0E0E] border border-white/[0.06] p-5 animate-pulse">
                <div className="h-4 w-24 rounded bg-white/[0.03] mb-3" />
                <div className="h-2 w-full rounded bg-white/[0.03] mb-2" />
                <div className="h-3 w-16 rounded bg-white/[0.03]" />
              </div>
            ))
          ) : (
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group rounded-xl bg-[#0E0E0E] border border-white/[0.06] hover:border-white/[0.12] p-5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                      <BookOpen size={14} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.technology}</h4>
                      <span className="text-[10px] text-white/30 font-medium">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#8B5CF6]">{item.progress}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #8B5CF6, #3B82F6)` }}
                  />
                </div>

                <p className="text-[11px] text-white/25 font-light">{item.resource}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}