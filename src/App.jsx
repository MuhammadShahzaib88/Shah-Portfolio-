import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

// Layout
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import ScrollProgress from './components/layout/ScrollProgress'
import BackToTop from './components/layout/BackToTop'
import FloatingHireBtn from './components/layout/FloatingHireBtn'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Testimonials from './components/sections/Testimonials'
import GitHubStats from './components/sections/GitHubStats'
import Contact from './components/sections/Contact'

function AppContent() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <>
          {/* Ambient Background Orbs */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <div className="ambient-orb orb-3" />
          </div>

          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Testimonials />
              <GitHubStats />
              <Contact />
            </main>
            <Footer />
          </div>

          <BackToTop />
          <FloatingHireBtn />
        </>
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#f1f5f9',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '14px',
          },
        }}
      />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
