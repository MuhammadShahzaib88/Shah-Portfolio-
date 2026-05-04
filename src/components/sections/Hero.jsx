import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, MessageCircle, ChevronDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../ui/SocialIcons'
import { Link } from 'react-scroll'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { personal } from '../../data/personal'
import { useTheme } from '../../context/ThemeContext'

const typedWords = personal.titles

const floatingTechIcons = [
  { label: 'React', emoji: '⚛️', delay: 0, orbitRadius: 140, speed: 12 },
  { label: 'Node', emoji: '🟢', delay: 3, orbitRadius: 160, speed: 16 },
  { label: 'MongoDB', emoji: '🍃', delay: 6, orbitRadius: 120, speed: 10 },
  { label: 'CSS', emoji: '🎨', delay: 9, orbitRadius: 150, speed: 14 },
]

const socialLinks = [
  { Icon: GithubIcon, href: personal.github, label: 'GitHub', color: '#ffffff' },
  { Icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { Icon: TwitterIcon, href: personal.twitter, label: 'Twitter', color: '#1da1f2' },
  { Icon: InstagramIcon, href: personal.instagram, label: 'Instagram', color: '#e1306c' },
]

// Stagger container variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const Hero = () => {
  const { isDark } = useTheme()
  const typedRef = useRef(null)
  const typedInstance = useRef(null)
  const [particlesReady, setParticlesReady] = useState(false)

  // Typed.js initialization
  useEffect(() => {
    let Typed
    import('typed.js').then(module => {
      Typed = module.default
      if (typedRef.current) {
        typedInstance.current = new Typed(typedRef.current, {
          strings: typedWords,
          typeSpeed: 60,
          backSpeed: 40,
          backDelay: 1800,
          loop: true,
          showCursor: true,
          cursorChar: '|',
        })
      }
    })
    return () => typedInstance.current?.destroy()
  }, [])

  // Init tsparticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}
    >
      {/* Particles Background */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: true, mode: 'push' },
                resize: { enable: true },
              },
              modes: {
                grab: { distance: 150, links: { opacity: 0.3 } },
                push: { quantity: 3 },
              },
            },
            particles: {
              color: { value: '#6366f1' },
              links: { color: '#6366f1', distance: 150, enable: true, opacity: 0.12, width: 1 },
              move: { enable: true, speed: 0.8, direction: 'none', random: true, outModes: { default: 'out' } },
              number: { density: { enable: true, area: 900 }, value: 70 },
              opacity: { value: 0.3, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
              shape: { type: 'circle' },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12), transparent)' }} />

      {/* Content */}
      <div className="container-custom relative z-10 w-full py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT CONTENT ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Greeting Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: '#6366f1'
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -10, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  👋
                </motion.span>
                Hello World! I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span
                className="glitch gradient-text animate-glitch"
                data-text={personal.name}
              >
                {personal.name}
              </span>
            </motion.h1>

            {/* Typed Title */}
            <motion.div variants={itemVariants} className="mb-6 h-10 flex items-center">
              <span className="text-xl md:text-2xl font-heading font-medium" style={{ color: '#94a3b8' }}>
                I'm a{' '}
                <span ref={typedRef} style={{ color: '#06b6d4' }} />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {personal.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              <Link to="projects" smooth duration={500} offset={-80}>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold gradient-bg text-sm"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.button>
              </Link>

              <motion.a
                href={personal.resume}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                style={{
                  border: '1px solid rgba(99,102,241,0.5)',
                  color: '#6366f1',
                  background: 'rgba(99,102,241,0.05)'
                }}
                whileHover={{ scale: 1.05, borderColor: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <Link to="contact" smooth duration={500} offset={-80}>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: isDark ? '#f1f5f9' : '#0f172a',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={16} />
                  Let's Talk
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: `${color}15`,
                    borderColor: `${color}60`,
                    boxShadow: `0 0 20px ${color}40`
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} style={{ color: isDark ? '#94a3b8' : '#64748b' }} />
                </motion.a>
              ))}
              <span className="text-sm ml-2" style={{ color: '#64748b' }}>Follow me</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT CONTENT ── */}
          <motion.div
            className="flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Rotating gradient border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #ec4899, #6366f1)',
                  padding: '4px'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}
                />
              </motion.div>

              {/* Glow behind photo */}
              <div
                className="absolute inset-4 rounded-full blur-2xl opacity-40"
                style={{ background: 'radial-gradient(circle, #6366f1, #8b5cf6)' }}
              />

              {/* Photo / Avatar */}
              <div className="absolute inset-2 rounded-full overflow-hidden hexagon-clip"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl select-none">👨‍💻</span>
                </div>
              </div>

              {/* Floating Badge - Experience */}
              <motion.div
                className="absolute -bottom-4 -left-6 glass rounded-2xl px-4 py-2 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{ border: '1px solid rgba(99,102,241,0.3)' }}
              >
                <div className="text-lg font-bold gradient-text font-heading">3+</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>Years Exp.</div>
              </motion.div>

              {/* Floating Badge - Projects */}
              <motion.div
                className="absolute -top-4 -right-6 glass rounded-2xl px-4 py-2 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                style={{ border: '1px solid rgba(139,92,246,0.3)' }}
              >
                <div className="text-lg font-bold font-heading" style={{ color: '#8b5cf6' }}>50+</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>Projects</div>
              </motion.div>

              {/* Floating Tech Icons */}
              {floatingTechIcons.map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 glass rounded-xl flex items-center justify-center text-lg"
                  style={{ top: '50%', left: '50%', border: '1px solid rgba(255,255,255,0.1)' }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: icon.speed,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: icon.delay * 0.5
                  }}
                >
                  <motion.span
                    style={{
                      position: 'absolute',
                      transform: `rotate(${i * 90}deg) translateX(${icon.orbitRadius}px) rotate(${-(i * 90)}deg)`
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: icon.speed, repeat: Infinity, ease: 'linear', delay: icon.delay * 0.5 }}
                  >
                    <div className="w-9 h-9 glass rounded-xl flex items-center justify-center text-base"
                      style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                      {icon.emoji}
                    </div>
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#64748b' }}>
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(99,102,241,0.4)' }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#6366f1' }}
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <ChevronDown size={16} style={{ color: '#6366f1' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
