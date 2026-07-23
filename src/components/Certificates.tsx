import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Eye } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

interface Certificate {
  id: number;
  title: string;
  category: string;
  issuer: string;
  year: string;
  description: string;
  image_path: string;
  accent_color: string;
  verified: boolean;
  sort_order: number;
}

/* ─── Lightbox ─── */
function Lightbox({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-10 max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 p-1.5 rounded-lg text-white/30 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Certificate image */}
        <div className="relative rounded-lg overflow-hidden bg-white" style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)' }}>
          <img
            src={certificate.image_path}
            alt={certificate.title}
            className="w-full h-auto"
            draggable={false}
          />
        </div>

        {/* Info */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">{certificate.title}</h3>
              {certificate.verified && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-semibold border border-emerald-500/20">
                  <ShieldCheck size={10} /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-white/30 mt-0.5">{certificate.issuer} · {certificate.year}</p>
          </div>
          <p className="text-xs text-white/20 font-light max-w-sm">{certificate.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Card ─── */
function CertificateCard({ certificate, index, onOpen }: { certificate: Certificate; index: number; onOpen: (c: Certificate) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      onClick={() => onOpen(certificate)}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#0E0E0E] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300" style={{ boxShadow: '0 8px 30px -12px rgba(0,0,0,0.5)' }}>
        {/* Certificate thumbnail */}
        <div className="relative bg-white/[0.02] p-2.5">
          <div className="relative rounded-md overflow-hidden bg-white aspect-[16/9]">
            <img
              src={certificate.image_path}
              alt={certificate.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-2.5 rounded-md bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#050505] text-[11px] font-semibold opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200">
              <Eye size={12} /> View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-3.5 py-3">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h4 className="text-[13px] font-semibold text-white leading-snug">{certificate.title}</h4>
            {certificate.verified && <ShieldCheck size={13} className="text-emerald-400/50 shrink-0 mt-0.5" />}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-white/30">{certificate.issuer}</span>
            <span className="text-[7px] text-white/15">•</span>
            <span className="text-[11px] text-white/20">{certificate.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/certificate-showcase')
      .then(res => res.json())
      .then(data => { setCertificates(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(certificates.map(c => c.category)))];
  const filtered = activeFilter === 'All' ? certificates : certificates.filter(c => c.category === activeFilter);

  return (
    <section id="certificates" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          label="Certificates"
          title="Professional"
          titleAccent="Certifications"
          description="Industry-recognized certifications from leading technology platforms."
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-10"
        >
          {[
            { value: String(certificates.length || 16), label: 'Certifications', color: '#8B5CF6' },
            { value: String(new Set(certificates.map(c => c.category)).size || 5), label: 'Categories', color: '#3B82F6' },
            { value: '100%', label: 'Verified', color: '#10B981' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stat.color }} />
              <span className="text-sm font-semibold" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-xs text-white/30">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-white/[0.04] text-white/40 hover:text-white/60 hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#0E0E0E] border border-white/[0.06] animate-pulse">
                <div className="p-2.5"><div className="aspect-[16/9] rounded-md bg-white/[0.03]" /></div>
                <div className="px-3.5 py-3 space-y-2">
                  <div className="h-3.5 w-3/4 rounded bg-white/[0.03]" />
                  <div className="h-2.5 w-1/2 rounded bg-white/[0.03]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((cert, i) => (
              <CertificateCard key={cert.id} certificate={cert} index={i} onOpen={setLightboxCert} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxCert && <Lightbox certificate={lightboxCert} onClose={() => setLightboxCert(null)} />}
      </AnimatePresence>
    </section>
  );
}
