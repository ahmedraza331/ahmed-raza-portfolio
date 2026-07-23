import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import ResumePreview from './ResumePreview';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/ahmedraza' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-raza-bb46a938b' },
    { icon: Mail, label: 'Email', href: 'mailto:sheikhahmednasir04@gmail.com' },
  ];

  const inputClass = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:border-[#8B5CF6]/40 focus:bg-white/[0.05] transition-all duration-300 focus:shadow-[0_0_20px_rgba(139,92,246,0.08)]";

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Contact" title="Let's Work" titleAccent="Together" description="Have a project in mind? I'd love to hear about it." />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Project discussion" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase">Message *</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project..." rows={5} className={`${inputClass} resize-none`} required />
            </div>
            <button type="submit" disabled={sending || !form.name || !form.email || !form.message} className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2">
              {sending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={16} />}
              {sending ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle size={16} /> Message sent successfully!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> Failed to send. Please try again.
              </motion.div>
            )}
          </motion.form>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-white/60 mb-4 tracking-wide uppercase">Connect</h4>
              <div className="space-y-3">
                {socials.map(s => (
                  <a key={s.label}href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:border-[#8B5CF6]/20 transition-colors">
                      <s.icon size={18} className="text-white/40 group-hover:text-[#8B5CF6] transition-colors" />
                    </div>
                    <span className="text-sm text-white/50 group-hover:text-white transition-colors">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-white/60 mb-3 tracking-wide uppercase">Location</h4>
              <p className="text-sm text-white/40 mb-4">Available for remote work worldwide and on-site opportunities locally.</p>
              <ResumePreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}