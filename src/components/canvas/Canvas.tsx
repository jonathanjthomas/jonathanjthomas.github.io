'use client'

/**
 * Root Canvas Component
 * Persistent Three.js canvas mounted at viewport root level (position: fixed)
 * All DOM content renders above (z-index: 10+)
 */

import { Canvas as R3FCanvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Scene } from './Scene'

/**
 * StatsComponent - Optional performance monitor
 * Can be toggled in development via URL param ?stats=true
 */
function CanvasContent() {
  const { camera } = useThree()

  useEffect(() => {
    // Initialize camera default position
    camera.position.set(0, 0, 8)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return <Scene />
}

export function Canvas() {
  return (
    <div className="canvas-container">
      <R3FCanvas
        // Performance settings
        dpr={[1, 1.5]} // Clamp DPR
        frameloop="demand" // Only render when needed
        // Camera config
        camera={{
          position: [0, 0, 8],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        // Rendering config
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <CanvasContent />
      </R3FCanvas>
    </div>
  )
}
