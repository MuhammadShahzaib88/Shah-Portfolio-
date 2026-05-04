import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { personal } from '../../data/personal'
import { useTheme } from '../../context/ThemeContext'

const statCards = [
  {
    title: 'GitHub Stats',
    img: (username) => `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=6366f1&icon_color=06b6d4&text_color=94a3b8`,
    alt: 'GitHub Stats'
  },
  {
    title: 'Top Languages',
    img: (username) => `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=6366f1&text_color=94a3b8`,
    alt: 'Top Languages'
  },
  {
    title: 'GitHub Streak',
    img: (username) => `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=0d1117&stroke=6366f1&ring=6366f1&fire=06b6d4&currStreakLabel=94a3b8`,
    alt: 'GitHub Streak'
  },
]

const GitHubStats = () => {
  const { isDark } = useTheme()
  const username = personal.githubUsername

  return (
    <section id="github" className="section-padding relative"
      style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-5 bottom-10 left-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="GitHub"
          title={`My GitHub <span class="gradient-text">Activity</span>`}
          subtitle="A snapshot of my open-source contributions and coding activity."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {statCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="rounded-2xl overflow-hidden"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                backdropFilter: 'blur(20px)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.3)' }}
            >
              {/* Card Header */}
              <div className="px-5 py-3 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
                <span className="ml-2 text-xs font-mono" style={{ color: '#64748b' }}>{card.title}</span>
              </div>

              {/* Stats Image */}
              <div className="p-4">
                <img
                  src={card.img(username)}
                  alt={card.alt}
                  className="w-full rounded-lg"
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden items-center justify-center h-32 text-sm" style={{ color: '#64748b' }}>
                  {card.title} — {username}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph */}
        <motion.div
          className="mt-8 rounded-2xl overflow-hidden"
          style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ boxShadow: '0 20px 60px rgba(99,102,241,0.15)' }}
        >
          <div className="px-5 py-3 flex items-center gap-2"
            style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
            <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
            <span className="ml-2 text-xs font-mono" style={{ color: '#64748b' }}>Contribution Graph</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&hide_border=true&bg_color=0d1117&color=6366f1&line=06b6d4&point=8b5cf6`}
              alt="Contribution Graph"
              className="w-full min-w-96 rounded-lg"
              loading="lazy"
              onError={e => {
                e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-32 text-sm" style="color:#64748b">Contribution graph — ${username}</div>`
              }}
            />
          </div>
        </motion.div>

        {/* CTA to GitHub */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white gradient-bg text-sm"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99,102,241,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Full GitHub Profile →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubStats
