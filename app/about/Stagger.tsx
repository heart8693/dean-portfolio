'use client'

import { Children, useEffect, useRef, type ReactNode } from 'react'

/**
 * 순차 리빌. Reveal 과 같은 진입 문법(fade + 14px rise)을 자식마다 지연시켜 적용.
 * 파일 위치: app/about/Stagger.tsx
 *
 * Reveal 은 섹션을 한 덩어리로 올린다. 행이 여러 개인 목록에서는 그것이
 * "한 장의 이미지가 나타났다"로 읽혀서, 항목이 여럿이라는 사실이 전달되지 않는다.
 * 여기서는 항목을 순서대로 들여보내 목록임을 먼저 알린다.
 *
 * Reveal 의 원칙을 그대로 지킨다.
 * - fail-visible: 서버 HTML 에 숨김이 없다. JS 가 죽으면 그냥 다 보인다.
 * - 로드 시 이미 뷰포트에 걸친 요소는 건드리지 않는다. 팝인 금지.
 * - prefers-reduced-motion 이면 관여하지 않는다.
 * - 1회 발화. 재진입해도 다시 재생하지 않는다.
 *
 * step 은 60ms 가 기본이다. 그보다 크면 마지막 항목을 기다리게 되고,
 * 작으면 순차라는 사실이 읽히지 않는다.
 * cap 은 총 지연의 상한이다. 항목이 많아도 마지막 항목이 0.5초 안에 들어온다.
 */
export default function Stagger({
  children,
  step = 60,
  cap = 480,
  className,
}: {
  children: ReactNode
  step?: number
  cap?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(el.children) as HTMLElement[]
    if (!items.length) return

    /* 조금이라도 보이면 숨기지 않는다. 숨겼다 되돌리면 깜빡인다. */
    if (el.getBoundingClientRect().top < window.innerHeight) return

    for (const item of items) {
      item.style.opacity = '0'
      item.style.transform = 'translateY(14px)'
      item.style.willChange = 'opacity, transform'
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        items.forEach((item, i) => {
          const delay = Math.min(i * step, cap)
          item.style.transition =
            `opacity 520ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,` +
            `transform 520ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          item.style.opacity = '1'
          item.style.transform = 'none'
          /* 전환이 끝나면 힌트를 거둔다. 남겨두면 레이어가 계속 승격된다. */
          window.setTimeout(() => {
            item.style.willChange = ''
          }, 520 + delay + 60)
        })
        io.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [step, cap])

  /* 자식이 하나뿐이면 순차가 성립하지 않는다. 그대로 통과시킨다. */
  if (Children.count(children) < 2) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}