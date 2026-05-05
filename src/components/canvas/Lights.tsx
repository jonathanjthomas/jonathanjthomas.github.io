'use client'

/**
 * Lights Component
 * Centralized lighting setup for consistent illumination across sections
 * Provides environment with 3 key lights:
 * - Ambient: soft overall illumination
 * - Key: main directional light from upper right
 * - Fill: secondary light from lower left to reduce harsh shadows
 */

export function Lights() {
  return (
    <>
      {/* Ambient Light - soft overall illumination */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Key Light - main directional light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Fill Light - secondary light to reduce shadows */}
      <directionalLight
        position={[-10, -5, -10]}
        intensity={0.4}
        color="#e8e8ff"
      />

      {/* Back Light - subtle rim lighting for depth */}
      <directionalLight
        position={[0, 0, -15]}
        intensity={0.3}
        color="#c8d8ff"
      />
    </>
  )
}
