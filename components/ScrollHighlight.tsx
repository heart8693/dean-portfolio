'use client'
import { useEffect, useRef, useState } from 'react'

/* Inline phrase highlight for case study copy.
   Key phrases sit at a constant 600 weight (bold-marked for skimmers even
   without scrolling) and darken from body ink-2 to ink as they enter view.
   The weight NEVER changes, so activation is color-only: zero reflow,
   zero scroll jank. Same language as the hero reveal: lines light up.

   One shared IntersectionObserver serves every <H> on the page (a case
   study renders dozens). Activation is one-way; activated phrases are
   unobserved immediately. */
let observer: IntersectionObserver | null = null
const onEnter = new Map<Element, () => void>()

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onEnter.get(entry.target)?.()
            onEnter.delete(entry.target)
            observer!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -80px 0px' }
    )
  }
  return observer
}

export default function ScrollHighlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    onEnter.set(el, () => setActive(true))
    io.observe(el)
    return () => {
      onEnter.delete(el)
      io.unobserve(el)
    }
  }, [])

  return (
    <span
      ref={ref}
      style={{
        color: active ? 'var(--ink)' : 'inherit',
        fontWeight: 600,
        transition: 'color 250ms ease-out',
      }}
    >
      {children}
    </span>
  )
}