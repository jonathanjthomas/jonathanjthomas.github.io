/**
 * Zustand store for global state management
 * Handles cross-component animation sync and interaction state
 */

import { create } from 'zustand'
import type { Section } from './types'

interface PortfolioStore {
  // Active section tracking
  activeSection: Section
  setActiveSection: (section: Section) => void

  // Hover/interaction states
  hoveredProject: string | null
  setHoveredProject: (id: string | null) => void

  hoveredExperience: string | null
  setHoveredExperience: (id: string | null) => void

  expandedExperience: string | null
  setExpandedExperience: (id: string | null) => void

  hoveredAchievement: string | null
  setHoveredAchievement: (id: string | null) => void

  // Global interaction state
  isInteracting: boolean
  setIsInteracting: (value: boolean) => void

  // Canvas/rendering state
  isCanvasReady: boolean
  setIsCanvasReady: (value: boolean) => void

  assetsLoaded: number // 0-100 percentage
  setAssetsLoaded: (value: number) => void
}

export const useStore = create<PortfolioStore>((set) => ({
  // Active section
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  // Hovered states
  hoveredProject: null,
  setHoveredProject: (id) => set({ hoveredProject: id }),

  hoveredExperience: null,
  setHoveredExperience: (id) => set({ hoveredExperience: id }),

  expandedExperience: null,
  setExpandedExperience: (id) => set({ expandedExperience: id }),

  hoveredAchievement: null,
  setHoveredAchievement: (id) => set({ hoveredAchievement: id }),

  // Global interaction
  isInteracting: false,
  setIsInteracting: (value) => set({ isInteracting: value }),

  // Canvas state
  isCanvasReady: false,
  setIsCanvasReady: (value) => set({ isCanvasReady: value }),

  assetsLoaded: 0,
  setAssetsLoaded: (value) => set({ assetsLoaded: Math.min(100, value) }),
}))
