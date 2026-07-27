import Link from "next/link"
import Image from "next/image"
// 아래 경로가 다르면 네 projects.ts 위치로만 바꿔줘 (이 파일에서 유일하게 손댈 수 있는 줄)
import { getFeatured, type Project } from "@/lib/cms"
import { CursorTag, ToolDock, StickerField, HeroOverlays } from "@/components/WelcomeKit"
import SelectedWord from "@/components/SelectedWord";

export default function Home() {
  const projects = getFeatured()

  return (
    <main id="main">
      {/* ── Hero: 인사 → 온기 → 증거 트리오, 3행 순차 점등 유지 ── */}
      <section
        aria-label="Introduction"
        className="relative mx-auto flex min-h-[100svh] max-w-[1100px] flex-col items-center justify-center px-6 pb-12 pt-36 text-center md:pt-44"
      >
        <CursorTag />
        <StickerField />
        <HeroOverlays />

        <p
          className="reveal-line mb-5 text-[12px] font-semibold uppercase text-[color:var(--ink-3)]"
          style={{ letterSpacing: "0.14em" }}
        >
          <span style={{ color: "var(--accent)" }}>&#10022;</span>&nbsp;&nbsp;UX Design Portfolio&nbsp;&nbsp;<span style={{ color: "var(--accent)" }}>&#10022;</span>
        </p>
        <h1
          data-wk="h1"
          className="reveal-line max-w-[16ch] font-semibold text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-display)",
            letterSpacing: "var(--track-display)",
            lineHeight: 1.06,
          }}
        >
          Hi, I&apos;m{' '}
          <span className="wk-dean">
            Dean!
            <svg className="wk-loop" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M10 36 C4 14 30 3 52 5 C80 7 98 15 95 32 C92 51 62 58 40 55 C18 52 4 44 12 26" />
            </svg>
          </span>{' '}
          Product designer in&nbsp;Chicago.
        </h1>
        <p
          data-wk="lede"
          className="reveal-line mt-8 max-w-[54ch] font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-lede)",
            letterSpacing: "var(--track-lede)",
            lineHeight: 1.4,
          }}
        >
          Designed with care. Tested twice. Celebrated <SelectedWord>loudly.</SelectedWord>
        </p>
        <p
          data-wk="lately"
          className="reveal-line mt-2 max-w-[52ch] font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "var(--text-lede)",
            letterSpacing: "var(--track-lede)",
            lineHeight: 1.45,
          }}
        >
          Lately:{" "}
          <Link href="/work/biasly" className="link-quiet">bias before you read</Link>
          ,{" "}
          <Link href="/work/ride-availability" className="link-quiet">docks before you ride</Link>
          ,{" "}
          <Link href="/work/triage" className="link-quiet">AI before you accept</Link>
          .
        </p>

        <div className="reveal-line mt-2">
          <ToolDock />
        </div>
      </section>

      {/* ── Selected work: 흑백 → hover 컬러 리빌 ── */}
      <section
        id="work"
        aria-label="Selected work"
        className="mx-auto max-w-[1100px] px-6 pb-24 pt-10 md:pt-14"
      >
        <p
          className="mb-12 text-center text-[12px] font-semibold uppercase text-[color:var(--ink-3)]"
          style={{ letterSpacing: "0.14em" }}
        >
          <span style={{ color: "var(--accent)" }}>&#10022;</span>&nbsp;&nbsp;Selected Work&nbsp;&nbsp;<span style={{ color: "var(--accent)" }}>&#10022;</span>
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
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