import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import emailjs from '@emailjs/browser'
import {
  Mail, MapPin, Phone,
  Send, User, Tag, MessageSquare, DollarSign, Loader2, CheckCircle
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../ui/SocialIcons'
import SectionHeading from '../ui/SectionHeading'
import { personal } from '../../data/personal'
import { useTheme } from '../../context/ThemeContext'

const socialLinks = [
  { Icon: GithubIcon, href: personal.github, label: 'GitHub', color: '#ffffff' },
  { Icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { Icon: TwitterIcon, href: personal.twitter, label: 'Twitter', color: '#1da1f2' },
  { Icon: InstagramIcon, href: personal.instagram, label: 'Instagram', color: '#e1306c' },
]

const contactInfo = [
  { Icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { Icon: MapPin, label: 'Location', value: personal.location, href: null },
  { Icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
]

const budgetOptions = [
  'Under PKR 10,000',
  'PKR 10,000 – 50,000',
  'PKR 50,000 – 100,000',
  'PKR 100,000+',
  'Let\'s Discuss',
]

const Contact = () => {
  const { isDark } = useTheme()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const fireConfetti = () => {
    const count = 200
    const defaults = { origin: { y: 0.7 } }
    function fire(particleRatio, opts) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) })
    }
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#6366f1', '#8b5cf6', '#06b6d4'] })
    fire(0.2, { spread: 60, colors: ['#6366f1', '#06b6d4'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#8b5cf6', '#ec4899'] })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#6366f1', '#06b6d4'] })
  }

  const onSubmit = async (data) => {
    setSending(true)
    try {
      // Replace with your actual EmailJS service/template/public key
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          budget: data.budget,
          message: data.message,
          to_name: personal.firstName,
        },
        'YOUR_PUBLIC_KEY'
      )
      setSent(true)
      fireConfetti()
      toast.success('Message sent successfully! I\'ll get back to you soon 🚀', {
        duration: 5000,
        style: {
          background: '#1a1a1a',
          color: '#f1f5f9',
          border: '1px solid rgba(99,102,241,0.3)',
        },
      })
      reset()
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      toast.error('Failed to send message. Please try again or email me directly.', {
        style: {
          background: '#1a1a1a',
          color: '#f1f5f9',
          border: '1px solid rgba(239,68,68,0.3)',
        },
      })
    } finally {
      setSending(false)
    }
  }

  const cardStyle = {
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  }

  const inputStyle = {
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    color: isDark ? '#f1f5f9' : '#0f172a',
  }

  return (
    <section id="contact" className="section-padding relative"
      style={{ background: isDark ? '#111111' : '#f8fafc' }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5 top-20 right-20"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-5 bottom-20 left-20"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Contact"
          title={`Let's Work <span class="gradient-text">Together!</span>`}
          subtitle="Have a project in mind? Let's build something amazing together. I'm always open to new opportunities."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability */}
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="relative">
                <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: '#10b981', opacity: 0.4 }} />
              </div>
              <span className="text-sm font-medium" style={{ color: '#10b981' }}>
                Currently Available for Projects
              </span>
            </div>

            {/* Contact Cards */}
            {contactInfo.map(({ Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href || undefined}
                target={href ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                style={cardStyle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3, borderColor: 'rgba(99,102,241,0.3)', boxShadow: '0 10px 30px rgba(99,102,241,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <Icon size={20} style={{ color: '#6366f1' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: '#64748b' }}>{label}</div>
                  <div className="text-sm font-medium" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                Connect on socials
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: `${color}15`,
                      borderColor: `${color}60`,
                      boxShadow: `0 0 20px ${color}40`
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} style={{ color: isDark ? '#94a3b8' : '#64748b' }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Form ── */}
          <motion.div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center h-full py-16 gap-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.4)' }}>
                    <CheckCircle size={40} style={{ color: '#10b981' }} />
                  </div>
                  <h3 className="font-heading font-bold text-xl gradient-text">Message Sent!</h3>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>
                    Thank you! I'll get back to you within 24 hours. 🚀
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-heading font-bold text-xl mb-1" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
                    Send a Message
                  </h3>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1.5" style={{ color: '#94a3b8' }}>Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Shahzaib"
                          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{
                            ...inputStyle,
                            outline: errors.name ? '1px solid #ef4444' : 'none',
                          }}
                          onFocus={e => e.target.style.borderColor = '#6366f1'}
                          onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                        />
                      </div>
                      {errors.name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1.5" style={{ color: '#94a3b8' }}>Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                          })}
                          type="email"
                          placeholder="shahzaibbangash24@gmail.com"
                          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#6366f1'}
                          onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                        />
                      </div>
                      {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: '#94a3b8' }}>Subject</label>
                    <div className="relative">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="Project Discussion / Collaboration"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                      />
                    </div>
                    {errors.subject && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.subject.message}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: '#94a3b8' }}>Budget Range</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
                      <select
                        {...register('budget')}
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                      >
                        <option value="">Select budget range</option>
                        {budgetOptions.map(opt => (
                          <option key={opt} value={opt}
                            style={{ background: isDark ? '#1a1a1a' : '#ffffff' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: '#94a3b8' }}>Message</label>
                    <div className="relative">
                      <MessageSquare size={14} className="absolute left-3 top-3.5" style={{ color: '#64748b' }} />
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Min 20 characters' } })}
                        rows={5}
                        placeholder="Tell me about your project, goals, and timeline..."
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                      />
                    </div>
                    {errors.message && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.message.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-white gradient-bg relative overflow-hidden"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{ opacity: sending ? 0.8 : 1 }}
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs" style={{ color: '#64748b' }}>
                    Or{' '}
                    <a href={`mailto:${personal.email}`} className="text-primary hover:underline" style={{ color: '#6366f1' }}>
                      email me directly
                    </a>{' '}
                    — I usually respond within 24 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
