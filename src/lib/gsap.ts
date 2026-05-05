gsap.registerPlugin(ScrollTrigger)
/**
 * GSAP setup and ScrollTrigger configuration
 * Centralized animation orchestration for the portfolio.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

let isInitialized = false

/**
 * Configure GSAP defaults for portfolio animations.
 * Safe to call more than once, but only initializes once.
 */
export function initializeGSAP() {
  if (isInitialized) return

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  })

  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === 'development',
  })

  isInitialized = true

  if (process.env.NODE_ENV === 'development') {
    console.log('✓ GSAP initialized with ScrollTrigger and ScrollToPlugin')
  }
}

/**
 * Create a scroll-driven timeline for a section.
 */
export function createScrollTimeline(
  trigger: HTMLElement | null,
  options: ScrollTrigger.Vars = {}
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
 * Create a one-off ScrollTrigger for section state syncing.
 */
export function createSectionTrigger(
  trigger: HTMLElement,
  onEnter: () => void,
  onEnterBack?: () => void
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    onEnter,
    onEnterBack: onEnterBack ?? onEnter,
  })
}

/**
 * Stagger animation helper for card reveals.
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
 * Kill all ScrollTrigger instances.
 */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

/**
 * Refresh ScrollTrigger calculations.
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}

/**
 * Navigate to a section with smooth scroll.
 */
export function scrollToSection(element: HTMLElement | null) {
  if (!element) return

  gsap.to(window, {
    scrollTo: {
      y: element,
      offsetY: 0,
      autoKill: true,
    },
    duration: 1,
    ease: 'power2.inOut',
  })
}

export { ScrollTrigger }
