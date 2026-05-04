import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'
import { useTheme } from '../../context/ThemeContext'

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
      >
        <Star
          size={14}
          className={i < rating ? 'fill-current' : ''}
          style={{ color: i < rating ? '#f59e0b' : '#374151' }}
        />
      </motion.div>
    ))}
  </div>
)

const TestimonialCard = ({ testimonial }) => {
  const { isDark } = useTheme()
  return (
    <div
      className="rounded-2xl p-6 md:p-8 h-full flex flex-col"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        backdropFilter: 'blur(20px)',
        height: 'auto',
        minHeight: '320px',
      }}
    >
      {/* Quote Icon */}
      <div className="mb-5">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Quote size={20} style={{ color: '#6366f1' }} />
        </div>
      </div>

      {/* Stars */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Text */}
      <p className="text-sm md:text-base leading-relaxed flex-1 mb-6 italic"
        style={{ color: '#94a3b8' }}>
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: '2px solid rgba(99,102,241,0.4)' }}
            onError={e => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=6366f1&color=fff&size=48`
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
            {testimonial.name}
          </h4>
          <p className="text-xs" style={{ color: '#6366f1' }}>
            {testimonial.role} — {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const { isDark } = useTheme()

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden"
      style={{ background: isDark ? '#111111' : '#f8fafc' }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5 top-0 left-1/4"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Testimonials"
          title={`What Clients <span class="gradient-text">Say</span>`}
          subtitle="Don't just take my word for it — here's what my clients and colleagues have to say."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            slidesPerView={1}
            centeredSlides
            spaceBetween={24}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map(t => (
              <SwiperSlide key={t.id}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
