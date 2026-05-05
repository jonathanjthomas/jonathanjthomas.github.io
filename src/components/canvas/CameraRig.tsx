'use client'

/**
 * Camera Rig Component
 * Manages camera animations and interactions
 * Designed to be controlled by GSAP ScrollTrigger timelines
 *
 * Features:
 * - Ref exported for GSAP direct manipulation
 * - Camera state stored in Zustand for cross-component sync
 * - Animation hooks for complex camera movements
 * - Supports quaternion-based smooth rotations
 *
 * Usage:
 * gsap.to(cameraRef.current.position, { x, y, z, duration })
 * gsap.to(cameraRef.current.rotation, { x, y, z, duration })
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

/**
 * Hook for programmatic camera animation
 * Usage in components: const animateCamera = useAnimateCamera()
 */
export function useAnimateCamera() {
  const { camera } = useThree()

  return {
    /**
     * Animate camera to a new position and look target
     */
    animateTo: (
      position: THREE.Vector3,
      lookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
      duration: number = 1
    ) => {
      // Handled by GSAP in scroll timelines.
      // This returns useful camera transition values for future timeline wiring.
      const startPos = camera.position.clone()
      const startQuat = camera.quaternion.clone()

      // Calculate target rotation
      const tempCamera = new THREE.PerspectiveCamera()
      tempCamera.position.copy(position)
      tempCamera.lookAt(lookAt)

      return {
        startPos,
        startQuat,
        endPos: position,
        endQuat: tempCamera.quaternion.clone(),
      }
    },

    /**
     * Reset camera to default position
     */
    reset: () => {
      camera.position.set(0, 0, 8)
      camera.rotation.set(0, 0, 0)
      camera.quaternion.set(0, 0, 0, 1)
    },

    /**
     * Get camera reference for GSAP
     */
    getRef: () => camera,
  }
}

