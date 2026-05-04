import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { skills } from '../../data/skills'
import { useTheme } from '../../context/ThemeContext'

// Animated skill bar
const SkillBar = ({ skill }) => {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)
  const observed = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true
          setTimeout(() => setWidth(skill.level), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [skill.level])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium font-heading">{skill.name}</span>
        <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{ width: `${width}%`, transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>
    </div>
  )
}

// Tech icon card
const TechCard = ({ tech }) => {
  const { isDark } = useTheme()
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col items-center gap-2 px-4 py-4 rounded-xl mx-2 w-24"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        backdropFilter: 'blur(10px)'
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
        boxShadow: `0 0 20px ${tech.color}40`,
        borderColor: `${tech.color}60`
      }}
    >
      <img
        src={tech.logo}
        alt={tech.name}
        className="w-8 h-8 object-contain"
        onError={e => { e.target.style.display = 'none' }}
      />
      <span className="text-xs font-medium text-center" style={{ color: '#94a3b8' }}>{tech.name}</span>
    </motion.div>
  )
}

const Skills = () => {
  const { isDark } = useTheme()

  const cardBg = isDark
    ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }
    : { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }

  // Duplicate rows for infinite scroll effect
  const row1 = [...skills.techStack.row1, ...skills.techStack.row1]
  const row2 = [...skills.techStack.row2, ...skills.techStack.row2]

  return (
    <section id="skills" className="section-padding relative overflow-hidden"
      style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}>

      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5 top-20 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Skills"
          title={`Technologies I <span class="gradient-text">Work With</span>`}
          subtitle="A curated selection of technologies, tools, and frameworks in my arsenal."
        />

        {/* ── PART A: Infinite Marquee ── */}
        <div className="mb-20 space-y-4 overflow-hidden">
          {/* Row 1 — left to right */}
          <div className="relative flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="marquee-track">
              {row1.map((tech, i) => <TechCard key={i} tech={tech} />)}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div className="relative flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="marquee-track-reverse">
              {row2.map((tech, i) => <TechCard key={i} tech={tech} />)}
            </div>
          </div>
        </div>

        {/* ── PART B: Skill Bars ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Frontend */}
          <motion.div
            className="rounded-2xl p-6 md:p-8"
            style={cardBg}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading font-bold text-lg mb-6 gradient-text">Frontend Skills</h3>
            {skills.frontend.map(skill => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </motion.div>

          {/* Backend */}
          <motion.div
            className="rounded-2xl p-6 md:p-8"
            style={cardBg}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading font-bold text-lg mb-6" style={{ color: '#06b6d4' }}>Backend Skills</h3>
            {skills.backend.map(skill => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* ── PART C: Tools ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading font-bold text-2xl text-center mb-8 gradient-text-2">
            Tools I Use Daily
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  color: isDark ? '#94a3b8' : '#64748b'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  y: -4,
                  background: 'rgba(99,102,241,0.1)',
                  borderColor: 'rgba(99,102,241,0.3)',
                  color: '#6366f1',
                  boxShadow: '0 0 15px rgba(99,102,241,0.2)'
                }}
              >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
