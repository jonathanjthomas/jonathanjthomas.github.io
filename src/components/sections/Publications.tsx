'use client'

/**
 * Publications Section
 * Academic-style chronological timeline
 */

import { useRef } from 'react'

export function Publications() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 py-20 bg-white dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Publications
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Research and academic contributions
        </p>

        {/* Placeholder */}
        <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Publications content coming in Phase 7
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Academic timeline with DOI and PDF references
          </p>
        </div>
      </div>
    </section>
  )
}
