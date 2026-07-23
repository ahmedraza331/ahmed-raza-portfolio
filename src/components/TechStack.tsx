import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

interface TechItem {
  id: number;
  name: string;
  category: string;
  sort_order: number;
}

const categoryColors: Record<string, string> = {
  Frontend: 'from-[#8B5CF6] to-[#A78BFA]',
  Backend: 'from-[#3B82F6] to-[#60A5FA]',
  Database: 'from-[#10B981] to-[#34D399]',
  Tools: 'from-[#F59E0B] to-[#FBBF24]',
};

export default function TechStack() {
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/tech-items')
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <section id="techstack" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Tech Stack" title="Technologies &" titleAccent="Tools" description="The technologies and tools I use to bring ideas to life." />
        <div className="mt-10 flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  : 'glass text-white/50 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 animate-pulse">
                <div className="h-4 w-20 rounded bg-white/[0.03]" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="glass rounded-xl p-4 text-center group cursor-default transition-all duration-300 hover:border-[#8B5CF6]/20"
              >
                <div className={`w-1 h-1 mx-auto mb-2 rounded-full bg-gradient-to-r ${categoryColors[item.category] || 'from-[#8B5CF6] to-[#3B82F6]'}`} />
                <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">{item.name}</span>
                <div className="text-[10px] text-white/30 mt-1">{item.category}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}