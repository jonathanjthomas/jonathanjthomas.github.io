'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { projects } from '@/data/projects'
import { useStore } from '@/lib/store'
import { getSceneInvalidate } from '@/lib/sceneRefs'

const STAR_COUNT = 1400

export function ProjectsScene() {
  const starfieldRef = useRef<THREE.InstancedMesh>(null)
  const projectNodesRef = useRef<THREE.Group>(null)
  const hitObjectsRef = useRef<THREE.Mesh[]>([])
  const hoveredRef = useRef<string | null>(null)

  const activeSection = useStore((state) => state.activeSection)
  const hoveredProject = useStore((state) => state.hoveredProject)
  const setHoveredProject = useStore((state) => state.setHoveredProject)
  const setIsInteracting = useStore((state) => state.setIsInteracting)

  const starPositions = useMemo(() => {
    const values: Array<{ position: THREE.Vector3; scale: number }> = []

    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      values.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          (radius * Math.cos(phi)) * 0.55,
          -8 - radius * 0.42
        ),
        scale: 0.03 + Math.random() * 0.07,
      })
    }

    return values
  }, [])

  useEffect(() => {
    if (!starfieldRef.current) return

    const temp = new THREE.Object3D()
    starPositions.forEach((star, index) => {
      temp.position.copy(star.position)
      temp.scale.setScalar(star.scale)
      temp.updateMatrix()
      starfieldRef.current!.setMatrixAt(index, temp.matrix)
    })

    starfieldRef.current.instanceMatrix.needsUpdate = true
  }, [starPositions])

  useFrame(({ clock, raycaster, pointer, camera }) => {
    if (projectNodesRef.current) {
      projectNodesRef.current.rotation.y = clock.elapsedTime * 0.08
    }

    if (activeSection !== 'projects') {
      if (hoveredRef.current) {
        hoveredRef.current = null
        setHoveredProject(null)
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
        setHoveredProject(null)
        setIsInteracting(false)
        getSceneInvalidate()?.()
      }
      return
    }

    const hitId = first.object.userData.projectId as string | undefined
    if (!hitId) return

    if (hoveredRef.current !== hitId) {
      hoveredRef.current = hitId
      setHoveredProject(hitId)
      setIsInteracting(true)
      getSceneInvalidate()?.()
    }
  })

  useEffect(() => {
    return () => {
      setHoveredProject(null)
      setIsInteracting(false)
    }
  }, [setHoveredProject, setIsInteracting])

  return (
    <group name="projects-scene" visible={activeSection === 'projects'}>
      <instancedMesh ref={starfieldRef} args={[undefined, undefined, STAR_COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.4} metalness={0.45} emissive="#1e3a8a" emissiveIntensity={0.16} />
      </instancedMesh>

      <group ref={projectNodesRef}>
        {projects.map((project) => {
          const isHovered = hoveredProject === project.id

          return (
            <mesh
              key={project.id}
              position={[project.position.x, project.position.y, project.position.z]}
              castShadow
            >
              <sphereGeometry args={[isHovered ? 0.38 : 0.28, 24, 24]} />
              <meshStandardMaterial
                color={isHovered ? '#38bdf8' : '#c4b5fd'}
                emissive={isHovered ? '#0369a1' : '#312e81'}
                emissiveIntensity={isHovered ? 0.85 : 0.35}
                roughness={0.32}
                metalness={0.55}
              />
            </mesh>
          )
        })}
      </group>

      {projects.map((project) => (
        <mesh
          key={`project-hit-${project.id}`}
          position={[project.position.x, project.position.y, project.position.z]}
          visible={false}
          ref={(mesh) => {
            if (!mesh) return
            mesh.userData.projectId = project.id
            if (!hitObjectsRef.current.includes(mesh)) {
              hitObjectsRef.current.push(mesh)
            }
          }}
        >
          <sphereGeometry args={[0.72, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}
