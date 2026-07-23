import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Printer } from 'lucide-react';

export default function ResumePreview() {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleDownload = async () => {
    setDownloading(true);

    // Create a clean printable HTML document and open print dialog
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setDownloading(false);
      return;
    }

    const resumeContent = resumeRef.current?.innerHTML || '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ahmed Raza - Resume</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; background: white; padding: 48px; max-width: 800px; margin: 0 auto; }
          h1 { font-size: 28px; font-weight: 700; color: #111; margin-bottom: 4px; }
          .subtitle { font-size: 16px; color: #666; margin-bottom: 12px; }
          .contact-info { display: flex; gap: 16px; font-size: 13px; color: #888; margin-bottom: 24px; flex-wrap: wrap; }
          .divider { border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 20px; }
          .section-title { font-size: 12px; font-weight: 700; color: #111; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
          .section-text { font-size: 13px; color: #555; line-height: 1.7; }
          .job-title { font-size: 14px; font-weight: 600; color: #111; }
          .job-date { font-size: 12px; color: #999; }
          .job-header { display: flex; justify-content: space-between; align-items: baseline; }
          ul { margin-top: 8px; padding-left: 0; list-style: none; }
          li { font-size: 13px; color: #555; line-height: 1.8; }
          li::before { content: "•"; margin-right: 8px; color: #8B5CF6; }
          .skills-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
          .skill { display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 500; background: #f3f4f6; color: #555; border-radius: 4px; }
          .edu-title { font-size: 14px; font-weight: 600; color: #111; }
          .edu-school { font-size: 13px; color: #666; }
          @media print { body { padding: 24px; } }
        </style>
      </head>
      <body>
        <h1>Ahmed Raza</h1>
        <p class="subtitle">Junior Full Stack Engineer</p>
        <div class="contact-info">
          <span>sheikhahmednasir04@gmail.com</span>
          <span>github.com/ahmedraza</span>
          <span>linkedin.com/in/www.linkedin.com/in/ahmed-raza-bb46a938b</span>
          <span>Pakistan</span>
        </div>

        <div class="divider">
          <div class="section-title">Summary</div>
          <p class="section-text">Junior Full Stack Engineer passionate about building modern, scalable and high-performance web applications using React, Next.js, PHP, Laravel, Node.js, Express.js, MySQL and MongoDB. Committed to creating beautiful user experiences backed by clean architecture, secure backend systems and optimized performance.</p>
        </div>

        <div class="divider">
          <div class="section-title">Experience</div>
          <div class="job-header"><span class="job-title">Junior Full Stack Engineer</span><span class="job-date">2022 – Present</span></div>
          <ul>
            <li>Develop responsive web applications with React and Next.js</li>
            <li>Build REST APIs with Node.js, Express, PHP and Laravel</li>
            <li>Create secure authentication systems with JWT</li>
            <li>Integrate MySQL and MongoDB databases</li>
            <li>Deploy applications to Vercel and Render</li>
            <li>Optimize performance and maintain clean scalable code</li>
          </ul>
        </div>

        <div class="divider">
          <div class="section-title">Education</div>
          <div class="job-header"><span class="edu-title">BS Computer Science</span><span class="job-date">Enrolled</span></div>
          <p class="edu-school">Muhammad Ali Jinnah University</p>
        </div>

        <div class="divider">
          <div class="section-title">Technical Skills</div>
          <div class="skills-wrap">
            <span class="skill">React.js</span><span class="skill">Next.js</span><span class="skill">TypeScript</span><span class="skill">JavaScript</span><span class="skill">Node.js</span><span class="skill">Express.js</span><span class="skill">PHP</span><span class="skill">Laravel</span><span class="skill">MySQL</span><span class="skill">MongoDB</span><span class="skill">Tailwind CSS</span><span class="skill">Git</span><span class="skill">Docker</span><span class="skill">REST APIs</span><span class="skill">JWT</span><span class="skill">Firebase</span>
          </div>
        </div>

        <div class="divider">
          <div class="section-title">Certifications</div>
          <p class="section-text">Frontend Development (Coursera) · React (Meta) · Next.js (Vercel) · Backend Development (Google) · PHP (LinkedIn Learning) · Laravel (Udemy) · Node.js (OpenJS) · REST APIs (HackerRank) · MySQL (Oracle) · MongoDB (MongoDB University) · Docker · Git (GitHub) · Cloud Deployment (AWS)</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
      >
        <FileText size={16} /> Preview Resume
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-10 max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Resume Preview</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 text-sm font-medium text-white transition-colors"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download size={14} /> Download PDF
                      </>
                    )}
                  </button>
                  <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-white/40 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-white overflow-hidden shadow-2xl max-h-[75vh] overflow-y-auto" ref={resumeRef}>
                <div className="p-8 md:p-12 text-gray-900">
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Ahmed Raza</h1>
                    <p className="text-lg text-gray-500 mt-1">Junior Full Stack Engineer</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                      <span>ahmedraza@example.com</span>
                      <span>github.com/ahmedraza</span>
                      <span>Pakistan</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Summary</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">Junior Full Stack Engineer passionate about building modern, scalable and high-performance web applications using React, Next.js, PHP, Laravel, Node.js, Express.js, MySQL and MongoDB.</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h2>
                    <div className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-semibold text-gray-900">Junior Full Stack Engineer</h3>
                        <span className="text-xs text-gray-400">2022 – Present</span>
                      </div>
                      <ul className="mt-1.5 text-sm text-gray-600 space-y-1">
                        <li>• Develop responsive web applications with React and Next.js</li>
                        <li>• Build REST APIs with Node.js, Express, PHP and Laravel</li>
                        <li>• Create secure authentication systems with JWT</li>
                        <li>• Integrate MySQL and MongoDB databases</li>
                        <li>• Deploy applications to Vercel and Render</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Education</h2>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-gray-900">BS Computer Science</h3>
                      <span className="text-xs text-gray-400">Enrolled</span>
                    </div>
                    <p className="text-sm text-gray-500">Muhammad Ali Jinnah University</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PHP', 'Laravel', 'MySQL', 'MongoDB', 'Tailwind CSS', 'Git', 'Docker', 'REST APIs', 'JWT', 'Firebase'].map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Certifications</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Frontend Development (Coursera) · React (Meta) · Next.js (Vercel) · Backend Development (Google) · PHP (LinkedIn Learning) · Laravel (Udemy) · Node.js (OpenJS) · REST APIs (HackerRank) · MySQL (Oracle) · MongoDB (MongoDB University) · Docker · Git (GitHub) · Cloud Deployment (AWS)
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-white/20 mt-3 text-center">Click "Download PDF" to save as PDF via your browser's print dialog</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
