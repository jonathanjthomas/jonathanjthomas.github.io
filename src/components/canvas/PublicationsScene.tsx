'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

const PARTICLE_COUNT = 1200

export function PublicationsScene() {
  const pointsRef = useRef<THREE.Points>(null)
  const activeSection = useStore((state) => state.activeSection)

  const { positions, speeds } = useMemo(() => {
    const positionsArray = new Float32Array(PARTICLE_COUNT * 3)
    const speedsArray = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positionsArray[i3 + 0] = (Math.random() - 0.5) * 18
      positionsArray[i3 + 1] = (Math.random() - 0.5) * 10
      positionsArray[i3 + 2] = -6 + (Math.random() - 0.5) * 6
      speedsArray[i] = 0.08 + Math.random() * 0.22
    }

    return { positions: positionsArray, speeds: speedsArray }
  }, [])

  useFrame((state) => {
    if (activeSection !== 'publications' || !pointsRef.current) return

    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const time = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const x = positions[i3 + 0]
      const z = positions[i3 + 2]
      positionAttr.array[i3 + 1] = positions[i3 + 1] + Math.sin(time * speeds[i] + x * 0.4 + z * 0.2) * 0.16
    }

    positionAttr.needsUpdate = true
  })

  return (
    <group name="publications-scene" visible={activeSection === 'publications'}>
      <points ref={pointsRef} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#93c5fd"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
