import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-scroll'

const FloatingHireBtn = () => {
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to="contact" smooth duration={500} offset={-80}>
        <motion.button
          className="relative w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0.4)', '0 0 0 15px rgba(99,102,241,0)', '0 0 0 0 rgba(99,102,241,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          title="Hire Me"
        >
          <MessageCircle size={22} />
        </motion.button>
      </Link>
      <motion.div
        className="absolute -top-8 right-0 bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap font-medium"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 7 }}
        style={{ background: '#6366f1' }}
      >
        Hire Me! 🚀
      </motion.div>
    </motion.div>
  )
}

export default FloatingHireBtn
