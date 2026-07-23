import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const knowledgeBase: Record<string, string> = {
  about: "I'm Ahmed Raza, a Junior Full Stack Engineer passionate about building modern, scalable web applications. I've been coding since 2022 and specialize in React, Next.js, PHP, Laravel, Node.js, Express.js, MySQL and MongoDB. I'm currently pursuing a BS in Computer Science at Muhammad Ali Jinnah University.",
  skills: "My tech stack includes: Frontend — React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP; Backend — PHP, Laravel, Node.js, Express.js, REST APIs, JWT Auth; Database — MySQL, MongoDB, Firebase; Tools — Git, Docker, VS Code, Postman, Vercel, Render, Figma.",
  projects: "I've built 6 featured projects: 1) E-Commerce Platform (React, Node.js, MongoDB) 2) Task Management Dashboard (Next.js, TypeScript, Firebase) 3) Social Media REST API (PHP, Laravel, MySQL) 4) Portfolio Generator (React, Tailwind, Vercel) 5) Real-time Chat App (Node.js, WebSocket) 6) Blog CMS (Next.js, TypeScript, MySQL). Each features real UI screenshots and case studies.",
  experience: "I've been working as a Junior Full Stack Engineer since 2022. I develop responsive web applications, build REST APIs, create secure authentication systems, develop PHP Laravel applications, build React and Next.js interfaces, optimize performance, integrate databases, deploy cloud applications, and maintain clean scalable code.",
  education: "I'm currently enrolled in a Bachelor of Science in Computer Science at Muhammad Ali Jinnah University. I've completed my first semester (2026). I also hold 13 professional certifications from platforms like Coursera, Meta, Google, LinkedIn Learning, Udemy, and more.",
  certificates: "I hold 13 verified certifications: Frontend Development (Coursera), React (Meta), Next.js (Vercel), Backend Development (Google), PHP (LinkedIn Learning), Laravel (Udemy), Node.js (OpenJS Foundation), REST APIs (HackerRank), MySQL (Oracle), MongoDB (MongoDB University), Docker (Docker), Git (GitHub), Cloud Deployment (AWS).",
  contact: "You can reach me via the contact form on this page, or connect through GitHub (github.com/ahmedraza), LinkedIn, or email at ahmedraza@example.com. I'm available for full-time and freelance opportunities, and I'm remote-friendly.",
  resume: "You can preview and download my resume using the 'Preview Resume' button in the Contact section. It includes my full experience, education, skills, and certifications.",
};

const quickActions = [
  { label: 'About Ahmed', query: 'Tell me about Ahmed' },
  { label: 'View Projects', query: 'What projects has Ahmed built?' },
  { label: 'View Skills', query: 'What are Ahmed\'s skills?' },
  { label: 'Download Resume', query: 'How can I get Ahmed\'s resume?' },
  { label: 'Contact Ahmed', query: 'How can I contact Ahmed?' },
];

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('about') || q.includes('who') || q.includes('tell me')) return knowledgeBase.about;
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) return knowledgeBase.skills;
  if (q.includes('project') || q.includes('build') || q.includes('portfolio') || q.includes('work')) return knowledgeBase.projects;
  if (q.includes('experience') || q.includes('work history') || q.includes('job')) return knowledgeBase.experience;
  if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('study')) return knowledgeBase.education;
  if (q.includes('certificate') || q.includes('certification') || q.includes('verified')) return knowledgeBase.certificates;
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) return knowledgeBase.contact;
  if (q.includes('resume') || q.includes('cv') || q.includes('download')) return knowledgeBase.resume;
  return "I can answer questions about Ahmed's skills, projects, experience, education, certificates, contact info, and resume. Try asking something specific!";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm Ahmed's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch. 👋" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(text);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-[#8B5CF6] flex items-center justify-center text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-shadow duration-300"
        aria-label="Ask Ahmed AI"
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed bottom-20 right-6 z-40 w-[340px] md:w-[380px] max-h-[520px] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 flex items-center justify-center">
                <Sparkles size={13} className="text-[#8B5CF6]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Ask Ahmed</h4>
                <p className="text-[10px] text-white/25">AI-powered portfolio assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={10} className="text-[#8B5CF6]/60" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-[12px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#8B5CF6]/20 text-white/80'
                        : 'bg-white/[0.04] text-white/55'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <Sparkles size={10} className="text-[#8B5CF6]/60" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-white/[0.04]">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions */}
            <div className="px-4 py-2 border-t border-white/[0.04] flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {quickActions.map(action => (
                <button
                  key={action.label}
                  onClick={() => send(action.query)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-white/[0.04] text-[10px] text-white/35 hover:text-white/60 hover:bg-white/[0.06] transition-all duration-200 border border-white/[0.04]"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(input); }}
              className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-1.5 rounded-lg bg-[#8B5CF6] text-white disabled:opacity-30 transition-opacity"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}