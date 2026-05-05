'use client'

/**
 * Camera Rig Component
 * Stub for camera control via GSAP animations
 * Will be enhanced with scroll-driven animations in Phase 3
 */

import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function CameraRig() {
  const { camera } = useThree()
  const cameraRef = useRef<THREE.PerspectiveCamera>(camera as THREE.PerspectiveCamera)

  useEffect(() => {
    cameraRef.current = camera as THREE.PerspectiveCamera
  }, [camera])

  return null
}
