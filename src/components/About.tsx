import { motion } from 'framer-motion';
import { Code2, Server, Database, Layers } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const stats = [
  { icon: Code2, label: 'Years Experience', value: '3+' },
  { icon: Layers, label: 'Projects Built', value: '15+' },
  { icon: Server, label: 'Technologies', value: '25+' },
  { icon: Database, label: 'Certifications', value: '13' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          label="About Me"
          title="Crafting Digital"
          titleAccent="Experiences"
          description="Passionate about building modern, scalable and high-performance web applications."
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="space-y-5 text-white/65 leading-relaxed text-base md:text-lg font-light">
              <p>
                I am a <span className="text-white font-medium">Junior Full Stack Engineer</span> passionate about building modern, scalable and high-performance web applications. Since 2022 I have been developing projects using <span className="text-[#8B5CF6] font-medium">React</span>, <span className="text-[#3B82F6] font-medium">Next.js</span>, <span className="text-[#8B5CF6] font-medium">PHP</span>, <span className="text-[#3B82F6] font-medium">Laravel</span>, <span className="text-[#8B5CF6] font-medium">Node.js</span>, <span className="text-[#3B82F6] font-medium">Express.js</span>, <span className="text-[#8B5CF6] font-medium">MySQL</span> and <span className="text-[#3B82F6] font-medium">MongoDB</span>.
              </p>
              <p>
                My goal is to create beautiful user experiences backed by clean architecture, secure backend systems and optimized performance. Every line of code I write is purposeful, every interface I design is intuitive, and every system I build is scalable.
              </p>
              <p>
                I believe in continuous learning and staying at the forefront of web technology. From crafting pixel-perfect frontends to architecting robust backend systems, I bring a holistic approach to every project.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-5 md:p-6 text-center group transition-all duration-300 hover:border-[#8B5CF6]/20"
              >
                <stat.icon className="mx-auto mb-3 text-[#8B5CF6] group-hover:text-[#3B82F6] transition-colors duration-300" size={24} />
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs text-white/40 font-medium tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}