'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * 전체 이야기. 기본 접힘. 위치: components/CaseStory.tsx
 *
 * 왜 접는가
 *   이 구간은 이미지가 하나도 없는 순수 텍스트 250단어다.
 *   펼쳐두면 케이스가 34% 길어지고 밀도 문제를 정면으로 악화시킨다.
 *   훑는 사람은 지나가고 깊이 보는 사람만 편다.
 *
 * 왜 커서 알약인가
 *   summary 는 SectionLabel 과 글꼴·크기·색이 완전히 같다.
 *   밑줄과 알약이 없으면 누를 수 있다는 신호가 화살표 하나뿐이라
 *   훑는 사람은 그냥 또 하나의 섹션 라벨로 보고 지나간다.
 */

type Props = { heading: string; children: ReactNode }

export default function CaseStory({ heading, children }: Props) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)
  const pill = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  /* 위치는 state 가 아니라 transform 으로 직접 쓴다.
     마우스 이동마다 리렌더하면 프레임을 흘린다. */
  useEffect(() => {
    if (!hover) return
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const el = pill.current
        if (!el) return
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [hover])

  return (
    <>
      <details
        className="case-story"
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary
          onMouseEnter={(e) => {
            /* 첫 프레임부터 제자리에 두지 않으면 화면 좌상단에서 날아온다. */
            const el = pill.current
            if (el) {
              el.style.left = `${e.clientX}px`
              el.style.top = `${e.clientY}px`
            }
            setHover(true)
          }}
          onMouseLeave={() => { setHover(false); setPress(false) }}
          onMouseDown={() => setPress(true)}
          onMouseUp={() => setPress(false)}
        >
          <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="case-story-caret">
            <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* 동사가 앞에 온다. 명사만 있으면 라벨로 읽히고 동사가 있으면
              할 일로 읽힌다. 열린 뒤에 Read 가 남아 있으면 거짓말이 된다.
              cms 의 heading 은 문장 첫머리 기준이라 The 로 시작한다.
              동사 뒤에 붙일 때는 첫 글자를 낮춰야 Read The 가 안 된다. */}
          <span className="case-story-label">
            {open ? 'Hide' : 'Read'} {heading.charAt(0).toLowerCase() + heading.slice(1)}
          </span>
        </summary>

        <div className="case-story-body">{children}</div>
      </details>

      {/* 알약은 details 밖에 둔다. 안에 두면 접혔을 때 같이 사라진다. */}
      <div ref={pill} className="case-story-cursor"
        data-on={hover ? 'true' : 'false'} data-press={press ? 'true' : 'false'} aria-hidden>
        {/* 사이트의 목소리는 명령이 아니라 초대다.
            Open the prototype · Toggle to see what moved · Supervised by
            Nero, Hiro & Pingpong. Check it out 은 광고 문구고
            Enough 는 퉁명스러워서 둘 다 어긋났다.
            문구가 이미 따뜻하니 아이콘도 뺀다. */}
        {open ? 'That is the longer version' : 'If you want the longer version'}
      </div>
    </>
  )
}