'use client'

import Link from 'next/link'
import { getCaseNeighbors } from '@/lib/cms'

/**
 * 케이스 끝의 다음·이전 프로젝트. 위치: components/CaseFooterNav.tsx
 *
 * Reflection 으로 끝나면 읽던 사람이 갈 곳이 뒤로가기밖에 없다.
 * 여기서 바로 다음 케이스로 넘어가면 한 번 온 사람이 두 번째 케이스를
 * 볼 확률이 올라간다. 채용 담당자는 보통 한 개만 보고 닫는다.
 *
 * 순서는 casesV2 키 순서이고 순환한다. 마지막 케이스에서 다음을 누르면
 * 첫 케이스로 돌아간다. 막다른 길을 만들지 않는다.
 */

export default function CaseFooterNav({ slug }: { slug: string }) {
  const n = getCaseNeighbors(slug)
  if (!n) return null

  const Item = ({
    to,
    dir,
  }: {
    to: { slug: string; title: string; meta: string }
    dir: 'prev' | 'next'
  }) => {
    const isNext = dir === 'next'
    return (
      <Link
        href={`/work/${to.slug}`}
        className="group block py-8"
        style={{ textAlign: isNext ? 'right' : 'left' }}
      >
        <span
          className="font-mono text-[13px] uppercase tracking-[0.06em]"
          style={{ color: 'var(--ink-3)' }}
        >
          {isNext ? 'Next' : 'Previous'}
        </span>

        <span
          className="mt-3 flex items-baseline gap-2"
          style={{ justifyContent: isNext ? 'flex-end' : 'flex-start' }}
        >
          {!isNext && <Arrow dir="left" />}
          {/* 제목은 21px. 본문 소제목과 같은 크기라 목적지가 섹션이
              아니라 다른 프로젝트라는 게 크기만으로도 읽힌다. */}
          <span
            className="text-[21px] leading-[1.3] tracking-[-0.02em] transition-colors duration-200"
            style={{ color: 'var(--ink)' }}
          >
            {to.title}
          </span>
          {isNext && <Arrow dir="right" />}
        </span>

        <span
          className="mt-2 block font-mono text-[13px]"
          style={{ color: 'var(--ink-3)' }}
        >
          {to.meta}
        </span>
      </Link>
    )
  }

  return (
    <nav
      aria-label="More projects"
      className="case-col case-section pb-24"
      style={{ borderTop: '1px solid var(--hairline)' }}
    >
      <div className="case-footer-nav">
        <Item to={n.prev} dir="prev" />
        <Item to={n.next} dir="next" />
      </div>
    </nav>
  )
}

/* 화살표는 hover 에서 진행 방향으로 3px 움직인다. 링크가 어디로
   가는지 색 변화 없이도 알 수 있다. */
function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 translate-y-[1px] transition-transform duration-200 ${
        dir === 'right'
          ? 'group-hover:translate-x-[3px]'
          : 'group-hover:-translate-x-[3px]'
      }`}
      style={{ color: 'var(--ink-3)' }}
    >
      <path
        d={dir === 'right' ? 'M3 8h9M9 4.5 12.5 8 9 11.5' : 'M13 8H4M7 4.5 3.5 8 7 11.5'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
