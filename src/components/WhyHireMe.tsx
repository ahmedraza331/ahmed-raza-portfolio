import { motion } from 'framer-motion';
import { Puzzle, Zap, Rocket, Code2, Server, Smartphone, Shield, Palette, GraduationCap } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const reasons = [
  { icon: Puzzle, title: 'Problem Solver', desc: 'I break down complex problems into elegant, maintainable solutions.' },
  { icon: Zap, title: 'Fast Learner', desc: 'Quick to adapt and master new technologies as the industry evolves.' },
  { icon: Rocket, title: 'Production Ready', desc: 'Every project is built for real users with real performance expectations.' },
  { icon: Code2, title: 'Clean Code', desc: 'Readable, well-structured code that teams can maintain and scale.' },
  { icon: Server, title: 'API Development', desc: 'Robust RESTful APIs with authentication, validation and documentation.' },
  { icon: Smartphone, title: 'Responsive Design', desc: 'Pixel-perfect interfaces that work beautifully on every device.' },
  { icon: Shield, title: 'Backend Architecture', desc: 'Secure, scalable backend systems with optimized database design.' },
  { icon: Palette, title: 'Frontend Excellence', desc: 'Crafting interfaces that are both beautiful and highly performant.' },
  { icon: GraduationCap, title: 'Continuous Learning', desc: 'Committed to growth — always exploring new tools and best practices.' },
];

export default function WhyHireMe() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Value" title="Why" titleAccent="Hire Me" description="What I bring to every project and every team." />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl bg-[#0E0E0E] border border-white/[0.06] hover:border-white/[0.12] p-5 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/15 flex items-center justify-center mb-3 group-hover:bg-[#8B5CF6]/15 transition-colors duration-300">
                <r.icon size={16} className="text-[#8B5CF6]" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{r.title}</h4>
              <p className="text-xs text-white/35 leading-relaxed font-light">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}