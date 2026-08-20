'use client';

/**
 * The template's top and tail: a quiet wordmark header rail and a
 * centered wordmark footer, both driven by BRAND (config) and the
 * theme. The sales page passes anchor nav; the quiz landing keeps
 * the rail bare. Quiz steps stay chrome-free on purpose: a focused
 * transactional flow drops navigation (house SEO doctrine).
 */
import { BRAND } from '@/funnel/config';
import { useTheme } from './ThemeProvider';

function Wordmark() {
  const theme = useTheme();
  return (
    <span
      className="text-[15px] tracking-tight text-[var(--ink)]"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        textTransform: theme.display.transform === 'uppercase' ? 'uppercase' : 'uppercase',
        letterSpacing: '0.02em',
      }}
    >
      {BRAND.wordmark}
    </span>
  );
}

export function SiteHeader({ nav }: { nav?: { label: string; href: string }[] }) {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-[var(--border)] px-6 py-4 md:px-10">
      <Wordmark />
      {nav && nav.length > 0 && (
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter({ note }: { note?: string }) {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10 text-center">
      <Wordmark />
      {note && <p className="mt-2 text-xs text-[var(--muted)]">{note}</p>}
    </footer>
  );
}
