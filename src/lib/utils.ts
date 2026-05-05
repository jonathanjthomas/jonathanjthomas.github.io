/**
 * Utility functions for the portfolio
 */

import { useEffect, useState } from 'react'

/**
 * Hook to detect if viewport is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check initial window width
    setIsMobile(window.innerWidth < 768)

    // Handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

/**
 * Hook to detect if viewport is tablet
 */
export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)

    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isTablet
}

/**
 * Hook to get current viewport dimensions
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return viewport
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Lerp between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Map value from one range to another
 */
export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/**
 * Format date string (e.g., "Jan 2024")
 */
export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Get device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}
