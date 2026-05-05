/**
 * Frame Loop Management Utilities
 * Handles efficient render scheduling for demand-based rendering
 * Helps optimize performance by controlling when and how often the canvas re-renders
 */

import { RootState } from '@react-three/fiber'

/**
 * Frame loop modes for different rendering strategies
 */
type FrameLoopMode = 'demand' | 'always' | 'scroll'

/**
 * Frame loop context - tracks rendering state and performance metrics
 */
interface FrameLoopContext {
  mode: FrameLoopMode
  fps: number
  lastFrameTime: number
  frameCount: number
  isDirty: boolean
}

let frameLoopContext: FrameLoopContext = {
  mode: 'demand',
  fps: 60,
  lastFrameTime: performance.now(),
  frameCount: 0,
  isDirty: true, // Start as dirty to render first frame
}

/**
 * Mark canvas as needing a render
 * Call this when state changes that affects the 3D scene
 */
export function invalidateFrame() {
  frameLoopContext.isDirty = true
}

/**
 * Switch frame loop mode
 * @param mode - 'demand' (only render when needed), 'always' (continuous), 'scroll' (render during scroll)
 */
export function setFrameLoopMode(mode: FrameLoopMode) {
  frameLoopContext.mode = mode
  if (mode !== 'demand') {
    invalidateFrame()
  }
}

/**
 * Check if frame should render based on current mode and state
 */
export function shouldRender(): boolean {
  return frameLoopContext.isDirty || frameLoopContext.mode !== 'demand'
}

/**
 * Mark frame as rendered
 * Clears dirty flag for demand mode
 */
export function markFrameRendered() {
  frameLoopContext.frameCount++
  frameLoopContext.lastFrameTime = performance.now()

  if (frameLoopContext.mode === 'demand') {
    frameLoopContext.isDirty = false
  }
}

/**
 * Get current FPS estimate
 */
export function getCurrentFPS(): number {
  return frameLoopContext.fps || 60
}

/**
 * Enable render on scroll
 * Can be called from scroll event listeners
 */
export function enableScrollRendering() {
  if (frameLoopContext.mode === 'scroll') {
    invalidateFrame()
  }
}

/**
 * Reset frame loop context
 * Useful for cleanup
 */
export function resetFrameLoop() {
  frameLoopContext = {
    mode: 'demand',
    fps: 60,
    lastFrameTime: performance.now(),
    frameCount: 0,
    isDirty: true,
  }
}

/**
 * Frame loop manager hook
 * Usage: const { invalidate, mode } = useFrameLoop()
 */
export function useFrameLoop() {
  return {
    invalidate: invalidateFrame,
    setMode: setFrameLoopMode,
    shouldRender: shouldRender,
    markRendered: markFrameRendered,
    getFPS: getCurrentFPS,
  }
}
