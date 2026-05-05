/**
 * GSAP setup and ScrollTrigger configuration
 * Centralized animation orchestration
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Configure GSAP defaults for portfolio animations
 */
export function initializeGSAP() {
  // GSAP configuration (minimal setup)
  // ScrollTrigger will be configured below
  ScrollTrigger.defaults({
    // scrub: true enables smooth sync with scrollbar
    // ease: 'none' ensures linear interpolation
    markers: process.env.NODE_ENV === 'development',
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('✓ GSAP initialized with ScrollTrigger')
  }
}

/**
 * Create a scroll-driven timeline for a section
 * @param trigger - DOM element to trigger animation
 * @param options - ScrollTrigger options
 */
export function createScrollTimeline(
  trigger: HTMLElement | null,
  options?: Partial<ScrollTrigger.StaticVars>
) {
  if (!trigger) return null

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
      ...options,
    },
  })
}

/**
 * Stagger animation helper for card reveals
 * @param targets - DOM elements or selectors
 * @param duration - animation duration in seconds
 * @param staggerDelay - delay between each element
 */
export function staggerReveal(
  targets: gsap.TweenTarget,
  {
    duration = 0.8,
    staggerDelay = 0.1,
    yFrom = 50,
    opacityFrom = 0,
  } = {}
) {
  return gsap.from(targets, {
    y: yFrom,
    opacity: opacityFrom,
    duration,
    stagger: staggerDelay,
    ease: 'power2.out',
  })
}

/**
 * Kill all ScrollTrigger instances
 * Useful for cleanup during hot reload or navigation
 */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

/**
 * Refresh ScrollTrigger calculations
 * Call after DOM changes or window resize
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}

/**
 * Navigate to a section with smooth scroll
 * @param element - Target element to scroll to
 */
export function scrollToSection(element: HTMLElement | null) {
  if (!element) return

  gsap.to(window, {
    scrollTo: element,
    duration: 1,
    ease: 'power2.inOut',
  })
}

export { ScrollTrigger }
