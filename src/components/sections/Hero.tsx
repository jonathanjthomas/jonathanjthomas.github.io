'use client'

/**
 * Hero Section
 * Entry point of the portfolio
 * 3D avatar + scroll-driven exit animation
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { createScrollTimeline, refreshScrollTriggers } from '@/lib/gsap'
import { getHeroAvatar, getSceneCamera } from '@/lib/sceneRefs'

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let cleanupTimeline: (() => void) | undefined

    // Small delay ensures camera/avatar refs are available after canvas mount.
    const setupTimer = window.setTimeout(() => {
      const avatar = getHeroAvatar()
      const camera = getSceneCamera()

      if (!avatar || !camera) return

      const ctx = gsap.context(() => {
        const scrollTl = createScrollTimeline(section, {
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        })

        if (!scrollTl) return

        // Avatar scales down and moves backward while leaving hero.
        scrollTl
          .to(
            avatar.scale,
            {
              x: 0.72,
              y: 0.72,
              z: 0.72,
              ease: 'none',
            },
            0
          )
          .to(
            avatar.position,
            {
              z: -2.4,
              y: -0.48,
              ease: 'none',
            },
            0
          )
          .to(
            camera.position,
            {
              z: 10.2,
              y: 0.62,
              ease: 'none',
            },
            0
          )
          .to(
            camera.rotation,
            {
              x: 0.04,
              ease: 'none',
            },
            0
          )
      }, section)

      refreshScrollTriggers()

      if (process.env.NODE_ENV === 'development') {
        console.log('✓ Hero section GSAP timeline attached')
      }

      cleanupTimeline = () => {
        ctx.revert()
      }
    }, 80)

    return () => {
      window.clearTimeout(setupTimer)
      cleanupTimeline?.()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-screen items-center justify-center bg-linear-to-b from-white to-slate-50 px-6 md:justify-between md:px-12 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Left: 3D Canvas Area (managed by Canvas component) */}
      <div className="hidden md:block absolute inset-0 left-0 w-1/2 z-0" />

      {/* Right: Typography Content */}
      <div className="relative z-10 max-w-lg md:ml-auto md:mr-12">
        <h1 className="mb-4 bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl dark:from-slate-100 dark:to-slate-400">
          Hi, I'm Jonathan
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
          ML Engineer & AI Researcher
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          Exploring the intersection of machine learning, agentic AI, and practical applications.
          Building intelligent systems one experiment at a time.
        </p>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-12">
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
