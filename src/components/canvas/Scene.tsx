'use client'

/**
 * Scene Orchestrator Component
 * Initializes and manages the 3D scene:
 * - Camera (for GSAP control via refs)
 * - Lighting (via standardized Lights component)
 * - Per-section 3D elements mounted conditionally
 *
 * This component serves as the root container for all 3D content
 * and manages camera animations via GSAP in later phases
 */

import { PerspectiveCamera } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { Lights } from './Lights'
import { CameraRig } from './CameraRig'

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const sceneRef = useRef<THREE.Scene>(null)
  const setIsCanvasReady = useStore((state) => state.setIsCanvasReady)

  useEffect(() => {
    // Signal that canvas/scene is ready for animations
    // This allows GSAP timelines to begin attaching
    setIsCanvasReady(true)

    if (process.env.NODE_ENV === 'development') {
      console.log('✓ Scene orchestrator initialized')
      console.log('  Camera ready for GSAP control')
      console.log('  Lights configured for all sections')
    }

    return () => {
      setIsCanvasReady(false)
    }
  }, [setIsCanvasReady])

  return (
    <>
      {/* Camera - positioned for GSAP control */}
      {/* Ref exported for timeline manipulation in GSAP */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 8]}
        fov={75}
        near={0.1}
        far={1000}
      />

      {/* Standardized Lighting Setup */}
      {/* Three lights for balanced illumination across all sections */}
      <Lights />

      {/* Camera Rig - Animation Controller */}
      {/* Handles GSAP scroll-driven animations and imperative updates */}
      <CameraRig />
      {/* Will be populated in Phase 4+ */}
      {/* Hero avatar, Experience path, Education geometry, etc. */}

      {/* Placeholder geometry for initial testing (optional) */}
      {/* Remove when section geometries are added */}
    </>
  )
}

