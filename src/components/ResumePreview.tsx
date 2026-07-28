import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  FileText,
  Printer,
  ExternalLink,
} from 'lucide-react';

/* ===========================================================
   Resume Preview Component
=========================================================== */

export default function ResumePreview() {
  /* ---------------------------------------------------------
     Component State
  --------------------------------------------------------- */

  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------
     Close Modal with ESC Key
  --------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  /* ---------------------------------------------------------
     Prevent Background Scroll
  --------------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* ---------------------------------------------------------
     Close Modal
  --------------------------------------------------------- */

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  /* ---------------------------------------------------------
     Download / Print Resume
  --------------------------------------------------------- */

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const printWindow = window.open('', '_blank');

      if (!printWindow) {
        setDownloading(false);
        return;
      }

      const resumeContent =
        resumeRef.current?.innerHTML ?? '';
              printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Ahmed Raza | Resume</title>

<link
href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
rel="stylesheet"
/>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:'Inter',sans-serif;
background:#ffffff;
color:#111827;
max-width:850px;
margin:auto;
padding:48px;
line-height:1.65;
}

h1{
font-size:32px;
font-weight:800;
margin-bottom:6px;
}

.subtitle{
font-size:17px;
color:#6b7280;
margin-bottom:18px;
}

.contact{
display:flex;
flex-wrap:wrap;
gap:14px;
font-size:13px;
color:#6b7280;
margin-bottom:28px;
}

.section{
margin-top:28px;
padding-top:22px;
border-top:1px solid #e5e7eb;
}

.section-title{
font-size:12px;
font-weight:700;
letter-spacing:.12em;
text-transform:uppercase;
margin-bottom:12px;
color:#111827;
}

.text{
font-size:14px;
color:#4b5563;
line-height:1.8;
}

.job-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:8px;
}

.job-title{
font-size:15px;
font-weight:700;
}

.job-date{
font-size:12px;
color:#9ca3af;
}

ul{
list-style:none;
padding-left:0;
margin-top:10px;
}

li{
font-size:14px;
margin-bottom:8px;
color:#4b5563;
}

li::before{
content:"•";
margin-right:8px;
color:#C6A96B;
font-weight:bold;
}

.skills{
display:flex;
flex-wrap:wrap;
gap:8px;
}

.skill{
padding:5px 12px;
background:#f3f4f6;
border-radius:6px;
font-size:12px;
font-weight:500;
color:#374151;
}

@media print{

body{
padding:24px;
}

}

</style>

</head>

<body>

${resumeContent}

<script>

window.onload=function(){

setTimeout(function(){

window.print();

},400);

}

</script>

</body>
</html>
`);

      printWindow.document.close();

      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setDownloading(false);
    }
        finally {
      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    }
  };

  return (
    <>
      {/* ========================================= */}
      {/* Resume Preview Button */}
      {/* ========================================= */}

      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
      >
        <FileText size={16} />
        Preview Resume
      </motion.button>

      {/* ========================================= */}
      {/* Resume Modal */}
      {/* ========================================= */}

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            {/* Background Overlay */}

            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Modal */}

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-4xl"
            >
              {/* Header */}

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Resume Preview
                  </h2>

                  <p className="text-sm text-white/35 mt-1">
                    Review your resume before downloading.
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {/* Download Button */}

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C6A96B] hover:bg-[#7C3AED] disabled:opacity-60 text-sm font-medium text-white transition-all duration-300"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download size={15} />
                        Download PDF
                      </>
                    )}
                  </button>

                  {/* Print Button */}

                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl glass text-white/50 hover:text-white transition-all duration-300"
                  >
                    <Printer size={16} />
                  </button>

                  {/* Close */}

                  <button
                    onClick={closeModal}
                    className="p-2 rounded-xl glass text-white/40 hover:text-white transition-all duration-300"
                  >
                    <X size={18} />
                  </button>

                </div>
              </div>

              {/* Resume Container */}

              <div
                ref={resumeRef}
                className="rounded-2xl bg-white overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.45)] max-h-[75vh] overflow-y-auto"
              >
                <div className="p-8 md:p-12 text-gray-900">
                                  {/* ========================= */}
                  {/* Header */}
                  {/* ========================= */}

                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Ahmed Raza
                    </h1>

                    <p className="text-lg text-gray-500 mt-1">
                      Junior Full Stack Engineer
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                      <span>sheikhahmednasir04@gmail.com</span>
                      <span>github.com/ahmedraza</span>
                      <span>Pakistan</span>
                    </div>
                  </div>

                  {/* ========================= */}
                  {/* Summary */}
                  {/* ========================= */}

                  <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                      Professional Summary
                    </h2>

                    <p className="text-sm text-gray-700 leading-7">
                      Junior Full Stack Engineer specializing in
                      React, Next.js, Node.js, Express.js, PHP,
                      Laravel, MySQL and MongoDB. Passionate about
                      building scalable, secure and high-performance
                      web applications with modern UI/UX and clean
                      software architecture.
                    </p>
                  </section>

                  {/* ========================= */}
                  {/* Experience */}
                  {/* ========================= */}

                  <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                      Experience
                    </h2>

                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">
                        Junior Full Stack Engineer
                      </h3>

                      <span className="text-xs text-gray-500">
                        2022 – Present
                      </span>
                    </div>

                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Develop modern React & Next.js applications.</li>
                      <li>• Build REST APIs using Node.js & Express.</li>
                      <li>• Develop Laravel & PHP backend systems.</li>
                      <li>• Design MySQL & MongoDB databases.</li>
                      <li>• Deploy applications on cloud platforms.</li>
                    </ul>
                  </section>

                  {/* ========================= */}
                  {/* Skills */}
                  {/* ========================= */}

                  <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                      Technical Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {[
                        'React',
                        'Next.js',
                        'TypeScript',
                        'JavaScript',
                        'Node.js',
                        'Express.js',
                        'PHP',
                        'Laravel',
                        'MongoDB',
                        'MySQL',
                        'Tailwind CSS',
                        'Git',
                        'REST APIs',
                        'JWT',
                        'Docker',
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* ========================= */}
                  {/* Education */}
                  {/* ========================= */}

                  <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                      Education
                    </h2>

                    <h3 className="font-semibold">
                      BS Computer Science
                    </h3>

                    <p className="text-sm text-gray-600">
                      Muhammad Ali Jinnah University
                    </p>
                  </section>

                  {/* ========================= */}
                  {/* Certifications */}
                  {/* ========================= */}

                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                      Certifications
                    </h2>

                    <p className="text-sm text-gray-700 leading-7">
                      Frontend Development • React • Next.js •
                      Backend Development • PHP • Laravel •
                      Node.js • REST APIs • MongoDB • MySQL •
                      Git • Docker • Cloud Deployment
                    </p>
                  </section>

                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
                <Printer size={14} />
                Use the <strong>Download PDF</strong> button to save
                your resume using your browser's print dialog.
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
