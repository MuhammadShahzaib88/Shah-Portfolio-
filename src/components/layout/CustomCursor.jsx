import { useEffect, useRef } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const { x, y } = useMousePosition()
  
  useEffect(() => {
    // Update dot position immediately
    if (dotRef.current) {
      dotRef.current.style.left = `${x}px`
      dotRef.current.style.top = `${y}px`
    }
  }, [x, y])

  useEffect(() => {
    // Ring follows with delay via CSS transition
    let rafId
    let ringX = 0, ringY = 0
    
    const animate = () => {
      ringX += (x - ringX) * 0.12
      ringY += (y - ringY) * 0.12
      
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [x, y])

  useEffect(() => {
    const handleMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '60px'
        ringRef.current.style.height = '60px'
        ringRef.current.style.borderColor = 'rgba(6,182,212,0.8)'
      }
      if (dotRef.current) {
        dotRef.current.style.background = '#06b6d4'
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
      }
    }

    const handleMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.borderColor = 'rgba(99,102,241,0.6)'
      }
      if (dotRef.current) {
        dotRef.current.style.background = '#6366f1'
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    const handleMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)'
      }
    }

    const handleMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink)
      link.addEventListener('mouseleave', handleMouseLeaveLink)
    })
    
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink)
        link.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (window.matchMedia('(max-width: 768px)').matches) return null

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ transition: 'background 0.2s, transform 0.2s' }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ transition: 'width 0.3s, height 0.3s, border-color 0.3s, transform 0.15s' }} />
    </>
  )
}

export default CustomCursor
