'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'
import { setHeroAvatar } from '@/lib/sceneRefs'

export function Avatar() {
  const groupRef = useRef<THREE.Group>(null)
  const handRef = useRef<THREE.Group>(null)
  const { invalidate } = useThree()

  useEffect(() => {
    if (!groupRef.current) return

    setHeroAvatar(groupRef.current)

    // Subtle idle movement for the whole avatar.
    const idleY = gsap.to(groupRef.current.rotation, {
      y: '+=0.2',
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate: invalidate,
    })

    const idleX = gsap.to(groupRef.current.rotation, {
      x: '+=0.04',
      duration: 2.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate: invalidate,
    })

    const wave = handRef.current
      ? gsap.to(handRef.current.rotation, {
          z: 0.6,
          duration: 0.65,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onUpdate: invalidate,
        })
      : null

    return () => {
      idleY.kill()
      idleX.kill()
      wave?.kill()
      setHeroAvatar(null)
    }
  }, [invalidate])

  return (
    <group ref={groupRef} position={[-2.4, -0.2, 0]} scale={1.25}>
      {/* Head */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.05, 40, 40]} />
        <meshStandardMaterial color="#f0c19b" roughness={0.65} metalness={0.05} />
      </mesh>

      {/* Hair cap */}
      <mesh position={[0, 0.5, 0.02]} castShadow>
        <sphereGeometry args={[1.02, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#2f2a28" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.34, 0.12, 0.85]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.34, 0.12, 0.85]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, -0.2, 0.88]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.24, 0.03, 10, 24, Math.PI]} />
        <meshStandardMaterial color="#6b3f2b" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Body */}
      <mesh position={[0, -1.6, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.46, 1.2, 10, 18]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.55} metalness={0.12} />
      </mesh>

      {/* Waving hand */}
      <group ref={handRef} position={[0.92, -0.95, 0.1]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.12, 0.62, 8, 12]} />
          <meshStandardMaterial color="#f0c19b" roughness={0.65} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#f0c19b" roughness={0.65} metalness={0.05} />
        </mesh>
      </group>
    </group>
  )
}
