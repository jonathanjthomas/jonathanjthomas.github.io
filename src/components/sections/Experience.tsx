'use client'

/**
 * Experience Section
 * Interactive timeline path + expandable cards
 * Shows current and previous roles with skills
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { experiences } from '@/data/experiences'
import { createScrollTimeline, refreshScrollTriggers } from '@/lib/gsap'
import { generateExperienceCurve, getCurvePoint } from '@/lib/curves'
import { getSceneCamera, getSceneInvalidate } from '@/lib/sceneRefs'
import { useStore } from '@/lib/store'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const detailsRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const hoveredExperience = useStore((state) => state.hoveredExperience)
  const expandedExperience = useStore((state) => state.expandedExperience)
  const setExpandedExperience = useStore((state) => state.setExpandedExperience)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const curve = generateExperienceCurve()
    const progress = { t: 0 }

    const timeline = createScrollTimeline(section, {
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    })

    if (!timeline) return

    timeline.to(progress, {
      t: 1,
      ease: 'none',
      onUpdate: () => {
        const camera = getSceneCamera()
        if (!camera) return

        const point = getCurvePoint(curve, progress.t)
        const lookAhead = getCurvePoint(curve, Math.min(1, progress.t + 0.03))

        camera.position.set(point.x + 0.35, point.y + 0.32, point.z + 2.2)
        camera.lookAt(lookAhead)
        getSceneInvalidate()?.()
      },
    })

    refreshScrollTriggers()

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    const detailsEntries = Object.entries(detailsRefs.current)
    detailsEntries.forEach(([id, element]) => {
      if (!element) return

      if (expandedExperience === id) {
        gsap.to(element, { maxHeight: 220, opacity: 1, duration: 0.35, ease: 'power2.out' })

        const skills = element.querySelectorAll('[data-skill-tag]')
        gsap.fromTo(
          skills,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, stagger: 0.06, ease: 'power2.out' }
        )
      } else {
        gsap.to(element, { maxHeight: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' })
      }
    })
  }, [expandedExperience])

  const handleToggleExperience = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen bg-white px-6 py-20 md:px-12 dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Experience
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          My journey in machine learning and AI development
        </p>

        <div className="space-y-6">
          {experiences.map((experience) => {
            const isExpanded = expandedExperience === experience.id
            const isHovered = hoveredExperience === experience.id

            return (
              <article
                key={experience.id}
                className={`rounded-xl border p-6 backdrop-blur-md transition-colors duration-200 ${
                  isHovered
                    ? 'border-sky-400 bg-sky-50/80 dark:border-sky-500 dark:bg-sky-950/40'
                    : 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleExperience(experience.id)}
                  className="w-full text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {experience.title}
                      </h3>
                      <p className="mt-1 text-base text-slate-600 dark:text-slate-300">
                        {experience.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      {experience.period}
                    </span>
                  </div>
                </button>

                <div
                  ref={(element) => {
                    detailsRefs.current[experience.id] = element
                  }}
                  className="max-h-0 overflow-hidden opacity-0"
                >
                  <p className="mt-4 text-slate-600 dark:text-slate-300">{experience.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={`${experience.id}-${skill}`}
                        data-skill-tag
                        className="rounded-full border border-sky-300/70 bg-sky-100/70 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-600 dark:bg-sky-900/40 dark:text-sky-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
