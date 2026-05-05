/**
 * Scroll Sync Hooks
 * Manages canvas re-rendering during scroll and scroll-based animations
 */

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { invalidateFrame } from './frameLoop'

/**
 * Hook to invalidate canvas on scroll
 * Ensures smooth animation during ScrollTrigger playback
 * Usage: useScrollSync()
 */
export function useScrollSync() {
  const { invalidate } = useThree()
  const scrollListenerRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Create debounced scroll handler
    let scrollTimeout: NodeJS.Timeout
    scrollListenerRef.current = () => {
      // Invalidate frame immediately for responsive rendering
      invalidate()
      invalidateFrame()

      // Debounce: stop re-rendering 200ms after scroll ends
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Frame loop will return to 'demand' mode
      }, 200)
    }

    window.addEventListener('scroll', scrollListenerRef.current, { passive: true })

    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
      }
      clearTimeout(scrollTimeout)
    }
  }, [invalidate])
}

/**
 * Hook to manually trigger canvas render
 * Usage: const render = useCanvasRender()
 */
export function useCanvasRender() {
  const { invalidate } = useThree()

  return () => {
    invalidate()
    invalidateFrame()
  }
}

/**
 * Hook to detect if page is scrolling
 */
export function useIsScrolling() {
  const scrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      scrollingRef.current = true

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollingRef.current = false
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return scrollingRef.current
}
