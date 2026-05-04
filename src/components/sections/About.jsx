import { motion } from 'framer-motion'
import { Download, Briefcase, MapPin, Mail, GraduationCap, User, Calendar, CheckCircle } from 'lucide-react'
import { Link } from 'react-scroll'
import SectionHeading from '../ui/SectionHeading'
import { personal } from '../../data/personal'
import { useCountUp } from '../../hooks/useCountUp'
import { useTheme } from '../../context/ThemeContext'

const stats = [
  { label: 'Projects Completed', value: 10, suffix: '+' },
  { label: 'Happy Clients', value: 2, suffix: '' },
  { label: 'Months Experience', value: 6, suffix: '+' },
  { label: 'GitHub Stars', value: 3, suffix: '' },
]

const infoItems = [
  { icon: User, label: 'Name', value: personal.name },
  { icon: Calendar, label: 'Age', value: '22 Years' },
  { icon: MapPin, label: 'Location', value: personal.location },
  { icon: Mail, label: 'Email', value: personal.email },
  { icon: GraduationCap, label: 'Degree', value: personal.degree },
  { icon: CheckCircle, label: 'Availability', value: 'Open to Work ✅' },
]

const StatCounter = ({ stat }) => {
  const { count, ref } = useCountUp(stat.value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-black font-heading gradient-text counter-number">
        {count}{stat.suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{stat.label}</div>
    </div>
  )
}

const About = () => {
  const { isDark } = useTheme()

  const cardStyle = {
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  }

  return (
    <section id="about" className="section-padding relative" style={{ background: isDark ? '#111111' : '#f8fafc' }}>
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5 -top-20 -right-20"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="About Me"
          title={`Passionate Developer<br/><span class="gradient-text">Creating Digital Experiences</span>`}
          subtitle="Building impactful, scalable, and beautiful web solutions since 2021."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT — Photo & Stats ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Photo wrapper */}
            <div className="relative mx-auto lg:mx-0 w-fit">
              {/* Animated gradient border */}
              <div className="gradient-border p-1 rounded-2xl">
                <div
                  className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-900/50"
                >
                  <img 
                    src="/profile.jpg" 
                    alt="About Me" 
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-5 -right-5 glass rounded-2xl px-5 py-3 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ border: '1px solid rgba(245,158,11,0.3)' }}
              >
                <div className="text-2xl font-black font-heading" style={{ color: '#f59e0b' }}>6+</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>Months Experience</div>
              </motion.div>

              {/* Projects badge */}
              <motion.div
                className="absolute -top-5 -left-5 glass rounded-2xl px-5 py-3 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                style={{ border: '1px solid rgba(139,92,246,0.3)' }}
              >
                <div className="text-2xl font-black font-heading" style={{ color: '#8b5cf6' }}>10+</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>Projects Done</div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4"
                  style={cardStyle}
                  whileHover={{ y: -4, boxShadow: '0 0 20px rgba(99,102,241,0.15)' }}
                  transition={{ delay: i * 0.1 }}
                >
                  <StatCounter stat={stat} />
                </motion.div>
              ))}
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {personal.funFacts.map((fact, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    color: isDark ? '#94a3b8' : '#64748b'
                  }}
                >
                  {fact.emoji} {fact.text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Info & Bio ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                {personal.bio}
              </p>
              <p className="text-base leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                {personal.bio2}
              </p>
            </div>

            {/* Personal Info Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {infoItems.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={cardStyle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ borderColor: 'rgba(99,102,241,0.3)' }}
                >
                  <div className="mt-0.5 p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(99,102,241,0.1)' }}>
                    <Icon size={14} style={{ color: '#6366f1' }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs mb-0.5" style={{ color: '#64748b' }}>{label}</div>
                    <div className="text-sm font-medium truncate" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
                      {value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href={personal.resume}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm gradient-bg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Download Resume
              </motion.a>

              <Link to="contact" smooth duration={500} offset={-80}>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{
                    border: '1px solid rgba(99,102,241,0.5)',
                    color: '#6366f1',
                    background: 'rgba(99,102,241,0.05)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase size={16} />
                  Hire Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
