// ─────────────────────────────────────────────────────
// ProjectCard — the visual signature lives here.
// Thumbnails are grayscale; the work reveals its own
// color on hover/focus. The site stays monochrome so
// the work is the only color on the page.
// Drop into components/site/ProjectCard.tsx
// Usage: getFeatured().map(p => <ProjectCard key={p.slug} project={p} />)
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
          style={{
            fontSize: "var(--text-title)",
            letterSpacing: "-0.02em",
          }}
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
