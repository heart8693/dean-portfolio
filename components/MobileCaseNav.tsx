'use client'

// Mobile table of contents for case studies.
// Renders only at <=1024px (where the desktop CaseStudyNav aside is hidden).
// Liquid glass pill bottom-right -> solid bottom sheet with section list.
// Self-contained scroll spy; does not touch CaseStudyNav.

import { useEffect, useRef, useState } from 'react'

type SubSection = { id: string; label: string }
type Section = { id: string; label: string; sub: SubSection[] }

export default function MobileCaseNav({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const [visible, setVisible] = useState(false)
  const ticking = useRef(false)

  // Scroll spy: the last top-level section whose top has passed the 120px line.
  // The pill itself only appears once the reader is past the hero.
  useEffect(() => {
    const ids = sections.map(s => s.id)
    const update = () => {
      ticking.current = false
      setVisible(window.scrollY > 320)
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  // Body scroll lock while the sheet is open + Escape to close.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close first, release the scroll lock, then jump. scroll-margin-top on the
  // section ids (set in page.tsx) keeps the landing offset correct.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.body.style.overflow = ''
    setOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', '#' + id)
    })
  }

  const activeLabel = sections.find(s => s.id === active)?.label ?? 'Contents'

  return (
    <div className="tj-mtoc">
      <button className={'tj-mtoc-pill' + (visible ? ' is-shown' : '')} aria-hidden={!visible} tabIndex={visible ? 0 : -1} aria-expanded={open} aria-label="Open table of contents" onClick={() => setOpen(true)}>
        {/* Lucide: list */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h.01" /><path d="M3 12h.01" /><path d="M3 19h.01" /><path d="M8 5h13" /><path d="M8 12h13" /><path d="M8 19h13" />
        </svg>
        <span>{activeLabel}</span>
      </button>

      {open && (
        <div className="tj-mtoc-layer" role="dialog" aria-modal="true" aria-label="Table of contents">
          <div className="tj-mtoc-scrim" onClick={() => setOpen(false)} />
          <nav className="tj-mtoc-sheet">
            <div className="tj-mtoc-head">
              <p>Contents</p>
              <button aria-label="Close" onClick={() => setOpen(false)}>
                {/* Lucide: x */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {sections.map(s => (
              <div key={s.id}>
                <a href={'#' + s.id} onClick={e => go(e, s.id)} className={'tj-mtoc-item' + (active === s.id ? ' is-active' : '')}>{s.label}</a>
                {s.sub.map(sub => (
                  <a key={sub.id} href={'#' + sub.id} onClick={e => go(e, sub.id)} className="tj-mtoc-sub">{sub.label}</a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .tj-mtoc { display: none; }
        @media (max-width: 1024px) {
          .tj-mtoc { display: block; }
          .tj-mtoc-pill {
            position: fixed; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom));
            z-index: 60; display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 16px; border-radius: 999px; border: 1px solid var(--hairline);
            color: var(--ink); font-size: 13px; font-weight: 600; letter-spacing: -0.01em;
            background: rgba(255, 255, 255, 0.4);
            background: color-mix(in srgb, var(--bg) 45%, transparent);
            -webkit-backdrop-filter: blur(8px) saturate(1.8);
            backdrop-filter: blur(8px) saturate(1.8);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.12);
            cursor: pointer;
            opacity: 0; transform: translateY(8px); pointer-events: none;
            transition: opacity 0.2s ease, transform 0.2s ease;
          }
          .tj-mtoc-pill.is-shown { opacity: 1; transform: none; pointer-events: auto; }
          .tj-mtoc-layer { position: fixed; inset: 0; z-index: 70; }
          .tj-mtoc-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4); animation: tjMtocFade 0.2s ease; }
          .tj-mtoc-sheet {
            position: absolute; left: 0; right: 0; bottom: 0;
            background: var(--bg); border-top: 1px solid var(--hairline);
            border-radius: 20px 20px 0 0;
            padding: 8px 20px calc(20px + env(safe-area-inset-bottom));
            max-height: 70vh; overflow-y: auto;
            animation: tjMtocUp 0.28s cubic-bezier(0.32, 0.72, 0, 1);
          }
          .tj-mtoc-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 0 8px; }
          .tj-mtoc-head p { font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-3); }
          .tj-mtoc-head button { background: none; border: none; color: var(--ink-2); padding: 6px; margin: -6px; cursor: pointer; }
          .tj-mtoc-item { display: block; position: relative; padding: 11px 0 11px 12px; font-size: 15px; font-weight: 500; color: var(--ink-2); text-decoration: none; }
          .tj-mtoc-item.is-active { color: var(--ink); font-weight: 700; }
          .tj-mtoc-item.is-active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 2px; height: 14px; background: var(--ink); border-radius: 1px; }
          .tj-mtoc-sub { display: block; padding: 7px 0 7px 28px; font-size: 13px; color: var(--ink-3); text-decoration: none; }
        }
        @keyframes tjMtocUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes tjMtocFade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}