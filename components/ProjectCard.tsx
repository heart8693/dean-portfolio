// ─────────────────────────────────────────────────────
// ProjectCard — the visual signature lives here.
// Thumbnails are grayscale; the work reveals its own
// color on hover/focus. The site stays monochrome so
// the work is the only color on the page.
// Drop into components/site/ProjectCard.tsx
// Usage: getFeatured().map(p => <ProjectCard key={p.slug} project={p} />)
//
// 바뀐 것 두 가지
//  1. aspect 16/10 -> 2238/1600. 커버 원본 비율과 맞춰 크롭 제거.
//     16/10 이면 커버 위아래가 각각 101px 씩, 총 12.6% 잘렸다.
//  2. 메타를 모노 13px 로. 케이스 페이지 라벨이 전부 모노라 같은
//     신호 체계가 된다. 큰 산세리프 회색이면 제목의 축소판처럼 보여
//     위계가 애매해진다.
// ─────────────────────────────────────────────────────

import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/lib/cms"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group-card block"
      aria-label={`${project.title} case study`}
    >
      <div
        className="thumb-reveal relative overflow-hidden rounded-[14px] border"
        style={{ borderColor: "var(--hairline)", background: "var(--surface)" }}
      >
        {/* 커버 원본 2238 x 1600 과 동일. object-cover 여도 잘리는 부분이 없다. */}
        <div className="relative" style={{ aspectRatio: "2238 / 1600" }}>
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* items-start + 소량 오프셋. baseline 정렬은 크기가 다른 두 텍스트를
          아래로 어긋나 보이게 한다. 0.5em 은 모노 13px 기준 약 6.5px 로,
          제목의 캡 높이 상단과 맞는 값. 제목 크기를 바꾸면 여기도 조정. */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3
          className="card-title font-semibold text-[color:var(--ink)] transition-colors duration-150"
          style={{
            fontSize: "var(--text-title)",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>
        <span
          className="shrink-0 font-mono text-[13px] leading-none tabular-nums text-[color:var(--ink-3)]"
          style={{ marginTop: "0.5em" }}
        >
          {project.year} · {project.category}
        </span>
      </div>

      <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-[color:var(--ink-2)]">
        {project.description}
      </p>
    </Link>
  )
}