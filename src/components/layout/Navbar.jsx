import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Moon, Sun, Sparkles, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { personal } from '../../data/personal'

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Cloud & DevOps', to: 'cloud-devops' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' },
]

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { scrollY, scrollDirection } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const isScrolled = scrollY > 50
  const isHidden = scrollDirection === 'down' && scrollY > 200 && !mobileOpen

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.to))
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? (isDark ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)')
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
        animate={{
          y: isHidden ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Link to="home" smooth duration={500} className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full gradient-bg opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm font-heading">MS</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ borderDasharray: '30 10' }}
                  />
                </div>
                <span
                  className="font-heading font-bold text-lg hidden sm:block"
                  style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                >
                  {personal.firstName}<span className="gradient-text">.</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-80}
                  className="relative px-4 py-2 font-medium text-sm cursor-pointer rounded-lg group transition-colors"
                  style={{
                    color: activeSection === link.to
                      ? '#6366f1'
                      : isDark ? '#94a3b8' : '#64748b'
                  }}
                  onSetActive={() => setActiveSection(link.to)}
                >
                  {link.name}
                  {activeSection === link.to && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full gradient-bg"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={16} style={{ color: '#f59e0b' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={16} style={{ color: '#6366f1' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hire Me Button */}
              <Link to="contact" smooth duration={500} offset={-80}>
                <motion.button
                  className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white gradient-bg relative overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99,102,241,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/20"
                    animate={{ scale: [1, 1.3, 1.5], opacity: [0.5, 0.2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <Sparkles size={14} />
                  Hire Me
                </motion.button>
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: isDark ? 'rgba(10,10,10,0.97)' : 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={500}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="block text-3xl font-heading font-bold py-3 px-6 cursor-pointer"
                    style={{
                      color: activeSection === link.to ? '#6366f1' : (isDark ? '#f1f5f9' : '#0f172a')
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="contact" smooth duration={500} onClick={() => setMobileOpen(false)}>
                  <button className="px-8 py-3 rounded-full text-white gradient-bg font-semibold flex items-center gap-2">
                    <Sparkles size={16} /> Hire Me
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
