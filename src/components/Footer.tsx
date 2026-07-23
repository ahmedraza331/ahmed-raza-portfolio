import { ArrowUp, Heart, Github, Linkedin, Mail, FileText } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ahmedraza' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-raza-bb46a938b' },
  { icon: Mail, label: 'Email', href: 'mailto:sheikhahmednasir04@gmail.com' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.04] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold gradient-text">AR</span>
            <p className="text-xs text-white/20">Junior Full Stack Engineer</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] text-white/15">v2.0.0</span>
              <span className="text-[10px] text-white/10">·</span>
              <span className="text-[10px] text-white/15">Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Center - Social */}
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/30 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all duration-300"
            >
              <ArrowUp size={12} /> Back to Top
            </button>
            <span className="text-[10px] text-white/10 flex items-center gap-1">
              Built with <Heart size={8} className="text-[#8B5CF6]/40" /> by Ahmed Raza
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.03] text-center">
          <p className="text-[10px] text-white/10">© {new Date().getFullYear()} Ahmed Raza. All rights reserved.</p>
          <p className="text-[9px] text-white/[0.06] mt-1">Ctrl+K to search · Terminal button in corner</p>
        </div>
      </div>
    </footer>
  );
}