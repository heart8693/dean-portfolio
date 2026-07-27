// SelectedWord — Figma-style multiplayer selection on a single word.
// Dean's cursor (ink black) holds a selection while the visitor's "you" cursor (cobalt) roams.
// No state, no client hooks: pure CSS entrance + idle drift. Safe as a server component.
//
// Usage (app/page.tsx, sub line):
//   Designed with care. Tested twice. Celebrated <SelectedWord name="Dean">loudly</SelectedWord>.
//
// CSS: append selected-word.css to the bottom of globals.css (below the welcome-kit block).

export default function SelectedWord({
  children,
  name = "Dean",
}: {
  children: React.ReactNode;
  name?: string;
}) {
  return (
    <span className="sw" aria-label={undefined}>
      <span className="sw-word">{children}</span>

      {/* selection frame + 4 corner handles */}
      <span className="sw-frame" aria-hidden="true">
        <i className="sw-handle sw-tl" />
        <i className="sw-handle sw-tr" />
        <i className="sw-handle sw-bl" />
        <i className="sw-handle sw-br" />
      </span>

      {/* collaborator cursor + name flag */}
      <span className="sw-cursor" aria-hidden="true">
        <svg
          className="sw-arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3.5L18 10.6L12.6 12L9.9 17.2L6 3.5Z"
            fill="#0F1115"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span className="sw-flag">{name}</span>
      </span>
    </span>
  );
}
