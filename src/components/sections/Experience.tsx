'use client'

/**
 * Experience Section
 * Interactive timeline path + expandable cards
 * Shows current and previous roles with skills
 */

import { useRef } from 'react'

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 py-20 bg-white dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Experience
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          My journey in machine learning and AI development
        </p>

        {/* Placeholder for experience cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Experience content coming in Phase 5
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Interactive path visualization + expandable cards
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
