import { motion } from 'framer-motion';
import { GitPullRequest, Star, GitFork, Code2, ExternalLink } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const repos = [
  {
    name: 'ecommerce-platform',
    description: 'Full-featured e-commerce platform with React, Node.js and MongoDB',
    language: 'JavaScript',
    langColor: '#F7DF1E',
    stars: 12,
    forks: 4,
    url: 'https://github.com/ahmedraza',
  },
  {
    name: 'task-management-dashboard',
    description: 'Real-time collaborative task management with Next.js and Firebase',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 8,
    forks: 3,
    url: 'https://github.com/ahmedraza',
  },
  {
    name: 'social-media-api',
    description: 'Scalable RESTful API for social media with Laravel and MySQL',
    language: 'PHP',
    langColor: '#4F5D95',
    stars: 15,
    forks: 6,
    url: 'https://github.com/ahmedraza',
  },
  {
    name: 'portfolio-generator',
    description: 'Dynamic portfolio builder with React and one-click Vercel deployment',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 6,
    forks: 2,
    url: 'https://github.com/ahmedraza',
  },
  {
    name: 'chat-application',
    description: 'Real-time messaging app with WebSocket and message queuing',
    language: 'JavaScript',
    langColor: '#F7DF1E',
    stars: 5,
    forks: 1,
    url: 'https://github.com/ahmedraza',
  },
  {
    name: 'blog-cms',
    description: 'Markdown-first CMS with Next.js ISR and plugin architecture',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 2,
    forks: 1,
    url: 'https://github.com/ahmedraza',
  },
];

export default function OpenSource() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Open Source" title="GitHub" titleAccent="Repositories" description="Featured open-source projects and contributions." />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl bg-[#0E0E0E] border border-white/[0.06] hover:border-white/[0.12] p-5 transition-all duration-300 block"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GitPullRequest size={14} className="text-white/25" />
                  <h4 className="text-sm font-semibold text-[#3B82F6] group-hover:text-[#60A5FA] transition-colors">{repo.name}</h4>
                </div>
                <ExternalLink size={12} className="text-white/15 group-hover:text-white/30 transition-colors" />
              </div>

              <p className="text-xs text-white/35 leading-relaxed mb-4 font-light">{repo.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  <span className="text-[11px] text-white/40">{repo.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-white/25" />
                  <span className="text-[11px] text-white/40">{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={12} className="text-white/25" />
                  <span className="text-[11px] text-white/40">{repo.forks}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/ahmedraza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
          >
            <Code2 size={16} /> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
}