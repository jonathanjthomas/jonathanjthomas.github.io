'use client'

/**
 * Scene Orchestrator Component
 * Initializes and manages the 3D scene:
 * - Camera (for GSAP control)
 * - Lights (setup)
 * - Empty placeholder for section-specific 3D elements
 * - Provider for Three.js context
 */

import { PerspectiveCamera } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const setIsCanvasReady = useStore((state) => state.setIsCanvasReady)

  useEffect(() => {
    // Signal that canvas/scene is ready for animations
    setIsCanvasReady(true)

    if (process.env.NODE_ENV === 'development') {
      console.log('✓ Scene initialized')
    }

    return () => {
      setIsCanvasReady(false)
    }
  }, [setIsCanvasReady])

  return (
    <>
      {/* Camera - positioned for GSAP control */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={75} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <directionalLight position={[-10, -10, -10]} intensity={0.4} />

      {/* Placeholder for section-specific 3D content */}
      {/* Will be populated by individual section components */}
    </>
  )
}
