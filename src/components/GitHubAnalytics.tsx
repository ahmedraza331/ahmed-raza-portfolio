import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const contributions: number[] = Array.from({ length: 365 }, () => Math.floor(Math.random() * 5));
const weeks = 52;
const contributionWeeks: number[][] = [];
for (let w = 0; w < weeks; w++) {
  contributionWeeks.push(contributions.slice(w * 7, w * 7 + 7));
}

const langData = [
  { name: 'JavaScript', pct: 35, color: '#F7DF1E' },
  { name: 'TypeScript', pct: 25, color: '#3178C6' },
  { name: 'PHP', pct: 20, color: '#4F5D95' },
  { name: 'CSS', pct: 10, color: '#563D7C' },
  { name: 'Other', pct: 10, color: '#8B5CF6' },
];

const stats = [
  { label: 'Total Commits', value: '847' },
  { label: 'Pull Requests', value: '62' },
  { label: 'Issues Closed', value: '34' },
  { label: 'Current Streak', value: '14 days' },
];

function Cell({ level }: { level: number }) {
  const colors = ['bg-white/[0.03]', 'bg-[#0E4429]', 'bg-[#006D32]', 'bg-[#26A641]', 'bg-[#39D353]'];
  return <div className={`w-2.5 h-2.5 rounded-[3px] ${colors[level]}`} />;
}

export default function GitHubAnalytics() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading label="Analytics" title="GitHub" titleAccent="Activity" description="Development activity, contributions and coding statistics." />

        <div className="mt-14 space-y-6">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-[#0E0E0E] border border-white/[0.06] p-5 md:p-6 overflow-x-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white/60">Contribution Activity</h4>
              <span className="text-xs text-white/25">847 contributions in the last year</span>
            </div>
            <div className="flex gap-[3px] min-w-[700px]">
              {contributionWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <Cell key={di} level={level} />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl bg-[#0E0E0E] border border-white/[0.06] p-5 md:p-6"
            >
              <h4 className="text-sm font-semibold text-white/60 mb-5">Top Languages</h4>
              <div className="space-y-4">
                {langData.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-xs text-white/50">{lang.name}</span>
                      </div>
                      <span className="text-xs text-white/30">{lang.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl bg-[#0E0E0E] border border-white/[0.06] p-5 md:p-6"
            >
              <h4 className="text-sm font-semibold text-white/60 mb-5">Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-white/[0.02]">
                    <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-[10px] text-white/30 mt-1 tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}