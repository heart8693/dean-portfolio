export default function Footer() {
  return (
    <footer
      className="tj-footer-chrome"
      style={{
        padding: '40px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <span
        style={{
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: 1.4,
          color: 'inherit',
        }}
      >
        © {new Date().getFullYear()} Dean Yoo · Three cats walked on this keyboard
      </span>
      <div style={{ display: 'flex', gap: '32px' }}>
        {[
          { href: 'https://linkedin.com/in/dean-yoo', label: 'LinkedIn' },
          { href: 'mailto:hyart2021@gmail.com', label: 'Email' },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              lineHeight: 1.4,
              textTransform: 'uppercase',
              color: 'inherit',
              textDecoration: 'none',
              borderBottom: '1.5px solid currentColor',
              paddingBottom: '2px',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
