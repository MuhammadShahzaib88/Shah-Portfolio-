import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Link } from 'react-scroll'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Link to="home" smooth duration={800}>
            <motion.button
              className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg"
              whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp size={20} />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
