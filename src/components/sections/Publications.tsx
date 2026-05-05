'use client'

/**
 * Publications Section
 * Academic-style chronological timeline
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { publications } from '@/data/publications'
import { formatDate } from '@/lib/utils'
import { refreshScrollTriggers, ScrollTrigger } from '@/lib/gsap'

export function Publications() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const timelineLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    const line = timelineLineRef.current
    if (!cards.length || !line) return

    const ctx = gsap.context(() => {
      gsap.set(cards, { y: 50, opacity: 0 })
      gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })

      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: true,
        },
      })

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            end: 'top 52%',
            scrub: true,
          },
        })
      })
    }, section)

    refreshScrollTriggers()

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.vars.trigger as Element | undefined
        if (triggerEl && section.contains(triggerEl)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-white px-6 py-20 md:px-12 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
          Publications
        </h2>
        <p className="mb-12 max-w-2xl text-slate-600 dark:text-slate-400">
          Research and academic contributions
        </p>

        <div className="relative">
          <div
            ref={timelineLineRef}
            className="absolute left-[7.2rem] top-0 h-full w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700/70 dark:from-blue-900 dark:via-blue-600 dark:to-blue-300/70"
          />

          <div className="space-y-8">
            {publications.map((publication, index) => (
              <article
                key={publication.id}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                className="grid grid-cols-[6.25rem_1.5rem_1fr] gap-4"
              >
                <div className="pt-1 text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {formatDate(publication.date)}
                  </p>
                </div>

                <div className="relative flex items-start justify-center pt-1">
                  <span className="mt-1.5 h-3 w-3 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900" />
                </div>

                <div className="rounded-xl border border-slate-200/90 bg-slate-50/85 p-5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/65">
                  <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                    {publication.title}
                  </h3>

                  <p className="mt-1 text-sm italic text-slate-600 dark:text-slate-300">
                    {publication.journal}
                  </p>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {publication.authors.join(', ')}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {publication.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={publication.link ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-100 dark:hover:border-blue-500"
                    >
                      DOI: {publication.doi}
                    </a>
                    <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      PDF thumbnail ready to link
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
