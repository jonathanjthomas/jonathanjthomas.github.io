'use client'

/**
 * Main Portfolio Page
 * Integrates persistent Canvas with DOM sections
 * Sections have id attributes for smooth scrolling
 */

import { Canvas } from '@/components/canvas/Canvas'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { Publications } from '@/components/sections/Publications'
import { Projects } from '@/components/sections/Projects'
import { Footer } from '@/components/sections/Footer'
import { Sidebar } from '@/components/ui/Sidebar'
import { Loader } from '@/components/ui/Loader'
import { useEffect } from 'react'
import { initializeGSAP, cleanupScrollTriggers } from '@/lib/gsap'
import { useStore } from '@/lib/store'

export default function Home() {
  const setAssetsLoaded = useStore((state) => state.setAssetsLoaded)

  useEffect(() => {
    // Initialize GSAP
    initializeGSAP()

    // Simulate asset loading (will be enhanced in Phase 7)
    setAssetsLoaded(100)

    // Cleanup on unmount
    return () => {
      cleanupScrollTriggers()
    }
  }, [setAssetsLoaded])

  return (
    <main className="w-full h-full">
      {/* Persistent 3D Canvas (via Canvas component) */}
      <Canvas />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Loading Overlay */}
      <Loader />

      {/* Page Sections - rendered above Canvas (z-index 10+) */}
      <div id="hero">
        <Hero />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="publications">
        <Publications />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </main>
  )
}
