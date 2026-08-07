'use client';

/**
 * 케이스 스터디 페이지. 네 케이스가 이 한 파일을 공유한다.
 *
 * 이 파일은 레이아웃과 모션만 담당한다. 모든 카피, 이미지 경로, 수치는
 * cms.ts 의 각 CaseV2 에서 관리한다. 케이스별 스타일 분기는 없다.
 * 타이포, 타입 스케일, 간격, 라운딩이 네 케이스에서 동일한 이유가 이것이다.
 *
 * 규칙
 *   - 자간을 늘리지 않는다. 음수 두 단계(-0.03 / -0.02)만 쓴다.
 *   - 대문자 라벨을 쓰지 않는다.
 *   - 간격은 4의 배수. 섹션 간격은 80px.
 *   - 타입 스케일 9종: 13 15 17 21 24 30 40 44 62
 *   - 색은 잉크 / 코발트 / 경고 붉은색 하나 / 헤어라인. 그 외 없음.
 *   - 이미지에 그림자·라운드·배경을 얹지 않는다. PNG 안에 구워져 있다.
 *
 * 필요 패키지: npm i motion
 */

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence, motion, useInView, useMotionValue,
  useReducedMotion, useSpring, useTransform,
} from 'motion/react';
import {
  type CaseV2, type V2Body, type V2Hotspot,
  type V2Bars, type V2FlowCompare, type V2SystemGap,
  type V2ResearchNotes, type V2Redacted, type V2Figure, type V2DemandCycle,
  type V2NavItem,
} from '@/lib/cms';
import SiftLiveDemo from '@/components/SiftLiveDemo';
import CaseNav from '@/components/CaseNav';

/* 네 케이스가 같은 문법을 쓴다. 데이터만 갈아끼운다.
   컨텍스트로 내려서 하위 피규어들이 prop drilling 없이 읽는다. */
const CaseCtx = createContext<CaseV2 | null>(null);
function useCase(): CaseV2 {
  const c = useContext(CaseCtx);
  if (!c) throw new Error('CaseV2Page: data provider가 없습니다');
  return c;
}

/* ── tokens (WCAG 확인됨) ────────────────────────────── */
/* 색은 전부 globals.css 의 토큰을 가리킨다. 값을 직접 쓰면
   .dark 클래스가 붙어도 이 페이지만 밝은 채로 남는다.
   FLAG 는 경고 색이라 두 테마에서 같은 값을 쓴다. */
const INK = 'var(--ink)';
const BODY = 'var(--ink-2)';
const LABEL = 'var(--ink-3)';
const COBALT = 'var(--accent)';
const RULE = 'var(--hairline)';
const SURFACE = 'var(--surface)';
const BG = 'var(--bg)';
const FLAG = 'var(--flag)';  // 사람이 반드시 봐야 하는 것에만

/* ── motion ──────────────────────────────────────────
   스프링 하나, 거리 8px 이하, 오버슛 0.
   크게 움직이면 읽기를 방해한다. motion 이 reduced-motion 을 존중한다. */
const SPRING = { type: 'spring', stiffness: 240, damping: 32, mass: 0.9 } as const;
const SNAP = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 } as const;

function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -12% 0px' }}
      transition={SPRING}>
      {children}
    </motion.div>
  );
}

/* 카운터가 튀면 숫자를 못 믿게 된다. damping 을 높여 오버슛을 없앤다. */
function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 80, damping: 26, mass: 1 });
  const text = useTransform(spring, (v) => `${v.toFixed(decimals)}${suffix}`);

  useEffect(() => { if (inView) raw.set(to); }, [inView, raw, to]);

  if (reduced) return <span>{to.toFixed(decimals)}{suffix}</span>;
  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ── text primitives ─────────────────────────────────── */
/* 본문 안 굵게 표시. bold 배열의 구절을 원문에서 찾아 <strong> 으로 바꾼다.
   flatMap 은 ReactNode[] 의 반환 타입이 모호해져 TS 가 경고를 낸다.
   같은 구절이 두 번 나올 수 있으므로 key 는 인덱스로 만든다. */
function Mixed({ text, bold = [] }: { text: string; bold?: string[] }) {
  let parts: ReactNode[] = [text];

  for (const phrase of bold) {
    const next: ReactNode[] = [];
    for (const part of parts) {
      if (typeof part !== 'string') { next.push(part); continue; }
      const at = part.indexOf(phrase);
      if (at === -1) { next.push(part); continue; }
      next.push(part.slice(0, at));
      next.push(
        <strong key={`b-${next.length}`} className="font-semibold" style={{ color: INK }}>
          {phrase}
        </strong>,
      );
      next.push(part.slice(at + phrase.length));
    }
    parts = next;
  }

  return <>{parts}</>;
}

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="font-mono text-[13px] pb-3 mb-6" style={{ color: LABEL, borderBottom: `1px solid ${RULE}` }}>
    {children}
  </div>
);

const Statement = ({ children }: { children: ReactNode }) => (
  <h2 className="text-[24px] md:text-[30px] font-normal tracking-[-0.02em] leading-[1.36] mb-4 measure-lead"
    style={{ color: INK }}>
    {children}
  </h2>
);

const BodyP = ({ b }: { b: V2Body }) => (
  <p className="text-[17px] leading-[1.72] measure" style={{ color: BODY }}>
    <Mixed text={b.text} bold={b.bold} />
  </p>
);

/* 캔버스 1440, 콘텐츠 1120. lg 이상에서 좌우 패딩 0이라야 1120 이 정확히 나온다. */
/* 좌측 레일이 자리를 차지하므로 본문을 그만큼 오른쪽으로 민다.
   레일 200px + 간격 64px = 264px. xl 미만에서는 레일이 없으므로 중앙 정렬. */
/* 레이아웃은 globals.css 의 .case-col / .case-media 에 있다.
   Tailwind 임의값은 이 프로젝트에서 생성이 불안정해서, 둘이 같은
   규칙을 쓰도록 평범한 CSS 로 옮겼다. 그래야 제목과 이미지의
   왼쪽 끝이 어긋날 수 없다. */
const Col = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`case-col ${className}`.trim()}>{children}</div>
);

const MEDIA = 'case-media';
/* 이미지 컨테이너 라운딩. 홈 카드와 같은 14px 로 맞춘다.
   Sift 는 PNG 에 구워져 있었고 나머지 셋은 없었다. 코드에서 통일하면
   export 방식과 무관하게 네 케이스가 같은 모양이 된다. */
const FIG = 'overflow-hidden rounded-[14px]';

/* 섹션 레이아웃 두 가지. 전 섹션이 같은 모양이면 생성물처럼 읽힌다.
   stack = 라벨 위 / split = 라벨이 왼쪽 컬럼 */
function Split({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="case-split pt-8"
      style={{ borderTop: `1px solid ${RULE}` }}>
      <div className="font-mono text-[13px]" style={{ color: LABEL }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

/* ── action ──────────────────────────────────────────
   통일의 기준은 모양이 아니라 규칙이다.
     밖으로 나감  → 링크. 코발트 + 밑줄 + ↗
     여기서 실행  → 버튼. 코발트 채움 + →
   같은 일에는 항상 같은 형태가 온다. 링크가 어떤 데선 알약이고
   어떤 데선 밑줄이던 게 문제였지, 링크와 버튼이 다른 건 문제가 아니다. */

function LinkOut({ href, children }: { href: string; children: ReactNode }) {
  /* 화살표는 문자가 아니라 SVG 다. 유니코드 ↗ 는 브라우저에 따라 이모지 폰트로
     떨어져 색이 상속되지 않고, 굵기도 본문과 맞지 않는다.
     stroke="currentColor" 로 링크 색을 그대로 따라가게 한다. */
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-[17px]"
      style={{ color: COBALT }}
      whileHover={{ x: 2 }} transition={SNAP}>
      <span className="underline underline-offset-4 decoration-1">{children}</span>
      <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none"
        className="shrink-0 translate-y-[0.5px]">
        <path d="M3 9L9 3M9 3H4.2M9 3V7.8" stroke="currentColor"
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

/* ══════════ figures ══════════ */

/* 변경점 표식.
   한 번에 하나만 열린다. 열린 동안 나머지 마커는 사라진다.
   그러지 않으면 다른 마커가 툴팁 글자 위에 올라앉아 읽을 수 없다.
   좌표는 cms 의 r1Hotspots / r2Hotspots 에서 조정한다. */
function Hotspot({
  spot, index, active, setActive,
}: {
  spot: V2Hotspot; index: number;
  active: string | null; setActive: (v: string | null) => void;
}) {
  const isOpen = active === spot.title;
  const dimmed = active !== null && !isOpen;

  const x = parseFloat(spot.x);
  const y = parseFloat(spot.y);
  const toLeft = x > 55;      // 오른쪽에 있으면 툴팁을 왼쪽으로 연다
  const toTop = y > 62;       // 아래쪽에 있으면 위로 연다

  return (
    <div className="absolute"
      style={{
        left: spot.x, top: spot.y,
        transform: 'translate(-50%, -50%)',
        zIndex: isOpen ? 30 : 10,
      }}>
      <motion.button
        type="button"
        onHoverStart={() => setActive(spot.title)}
        onHoverEnd={() => setActive(null)}
        onFocus={() => setActive(spot.title)}
        onBlur={() => setActive(null)}
        onClick={() => setActive(isOpen ? null : spot.title)}
        aria-label={spot.title}
        aria-expanded={isOpen}
        animate={{ opacity: dimmed ? 0 : 1, scale: isOpen ? 1.15 : 1 }}
        whileTap={{ scale: 0.94 }}
        transition={SNAP}
        style={{
          height: 24, width: 24,
          background: COBALT,
          color: BG,
          /* 테두리는 배경색이다. 마커가 이미지 위에 놓일 때 경계를 만든다.
             흰색으로 고정하면 다크에서 흰 링만 남는다. */
          border: `2px solid ${BG}`,
          boxShadow: 'var(--shadow-pop)',
          cursor: 'pointer',
          pointerEvents: dimmed ? 'none' : 'auto',
        }}
        className="grid place-items-center rounded-full text-[13px]">
        {index + 1}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: toTop ? 4 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: toTop ? 4 : -4, scale: 0.98 }}
            transition={SNAP}
            className="absolute w-[280px] rounded-[12px] p-4"
            style={{
              background: BG,
              [toLeft ? 'right' : 'left']: 'calc(100% + 12px)',
              [toTop ? 'bottom' : 'top']: 0,
              border: `1px solid ${RULE}`,
              boxShadow: 'var(--shadow-float)',
              transformOrigin: `${toTop ? 'bottom' : 'top'} ${toLeft ? 'right' : 'left'}`,
              pointerEvents: 'none',
            }}>
            <div className="text-[15px] font-medium mb-2" style={{ color: INK }}>{spot.title}</div>
            <p className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{spot.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 창 하나에서 크로스페이드. 기본값 Round 1.
   두 이미지 모두 object-cover 라 비율이 유지되고 절대 늘어나지 않는다.
   폭은 BA_WIN_PCT 하나로 조절한다. */
const BA_WIN_PCT = 78;
const BA_WIN_AR = '16 / 9';

function BeforeAfterToggle() {
  const cms = useCase();
  const d = cms.beforeAfter;
  const [round, setRound] = useState<1 | 2>(1);
  const [active, setActive] = useState<string | null>(null);
  const panes = [
    { r: 1 as const, src: d.r1Image, alt: d.r1Alt },
    { r: 2 as const, src: d.r2Image, alt: d.r2Alt },
  ];

  return (
    <div className={MEDIA}>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4"
        style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="font-mono text-[13px]" style={{ color: INK }}>
          {round === 1 ? d.r1Chip : d.r2Chip}
        </div>
        <div className="relative inline-flex items-center gap-1 rounded-full p-1"
          style={{ border: `1px solid ${RULE}` }}>
          {panes.map(({ r }) => (
            <button key={r} onClick={() => { setRound(r); setActive(null); }} aria-pressed={round === r}
              className="relative px-3 py-2 rounded-full text-[13px]"
              style={{ color: round === r ? BG : LABEL, transition: 'color 180ms linear' }}>
              {round === r && (
                <motion.span layoutId="ba-pill" transition={SNAP}
                  className="absolute inset-0 rounded-full" style={{ background: INK }} />
              )}
              <span className="relative">{r === 1 ? d.r1Label : d.r2Label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5" style={{ width: `${BA_WIN_PCT}%` }}>
        <div className="relative w-full" style={{ aspectRatio: BA_WIN_AR }}>
          {/* 라운딩은 이미지에만. 핫스팟 툴팁은 컨테이너 밖으로 나가야 하므로
              여기에 overflow-hidden 을 걸면 가장자리 툴팁이 잘린다. */}
          <div className={`${FIG} absolute inset-0`}>
            {panes.map(({ r, src, alt }) => (
              <motion.img key={r} src={src} alt={alt}
                className="absolute inset-0 h-full w-full object-cover object-top"
                animate={{ opacity: round === r ? 1 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={round} className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {(round === 1 ? d.r1Hotspots : d.r2Hotspots).map((spot, i) => (
                <Hotspot key={spot.title} spot={spot} index={i}
                  active={active} setActive={setActive} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 font-mono text-[13px] measure-sm leading-[1.6]" style={{ color: LABEL }}>
          {d.hint}
        </div>
      </div>
    </div>
  );
}

/* "같은 문장이 세 곳에 나타난다"는 주장은 세 곳을 동시에 보여주면 약해진다.
   카드 그리드 대신 순차 3연. 스크롤하면서 하나씩 들어온다. */
function ConfidenceLedger() {
  const cms = useCase();
  const { a, b, c } = cms.solution1.bento;

  const rows: { tag: string; lead: string; detail: ReactNode }[] = [
    {
      tag: a.tag,
      lead: a.sentence,
      detail: (
        <>
          <div className="flex items-center gap-3 mt-6">
            <span className="h-2 w-2 rounded-full" style={{ background: FLAG }} />
            <span className="text-[17px]" style={{ color: FLAG }}>{a.level}</span>
            <span style={{ color: LABEL }}>·</span>
            <span className="text-[17px]" style={{ color: INK }}>{a.pct}</span>
          </div>
          <div className="font-mono text-[13px] mt-6 mb-2" style={{ color: LABEL }}>{a.whyTag}</div>
          <dl>
            {a.rows.map(([k, v], ri) => (
              <div key={`${ri}-${k}`} className="flex items-baseline gap-4 py-2">
                <dt className="text-[15px] w-[112px] shrink-0" style={{ color: INK }}>{k}</dt>
                <dd className="font-mono text-[13px]" style={{ color: BODY }}>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
    {
      tag: b.tag,
      lead: b.note,
      detail: (
        <>
          <div className="text-[17px] mt-6" style={{ color: INK }}>{b.title}</div>
          <div className="flex flex-wrap gap-2 mt-4">
            {b.pills.map((p) => (
              <span key={p.label} className="px-4 py-2 rounded-full text-[13px]"
                style={p.active
                  ? { background: COBALT, color: BG }
                  : { color: BODY, border: `1px solid ${RULE}` }}>
                {p.label}
              </span>
            ))}
          </div>
          <div className="relative h-1 rounded-full mt-6 measure-sm" style={{ background: RULE }}>
            <motion.div className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: COBALT }}
              initial={{ width: 0 }} whileInView={{ width: `${b.sliderPct}%` }}
              viewport={{ once: true, amount: 0.8 }} transition={SPRING} />
          </div>
        </>
      ),
    },
    {
      tag: c.tag,
      lead: c.caption,
      detail: (
        <div className="mt-6">
          <div className="text-[17px]" style={{ color: INK }}>{c.ticketTitle}</div>
          <div className="font-mono text-[13px] mt-2" style={{ color: LABEL }}>{c.ticketMeta}</div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-4">
            <span className="inline-flex items-center gap-2 text-[15px]" style={{ color: FLAG }}>
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: FLAG }} />
              {c.lockLabel}
            </span>
            <span className="text-[15px]" style={{ color: LABEL }}>{c.rightTitle}</span>
            <span className="font-mono text-[13px]" style={{ color: LABEL }}>{c.rightSub}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {rows.map((r, i) => (
        <Reveal key={r.tag}>
          <div className="case-split py-10"
            style={{ borderTop: `1px solid ${RULE}` }}>
            <div className="font-mono text-[13px]" style={{ color: i === 0 ? INK : LABEL }}>{r.tag}</div>
            <div>
              <p className="text-[21px] md:text-[24px] leading-[1.45] tracking-[-0.02em] measure-lead"
                style={{ color: INK }}>{r.lead}</p>
              {r.detail}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* 3안 비교. 스크린샷이 아니라 코드로 그린다.
   모바일 화면을 3:2 로 자르면 정보가 잘려서 정작 세 안의 차이가 안 보인다.
   보여줄 것은 화면이 아니라 무엇이 다르고 왜 떨어졌는가다. */
function Alternatives() {
  const cms = useCase();
  const list = cms.exploration?.alternatives ?? [];
  return (
    <div>
      {list.map((c, i) => {
        const chosen = c.verdict === '✓';
        return (
          <Reveal key={c.title}>
            <div className="case-split py-8"
              style={{ borderTop: `1px solid ${chosen ? INK : RULE}` }}>

              {/* 라벨 컬럼에는 번호와 상태만 둔다. 제목까지 넣으면 컬럼을
                  320px 로 넓혀야 하고, 그러면 본문 시작점이 다른 섹션과
                  어긋나 정렬선이 하나 늘어난다. */}
              <div>
                <div className="font-mono text-[13px]"
                  style={{ color: chosen ? COBALT : LABEL }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 font-mono text-[13px]"
                  style={{ color: chosen ? COBALT : LABEL }}>
                  <span className="h-2 w-2 rounded-full"
                    style={{ background: chosen ? COBALT : RULE, border: chosen ? 'none' : `1px solid ${LABEL}` }} />
                  {chosen ? 'Chosen' : 'Rejected'}
                </div>
              </div>

              <div>
                {/* 제목이 본문과 같은 크기·굵기면 한 덩어리로 읽힌다.
                    별도 컬럼에 있을 때는 위치가 계층을 만들었지만
                    같은 컬럼으로 옮겼으니 굵기와 간격이 그 일을 해야 한다. */}
                <div className="text-[17px] font-medium leading-[1.5] tracking-[-0.02em] measure"
                  style={{ color: INK }}>
                  {c.title}
                </div>
                <p className="text-[17px] leading-[1.6] mt-4 measure" style={{ color: INK }}>{c.what}</p>
                <p className="text-[15px] leading-[1.7] mt-3 measure-sm" style={{ color: BODY }}>{c.why}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* 파스텔 카드 3개 대신 편집형 원장. 헤어라인과 정렬만으로 구조를 만든다. */
function FlowDiagram() {
  const cms = useCase();
  const d = cms.exploration;
  const tones: Record<string, string> = { cobalt: COBALT, amber: BODY, red: FLAG };
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-4"
        style={{ borderBottom: `1px solid ${INK}` }}>
        <span className="text-[17px] tracking-[-0.02em]" style={{ color: INK }}>{d.flowIntro.title}</span>
        <span className="font-mono text-[13px]" style={{ color: LABEL }}>{d.flowIntro.chips}</span>
      </div>

      <dl>
        {d.flowCards.map((c) => {
          const [state, detail] = c.sub.split('·').map((s) => s.trim());
          return (
            <div key={c.title}
              className="case-split py-5"
              style={{ borderBottom: `1px solid ${RULE}` }}>
              {/* 점을 별도 컬럼으로 두면 정렬선이 하나 늘어난다. 제목 옆에 붙인다. */}
              <dt className="case-mark-head text-[17px] tracking-[-0.02em]" style={{ color: INK }}>
                <span className="case-mark-dot" style={{ background: tones[c.tone] }} />
                <span>{c.title}</span>
              </dt>
              <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[13px]" style={{ color: tones[c.tone] }}>{state}</span>
                <span className="text-[15px]" style={{ color: BODY }}>{detail}</span>
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-4 font-mono text-[13px]" style={{ color: LABEL }}>{d.flowNote}</div>
    </div>
  );
}

function DotPlot() {
  const cms = useCase();
  const d = cms.evidence;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const D = 22, GAP = 8;
  const xFor = (v: number) => `${((v - 1) / 4) * 100}%`;
  const starts: number[] = [];
  let acc = 0;
  for (const r of d.rounds) { starts.push(acc); acc += r.n * 70 + 200 + d.pauseMs; }
  const on = reduced || inView;

  return (
    <div ref={ref} className="measure-wide">
      {d.rounds.map((r, ri) => {
        let dotIndex = 0;
        const color = ri === d.rounds.length - 1 ? COBALT : BODY;
        return (
          <div key={r.label} className="relative mb-12 last:mb-6 md:pl-[112px]">
            <div className="md:absolute md:left-0 md:top-0 mb-2 md:mb-0">
              <div className="font-mono text-[13px]" style={{ color: INK }}>{r.label}</div>
              <div className="font-mono text-[13px]" style={{ color: LABEL }}>n = {r.n}</div>
            </div>
            <div className="relative h-[152px]" style={{ borderBottom: `1px solid ${RULE}` }}>
              {[1, 2, 3, 4, 5].map((v) =>
                Array.from({ length: r.data[v] || 0 }).map((_, i) => {
                  const delay = starts[ri] + dotIndex++ * 70;
                  return (
                    <motion.span key={`${v}-${i}`} className="absolute rounded-full"
                      style={{
                        width: D, height: D, background: color,
                        left: `calc(${xFor(v)} - ${D / 2}px)`,
                        bottom: i * (D + GAP) + 4,
                      }}
                      initial={reduced ? false : { opacity: 0, y: 8, scale: 0.8 }}
                      animate={on ? { opacity: 1, y: 0, scale: 1 } : undefined}
                      transition={{ ...SPRING, delay: reduced ? 0 : delay / 1000 }} />
                  );
                }),
              )}
              <motion.span className="absolute bottom-0 w-px"
                style={{ left: `calc(${xFor(r.avg)} - 0.5px)`, height: 144, background: INK }}
                initial={reduced ? false : { opacity: 0 }}
                animate={on ? { opacity: 0.28 } : undefined}
                transition={{ duration: 0.4, delay: reduced ? 0 : (starts[ri] + r.n * 70 + 200) / 1000 }} />
              <motion.span className="absolute font-mono text-[13px]"
                style={{ left: `calc(${xFor(r.avg)} + 12px)`, top: -8, color: INK }}
                initial={reduced ? false : { opacity: 0 }}
                animate={on ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: reduced ? 0 : (starts[ri] + r.n * 70 + 260) / 1000 }}>
                avg {r.avg.toFixed(1)}
              </motion.span>
            </div>
          </div>
        );
      })}
      <div className="md:pl-[112px]">
        <div className="flex justify-between font-mono text-[13px]" style={{ color: LABEL }}>
          {[1, 2, 3, 4, 5].map((v) => <span key={v}>{v}</span>)}
        </div>
        <div className="mt-2 text-[15px]" style={{ color: LABEL }}>{d.axisNote}</div>
      </div>
    </div>
  );
}

/* ══════════════════════ 새 도해 다섯 ══════════════════════
   Sift 의 DotPlot / FlowDiagram 과 같은 문법을 쓴다.
   헤어라인, 모노 13px 라벨, 값은 CMS 에서, 색은 INK/BODY/LABEL/COBALT 만.
   차트 라이브러리를 쓰지 않는 이유: 기본 스타일이 사이트와 다른 언어라
   한 눈에 "붙여넣은 것" 으로 읽힌다.
   ═══════════════════════════════════════════════════════ */

/* ── 1. FunnelBars ───────────────────────────────────────
   가로 막대. 값 하나가 논점인 지표에 쓴다.
   막대는 채우지 않고 선으로만 긋는다. 면적이 크면 숫자보다
   색이 먼저 읽혀서, 값의 크기가 아니라 인상이 남는다. */
function FunnelBars({ data }: { data: V2Bars }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const on = reduced || inView;
  const max = Math.max(...data.rows.map((r) => r.value));

  return (
    <div ref={ref} className="measure-wide">
      {data.rows.map((r, i) => {
        const pct = (r.value / max) * 100;
        return (
          <div key={r.label} className="py-6" style={{ borderTop: i === 0 ? `1px solid ${RULE}` : undefined, borderBottom: `1px solid ${RULE}` }}>
            <div className="flex items-baseline justify-between gap-6">
              <div className="font-mono text-[13px]" style={{ color: r.hot ? COBALT : LABEL }}>{r.label}</div>
              <div className="text-[24px] tabular-nums tracking-[-0.02em]" style={{ color: r.hot ? COBALT : INK }}>
                {r.display ?? r.value}
              </div>
            </div>
            <div className="relative mt-3 h-[3px]" style={{ background: RULE }}>
              <motion.span className="absolute left-0 top-0 h-full"
                style={{ background: r.hot ? COBALT : INK }}
                initial={reduced ? false : { width: 0 }}
                animate={on ? { width: `${pct}%` } : undefined}
                transition={{ ...SPRING, delay: reduced ? 0 : 0.06 * i }} />
            </div>
            {r.note && <div className="mt-3 text-[15px] measure-sm" style={{ color: BODY }}>{r.note}</div>}
          </div>
        );
      })}
      {data.axisNote && <div className="mt-5 text-[15px]" style={{ color: LABEL }}>{data.axisNote}</div>}
    </div>
  );
}

/* ── 2. FlowCompare ──────────────────────────────────────
   두 경로를 위아래로 놓고 갈라지는 지점을 표시한다.
   화살표 대신 하이픈 체인을 쓴다. 화살표 그래픽은 사이트에
   없는 언어이고, 여기서 필요한 건 순서지 방향의 강조가 아니다. */
function FlowCompare({ data }: { data: V2FlowCompare }) {
  return (
    <div className="measure-wide">
      {data.paths.map((p, pi) => (
        <div key={p.label} className="py-7" style={{ borderTop: `1px solid ${RULE}` }}>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[13px]" style={{ color: p.chosen ? COBALT : LABEL }}>{p.label}</span>
            {p.chosen && <span className="font-mono text-[13px]" style={{ color: COBALT }}>shipped</span>}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
            {p.steps.map((s, si) => (
              <span key={s.label + si} className="flex items-center gap-3">
                <span className="text-[17px] tracking-[-0.02em]"
                  style={{ color: s.fork ? (p.chosen ? COBALT : FLAG) : INK }}>
                  {s.label}
                </span>
                {si < p.steps.length - 1 && (
                  <span aria-hidden className="font-mono text-[13px]" style={{ color: RULE }}>———</span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-4 text-[15px] measure-sm" style={{ color: BODY }}>{p.note}</div>
        </div>
      ))}
      <div className="pt-6 text-[15px]" style={{ borderTop: `1px solid ${RULE}`, color: LABEL }}>{data.forkNote}</div>
    </div>
  );
}

/* ── 3. SystemGap ────────────────────────────────────────
   좌우 두 열 사이의 단절. 가운데 세로선이 그 단절이다.
   좌열은 회사가 이미 가진 것, 우열은 사용자가 실제로 보는 것. */
function SystemGap({ data }: { data: V2SystemGap }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const on = reduced || inView;

  return (
    <div ref={ref} className="measure-wide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        <div>
          <div className="font-mono text-[13px] pb-4" style={{ color: LABEL, borderBottom: `1px solid ${RULE}` }}>
            {data.leftLabel}
          </div>
          {data.left.map((it, i) => (
            <motion.div key={it.name} className="py-5" style={{ borderBottom: `1px solid ${RULE}` }}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={on ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...SPRING, delay: reduced ? 0 : 0.05 * i }}>
              <div className="text-[17px] tracking-[-0.02em]" style={{ color: INK }}>{it.name}</div>
              <div className="mt-1.5 text-[15px]" style={{ color: BODY }}>{it.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:mt-0">
          <div className="font-mono text-[13px] pb-4" style={{ color: LABEL, borderBottom: `1px solid ${RULE}` }}>
            {data.rightLabel}
          </div>
          {data.right.map((it, i) => (
            <motion.div key={it.name} className="py-5" style={{ borderBottom: `1px solid ${RULE}` }}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={on ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...SPRING, delay: reduced ? 0 : 0.05 * i + 0.15 }}>
              <div className="text-[17px] tracking-[-0.02em]" style={{ color: it.missing ? FLAG : INK }}>{it.name}</div>
              <div className="mt-1.5 text-[15px]" style={{ color: BODY }}>{it.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-[15px] measure-sm" style={{ color: LABEL }}>{data.note}</div>
    </div>
  );
}

/* ── 4. ResearchNotes ────────────────────────────────────
   출처가 붙은 수치. Sift 의 ConfidenceLedger 와 같은
   검증/방향 구분을 쓴다. 출처 없는 숫자는 여기 들어가지 않는다. */
function ResearchNotes({ data }: { data: V2ResearchNotes }) {
  return (
    <div className="measure-wide">
      {data.rows.map((r, i) => (
        <div key={r.claim} className="case-split py-6"
          style={{ borderTop: i === 0 ? `1px solid ${RULE}` : undefined, borderBottom: `1px solid ${RULE}` }}>
          <div className="font-mono text-[13px]" style={{ color: r.kind === 'Verified' ? INK : LABEL }}>{r.kind}</div>
          <div>
            <div className="text-[17px] tracking-[-0.02em]" style={{ color: INK }}>{r.claim}</div>
            <div className="mt-1.5 font-mono text-[13px]" style={{ color: LABEL }}>{r.source}</div>
            {r.use && <div className="mt-2 text-[15px]" style={{ color: BODY }}>{r.use}</div>}
          </div>
        </div>
      ))}
      {data.note && <div className="mt-5 text-[15px]" style={{ color: LABEL }}>{data.note}</div>}
    </div>
  );
}

/* ── 5. Redacted ─────────────────────────────────────────
   공유할 수 없는 것을 가린 채로 보여준다. 빈 자리를 만들지 않고
   가린 이유를 함께 적는다. 가리는 것도 판단이고, 그 판단을
   드러내는 편이 없는 척하는 것보다 낫다. */
function Redacted({ data }: { data: V2Redacted }) {
  return (
    <div className="measure-wide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {data.items.map((it) => (
          <div key={it.what}>
            <div className="relative h-[120px] overflow-hidden" style={{ border: `1px solid ${RULE}` }}>
              <div className="absolute inset-0" aria-hidden
                style={{
                  backgroundImage:
                    `repeating-linear-gradient(135deg, ${RULE} 0 1px, transparent 1px 9px)`,
                }} />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-[13px] px-3 py-1" style={{ color: LABEL, background: BG }}>
                  {it.tag}
                </span>
              </div>
            </div>
            <div className="mt-4 text-[17px] tracking-[-0.02em]" style={{ color: INK }}>{it.what}</div>
            <div className="mt-1.5 text-[15px]" style={{ color: BODY }}>{it.why}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 text-[15px] measure" style={{ borderTop: `1px solid ${RULE}`, color: LABEL }}>
        {data.note}
      </div>
    </div>
  );
}


/* ── FigureBlock ────────────────────────────────────────
   cms.figures 를 순서대로 그린다. layout 으로 폭과 배치를 바꾼다.
   전 섹션이 같은 모양이면 길이만 남고 리듬이 사라진다. */
function FigureBlock({ fig }: { fig: V2Figure }) {
  const layout = fig.layout ?? 'full';
  const ratio = fig.ratio ?? '3 / 2';

  const media = (
    <div className={`${FIG} relative w-full`} style={{ aspectRatio: ratio }}>
      <img src={fig.image} alt={fig.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-top" />
    </div>
  );

  if (layout === 'pair') {
    return (
      <Reveal>
        <Col>
          <section className="mt-20 case-split">
            <div>
              <SectionLabel>{fig.label}</SectionLabel>
              <div className="mt-4 text-[21px] tracking-[-0.02em] leading-[1.35]" style={{ color: INK }}>
                {fig.statement}
              </div>
              {fig.body && <div className="mt-5"><BodyP b={fig.body} /></div>}
            </div>
            <div>
              {media}
              {fig.caption && (
                <div className="mt-4 font-mono text-[13px]" style={{ color: LABEL }}>{fig.caption}</div>
              )}
            </div>
          </section>
        </Col>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <Col>
        <section className="mt-20">
          <SectionLabel>{fig.label}</SectionLabel>
          <Statement>{fig.statement}</Statement>
          {fig.body && <BodyP b={fig.body} />}
        </section>
        <div className={`${MEDIA} mt-10`}>
          <div style={layout === 'inset' ? { marginLeft: '6%', width: '88%' } : undefined}>
            {media}
            {fig.caption && (
              <div className="mt-4 font-mono text-[13px]" style={{ color: LABEL }}>{fig.caption}</div>
            )}
          </div>
        </div>
        {fig.specs && (
          <Col>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 pt-8"
              style={{ borderTop: `1px solid ${RULE}` }}>
              {fig.specs.map((it) => (
                <div key={it.l}>
                  <div className="text-[30px] tracking-[-0.02em]" style={{ color: it.hot ? COBALT : INK }}>{it.v}</div>
                  <div className="font-mono text-[13px] mt-2" style={{ color: LABEL }}>{it.l}</div>
                </div>
              ))}
            </div>
          </Col>
        )}
      </Col>
    </Reveal>
  );
}


/* ── DemandCycle ─────────────────────────────────────────
   하루 두 번, 같은 두 지역의 역할이 뒤집힌다. 그것이 이 케이스의
   전제다. 정지 이미지 두 장 대신 토글 하나로 보여준다.
   Julia 피드백: 정적 비교보다 토글이 낫다. */
function DemandCycle({ data }: { data: V2DemandCycle }) {
  const [phase, setPhase] = useState<'am' | 'pm'>('am');
  const reduced = useReducedMotion();
  const cur = phase === 'am' ? data.am : data.pm;

  /* 출발지는 비고 도착지는 찬다. 방향만 바뀌고 구조는 같다. */
  /* 지역 이름은 고정, 역할만 뒤집힌다. 아침엔 주거지가 출발지,
     저녁엔 도심이 출발지다. */
  const left = { name: data.left, state: phase === 'am' ? cur.from : cur.to };
  const right = { name: data.right, state: phase === 'am' ? cur.to : cur.from };

  return (
    <div className="measure-wide">
      {/* 시간대 전환 */}
      <div className="inline-flex items-center gap-1 p-1" style={{ border: `1px solid ${RULE}` }}>
        {(['am', 'pm'] as const).map((p) => {
          const on = phase === p;
          return (
            <button key={p} type="button" onClick={() => setPhase(p)}
              className="relative px-4 py-2 font-mono text-[13px]"
              style={{ color: on ? BG : LABEL }}>
              {on && (
                <motion.span layoutId="dc-pill" transition={SPRING}
                  className="absolute inset-0" style={{ background: INK }} />
              )}
              <span className="relative">{p === 'am' ? data.am.label : data.pm.label}</span>
            </button>
          );
        })}
      </div>

      {/* 두 지역. 위치는 고정, 상태만 뒤집힌다. */}
      <div className="mt-10 flex items-stretch gap-0">
        <Zone side="left" name={left.name} state={left.state} phase={phase} />
        <Connector phase={phase} reduced={!!reduced} />
        <Zone side="right" name={right.name} state={right.state} phase={phase} />
      </div>

      {/* 실패 두 가지 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8"
        style={{ borderTop: `1px solid ${RULE}` }}>
        {data.failures.map((f) => (
          <div key={f.title}>
            <div className="text-[24px] tracking-[-0.02em]" style={{ color: INK }}>{f.title}</div>
            <div className="mt-2 text-[17px] leading-[1.55]" style={{ color: BODY }}>{f.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Zone({
  side, name, state, phase,
}: {
  side: 'left' | 'right'; name: string;
  state: { label: string; detail: string; empty?: boolean };
  phase: string;
}) {
  return (
    <div className="flex-1">
      <div className="flex h-[128px] items-center justify-center px-6"
        style={{ border: `1px solid ${RULE}` }}>
        <span className="text-[21px] tracking-[-0.02em]" style={{ color: INK }}>{name}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={phase + side}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4">
          <div className="font-mono text-[13px]" style={{ color: state.empty ? FLAG : LABEL }}>
            {state.label}
          </div>
          <div className="mt-1.5 text-[15px]" style={{ color: BODY }}>{state.detail}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* 자전거가 흐르는 방향. 점 하나가 선을 따라 움직인다.
   화살표 그래픽 대신 실제 이동을 보여주는 편이 정확하다. */
function Connector({ phase, reduced }: { phase: string; reduced: boolean }) {
  /* 아침은 주거지에서 도심으로, 저녁은 반대로. 방향이 뒤집히는 것이 이 도해의 논점이므로
     점도 같은 방향으로 흘러야 한다. */
  const toRight = phase === 'am';
  return (
    <div className="relative flex w-[120px] shrink-0 items-start pt-[64px]">
      <div className="relative h-px w-full" style={{ background: RULE }}>
        {!reduced && (
          <motion.span
            key={phase}
            className="absolute top-1/2 h-1.5 w-1.5 rounded-full"
            style={{ background: COBALT, marginTop: -3 }}
            initial={{ left: toRight ? '0%' : '100%', opacity: 0 }}
            animate={{
              left: toRight ? ['0%', '100%'] : ['100%', '0%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', times: [0, 0.15, 0.85, 1] }} />
        )}
      </div>
    </div>
  );
}

function SpecStrip() {
  const cms = useCase();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 pt-8" style={{ borderTop: `1px solid ${RULE}` }}>
      {cms.underHood.specs.map((it) => (
        <div key={it.l}>
          <div className="text-[30px] tracking-[-0.02em]" style={{ color: it.hot ? COBALT : INK }}>{it.v}</div>
          <div className="font-mono text-[13px] mt-2" style={{ color: LABEL }}>{it.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════ PAGE ══════════════════════ */

export default function CaseV2Page({ data }: { data: CaseV2 }) {
  const cms = data;
  return (
    <CaseCtx.Provider value={data}>
    <main className="font-sans" style={{ background: BG }}>
      {/* 폰트는 사이트 전역(next/font IBM Plex)을 상속한다. 하드코딩 금지. */}

      {/* 레일과 본문을 하나의 그리드로 묶는다. fixed 로 띄우면 본문 위에
          겹치거나 좁은 화면에서 밖으로 나간다. 그리드는 자리를 나눠 갖는다.
          xl 미만에서는 한 칸이 되어 레일이 사라지고 본문이 중앙에 온다. */}
      <div className="case-shell">
        <div className="case-rail">
          <CaseNav items={cms.nav ?? []} />
        </div>
        <div style={{ minWidth: 0 }}>

      {/* header */}
      <header className="case-head">
        <Col>
          <div className="font-mono text-[15px]" style={{ color: LABEL }}>{cms.meta}</div>
          <h1 className="mt-6 text-[40px] md:text-[62px] leading-[1.16] tracking-[-0.03em] font-normal"
            style={{ color: INK }}>
            {cms.h1[0]}<br />{cms.h1[1]}
          </h1>
        </Col>
      </header>

      {/* hero, 배경·그림자·라운드는 PNG 안에 있다. 캔버스 16:9 */}
      <Col>
        <Reveal>
          <div className={`${MEDIA} ${FIG} relative`} style={{ aspectRatio: '16 / 9' }}>
            <img src={cms.heroImage} alt={cms.heroAlt}
              className="absolute inset-0 h-full w-full object-cover object-top" />
            {(cms.heroOverlays ?? []).map((o) => (
              <img key={o.src} src={o.src} alt={o.alt ?? ''}
                className="absolute pointer-events-none select-none"
                style={{ left: o.left, top: o.top, width: o.width, height: 'auto' }} />
            ))}
          </div>
        </Reveal>

        {/* 라벨 + 값 목록. 산문이 아니므로 measure 가 아니라 wide 를 쓴다.
            measure 를 쓰면 값이 388px 안에서 접히고 오른쪽이 빈다. */}
        <dl className="mt-10 measure-wide">
          {cms.roleMeta.map((m) => (
            <div key={m.label}
              className="case-split py-4"
              style={{ borderBottom: `1px solid ${RULE}` }}>
              <dt className="font-mono text-[13px] leading-[1.6]" style={{ color: LABEL }}>{m.label}</dt>
              <dd className="text-[17px] leading-[1.6]" style={{ color: INK }}>{m.value}</dd>
            </div>
          ))}
        </dl>
      </Col>

      {/* stat */}
      <Col>
        <Reveal>
          <div className="mt-20 pt-10" style={{ borderTop: `1px solid ${INK}` }}>
            <p className="text-[24px] md:text-[30px] leading-[1.44] tracking-[-0.02em] measure-lead"
              style={{ color: INK }}>
              <Mixed text={cms.statCard.text} bold={[cms.statCard.bold]} />
            </p>
          </div>
        </Reveal>
      </Col>

      {/* overview */}
      <Col>
        <Reveal>
          <section id="overview" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.overview.label}</SectionLabel>
            <BodyP b={cms.overview.body} />
            {cms.overview.linkHref && cms.overview.linkLabel && (
              <div className="mt-6">
                <LinkOut href={cms.overview.linkHref}>{cms.overview.linkLabel}</LinkOut>
              </div>
            )}
          </section>
        </Reveal>
      </Col>

      {/* outcome */}
      <Col>
        <Reveal>
          <section id="outcome" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.outcome.label}</SectionLabel>
            <BodyP b={cms.outcome.body} />
            {/* 결과 카드는 두 개일 수도 있다. 진행 중인 프로젝트에서
                억지로 세 번째를 채우면 그 자리가 가장 약한 숫자가 된다.
                열 수를 개수에 맞춘다. */}
            <div className={`mt-12 grid gap-10 md:gap-8 ${
              cms.outcome.results.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}>
              {cms.outcome.results.map((r) => (
                <div key={r.label}>
                  <div className="text-[40px] md:text-[44px] tracking-[-0.03em]"
                    style={{ color: r.hot ? COBALT : INK }}>
                    <CountUp to={r.value} decimals={r.decimals ?? 0} suffix={r.suffix ?? ''} />
                  </div>
                  <div className="font-mono text-[13px] mt-2" style={{ color: LABEL }}>{r.label}</div>
                  <p className="text-[15px] leading-[1.68] mt-3" style={{ color: BODY }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </Col>

      {/* before / after, 두 라운드를 비교할 자료가 있는 케이스만 */}
      {cms.bars && (
        <Reveal>
          <Col className="case-section">
            <span id="bars" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.bars.label}</SectionLabel>
            <Statement>{cms.bars.statement}</Statement>
            <BodyP b={cms.bars.body} />
            <div className="mt-12">
              <FunnelBars data={cms.bars} />
            </div>
          </Col>
        </Reveal>
      )}

      {cms.systemGap && (
        <Reveal>
          <Col className="case-section">
            <span id="system-gap" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.systemGap.label}</SectionLabel>
            <Statement>{cms.systemGap.statement}</Statement>
            <BodyP b={cms.systemGap.body} />
            <div className="mt-12">
              <SystemGap data={cms.systemGap} />
            </div>
          </Col>
        </Reveal>
      )}

      {cms.beforeAfter && (
        <Col>
          <Reveal>
            <div className="mt-20"><BeforeAfterToggle /></div>
          </Reveal>
        </Col>
      )}

      {/* evidence */}
      {cms.evidence && (
        <Col>
          <Reveal>
            <section id="evidence" className="scroll-mt-28 mt-20">
              <SectionLabel>{cms.evidence.label}</SectionLabel>
              <Statement>{cms.evidence.statement}</Statement>
              <BodyP b={cms.evidence.body} />
              {cms.evidence.rounds && <div className="mt-12"><DotPlot /></div>}

              {/* 같은 테스트에서 나온 두 번째 발견. 섹션을 새로 열 이유가 없다. */}
              {cms.research && (
                <div className="mt-14 pt-8" style={{ borderTop: `1px solid ${RULE}` }}>
                  <h3 className="text-[21px] md:text-[24px] font-normal tracking-[-0.02em] leading-[1.4] mb-4 measure"
                    style={{ color: INK }}>
                    {cms.research.statement}
                  </h3>
                  <BodyP b={cms.research.body} />
                </div>
              )}
            </section>
          </Reveal>
        </Col>
      )}

      {/* who it is for. 선택 섹션이다. 페르소나 시트가 있으면 뺀다. */}
      {cms.persona && (
      <Col>
        <Reveal>
          <section className="mt-20">
            <span id="persona" className="block scroll-mt-28" aria-hidden />
            <Split label={cms.persona.label}>
              <p className="text-[24px] md:text-[30px] leading-[1.4] tracking-[-0.02em] measure"
                style={{ color: INK }}>
                {cms.persona.quote}
              </p>
              <div className="mt-5 font-mono text-[13px]" style={{ color: LABEL }}>
                {cms.persona.name} · {cms.persona.meta}
              </div>
              <ul className="mt-8 measure">
                {cms.persona.needs.map((n) => (
                  <li key={n} className="flex gap-4 py-3" style={{ borderTop: `1px solid ${RULE}` }}>
                    <span className="h-2 w-2 rounded-full shrink-0 mt-2" style={{ background: COBALT }} />
                    <span className="text-[17px] leading-[1.6]" style={{ color: INK }}>{n}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-[1.7] measure" style={{ color: BODY }}>
                {cms.persona.implication}
              </p>
            </Split>
          </section>
        </Reveal>
      </Col>
      )}

      {/* journey. 선택 섹션이다. 이미지가 흐름을 보여주는 케이스에서는 뺀다. */}
      {cms.journey && (
      <Col>
        <Reveal>
          <section id="journey" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.journey.label}</SectionLabel>
            <Statement>{cms.journey.statement}</Statement>
            <BodyP b={cms.journey.body} />
            <ol className="mt-10">
              {cms.journey.moments.map((m, i) => (
                <li key={m.phase}
                  className="case-split py-6"
                  style={{ borderTop: `1px solid ${RULE}` }}>
                  {/* 라벨 컬럼에는 번호와 표면만. phase 는 본문 쪽으로 보내
                      본문 시작점을 다른 섹션과 맞춘다. */}
                  <div>
                    <div className="font-mono text-[13px]" style={{ color: LABEL }}>{i + 1}</div>
                    <div className="font-mono text-[13px] mt-2" style={{ color: LABEL }}>{m.surface}</div>
                  </div>
                  <div>
                    <div className="text-[17px] font-medium leading-[1.5] measure" style={{ color: INK }}>{m.phase}</div>
                    <div className="text-[17px] leading-[1.6] mt-4 measure" style={{ color: INK }}>{m.question}</div>
                    <p className="text-[15px] leading-[1.7] mt-2 measure-sm" style={{ color: BODY }}>{m.breaks}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </Col>
      )}

      {/* solution 01 */}
      <Col>
        <Reveal>
          <section id="solution-1" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.solution1.label}</SectionLabel>
            <Statement>{cms.solution1.statement}</Statement>
            <BodyP b={cms.solution1.body} />
          </section>
        </Reveal>
        <div className="mt-10"><ConfidenceLedger /></div>
      </Col>

      {/* solution 02 */}
      {cms.solution2 && (
      <Col>
        <Reveal>
          <section id="solution-2" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.solution2.label}</SectionLabel>
            <Statement>{cms.solution2.statement}</Statement>
            <BodyP b={cms.solution2.body} />
            <div className={`${MEDIA} mt-10`}>
              <div className={`${FIG} relative`}
                style={{
                  marginLeft: `${(64.296 / 1120) * 100}%`,
                  width: `${(863.4074 / 1120) * 100}%`,
                  aspectRatio: '3 / 2',
                }}>
                <img src={cms.solution2.image} alt={cms.solution2.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </div>
          </section>
        </Reveal>
      </Col>
      )}

      {/* exploration */}
      {cms.flowCompare && (
        <Reveal>
          <Col className="case-section">
            <span id="flow-compare" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.flowCompare.label}</SectionLabel>
            <Statement>{cms.flowCompare.statement}</Statement>
            <BodyP b={cms.flowCompare.body} />
            <div className="mt-12">
              <FlowCompare data={cms.flowCompare} />
            </div>
          </Col>
        </Reveal>
      )}

      {cms.researchNotes && (
        <Reveal>
          <Col className="case-section">
            <span id="research-notes" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.researchNotes.label}</SectionLabel>
            <Statement>{cms.researchNotes.statement}</Statement>
            <BodyP b={cms.researchNotes.body} />
            <div className="mt-12">
              <ResearchNotes data={cms.researchNotes} />
            </div>
          </Col>
        </Reveal>
      )}

      {cms.redacted && (
        <Reveal>
          <Col className="case-section">
            <span id="redacted" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.redacted.label}</SectionLabel>
            <Statement>{cms.redacted.statement}</Statement>
            <BodyP b={cms.redacted.body} />
            <div className="mt-12">
              <Redacted data={cms.redacted} />
            </div>
          </Col>
        </Reveal>
      )}

      {/* figures 는 배열이라 섹션 앵커가 없었다. nav 가 이 구간을 가리킬 수
          있도록 첫 항목 앞에 앵커를 둔다. */}
      {(cms.figures ?? []).length > 0 && (
        <Col className="case-section">
          <span id="figures" className="block scroll-mt-28" aria-hidden />
        </Col>
      )}
      {(cms.figures ?? []).map((f) => <FigureBlock key={f.image} fig={f} />)}

      {cms.demandCycle && (
        <Reveal>
          <Col className="case-section">
            <span id="demand-cycle" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{cms.demandCycle.label}</SectionLabel>
            <Statement>{cms.demandCycle.statement}</Statement>
            <BodyP b={cms.demandCycle.body} />
            <div className="mt-12"><DemandCycle data={cms.demandCycle} /></div>
          </Col>
        </Reveal>
      )}

      {cms.exploration && (
      <Col>
        <Reveal>
          <section id="exploration" className="scroll-mt-28 mt-20">
            <SectionLabel>{cms.exploration.label}</SectionLabel>
            <Statement>{cms.exploration.statement}</Statement>
            <BodyP b={cms.exploration.body} />
            <div className="mt-10"><Alternatives /></div>
            {cms.exploration.flowCards && <div className="mt-12"><FlowDiagram /></div>}
          </section>
        </Reveal>
      </Col>
      )}

      {/* under the hood */}
      {cms.underHood && (
      <Col>
        <Reveal>
          <section className="mt-20">
            <span id="under-hood" className="block scroll-mt-28" aria-hidden />
            <Split label={cms.underHood.label}>
              <Statement>{cms.underHood.statement}</Statement>
              <BodyP b={cms.underHood.body} />
              <div className="mt-10"><SpecStrip /></div>
              {/* 데모가 있는 케이스는 증명을 데모가 한다.
                  링크는 확인하고 싶은 소수를 위한 각주로 아래에 둔다. */}
              {cms.underHood.demo === 'sift-model' ? (
                <div className="mt-10 measure">
                  <SiftLiveDemo />
                  <div className="mt-4">
                    <a href={cms.underHood.linkHref} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px]"
                      style={{ color: LABEL }}>
                      <span className="underline underline-offset-4 decoration-1">
                        {cms.underHood.linkLabel}
                      </span>
                      <svg aria-hidden width="10" height="10" viewBox="0 0 12 12" fill="none"
                        className="shrink-0">
                        <path d="M3 9L9 3M9 3H4.2M9 3V7.8" stroke="currentColor"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : cms.underHood.linkHref && cms.underHood.linkLabel ? (
                <div className="mt-6">
                  <LinkOut href={cms.underHood.linkHref}>{cms.underHood.linkLabel}</LinkOut>
                </div>
              ) : null}
            </Split>
          </section>
        </Reveal>
      </Col>
      )}

      {/* full story. 선택 섹션이다. /thoughts 로 옮기면 뺀다. */}
      {cms.fullStory && (
      <Col>
        <Reveal>
          <section className="mt-20 pt-10" style={{ borderTop: `1px solid ${INK}` }}>
            <div className="font-mono text-[13px] mb-8" style={{ color: LABEL }}>{cms.fullStory.heading}</div>
            <div className="space-y-8 measure">
              {cms.fullStory.paragraphs.map((p) => (
                <div key={p.title}>
                  <h3 className="text-[21px] font-medium tracking-[-0.02em] mb-3" style={{ color: INK }}>{p.title}</h3>
                  <p className="text-[17px] leading-[1.7]" style={{ color: BODY }}>
                    <Mixed text={p.body.text} bold={p.body.bold} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </Col>
      )}

      {/* reflection */}
      <Col>
        <Reveal>
          <section className="mt-20 pb-28">
            <SectionLabel>Reflection</SectionLabel>
            <div className="space-y-10 mt-2">
              {cms.reflections.map((r) => (
                <div key={r.num}>
                  <div className="font-mono text-[13px] mb-2" style={{ color: LABEL }}>{r.num}</div>
                  <h3 className="text-[21px] font-medium tracking-[-0.02em] mb-2" style={{ color: INK }}>{r.title}</h3>
                  <p className="text-[17px] leading-[1.72] measure" style={{ color: BODY }}>{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </Col>

        </div>
      </div>
    </main>
    </CaseCtx.Provider>
  );
}