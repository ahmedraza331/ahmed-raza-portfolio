import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileCode,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Code2,
  ArrowRight
} from 'lucide-react';
import { s, section } from 'framer-motion/client';
import { build } from 'vite';

interface SearchItem {
  id: string;
  type:
    | 'project'
    | 'skill'
    | 'certificate'
    | 'experience'
    | 'education'
    | 'contact';
  title: string;
  subtitle: string;
  section: string;
  href: string;
}

const searchData: SearchItem[] = [
  // ---------------- Projects ----------------
  {
    id: 'p1',
    type: 'project',
    title: 'Luxury Portfolio',
    subtitle: 'React • TypeScript • Framer Motion',
    section: 'Projects',
    href: '#projects',
  },
  {
    id: 'p2',
    type: 'project',
    title: 'E-Commerce Platform',
    subtitle: 'Node.js • MongoDB • Express',
    section: 'Projects',
    href: '#projects',
  },
  {
    id: 'p3',
    type: 'project',
    title: 'Task Management Dashboard',
    subtitle: 'Next.js • Firebase',
    section: 'Projects',
    href: '#projects',
  },
  {
    id: 'p4',
    type: 'project',
    title: 'Social Media REST API',
    subtitle: 'Laravel • MySQL',
    section: 'Projects',
    href: '#projects',
  },
  {
    id: 'p5',
    type: 'project',
    title: 'Real-time Chat App',
    subtitle: 'Socket.io • Node.js',
    section: 'Projects',
    href: '#projects',
  },

  // ---------------- Skills ----------------
  {
    id: 's1',
    type: 'skill',
    title: 'React.js',
    subtitle: 'Frontend Development',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's2',
    type: 'skill',
    title: 'Next.js',
    subtitle: 'Full Stack Framework',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's3',
    type: 'skill',
    title: 'TypeScript',
    subtitle: 'Programming Language',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's4',
    type: 'skill',
    title: 'Node.js',
    subtitle: 'Backend Runtime',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's5',
    type: 'skill',
    title: 'Express.js',
    subtitle: 'REST APIs',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's6',
    type: 'skill',
    title: 'MongoDB',
    subtitle: 'Database',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's7',
    type: 'skill',
    title: 'MySQL',
    subtitle: 'Relational Database',
    section: 'Tech Stack',
    href: '#techstack',
  },
  {
    id: 's8',
    type: 'skill',
    title: 'Tailwind CSS',
    subtitle: 'UI Framework',
    section: 'Tech Stack',
    href: '#techstack',
  },
    // ---------------- Certificates ----------------
  {
    id: 'c1',
    type: 'certificate',
    title: 'Frontend Development',
    subtitle: 'Coursera',
    section: 'Certificates',
    href: '#certificates',
  },
  {
    id: 'c2',
    type: 'certificate',
    title: 'React',
    subtitle: 'Meta',
    section: 'Certificates',
    href: '#certificates',
  },
  {
    id: 'c3',
    type: 'certificate',
    title: 'Node.js',
    subtitle: 'OpenJS Foundation',
    section: 'Certificates',
    href: '#certificates',
  },
  {
    id: 'c4',
    type: 'certificate',
    title: 'Docker',
    subtitle: 'Docker Certified',
    section: 'Certificates',
    href: '#certificates',
  },

  // ---------------- Experience ----------------
  {
    id: 'e1',
    type: 'experience',
    title: 'Junior Full Stack Engineer',
    subtitle: '2022 – Present',
    section: 'Experience',
    href: '#experience',
  },

  // ---------------- Education ----------------
  {
    id: 'ed1',
    type: 'education',
    title: 'BS Computer Science',
    subtitle: 'Muhammad Ali Jinnah University',
    section: 'Education',
    href: '#education',
  },

  // ---------------- Contact ----------------
  {
    id: 'ct1',
    type: 'contact',
    title: 'Get in Touch',
    subtitle: "Let's build something together",
    section: 'Contact',
    href: '#contact',
  },
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
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
      }

      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const filtered = query
    ? searchData.filter((item) => {
        const value = query.toLowerCase();

        return (
          item.title.toLowerCase().includes(value) ||
          item.subtitle.toLowerCase().includes(value) ||
          item.section.toLowerCase().includes(value)
        );
      })
    : searchData;

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery('');

    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);
    return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[14vh]"
          onClick={() => setOpen(false)}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-xl mx-4 overflow-hidden rounded-2xl bg-[#0E0E0E] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-5 border-b border-white/[0.06]">
              <Search
                size={17}
                className="text-white/30 shrink-0"
              />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything..."
                className="flex-1 py-4 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
              />

              <kbd className="hidden sm:flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] text-white/30">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              className="max-h-[360px] overflow-y-auto py-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-sm text-white/30">
                  No matching results found.
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon =
                    typeIcons[item.type] || FileCode;

                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.href)}
                      className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.03]">
                        <Icon
                          size={15}
                          className="text-white/35"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white/75 transition-colors group-hover:text-white">
                          {item.title}
                        </p>

                        <p className="truncate text-[11px] text-white/30">
                          {item.subtitle}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/[0.05] bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-white/20">
                        {item.section}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
                        {/* Footer */}
            <div className="flex items-center gap-4 border-t border-white/[0.06] px-5 py-3 text-[10px] text-white/20">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5">
                  ↑↓
                </kbd>
                Navigate
              </span>

              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5">
                  ↵
                </kbd>
                Open
              </span>

              <span className="ml-auto flex items-center gap-1">
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5">
                  Ctrl
                </kbd>
                +
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5">
                  K
                </kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
