// ─────────────────────────────────────────────────────
// Footer. micro-detail 2 of 2 lives here.
// 위치: components/Footer.tsx  (layout.tsx 가 @/components/Footer 로 부른다)
// ─────────────────────────────────────────────────────

/* 연락처는 한 곳에서만 관리한다. About 페이지와 값이 갈리면
   둘 중 하나는 반드시 오래된 값이 된다. */
   const EMAIL = 'hyart2021@gmail.com'
   const LINKEDIN = 'https://www.linkedin.com/in/deanyoo'
   const RESUME = '/Dean-Yoo-Resume.pdf'
   
   const LINKS = [
     { label: 'Email', href: `mailto:${EMAIL}`, external: false },
     { label: 'LinkedIn', href: LINKEDIN, external: true },
     { label: 'Resume', href: RESUME, external: true },
   ]
   
   
   export default function Footer() {
     return (
       <footer className="mt-32 border-t" style={{ borderColor: 'var(--hairline)' }}>
         <div className="mx-auto max-w-[1100px] px-6 py-12">
           {/* 연락 줄이 먼저다. 페이지 끝까지 내려온 사람이 찾는 것은
               저작권 표시가 아니라 연락할 방법이다. */}
           <nav aria-label="Contact" className="flex flex-wrap items-center gap-x-7 gap-y-3">
             {LINKS.map((l) => (
               <a
                 key={l.label}
                 href={l.href}
                 {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                 className="link-reveal inline-flex items-center gap-1.5 text-[15px] font-medium text-[color:var(--ink)]"
               >
                 {l.label}
                 {l.external && (
                   /* 화살표는 문자가 아니라 SVG 다. 유니코드 화살표는 브라우저에 따라
                      이모지 폰트로 떨어져 색이 상속되지 않고 획 굵기도 본문과 어긋난다. */
                   <svg
                     aria-hidden
                     width="11"
                     height="11"
                     viewBox="0 0 12 12"
                     fill="none"
                     className="shrink-0 translate-y-[0.5px]"
                   >
                     <path
                       d="M3 9L9 3M9 3H4.2M9 3V7.8"
                       stroke="currentColor"
                       strokeWidth="1.4"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     />
                   </svg>
                 )}
               </a>
             ))}
           </nav>
   
           <div className="mt-8 flex flex-col gap-2 text-[13px] text-[color:var(--ink-3)] md:flex-row md:items-center md:justify-between">
             <p>© 2026 Dean Yoo · Designed and built by me</p>
             <p>Supervised by Nero, Hiro &amp; Pingpong 🐾</p>
           </div>
         </div>
       </footer>
     )
   }