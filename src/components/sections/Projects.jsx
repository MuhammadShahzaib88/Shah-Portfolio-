import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Star, GitFork, Eye, ChevronRight } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import SectionHeading from '../ui/SectionHeading'
import { projects, categories } from '../../data/projects'
import { useTheme } from '../../context/ThemeContext'

const categoryColors = {
  'Full Stack': { bg: 'rgba(99,102,241,0.15)', color: '#6366f1' },
  'Frontend': { bg: 'rgba(6,182,212,0.15)', color: '#06b6d4' },
  'React': { bg: 'rgba(97,218,251,0.15)', color: '#61dafb' },
  'Node.js': { bg: 'rgba(51,153,51,0.15)', color: '#339933' },
}

// Project Detail Modal
const ProjectModal = ({ project, onClose }) => {
  const { isDark } = useTheme()
  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} />
      
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: isDark ? '#111111' : '#ffffff',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <X size={18} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: categoryColors[project.category]?.bg, color: categoryColors[project.category]?.color }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
            {project.longDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3 gradient-text">Key Features</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#94a3b8' }}>
                  <ChevronRight size={14} style={{ color: '#6366f1', marginTop: 2, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <h4 className="font-semibold text-sm mb-2" style={{ color: '#6366f1' }}>Technical Challenge</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{project.challenges}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-bg"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GithubIcon size={15} /> GitHub
            </motion.a>
            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ border: '1px solid rgba(99,102,241,0.4)', color: '#6366f1' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.3)' }} whileTap={{ scale: 0.95 }}>
              <ExternalLink size={15} /> Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Project Card
const ProjectCard = ({ project, onSelect }) => {
  const { isDark } = useTheme()
  const catColor = categoryColors[project.category] || { bg: 'rgba(99,102,241,0.15)', color: '#6366f1' }

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      }}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.3)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(99,102,241,0.8)' }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <GithubIcon size={16} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(6,182,212,0.8)' }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </motion.a>
          <motion.button
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(project)}
          >
            <Eye size={16} />
          </motion.button>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: catColor.bg, color: catColor.color }}>
            {project.category}
          </span>
        </div>

        <h3 className="font-heading font-bold text-lg mb-2" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#94a3b8' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#64748b' }}>
            <span className="flex items-center gap-1"><Star size={12} />{project.stars}</span>
            <span className="flex items-center gap-1"><GitFork size={12} />{project.forks}</span>
          </div>
          <motion.button
            className="text-xs font-medium flex items-center gap-1"
            style={{ color: '#6366f1' }}
            onClick={() => onSelect(project)}
            whileHover={{ x: 3 }}
          >
            View Details <ChevronRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p =>
        p.category === activeCategory ||
        p.tech.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
      )

  const featured = projects.find(p => p.featured)
  const catColor = categoryColors[featured?.category] || { bg: 'rgba(99,102,241,0.15)', color: '#6366f1' }

  return (
    <>
      <section id="projects" className="section-padding relative overflow-hidden"
        style={{ background: isDark ? '#111111' : '#f8fafc' }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5 bottom-20 right-20"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        </div>

        <div className="container-custom relative z-10">
          <SectionHeading
            label="Projects"
            title={`My <span class="gradient-text">Recent Work</span>`}
            subtitle="Carefully crafted projects demonstrating my passion for clean code and beautiful design."
          />

          {/* ── Featured Project ── */}
          {featured && (
            <motion.div
              className="mb-14 rounded-2xl overflow-hidden grid md:grid-cols-2"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: '0 25px 60px rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.3)' }}
            >
              <div className="relative overflow-hidden h-64 md:h-auto">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))' }} />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', width: 'fit-content' }}>
                  ⭐ Featured Project
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
                  {featured.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>{featured.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tech.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <motion.a href={featured.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-bg"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GithubIcon size={15} /> GitHub
                  </motion.a>
                  <motion.a href={featured.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                    style={{ border: '1px solid rgba(99,102,241,0.4)', color: '#6366f1' }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ExternalLink size={15} /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Filter Tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={activeCategory === cat
                  ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }
                  : {
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#94a3b8' : '#64748b',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                  }
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* ── Project Grid ── */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
