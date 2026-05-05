'use client'

/**
 * Education Section
 * University achievements + hover tooltips
 */

import { useRef } from 'react'

export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Education
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Academic background and achievements
        </p>

        {/* Placeholder */}
        <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Education content coming in Phase 6
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            University achievements with 3D campus reference
          </p>
        </div>
      </div>
    </section>
  )
}
