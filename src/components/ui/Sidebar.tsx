'use client'

/**
 * Sidebar Navigation Component
 * Hover-reveal navigation that appears from left edge
 */

import { useStore } from '@/lib/store'
import { useState } from 'react'
import type { Section } from '@/lib/types'

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'publications', label: 'Publications', icon: '📝' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'footer', label: 'Contact', icon: '💬' },
]

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false)
  const activeSection = useStore((state) => state.activeSection)

  const handleSectionClick = (sectionId: Section) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ${
        isHovered ? 'translate-x-0' : '-translate-x-full'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover trigger area */}
      <div className="absolute -right-8 top-0 h-full w-8" />

      {/* Sidebar panel */}
      <nav className="w-64 h-full bg-slate-900 dark:bg-slate-950 border-r border-slate-700 p-6 flex flex-col gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="text-sm font-medium">{section.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
