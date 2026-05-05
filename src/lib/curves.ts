/**
 * Curve generators for section transitions and camera paths
 */

import * as THREE from 'three'

/**
 * Generate a smooth curve through experience checkpoints
 * Used for camera movement along the experience path
 */
export function generateExperienceCurve(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 0, 5), // Start (near hero exit)
    new THREE.Vector3(2, 1, 3), // Approaching experience
    new THREE.Vector3(5, 2, 0), // Current role (Bayut/Dubizzle)
    new THREE.Vector3(3, 0.5, -3), // Previous role (UST Global)
    new THREE.Vector3(0, -1, -5), // Transitioning out
  ]

  return new THREE.CatmullRomCurve3(points)
}

/**
 * Generate waypoints for project galaxy camera flight
 * Each waypoint corresponds to a project focus point
 */
export function generateProjectWaypoints(projectCount: number): THREE.Vector3[] {
  const waypoints = [
    new THREE.Vector3(0, 0, 10), // Start: galaxy overview
  ]

  // Generate waypoints in a spiral pattern for smooth transitions
  for (let i = 0; i < projectCount; i++) {
    const angle = (i / projectCount) * Math.PI * 2
    const radius = 3 + (i / projectCount) * 2
    const height = Math.sin((i / projectCount) * Math.PI) * 3

    waypoints.push(
      new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    )
  }

  waypoints.push(new THREE.Vector3(0, -3, 5)) // End: footer view
  return waypoints
}

/**
 * Generate a tube geometry for visualizing a path
 */
export function generatePathTube(
  curve: THREE.CatmullRomCurve3,
  tubularSegments = 200,
  radius = 0.3,
  radialSegments = 8
): THREE.TubeGeometry {
  return new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments)
}

/**
 * Get point on curve at normalized time (0-1)
 */
export function getCurvePoint(curve: THREE.CatmullRomCurve3, t: number): THREE.Vector3 {
  return curve.getPointAt(Math.max(0, Math.min(1, t)))
}

/**
 * Get tangent on curve at normalized time (0-1)
 * Useful for camera "look ahead" direction
 */
export function getCurveTangent(
  curve: THREE.CatmullRomCurve3,
  t: number
): THREE.Vector3 {
  const delta = 0.0001
  const p1 = curve.getPointAt(Math.max(0, Math.min(1, t - delta)))
  const p2 = curve.getPointAt(Math.max(0, Math.min(1, t + delta)))
  return p2.clone().sub(p1).normalize()
}
