// TryPrototypeCta.tsx — drop into your components dir, render inside the case
// page wherever project.tryPrototype exists (recommended: directly above the
// usability testing section). Matches the locked skin: cobalt interactive only,
// no new patterns.
//
// Usage in the case page:
//   {project.tryPrototype && <TryPrototypeCta data={project.tryPrototype} />}

import type { TryPrototype } from "@/lib/cms"

export default function TryPrototypeCta({ data }: { data: TryPrototype }) {
  return (
    <div className="my-10 flex flex-col items-start gap-2">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#2055E6] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1A46C2]"
      >
        {data.label}
        <span aria-hidden>↗</span>
      </a>
      {data.note && (
        <p className="text-[13px] leading-relaxed text-[color:var(--ink-3,#8b8b92)]">
          {data.note}
        </p>
      )}
    </div>
  )
}
