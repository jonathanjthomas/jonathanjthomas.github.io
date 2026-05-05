'use client'

/**
 * Hero Section
 * Entry point of the portfolio
 * 3D avatar + scroll-driven exit animation
 */

import { useEffect, useRef } from 'react'

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section initialized - ready for GSAP animations in Phase 4
    if (process.env.NODE_ENV === 'development') {
      console.log('✓ Hero section ready')
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center md:justify-between h-screen px-6 md:px-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Left: 3D Canvas Area (managed by Canvas component) */}
      <div className="hidden md:block absolute inset-0 left-0 w-1/2 z-0" />

      {/* Right: Typography Content */}
      <div className="relative z-10 max-w-lg md:ml-auto md:mr-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
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
