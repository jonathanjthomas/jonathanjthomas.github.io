'use client'

/**
 * Education Section
 * University achievements + hover tooltips
 */

import { useMemo, useRef } from 'react'
import { educationData } from '@/data/education'
import { useStore } from '@/lib/store'

export function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  const hoveredAchievement = useStore((state) => state.hoveredAchievement)
  const isInteracting = useStore((state) => state.isInteracting)

  const activeAchievement = useMemo(
    () => educationData.achievements.find((item) => item.id === hoveredAchievement) ?? null,
    [hoveredAchievement]
  )

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen overflow-hidden bg-slate-50 px-6 py-20 md:px-12 dark:bg-slate-900"
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
          isInteracting
            ? 'bg-white/20 backdrop-blur-md dark:bg-slate-900/30'
            : 'bg-transparent backdrop-blur-0'
        }`}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Education
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Academic background and achievements
        </p>

        <div className="relative z-10 rounded-2xl border border-slate-200/80 bg-white/75 p-7 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-800/65">
          <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">{educationData.year}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {educationData.degree} {educationData.field}
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{educationData.university}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {educationData.achievements.map((achievement) => {
              const isActive = hoveredAchievement === achievement.id

              return (
                <article
                  key={achievement.id}
                  className={`rounded-xl border px-4 py-4 transition-all duration-200 ${
                    isActive
                      ? 'border-sky-400 bg-sky-100/70 shadow-md shadow-sky-200 dark:border-sky-500 dark:bg-sky-900/30 dark:shadow-sky-950/60'
                      : 'border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-800/60'
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{achievement.title}</p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    Hover over the matching 3D badge to reveal details.
                  </p>
                </article>
              )
            })}
          </div>

          <div
            className={`mt-6 rounded-xl border border-slate-200/90 bg-white/80 p-4 transition-opacity duration-200 dark:border-slate-700 dark:bg-slate-900/55 ${
              activeAchievement ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Achievement Description
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {activeAchievement
                ? activeAchievement.description
                : 'Move your cursor over the 3D achievement nodes to inspect each award description.'}
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            The 3D campus abstraction and floating nodes in the background are interactive and synchronized with this panel.
          </p>
        </div>
      </div>
    </section>
  )
}
