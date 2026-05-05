'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { educationData } from '@/data/education'
import { useStore } from '@/lib/store'
import { getSceneInvalidate } from '@/lib/sceneRefs'

export function EducationScene() {
  const campusRef = useRef<THREE.Group>(null)
  const badgeGroupRef = useRef<THREE.Group>(null)
  const hitObjectsRef = useRef<THREE.Mesh[]>([])
  const hoveredRef = useRef<string | null>(null)

  const activeSection = useStore((state) => state.activeSection)
  const hoveredAchievement = useStore((state) => state.hoveredAchievement)
  const setHoveredAchievement = useStore((state) => state.setHoveredAchievement)
  const setIsInteracting = useStore((state) => state.setIsInteracting)

  const badgePositions = useMemo(
    () => [
      new THREE.Vector3(-1.3, 1.5, -4.8),
      new THREE.Vector3(-3.2, 1.05, -4.2),
    ],
    []
  )

  useFrame(({ clock, raycaster, pointer, camera }) => {
    if (!campusRef.current || !badgeGroupRef.current) return

    // Slow background rotation for the low-poly campus abstraction.
    campusRef.current.rotation.y = clock.elapsedTime * 0.14
    badgeGroupRef.current.rotation.y = -clock.elapsedTime * 0.1

    if (activeSection !== 'education') {
      if (hoveredRef.current) {
        hoveredRef.current = null
        setHoveredAchievement(null)
        setIsInteracting(false)
      }
      return
    }

    raycaster.setFromCamera(pointer, camera)
    const intersections = raycaster.intersectObjects(hitObjectsRef.current, false)
    const first = intersections[0]

    if (!first) {
      if (hoveredRef.current) {
        hoveredRef.current = null
        setHoveredAchievement(null)
        setIsInteracting(false)
        getSceneInvalidate()?.()
      }
      return
    }

    const hitId = first.object.userData.achievementId as string | undefined
    if (!hitId) return

    if (hoveredRef.current !== hitId) {
      hoveredRef.current = hitId
      setHoveredAchievement(hitId)
      setIsInteracting(true)
      getSceneInvalidate()?.()
    }
  })

  useEffect(() => {
    return () => {
      setHoveredAchievement(null)
      setIsInteracting(false)
    }
  }, [setHoveredAchievement, setIsInteracting])

  return (
    <group name="education-scene" visible={activeSection === 'education'}>
      <group ref={campusRef} position={[-2.25, -0.5, -5.1]}>
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[1.25, 0]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.55} metalness={0.2} flatShading />
        </mesh>
        <mesh position={[1.2, 0.35, 0.5]} castShadow>
          <boxGeometry args={[0.9, 1.4, 0.9]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.2} flatShading />
        </mesh>
        <mesh position={[-1.1, 0.05, -0.4]} castShadow>
          <boxGeometry args={[0.85, 1.05, 0.8]} />
          <meshStandardMaterial color="#475569" roughness={0.52} metalness={0.18} flatShading />
        </mesh>
      </group>

      <group ref={badgeGroupRef}>
        {educationData.achievements.map((achievement, index) => {
          const pos = badgePositions[index]
          const isHovered = hoveredAchievement === achievement.id

          return (
            <group key={achievement.id} position={[pos.x, pos.y, pos.z]}>
              <mesh castShadow>
                <icosahedronGeometry args={[isHovered ? 0.34 : 0.28, 1]} />
                <meshStandardMaterial
                  color={isHovered ? '#38bdf8' : '#a5b4fc'}
                  emissive={isHovered ? '#0284c7' : '#312e81'}
                  emissiveIntensity={isHovered ? 0.7 : 0.22}
                  roughness={0.35}
                  metalness={0.35}
                />
              </mesh>
            </group>
          )
        })}
      </group>

      {educationData.achievements.map((achievement, index) => {
        const pos = badgePositions[index]
        return (
          <mesh
            key={`education-hit-${achievement.id}`}
            position={[pos.x, pos.y, pos.z]}
            visible={false}
            ref={(mesh) => {
              if (!mesh) return
              mesh.userData.achievementId = achievement.id
              if (!hitObjectsRef.current.includes(mesh)) {
                hitObjectsRef.current.push(mesh)
              }
            }}
          >
            <sphereGeometry args={[0.66, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )
      })}
    </group>
  )
}
