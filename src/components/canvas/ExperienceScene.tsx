'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { experiences } from '@/data/experiences'
import { generateExperienceCurve, generatePathTube } from '@/lib/curves'
import { useStore } from '@/lib/store'
import { getSceneInvalidate } from '@/lib/sceneRefs'

export function ExperienceScene() {
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const hitObjectsRef = useRef<THREE.Mesh[]>([])
  const hoveredRef = useRef<string | null>(null)

  const setHoveredExperience = useStore((state) => state.setHoveredExperience)
  const setIsInteracting = useStore((state) => state.setIsInteracting)
  const expandedExperience = useStore((state) => state.expandedExperience)
  const hoveredExperience = useStore((state) => state.hoveredExperience)

  const curve = useMemo(() => generateExperienceCurve(), [])
  const tubeGeometry = useMemo(() => generatePathTube(curve, 240, 0.08, 10), [curve])

  useEffect(() => {
    if (!nodesRef.current) return

    const temp = new THREE.Object3D()
    experiences.forEach((experience, index) => {
      temp.position.set(experience.position.x, experience.position.y, experience.position.z)
      const isExpanded = experience.id === expandedExperience
      const isHovered = experience.id === hoveredExperience

      temp.scale.setScalar(isExpanded ? 1.6 : isHovered ? 1.25 : 1)
      temp.updateMatrix()
      nodesRef.current!.setMatrixAt(index, temp.matrix)
    })

    nodesRef.current.instanceMatrix.needsUpdate = true
  }, [expandedExperience, hoveredExperience])

  useFrame(({ raycaster, camera, pointer }) => {
    if (!hitObjectsRef.current.length) return

    raycaster.setFromCamera(pointer, camera)
    const intersections = raycaster.intersectObjects(hitObjectsRef.current, false)
    const first = intersections[0]

    if (!first) {
      if (hoveredRef.current) {
        hoveredRef.current = null
        setHoveredExperience(null)
        setIsInteracting(false)
        getSceneInvalidate()?.()
      }
      return
    }

    const hitId = first.object.userData.experienceId as string | undefined
    if (!hitId) return

    if (hoveredRef.current !== hitId) {
      hoveredRef.current = hitId
      setHoveredExperience(hitId)
      setIsInteracting(true)
      getSceneInvalidate()?.()
    }
  })

  useEffect(() => {
    return () => {
      setHoveredExperience(null)
      setIsInteracting(false)
    }
  }, [setHoveredExperience, setIsInteracting])

  return (
    <group name="experience-scene">
      <mesh geometry={tubeGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2563eb" roughness={0.45} metalness={0.2} opacity={0.85} transparent />
      </mesh>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, experiences.length]} castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.35} metalness={0.35} />
      </instancedMesh>

      {experiences.map((experience) => (
        <mesh
          key={`hit-${experience.id}`}
          position={[experience.position.x, experience.position.y, experience.position.z]}
          visible={false}
          ref={(mesh) => {
            if (!mesh) return
            mesh.userData.experienceId = experience.id
            if (!hitObjectsRef.current.includes(mesh)) {
              hitObjectsRef.current.push(mesh)
            }
          }}
        >
          <sphereGeometry args={[0.7, 14, 14]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}
