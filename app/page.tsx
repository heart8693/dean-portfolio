import Link from "next/link"
import Image from "next/image"
// 아래 경로가 다르면 네 projects.ts 위치로만 바꿔줘 (이 파일에서 유일하게 손댈 수 있는 줄)
import { getFeatured, type Project } from "lib/cms.ts"

export default function Home() {
  const projects = getFeatured()

  return (
    <main id="main">
      {/* ── Hero: 3행 순차 점등, 전부 잉크 ── */}
      <section
        aria-label="Introduction"
        className="mx-auto max-w-[1100px] px-6 pb-24 pt-28 md:pb-32 md:pt-36"
      >
        <h1
          className="reveal-line font-semibold text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-display)",
            letterSpacing: "var(--track-display)",
            lineHeight: 1.04,
          }}
        >
          Dean Yoo. Product designer in&nbsp;Chicago.
        </h1>
        <p
          className="reveal-line mt-8 max-w-[52ch] font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-lede)",
            letterSpacing: "var(--track-lede)",
            lineHeight: 1.35,
          }}
        >
          I make hidden information visible at the moment of decision:
        </p>
        <p
          className="reveal-line mt-2 max-w-[56ch] font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-lede)",
            letterSpacing: "var(--track-lede)",
            lineHeight: 1.45,
          }}
        >
          <Link href="/work/biasly" className="link-quiet">bias before you read</Link>
          ,{" "}
          <Link href="/work/ride-availability" className="link-quiet">dock status before you ride</Link>
          ,{" "}
          <Link href="/work/triage" className="link-quiet">AI confidence before you accept</Link>
          .
        </p>
      </section>

      {/* ── Selected work: 흑백 → hover 컬러 리빌 ── */}
      <section
        id="work"
        aria-label="Selected work"
        className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-8 gap-y-16 px-6 md:grid-cols-2"
      >
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
    </main>
  )
}

function ProjectCard({ project }: { project: Project }) {
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
        <div className="relative aspect-[16/10]">
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3
          className="card-title font-semibold text-[color:var(--ink)] transition-colors duration-150"
          style={{ fontSize: "var(--text-title)", letterSpacing: "-0.02em" }}
        >
          {project.title}
        </h3>
        <span className="shrink-0 text-[13px] tabular-nums text-[color:var(--ink-3)]">
          {project.year} · {project.category}
        </span>
      </div>
      <p className="mt-1.5 max-w-[58ch] text-[15px] leading-relaxed text-[color:var(--ink-2)]">
        {project.description}
      </p>
    </Link>
  )
}