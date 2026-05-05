import * as THREE from 'three'

type SceneRefsState = {
  camera: THREE.PerspectiveCamera | null
  heroAvatar: THREE.Group | null
}

const sceneRefs: SceneRefsState = {
  camera: null,
  heroAvatar: null,
}

export function setSceneCamera(camera: THREE.PerspectiveCamera | null) {
  sceneRefs.camera = camera
}

export function getSceneCamera() {
  return sceneRefs.camera
}

export function setHeroAvatar(group: THREE.Group | null) {
  sceneRefs.heroAvatar = group
}

export function getHeroAvatar() {
  return sceneRefs.heroAvatar
}
