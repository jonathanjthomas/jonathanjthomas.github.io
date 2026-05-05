/**
 * Reusable animation primitives and builders
 * Factory functions for common animation patterns
 */

import gsap from 'gsap'
import * as THREE from 'three'

interface ScrollTimelineOptions {
  trigger?: HTMLElement | null
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  offset?: number
}

/**
 * Create a scroll-driven timeline for hero section exit
 */
export function createHeroExitTimeline(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) return null

  return gsap.timeline({
    scrollTrigger: {
      trigger: ref.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })
}

/**
 * Create staggered card entrance animation
 * Cards slide up and fade in with delay between each
 */
export function createStaggerCardReveal(
  container: HTMLElement | null,
  cardSelector: string,
  options?: Partial<ScrollTimelineOptions>
) {
  if (!container) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.5,
      markers: false,
      ...options,
    },
  })

  const cards = container.querySelectorAll(cardSelector)
  cards.forEach((card, index) => {
    tl.from(
      card,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      index * 0.1
    )
  })

  return tl
}

/**
 * Create opacity fade animation based on scroll
 */
export function createFadeAnimation(
  element: HTMLElement | null,
  direction: 'in' | 'out' = 'out'
) {
  if (!element) return null

  const isOut = direction === 'out'

  return gsap.to(element, {
    opacity: isOut ? 0 : 1,
    duration: 0.6,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 100%',
      end: 'top 10%',
      scrub: true,
      markers: false,
    },
  })
}

/**
 * Create a camera position animation along a path
 * Interpolates camera from current position through waypoints
 */
export function createCameraPathTimeline(
  camera: THREE.Camera | null,
  startPos: THREE.Vector3,
  endPos: THREE.Vector3,
  trigger: HTMLElement | null,
  lookAtOffset?: THREE.Vector3
) {
  if (!camera || !trigger) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })

  // Create position interpolation
  const posInterp = { t: 0 }
  tl.to(posInterp, {
    t: 1,
    onUpdate() {
      const pos = new THREE.Vector3().lerpVectors(startPos, endPos, posInterp.t)
      camera.position.copy(pos)

      // Optional: make camera look at an offset point
      if (lookAtOffset) {
        const lookAtPos = pos.clone().add(lookAtOffset)
        // For PerspectiveCamera, use lookAt()
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.lookAt(lookAtPos)
        }
      }
    },
  })

  return tl
}

/**
 * Create a scale animation (useful for node highlighting, card expansion, etc.)
 */
export function createScaleAnimation(
  element: HTMLElement | THREE.Object3D | null,
  fromScale: number,
  toScale: number,
  duration: number = 0.3,
  ease: string = 'power2.out'
) {
  if (!element) return null

  // Handle Three.js objects differently
  if ((element as any).scale) {
    return gsap.to((element as any).scale, {
      x: toScale,
      y: toScale,
      z: toScale,
      duration,
      ease,
    })
  }

  // Handle DOM elements
  return gsap.to(element, {
    scale: toScale,
    duration,
    ease,
  })
}

/**
 * Create a rotation animation for 3D objects
 */
export function createRotationAnimation(
  obj: THREE.Object3D | null,
  fromRotation: { x: number; y: number; z: number },
  toRotation: { x: number; y: number; z: number },
  duration: number = 1,
  repeat: number = 0,
  ease: string = 'none'
) {
  if (!obj) return null

  return gsap.to(obj.rotation, {
    ...toRotation,
    duration,
    repeat,
    ease,
  })
}

/**
 * Create a continuous idle loop animation (e.g., avatar breathing, rotation)
 */
export function createIdleAnimation(
  obj: THREE.Object3D | null,
  property: string,
  fromValue: number,
  toValue: number,
  duration: number = 3
) {
  if (!obj) return null

  return gsap.to(obj.rotation, {
    [property]: toValue,
    duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Create blur effect animation on DOM element
 */
export function createBlurAnimation(
  element: HTMLElement | null,
  fromBlur: number,
  toBlur: number,
  duration: number = 0.5,
  ease: string = 'power2.out'
) {
  if (!element) return null

  return gsap.to(element, {
    backdropFilter: `blur(${toBlur}px)`,
    filter: `blur(${toBlur}px)`,
    duration,
    ease,
  })
}
