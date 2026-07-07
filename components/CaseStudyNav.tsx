'use client'
import { useEffect, useRef, useState } from 'react'

type SubItem = { id: string; label: string }
type Section = { id: string; label: string; sub: SubItem[] }

/* Case study table of contents.
   v3 skin: no blocks, no fills. A hairline rail, quiet type, and a single
   2px ink bar marking the current position. Cobalt appears on hover only.

   Accordion behavior: sub-items stay collapsed and only the section you
   are currently reading expands. Expansion is instant (content snap);
   the indicator slide is the one animated element.

   Performance contract:
   - Scroll path does zero layout reads. Section offsets are cached once and
     re-measured only when the page height actually changes (lazy images,
     resize), via ResizeObserver on <body>.
   - The indicator moves with transform only, so its motion never triggers
     layout or paint beyond compositing. */
export default function CaseStudyNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const indicatorRef = useRef<HTMLSpanElement | null>(null)
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>())

  useEffect(() => {
    const ids = sections.flatMap(s => [s.id, ...s.sub.map(x => x.id)])
    let tops: { id: string; top: number }[] = []
    let ticking = false

    const update = () => {
      /* Activation line: a quarter down the viewport, past the nav pill. */
      const line = window.scrollY + Math.max(120, window.innerHeight * 0.25)
      let current: string | null = tops.length ? tops[0].id : null
      for (const t of tops) {
        if (t.top <= line) current = t.id
        else break
      }
      setActiveId(prev => (prev === current ? prev : current))
    }

    const measure = () => {
      tops = ids
        .map(id => {
          const el = document.getElementById(id)
          return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null
        })
        .filter((t): t is { id: string; top: number } => t !== null)
        .sort((a, b) => a.top - b.top)
      update()
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)

    /* Lazy images and videos change section offsets as they load. */
    const ro = new ResizeObserver(() => requestAnimationFrame(measure))
    ro.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [sections])

  /* Which section owns the current position (itself, or the parent of an
     active sub-item). Its sub list is the only one expanded. */
  const activeParent = (() => {
    if (!activeId) return null
    for (const s of sections) {
      if (s.id === activeId) return s.id
      if (s.sub.some(x => x.id === activeId)) return s.id
    }
    return null
  })()

  /* Indicator position: measured only when the active item changes, and
     after the accordion has committed, so offsets are already settled. */
  useEffect(() => {
    const bar = indicatorRef.current
    if (!bar) return
    const link = activeId ? linkRefs.current.get(activeId) : null
    if (!link) {
      bar.style.opacity = '0'
      return
    }
    const y = link.offsetTop + link.offsetHeight / 2 - 8
    bar.style.transform = `translateY(${y}px)`
    bar.style.opacity = '1'
  }, [activeId, activeParent])

  const setLinkRef = (id: string) => (el: HTMLAnchorElement | null) => {
    if (el) linkRefs.current.set(id, el)
    else linkRefs.current.delete(id)
  }

  return (
    <aside
      className="csnav"
      style={{
        width: '224px',
        flexShrink: 0,
        position: 'sticky',
        top: '88px',
        maxHeight: 'calc(100vh - 112px)',
        overflowY: 'auto',
        padding: '4px 0 40px',
      }}
    >
      <nav
        aria-label="Case study sections"
        style={{ position: 'relative', borderLeft: '1px solid var(--hairline)' }}
      >
        {/* Current position: 2px ink bar on the rail, transform-only motion */}
        <span
          ref={indicatorRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-1px',
            top: 0,
            width: '2px',
            height: '16px',
            background: 'var(--ink)',
            opacity: 0,
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease',
            willChange: 'transform',
          }}
        />
        {sections.map(s => {
          const parentActive = s.id === activeId
          const expanded = s.id === activeParent && s.sub.length > 0
          return (
            <div key={s.id}>
              <a
                href={`#${s.id}`}
                ref={setLinkRef(s.id)}
                aria-current={parentActive ? 'location' : undefined}
                className={`csnav-link${parentActive ? ' is-active' : ''}${expanded && !parentActive ? ' is-trail' : ''}`}
                style={{
                  display: 'block',
                  padding: '7px 0 7px 18px',
                  fontSize: '13px',
                  letterSpacing: '0.01em',
                  lineHeight: 1.35,
                }}
              >
                {s.label}
              </a>
              {expanded &&
                s.sub.map(x => {
                  const subActive = x.id === activeId
                  return (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      ref={setLinkRef(x.id)}
                      aria-current={subActive ? 'location' : undefined}
                      className={`csnav-link${subActive ? ' is-active' : ''}`}
                      style={{
                        display: 'block',
                        padding: '5px 0 5px 32px',
                        fontSize: '12px',
                        letterSpacing: '0.01em',
                        lineHeight: 1.35,
                      }}
                    >
                      {x.label}
                    </a>
                  )
                })}
            </div>
          )
        })}
      </nav>

      <style>{`
        .csnav-link {
          color: var(--ink-3);
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .csnav-link:hover { color: var(--accent); }
        .csnav-link.is-active { color: var(--ink); font-weight: 600; }
        .csnav-link.is-trail { color: var(--ink); }
        @media (max-width: 1024px) { .csnav { display: none; } }
      `}</style>
    </aside>
  )
}