import { motion } from 'framer-motion'

const SectionHeading = ({ label, title, subtitle, center = true }) => {
  return (
    <motion.div
      className={`mb-16 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {label && (
        <motion.div
          className="flex items-center gap-3 mb-4"
          style={{ justifyContent: center ? 'center' : 'flex-start' }}
          initial={{ opacity: 0, x: center ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-px w-8 gradient-bg rounded-full" />
          <span className="section-label">{label}</span>
          <div className="h-px w-8 gradient-bg rounded-full" />
        </motion.div>
      )}

      <motion.h2
        className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle && (
        <motion.p
          className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: '#94a3b8', margin: center ? '1rem auto 0' : '1rem 0 0' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
