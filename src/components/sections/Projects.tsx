'use client'

/**
 * Projects Section
 * 3D galaxy view with focus-on-scroll
 */

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { projects } from '@/data/projects'
import { createScrollTimeline, refreshScrollTriggers } from '@/lib/gsap'
import { getSceneCamera, getSceneInvalidate } from '@/lib/sceneRefs'
import { useStore } from '@/lib/store'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const floatingCardRef = useRef<HTMLDivElement>(null)

  const hoveredProject = useStore((state) => state.hoveredProject)

  const projectMap = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    []
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const camera = getSceneCamera()
    if (!camera) return

    const waypoints: THREE.Vector3[] = [
      new THREE.Vector3(0, 0.6, 8.6),
      ...projects.map(
        (project) => new THREE.Vector3(project.position.x * 0.7, project.position.y + 0.25, project.position.z + 2.4)
      ),
      new THREE.Vector3(0.3, -1.1, 7.2),
    ]

    const progress = { t: 0 }
    const segmentCount = waypoints.length - 1

    const timeline = createScrollTimeline(section, {
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    })

    if (!timeline) return

    timeline.to(progress, {
      t: 1,
      ease: 'none',
      onUpdate: () => {
        const scaled = progress.t * segmentCount
        const index = Math.min(segmentCount - 1, Math.max(0, Math.floor(scaled)))
        const localT = scaled - index

        const current = waypoints[index]
        const next = waypoints[index + 1]
        const cameraPos = current.clone().lerp(next, localT)

        camera.position.copy(cameraPos)

        const targetProjectIndex = Math.min(projects.length - 1, Math.max(0, index - 1))
        const lookTarget = new THREE.Vector3(
          projects[targetProjectIndex]?.position.x ?? 0,
          projects[targetProjectIndex]?.position.y ?? 0,
          projects[targetProjectIndex]?.position.z ?? -9
        )

        camera.lookAt(lookTarget)
        getSceneInvalidate()?.()
      },
    })

    refreshScrollTriggers()

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    const card = floatingCardRef.current
    if (!card) return

    let rafId = 0

    const updatePosition = () => {
      const camera = getSceneCamera()
      if (!camera || !hoveredProject) {
        card.style.opacity = '0'
        rafId = window.requestAnimationFrame(updatePosition)
        return
      }

      const project = projectMap.get(hoveredProject)
      if (!project) {
        card.style.opacity = '0'
        rafId = window.requestAnimationFrame(updatePosition)
        return
      }

      const projected = new THREE.Vector3(
        project.position.x,
        project.position.y,
        project.position.z
      ).project(camera)

      const x = (projected.x * 0.5 + 0.5) * window.innerWidth
      const y = (-projected.y * 0.5 + 0.5) * window.innerHeight

      const isVisible = projected.z < 1 && projected.z > -1
      card.style.opacity = isVisible ? '1' : '0'
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`

      rafId = window.requestAnimationFrame(updatePosition)
    }

    rafId = window.requestAnimationFrame(updatePosition)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [hoveredProject, projectMap])

  const activeProject = hoveredProject ? projectMap.get(hoveredProject) : null

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-slate-50 px-6 py-20 md:px-12 dark:bg-slate-900"
    >
      <div
        ref={floatingCardRef}
        className="pointer-events-none fixed left-0 top-0 z-30 w-80 -translate-x-1/2 -translate-y-[115%] rounded-xl border border-sky-300/80 bg-white/90 p-4 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 dark:border-sky-600 dark:bg-slate-900/80"
      >
        {activeProject ? (
          <>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{activeProject.title}</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{activeProject.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={`${activeProject.id}-${tech}`}
                  className="rounded-full border border-sky-300 bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            {activeProject.github ? (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-sky-700 underline decoration-sky-400 underline-offset-4 dark:text-sky-300"
              >
                View on GitHub
              </a>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">Hover a project node in the galaxy to inspect details.</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Projects
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          A universe of work across AI, machine learning, and full-stack development
        </p>

        <div className="rounded-xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/70">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Galaxy Navigation
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Scrolling pilots the camera through the project universe. Hover any highlighted node to reveal
            an anchored floating card with project details and links.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg border p-3 transition-colors ${
                  hoveredProject === project.id
                    ? 'border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-900/30'
                    : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{project.title}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{project.technologies.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
