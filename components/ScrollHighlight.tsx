'use client'
import { useEffect, useRef, useState } from 'react'

export default function ScrollHighlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.8, rootMargin: '0px 0px -80px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      style={{
        color: active ? 'var(--accent-text)' : 'inherit',
        transition: 'color 250ms ease-out',
        fontWeight: active ? 600 : 'inherit',
      }}
    >
      {children}
    </span>
  )
}
