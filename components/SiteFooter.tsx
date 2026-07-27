// SiteFooter — the last line of the page gets a little personality.
// Locked skin: hairline top border, ink-3 small text, one paw sticker.
//
// INSTALL
// 1. This file → components/SiteFooter.tsx
// 2. In app/layout.tsx, mount it once below {children}:
//      import SiteFooter from '@/components/SiteFooter'
//      ...
//      {children}
//      <SiteFooter />
// 3. paw.png must exist at public/stickers/paw.png (already there)

export default function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t px-6"
      style={{ borderColor: 'var(--hairline, #E6E8EC)' }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 py-10 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-[13px] text-[color:var(--ink-3)]">
          &copy; {new Date().getFullYear()} Dean Yoo
        </p>

        <p className="flex items-center gap-2.5 text-[13px] text-[color:var(--ink-3)]">
          Made in Chicago, supervised by three cats.
          <img
            src="/stickers/paw.png"
            alt=""
            aria-hidden
            width={30}
            height={30}
            className="inline-block"
            style={{
              transform: 'rotate(10deg)',
              filter: 'drop-shadow(0 3px 8px rgba(10, 10, 12, 0.14))',
            }}
          />
        </p>
      </div>
    </footer>
  )
}
