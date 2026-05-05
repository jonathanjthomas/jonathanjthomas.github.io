'use client'

/**
 * Full-screen Loader Component
 * Shows loading progress while assets are being loaded
 */

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'

export function Loader() {
  const assetsLoaded = useStore((state) => state.assetsLoaded)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (assetsLoaded >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [assetsLoaded])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        assetsLoaded >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Loading Portfolio</h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <p className="text-slate-400">{assetsLoaded}%</p>
        </div>
      </div>
    </div>
  )
}
