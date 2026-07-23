import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileCode, Award, Briefcase, GraduationCap, Mail, Code2 } from 'lucide-react';

interface SearchItem {
  id: string;
  type: 'project' | 'skill' | 'certificate' | 'experience' | 'education' | 'contact';
  title: string;
  subtitle: string;
  section: string;
  href: string;
}

const searchData: SearchItem[] = [
  { id: 'p1', type: 'project', title: 'E-Commerce Platform', subtitle: 'React, Node.js, MongoDB', section: 'Projects', href: '#projects' },
  { id: 'p2', type: 'project', title: 'Task Management Dashboard', subtitle: 'Next.js, TypeScript, Firebase', section: 'Projects', href: '#projects' },
  { id: 'p3', type: 'project', title: 'Social Media REST API', subtitle: 'PHP, Laravel, MySQL', section: 'Projects', href: '#projects' },
  { id: 'p4', type: 'project', title: 'Portfolio Generator', subtitle: 'React, Tailwind, Vercel', section: 'Projects', href: '#projects' },
  { id: 'p5', type: 'project', title: 'Real-time Chat Application', subtitle: 'Node.js, Express, WebSocket', section: 'Projects', href: '#projects' },
  { id: 'p6', type: 'project', title: 'Blog CMS Platform', subtitle: 'Next.js, TypeScript, MySQL', section: 'Projects', href: '#projects' },
  { id: 's1', type: 'skill', title: 'React.js', subtitle: 'Frontend Framework', section: 'Tech Stack', href: '#techstack' },
  { id: 's2', type: 'skill', title: 'Next.js', subtitle: 'Full-Stack Framework', section: 'Tech Stack', href: '#techstack' },
  { id: 's3', type: 'skill', title: 'Node.js', subtitle: 'Backend Runtime', section: 'Tech Stack', href: '#techstack' },
  { id: 's4', type: 'skill', title: 'Laravel', subtitle: 'PHP Framework', section: 'Tech Stack', href: '#techstack' },
  { id: 's5', type: 'skill', title: 'TypeScript', subtitle: 'Programming Language', section: 'Tech Stack', href: '#techstack' },
  { id: 's6', type: 'skill', title: 'MongoDB', subtitle: 'NoSQL Database', section: 'Tech Stack', href: '#techstack' },
  { id: 's7', type: 'skill', title: 'MySQL', subtitle: 'SQL Database', section: 'Tech Stack', href: '#techstack' },
  { id: 'c1', type: 'certificate', title: 'Frontend Development', subtitle: 'Coursera', section: 'Certificates', href: '#certificates' },
  { id: 'c2', type: 'certificate', title: 'React', subtitle: 'Meta', section: 'Certificates', href: '#certificates' },
  { id: 'c3', type: 'certificate', title: 'Node.js', subtitle: 'OpenJS Foundation', section: 'Certificates', href: '#certificates' },
  { id: 'c4', type: 'certificate', title: 'Docker', subtitle: 'Docker Certified', section: 'Certificates', href: '#certificates' },
  { id: 'e1', type: 'experience', title: 'Junior Full Stack Engineer', subtitle: '2022 – Present', section: 'Experience', href: '#experience' },
  { id: 'ed1', type: 'education', title: 'BS Computer Science', subtitle: 'Muhammad Ali Jinnah University', section: 'Education', href: '#education' },
  { id: 'ct1', type: 'contact', title: 'Get in Touch', subtitle: 'Send a message', section: 'Contact', href: '#contact' },
];

const typeIcons: Record<string, typeof FileCode> = {
  project: FileCode,
  skill: Code2,
  certificate: Award,
  experience: Briefcase,
  education: GraduationCap,
  contact: Mail,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filtered = query
    ? searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
      )
    : searchData;

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery('');
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-[#0E0E0E] border border-white/[0.08] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
              <Search size={16} className="text-white/30 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search projects, skills, certificates..."
                className="flex-1 py-3.5 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-white/25 bg-white/[0.05] border border-white/[0.06]">ESC</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto py-2" style={{ scrollbarWidth: 'none' }}>
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-white/25">No results found</div>
              ) : (
                filtered.map(item => {
                  const Icon = typeIcons[item.type] || FileCode;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-white/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/70 group-hover:text-white transition-colors truncate">{item.title}</div>
                        <div className="text-[10px] text-white/25 truncate">{item.subtitle}</div>
                      </div>
                      <span className="text-[9px] text-white/15 font-medium tracking-wider uppercase shrink-0">{item.section}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.06] text-[10px] text-white/20">
              <span>Navigate</span><span>↑↓</span><span>Open</span><span>↵</span>
              <span className="ml-auto">Ctrl+K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
