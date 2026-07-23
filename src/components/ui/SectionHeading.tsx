import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  titleAccent: string;
  description: string;
}

export default function SectionHeading({ label, title, titleAccent, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="text-center max-w-2xl mx-auto"
    >
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 mb-4">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title} <span className="gradient-text">{titleAccent}</span>
      </h2>
      <p className="mt-4 text-white/45 text-base md:text-lg font-light">
        {description}
      </p>
    </motion.div>
  );
}