import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { experience, education } from '../../data/experience'
import { useTheme } from '../../context/ThemeContext'

const TimelineItem = ({ item, index, side }) => {
  const { isDark } = useTheme()
  const isLeft = side === 'left'

  return (
    <motion.div
      className={`relative flex items-start gap-4 md:gap-8 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
      initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline Dot */}
      <div className="relative flex-shrink-0 hidden md:block">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 relative"
            style={{
              background: `${item.color}20`,
              border: `2px solid ${item.color}60`,
              boxShadow: `0 0 20px ${item.color}30`
            }}
            whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${item.color}50` }}
          >
            {item.logo}
            {item.current && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success border-2"
                style={{ borderColor: isDark ? '#0a0a0a' : '#ffffff', background: '#10b981' }}>
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75"
                  style={{ background: '#10b981' }} />
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Spacer for center line */}
      <div className="hidden md:block flex-shrink-0 w-px" />

      {/* Card */}
      <motion.div
        className={`flex-1 rounded-2xl p-5 md:p-6 ${isLeft ? 'md:text-right' : ''}`}
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        }}
        whileHover={{ y: -4, borderColor: `${item.color}40`, boxShadow: `0 10px 40px ${item.color}15` }}
      >
        {/* Mobile dot */}
        <div className="flex items-center gap-3 mb-3 md:hidden">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${item.color}20`, border: `2px solid ${item.color}40` }}>
            {item.logo}
          </div>
          {item.current && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#10b98120', color: '#10b981' }}>
              ● Current
            </span>
          )}
        </div>

        {/* Period Badge */}
        <div className={`flex items-center gap-1.5 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
          <Calendar size={12} style={{ color: item.color }} />
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${item.color}15`, color: item.color }}>
            {item.period}
          </span>
          {item.current && (
            <span className="hidden md:block text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: '#10b98120', color: '#10b981' }}>
              ● Current
            </span>
          )}
        </div>

        {/* Role / Degree */}
        <h3 className="font-heading font-bold text-lg mb-1" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
          {item.role || item.degree}
        </h3>

        {/* Company / Institution */}
        <p className="text-sm font-medium mb-1" style={{ color: item.color }}>
          {item.company || item.institution}
        </p>

        {/* Location */}
        <div className={`flex items-center gap-1 text-xs mb-4 ${isLeft ? 'md:justify-end' : ''}`}
          style={{ color: '#64748b' }}>
          <MapPin size={11} />
          {item.location}
        </div>

        {/* Description */}
        <ul className={`space-y-1.5 mb-4 ${isLeft ? 'md:items-end md:text-right' : ''}`}>
          {item.description.map((desc, i) => (
            <li key={i} className={`text-sm flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}
              style={{ color: '#94a3b8' }}>
              <span className="text-xs mt-1 flex-shrink-0" style={{ color: item.color }}>▸</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : ''}`}>
          {item.tech.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs"
              style={{ background: `${item.color}15`, color: item.color }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('experience')

  const items = activeTab === 'experience' ? experience : education

  return (
    <section id="experience" className="section-padding relative"
      style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Journey"
          title={`Experience & <span class="gradient-text">Education</span>`}
          subtitle="My professional journey and academic background that shaped who I am today."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-full"
            style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            {[
              { key: 'experience', label: 'Experience', Icon: Briefcase },
              { key: 'education', label: 'Education', Icon: GraduationCap },
            ].map(({ key, label, Icon }) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={activeTab === key
                  ? { color: 'white' }
                  : { color: isDark ? '#94a3b8' : '#64748b' }
                }
                whileTap={{ scale: 0.96 }}
              >
                {activeTab === key && (
                  <motion.div
                    className="absolute inset-0 rounded-full gradient-bg"
                    layoutId="tabBg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={15} />
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Center vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line" />

            {/* Items */}
            <div className="space-y-8 md:space-y-12">
              {items.map((item, index) => (
                <div key={item.id} className="relative md:grid md:grid-cols-2 md:gap-8">
                  {index % 2 === 0 ? (
                    <>
                      <TimelineItem item={item} index={index} side="right" />
                      {/* Center Dot */}
                      <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20">
                        <div className="w-4 h-4 rounded-full border-2"
                          style={{ background: item.color, borderColor: isDark ? '#0a0a0a' : '#ffffff', boxShadow: `0 0 15px ${item.color}60` }} />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      {/* Center Dot */}
                      <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20">
                        <div className="w-4 h-4 rounded-full border-2"
                          style={{ background: item.color, borderColor: isDark ? '#0a0a0a' : '#ffffff', boxShadow: `0 0 15px ${item.color}60` }} />
                      </div>
                      <TimelineItem item={item} index={index} side="left" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Experience
