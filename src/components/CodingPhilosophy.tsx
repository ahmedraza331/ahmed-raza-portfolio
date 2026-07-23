import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const principles = [
  { text: 'Write maintainable code.', icon: '🔧' },
  { text: 'Accessibility first.', icon: '♿' },
  { text: 'Performance matters.', icon: '⚡' },
  { text: 'Security by design.', icon: '🔒' },
  { text: 'Reusable architecture.', icon: '🧱' },
  { text: 'Scalable applications.', icon: '📈' },
  { text: 'User-centered experiences.', icon: '👤' },
];

export default function CodingPhilosophy() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Philosophy" title="Coding" titleAccent="Principles" description="The values that guide every line of code I write." />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="space-y-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#0E0E0E] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <span className="text-lg shrink-0">{p.icon}</span>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors font-light">{p.text}</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/30 group-hover:bg-[#8B5CF6] transition-colors duration-300 shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}