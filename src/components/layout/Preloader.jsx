import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading')

  useEffect(() => {
    const dots = ['Loading', 'Loading.', 'Loading..', 'Loading...']
    let dotIndex = 0
    const dotInterval = setInterval(() => {
      dotIndex = (dotIndex + 1) % dots.length
      setLoadingText(dots[dotIndex])
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(dotInterval)
          setTimeout(onComplete, 400)
          return 100
        }
        const increment = prev < 70 ? Math.random() * 8 + 2 : Math.random() * 3 + 1
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl -top-20 -left-20"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl -bottom-10 -right-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
      >
        <div className="relative w-28 h-28">
          {/* Spinning gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
              padding: '3px'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full" style={{ background: '#0a0a0a' }} />
          </motion.div>
          
          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="gradient-text font-display text-3xl font-bold tracking-wider">MS</span>
          </div>
        </div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="text-text-muted font-code text-sm tracking-widest mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ color: '#94a3b8' }}
      >
        {loadingText}
      </motion.p>

      {/* Progress Bar Container */}
      <motion.div
        className="w-64 h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full rounded-full preloader-progress"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </motion.div>

      {/* Percentage */}
      <motion.span
        className="mt-3 text-xs font-code"
        style={{ color: '#6366f1' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.span>
    </motion.div>
  )
}

export default Preloader
