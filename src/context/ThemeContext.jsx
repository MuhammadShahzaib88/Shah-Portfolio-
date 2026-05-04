import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme')
    if (stored) {
      setIsDark(stored === 'dark')
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      document.body.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.body.classList.add('light')
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
