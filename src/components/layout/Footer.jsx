import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Heart, Code2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../ui/SocialIcons'
import { personal } from '../../data/personal'
import { useTheme } from '../../context/ThemeContext'

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

const socialLinks = [
  { icon: GithubIcon, href: personal.github, label: 'GitHub', color: '#ffffff' },
  { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { icon: TwitterIcon, href: personal.twitter, label: 'Twitter', color: '#1da1f2' },
  { icon: InstagramIcon, href: personal.instagram, label: 'Instagram', color: '#e1306c' },
]

const Footer = () => {
  const { isDark } = useTheme()

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background: isDark
          ? 'linear-gradient(to top, #000000, #0a0a0a)'
          : 'linear-gradient(to top, #f1f5f9, #ffffff)',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-bg opacity-30" />

      <div className="container-custom">
        <div className="flex flex-col items-center gap-8">

          {/* Logo & Name */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full gradient-bg opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">MS</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <h3 className="font-heading font-bold text-xl gradient-text">
              {personal.name}
            </h3>
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              {personal.title}
            </p>
          </motion.div>

          {/* Nav Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link.toLowerCase()}
                smooth
                duration={500}
                offset={-80}
                className="text-sm font-medium cursor-pointer transition-colors hover:text-primary"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                {link}
              </Link>
            ))}
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: `${color}20`,
                  borderColor: `${color}60`,
                  boxShadow: `0 0 20px ${color}40`
                }}
                whileTap={{ scale: 0.9 }}
                title={label}
              >
                <Icon size={16} style={{ color: isDark ? '#94a3b8' : '#64748b' }} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Copyright */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-2 text-sm"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="flex items-center gap-1.5">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart size={14} className="text-danger fill-current" style={{ color: '#ef4444' }} />
              </motion.span>
              and
              <Code2 size={14} style={{ color: '#6366f1' }} />
              React.js
            </span>
            <span className="hidden sm:block">•</span>
            <span>© 2026 {personal.name}. All rights reserved.</span>
          </motion.div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
