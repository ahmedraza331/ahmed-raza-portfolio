import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface Line { type: 'input' | 'output'; text: string; }

const helpText = 'Available commands:\n  help        Show available commands\n  about       About Ahmed Raza\n  skills      Technical skills\n  projects    Featured projects\n  experience  Work experience\n  education   Education background\n  contact     Contact information\n  resume      Open resume preview\n  github      Open GitHub profile\n  clear       Clear terminal';
const aboutText = 'Ahmed Raza — Junior Full Stack Engineer\nBuilding Modern Digital Experiences Since 2022.\nLocation: Pakistan | Remote Available';
const skillsText = 'Frontend:  React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion\nBackend:   Node.js, Express.js, PHP, Laravel\nDatabase:  MySQL, MongoDB, Firebase\nTools:     Git, Docker, Vercel, Postman, VS Code';
const projectsText = '1. E-Commerce Platform       [React, Node.js, MongoDB]\n2. Task Management Dashboard  [Next.js, TypeScript, Firebase]\n3. Social Media REST API      [PHP, Laravel, MySQL]\n4. Portfolio Generator         [React, Tailwind, Vercel]\n5. Real-time Chat Application  [Node.js, Express, WebSocket]\n6. Blog CMS Platform           [Next.js, TypeScript, MySQL]';
const experienceText = 'Junior Full Stack Engineer (2022–Present)\n  • Responsive web applications\n  • REST API development\n  • Secure authentication systems\n  • PHP Laravel applications\n  • React & Next.js interfaces\n  • Database integration\n  • Cloud deployment';
const educationText = 'Bachelor of Science in Computer Science\nMuhammad Ali Jinnah University\nCurrently Enrolled — Completed First Semester (2026)';
const contactText = 'Email:    sheikhahmednasir04@gmail.com\nGitHub:   https://github.com/ahmedraza\nLinkedIn: https://www.linkedin.com/in/ahmed-raza-bb46a938b';

function processCommand(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  if (!c) return '';
  if (c === 'help') return helpText;
  if (c === 'about') return aboutText;
  if (c === 'skills') return skillsText;
  if (c === 'projects') return projectsText;
  if (c === 'experience') return experienceText;
  if (c === 'education') return educationText;
  if (c === 'contact') return contactText;
  if (c === 'resume') return 'Opening resume preview... (scroll to Contact section to download)';
  if (c === 'github') return 'Opening github.com/ahmedraza ...';
  if (c === 'clear') return '__CLEAR__';
  return `Command not found: ${cmd}. Type "help" for available commands.`;
}

export default function DeveloperTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'Ahmed Raza Portfolio Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const output = processCommand(input);
    if (output === '__CLEAR__') {
      setLines([]);
    } else {
      setLines(prev => [...prev, { type: 'input', text: input }, { type: 'output', text: output }]);
    }
    setInput('');
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-[#0E0E0E] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        aria-label="Open terminal"
      >
        <TerminalIcon size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-[150] md:bottom-6 md:left-6 md:right-6 md:max-w-2xl md:mx-auto"
          >
            <div className="rounded-t-xl md:rounded-xl bg-[#0A0A0A] border border-white/[0.08] overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E0E] border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[11px] text-white/25 font-mono ml-2">ahmed@portfolio ~ %</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/25 hover:text-white/60 transition-colors">
                  <X size={14} />
                </button>
              </div>

              {/* Terminal body */}
              <div className="h-72 overflow-y-auto p-4 font-mono text-[12px] leading-5" style={{ scrollbarWidth: 'none' }}>
                {lines.map((line, i) => (
                  <div key={i} className={line.type === 'input' ? 'text-emerald-400/80' : 'text-white/50'}>
                    {line.type === 'input' && <span className="text-[#8B5CF6]/60 mr-1">❯</span>}
                    <pre className="whitespace-pre-wrap inline">{line.text}</pre>
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center mt-1">
                  <span className="text-[#8B5CF6]/60 mr-1">❯</span>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-emerald-400/80 focus:outline-none caret-emerald-400"
                    autoFocus
                    spellCheck={false}
                  />
                </form>
                <div ref={bottomRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}