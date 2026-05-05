'use client'

/**
 * Root Canvas Component
 * Persistent Three.js canvas mounted at viewport root level (position: fixed)
 * All DOM content renders above (z-index: 10+)
 *
 * Performance Strategy:
 * - DPR clamped to [1, 1.5] for mobile optimization
 * - Frameloop set to "demand" (tap-driven) for efficiency
 * - Antialias enabled for smooth geometry edges
 * - Alpha enabled for transparent background
 */

import { Canvas as R3FCanvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { setSceneInvalidate } from '@/lib/sceneRefs'
import { Scene } from './Scene'

/**
 * CanvasContent - Inner component with access to Three.js context
 * Initializes camera and mounts Scene
 */
function CanvasContent() {
  const { camera, gl, invalidate } = useThree()

  useEffect(() => {
    // Initialize camera for hero section
    camera.position.set(0, 0, 8)
    camera.lookAt(0, 0, 0)

    // Log performance settings in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✓ Canvas initialized`)
      console.log(`  DPR: ${gl.getPixelRatio().toFixed(2)}`)
      console.log(`  Renderer: ${gl.info.render.frame}`)
    }

    setSceneInvalidate(invalidate)

    return () => {
      setSceneInvalidate(null)
    }
  }, [camera, gl, invalidate])

  return <Scene />
}

/**
 * Canvas - Main persistent WebGL renderer
 * Fixed to viewport, all interactions flow through it
 */
export function Canvas() {
  const setIsCanvasReady = useStore((state) => state.setIsCanvasReady)

  return (
    <div className="canvas-container">
      <R3FCanvas
        // Performance & rendering
        dpr={[1, 1.5]} // Clamp device pixel ratio for mobile
        frameloop="demand" // Only render on demand (scroll, interaction)
        
        // Camera configuration
        camera={{
          position: [0, 0, 8],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        
        // WebGL renderer configuration
        gl={{
          antialias: true, // Smooth edges
          alpha: true, // Transparent background for DOM visibility
          powerPreference: 'high-performance', // Prefer GPU
          precision: 'highp', // Higher precision for animations
          preserveDrawingBuffer: false, // Don't preserve for performance
        }}

        // Event handling
        onCreated={() => {
          setIsCanvasReady(true)
          if (process.env.NODE_ENV === 'development') {
            console.log('✓ Three.js renderer ready')
          }
        }}
      >
        <CanvasContent />
      </R3FCanvas>
    </div>
  )
}
