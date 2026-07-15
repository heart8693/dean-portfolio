'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * 스크롤 리빌 — 모션 헌장 v1의 진입 문법(fade + 14px rise)을 스크롤에 적용.
 * 파일 위치: app/about/Reveal.tsx (page.tsx가 './Reveal'로 import)
 *
 * 원칙:
 * - fail-visible: 서버 HTML엔 숨김 클래스가 없다. JS가 없거나 실패하면
 *   아무 일도 일어나지 않고 콘텐츠는 그대로 보인다.
 * - 로드 시 이미 뷰포트 안에 있는 요소는 애니메이션하지 않는다(팝인 금지).
 *   숨김 클래스는 완전히 폴드 아래에 있는 요소에만 붙는다 → 깜빡임 0프레임.
 * - prefers-reduced-motion이면 관여하지 않는다 (CSS에도 이중 안전장치 있음).
 * - 뷰포트 하단 -10% 라인에서 1회 발화, 재진입 시 재생하지 않는다.
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 조금이라도 보이는 요소는 건드리지 않는다 — 숨겼다 다시 보이는 플래시 방지
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.classList.add('reveal-pending')

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
