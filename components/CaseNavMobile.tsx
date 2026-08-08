'use client'

import { useEffect, useRef, useState } from 'react'
import type { V2NavItem } from '@/lib/cms'

/**
 * 모바일·태블릿용 섹션 이동. 위치: components/CaseNavMobile.tsx
 *
 * 사이드 레일은 1240px 미만에서 완전히 숨는다. 그래서 좁은 화면에는
 * 케이스 안을 이동할 수단이 아예 없었다. 케이스가 10 스크롤이 넘으니
 * 훑는 사람이 중간에서 길을 잃는다.
 *
 * 우하단 알약을 눌러 펼치는 방식이다. 화면을 늘 가리지 않으면서
 * 엄지가 닿는 자리에 있다.
 */

export default function CaseNavMobile({ items }: { items: V2NavItem[] }) {
  const [live, setLive] = useState<V2NavItem[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [shown, setShown] = useState(false)
  const raf = useRef(0)

  /* 레일과 같은 규칙으로 죽은 앵커를 거른다. */
  useEffect(() => {
    setLive(items.filter((it) => document.getElementById(it.id)))
  }, [items])

  /* 스크롤 위치로 현재 섹션을 정한다. IntersectionObserver 는
     섹션이 길면 경계에서 값이 튄다. */
  useEffect(() => {
    if (!live.length) return
    const onScroll = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        /* 히어로를 지나야 뜬다. 처음부터 떠 있으면 첫인상을 가린다.
           그리고 다음·이전 블록에 닿으면 다시 숨는다. 거기까지 왔으면
           케이스를 다 읽은 것이고, 알약이 남아 있으면 마지막 줄을 가린다. */
        const end = document.querySelector('.case-footer-nav-wrap')
        const endTop = end
          ? (end as HTMLElement).getBoundingClientRect().top + window.scrollY
          : Infinity
        const past = window.scrollY + window.innerHeight > endTop + 40
        setShown(window.scrollY > 600 && !past)
        const line = window.scrollY + 140
        let cur = live[0].id
        for (const it of live) {
          const el = document.getElementById(it.id)
          if (el && el.getBoundingClientRect().top + window.scrollY <= line) cur = it.id
        }
        setActive(cur)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf.current)
    }
  }, [live])

  /* 펼친 상태에서 Esc 로 닫는다. 바깥을 누르면 오버레이가 받는다. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (live.length < 2) return null

  const activeLabel = live.find((it) => it.id === active)?.label ?? live[0].label

  return (
    <div className="case-navm" data-shown={shown ? 'true' : 'false'}>
      {/* 펼쳤을 때 뒤를 덮는다. 바깥을 눌러 닫는 통로이기도 하다. */}
      {open && <button className="case-navm-veil" aria-label="Close section list"
        onClick={() => setOpen(false)} />}

      {open && (
        <nav className="case-navm-sheet" aria-label="Sections">
          {live.map((it) => (
            <a key={it.id} href={`#${it.id}`}
              className="case-navm-link"
              data-active={it.id === active ? 'true' : 'false'}
              onClick={() => setOpen(false)}>
              {it.label}
            </a>
          ))}
        </nav>
      )}

      <button className="case-navm-pill" onClick={() => setOpen((v) => !v)}
        aria-expanded={open} aria-label={open ? 'Close section list' : 'Open section list'}>
        {/* 닫혀 있을 때 현재 섹션을 보여준다. 버튼이 위치 표시를
            겸하면 굳이 열어보지 않아도 어디쯤인지 안다. */}
        <span className="case-navm-label">{open ? 'Close' : activeLabel}</span>
        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="case-navm-caret">
          <path d={open ? 'M3 3l6 6M9 3l-6 6' : 'M2.5 4.5 6 8l3.5-3.5'}
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
