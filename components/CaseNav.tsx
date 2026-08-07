'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * 케이스 좌측 레일. 위치: components/CaseNav.tsx
 *
 * 스타일은 globals.css 의 .case-rail-* 에 있다.
 * Tailwind 임의값 클래스는 JIT 스캐너가 놓칠 수 있어 레이아웃을
 * 여기에 두지 않는다. 평범한 CSS 는 생성 실패가 없다.
 *
 * 항목은 자동 생성하지 않고 cms 의 nav 배열이 고른 것만 그린다.
 * 섹션이 열넷까지 있어 전부 나열하면 목록 자체가 스크롤된다.
 */

type NavItem = { id: string; label: string }

export default function CaseNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null)
  const ticking = useRef(false)

  useEffect(() => {
    if (!items.length) return

    /* IntersectionObserver 대신 스크롤 위치로 판정한다.
       관찰자는 섹션이 길면 여러 개가 동시에 교차해 활성 항목이 튄다.
       뷰포트 상단에서 가장 가까운, 이미 지나온 섹션이 현재 위치다. */
    const pick = () => {
      const line = window.scrollY + window.innerHeight * 0.3
      let current: string | null = null
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (!el) continue
        if (el.getBoundingClientRect().top + window.scrollY <= line) current = it.id
      }
      setActive(current)
      ticking.current = false
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(pick)
    }

    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Sections" className="case-rail-inner">
      <Link href="/#work" className="case-rail-back link-reveal">
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <path d="M8.5 3 5 7l3.5 4" stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>

      <ul className="case-rail-list">
        {items.map((it) => (
          <li key={it.id} className="case-rail-item" data-on={active === it.id ? 'true' : 'false'}>
            {/* 활성 표시는 점이다. 글자만 진해지면 훑을 때 안 잡힌다.
                라벨 왼쪽 밖에 두어 목록 정렬을 흔들지 않는다. */}
            <span aria-hidden className="case-rail-dot" />
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? 'true' : undefined}
              className="case-rail-link"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}