export default function Footer() {
  return (
    <footer style={{
      padding: '40px',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '12px',
      transition: 'border-color 0.25s ease',
    }}>
      <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
        © {new Date().getFullYear()} Dean Yoo
      </span>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { href: 'https://linkedin.com/in/dean-yoo', label: 'LinkedIn' },
          { href: 'mailto:hyart2021@gmail.com', label: 'Email' },
        ].map(({ href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: 'var(--text-3)' }}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
