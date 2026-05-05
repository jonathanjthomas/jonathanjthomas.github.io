'use client'

/**
 * Projects Section
 * 3D galaxy view with focus-on-scroll
 */

import { useRef } from 'react'

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Projects
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          A universe of work across AI, machine learning, and full-stack development
        </p>

        {/* Placeholder */}
        <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Projects content coming in Phase 8
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            3D galaxy view with focus-on-scroll transitions
          </p>
        </div>
      </div>
    </section>
  )
}
