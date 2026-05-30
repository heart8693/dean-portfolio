'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Sub = { id: string; label: string }
type Section = { id: string; label: string; sub?: Sub[] }

// Active indicator color. Swap to 'var(--accent)' if you'd rather match each project's accent.
const ACTIVE = '#3b82f6'

export default function CaseStudyNav({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? '')
  const [activeSub, setActiveSub] = useState<string>('')

  useEffect(() => {
    const sectionIds = sections.map(s => s.id)

    let ticking = false
    const compute = () => {
      ticking = false
      const threshold = 120 // px from top of viewport

      // Active section = last section element whose top has scrolled past the threshold
      let curSection = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) curSection = id
      }
      setActiveSection(curSection)

      // Active sub = last sub-heading in the current section past the threshold
      const subs = sections.find(s => s.id === curSection)?.sub ?? []
      let curSub = subs[0]?.id ?? ''
      for (const sub of subs) {
        const el = document.getElementById(sub.id)
        if (el && el.getBoundingClientRect().top <= threshold) curSub = sub.id
      }
      setActiveSub(curSub)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  return (
    <aside className="cs-nav" style={{
      width: '224px', flexShrink: 0,
      position: 'sticky', top: '60px',
      height: 'calc(100vh - 60px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--border)',
      padding: '40px 0',
      transition: 'border-color 0.25s ease',
    }}>
      <Link href="/" className="tj-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', textDecoration: 'none', marginBottom: '32px', padding: '0 20px', transition: 'color 0.15s ease' }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      {sections.map(s => {
        const isActiveSection = s.id === activeSection
        const subs = s.sub ?? []
        return (
          <div key={s.id} style={{ marginBottom: '2px' }}>
            {/* Section label */}
            <a href={'#' + s.id} className="tj-link" style={{
              display: 'block',
              padding: '6px 20px',
              fontSize: '13px',
              color: isActiveSection ? 'var(--text-1)' : 'var(--text-2)',
              fontWeight: isActiveSection ? 600 : 500,
              textDecoration: 'none',
              transition: 'color 0.15s ease, font-weight 0.15s ease',
            }}>
              {s.label}
            </a>

            {/* Sub-items — always mounted, collapsed unless this section is active (smooth expand/collapse) */}
            {subs.length > 0 && (
              <div style={{
                maxHeight: isActiveSection ? subs.length * 30 + 'px' : '0px',
                opacity: isActiveSection ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.32s ease, opacity 0.22s ease',
              }}>
                {subs.map(sub => {
                  const isActiveSub = isActiveSection && sub.id === activeSub
                  return (
                    <a key={sub.id} href={'#' + sub.id} className="tj-link" style={{
                      display: 'block',
                      marginLeft: '20px',
                      paddingLeft: '12px',
                      paddingRight: '20px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      fontSize: '12px',
                      color: isActiveSub ? 'var(--text-1)' : 'var(--text-3)',
                      fontWeight: isActiveSub ? 500 : 400,
                      textDecoration: 'none',
                      borderLeft: isActiveSub ? `2px solid ${ACTIVE}` : '2px solid transparent',
                      transition: 'color 0.15s ease, border-color 0.15s ease',
                    }}>
                      {sub.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      <div style={{ margin: '20px 20px 0', paddingTop: '16px', borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }}>
        <a href="#outcome" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Jump to Outcome
        </a>
      </div>

      {/* Hide the scrollbar but keep it scrollable */}
      <style>{`
        .cs-nav { scrollbar-width: none; -ms-overflow-style: none; }
        .cs-nav::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </aside>
  )
}