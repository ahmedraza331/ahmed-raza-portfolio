import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute w-32 h-32 rounded-full border border-[#8B5CF6]/20 animate-spin-slow" />
        <div
          className="absolute w-24 h-24 rounded-full border border-[#3B82F6]/20 animate-spin-slow"
          style={{ animationDirection: 'reverse', animationDuration: '6s' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <span className="text-5xl font-bold gradient-text">AR</span>
        </motion.div>
        <motion.div
          className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-xs tracking-[0.3em] uppercase text-white/40"
        >
          Loading Experience
        </motion.p>
      </div>
    </motion.div>
  );
}