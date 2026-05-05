'use client'

/**
 * Scroll spy helpers for syncing section visibility with global state.
 * This stays intentionally small so ScrollTrigger owns the actual observation.
 */

import { useEffect } from 'react'
import { createSectionTrigger, refreshScrollTriggers } from '@/lib/gsap'
import { useStore } from '@/lib/store'
import type { Section } from '@/lib/types'

const SECTION_IDS: Section[] = ['hero', 'experience', 'education', 'publications', 'projects', 'footer']

/**
 * Hook that keeps activeSection in sync with the current viewport section.
 */
export function useSectionScrollSpy() {
  const setActiveSection = useStore((state) => state.setActiveSection)

  useEffect(() => {
    const triggers = SECTION_IDS.map((sectionId) => {
      const element = document.getElementById(sectionId)

      if (!element) return null

      return createSectionTrigger(element, () => setActiveSection(sectionId))
    }).filter(Boolean)

    refreshScrollTriggers()

    return () => {
      triggers.forEach((trigger) => trigger?.kill())
    }
  }, [setActiveSection])
}
