import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Education" title="Academic" titleAccent="Background" description="Pursuing excellence in Computer Science." />
        <div className="mt-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 md:p-8 group transition-all duration-500 hover:border-[#8B5CF6]/20 animated-border"
          >
            <div className="flex items-start gap-4 md:gap-5">
              <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-colors duration-300">
                <GraduationCap className="text-[#8B5CF6]" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">Bachelor of Science in Computer Science</h3>
                <div className="flex items-center gap-2 text-white/45 text-sm mb-1">
                  <MapPin size={14} />
                  <span>Muhammad Ali Jinnah University</span>
                </div>
                <div className="flex items-center gap-2 text-white/35 text-sm mb-3">
                  <Calendar size={14} />
                  <span>Currently Enrolled — Completed First Semester (2026)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-emerald-400/80">In Progress</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}