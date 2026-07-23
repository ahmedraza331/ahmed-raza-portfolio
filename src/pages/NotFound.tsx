import { motion } from 'framer-motion';
import { Home, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[120px] md:text-[180px] font-black gradient-text leading-none">404</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/40 font-light mt-4 mb-2"
        >
          Page not found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-white/20 font-light mb-8"
        >
          Looks like this route went missing. Maybe it's debugging itself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-medium text-white transition-colors"
          >
            <Home size={16} /> Back Home
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="inline-block rounded-lg bg-[#0E0E0E] border border-white/[0.06] px-4 py-2 font-mono text-[11px] text-white/25">
            <span className="text-emerald-400/60">❯</span> cd /home
          </div>
        </motion.div>
      </div>
    </div>
  );
}