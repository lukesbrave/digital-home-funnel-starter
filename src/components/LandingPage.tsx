'use client';

import { motion } from 'framer-motion';
import { LANDING } from '@/funnel/landing';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';

function Eyebrow({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  if (theme.eyebrow === 'chip') {
    return (
      <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        {children}
      </span>
    );
  }
  if (theme.eyebrow === 'rules') {
    return (
      <span className="inline-flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
        <span className="h-px w-9 bg-[var(--accent)] opacity-50" />
        {children}
        <span className="h-px w-9 bg-[var(--accent)] opacity-50" />
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
      {children}
    </span>
  );
}

export default function LandingPage({ onStart }: { onStart: () => void }) {
  const theme = useTheme();
  const centered = theme.heroAlign === 'center';
  const align = centered ? 'text-center items-center' : 'text-left items-start';

  const proofClass =
    theme.proof === 'columns'
      ? 'border-t border-[var(--border)] [&>div]:border-l [&>div]:border-[var(--border)] [&>div:first-child]:border-l-0 [&>div]:p-8'
      : theme.proof === 'panel'
        ? 'gap-4 [&>div]:rounded-xl [&>div]:border [&>div]:border-[var(--border)] [&>div]:bg-[var(--surface)] [&>div]:p-6'
        : 'gap-5 [&>div]:rounded-2xl [&>div]:border [&>div]:border-[var(--border)] [&>div]:bg-[var(--surface)] [&>div]:p-7';

  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 flex items-center px-6 pt-20 pb-14 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`mx-auto w-full max-w-3xl flex flex-col ${align}`}
        >
          {LANDING.eyebrow && <Eyebrow>{LANDING.eyebrow}</Eyebrow>}
          <h1
            className="mt-7 max-w-[15ch] text-[clamp(40px,6.5vw,68px)]"
            style={displayStyle(theme)}
          >
            {LANDING.headline}
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
            {LANDING.subheadline}
          </p>
          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center px-10 py-4.5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={buttonStyle(theme)}
          >
            {LANDING.buttonLabel}
          </button>
          {LANDING.microcopy && (
            <p className="mt-4 text-sm text-[var(--muted)]">{LANDING.microcopy}</p>
          )}
        </motion.div>
      </section>

      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className={`mx-auto grid max-w-4xl sm:grid-cols-3 ${proofClass}`}
        >
          {LANDING.bullets.map((bullet, i) => (
            <div key={bullet.title}>
              <span
                className="text-sm font-semibold text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {theme.numerals === 'serif' ? `No. ${i + 1}` : `0${i + 1}`}
              </span>
              <h3 className="mt-2 text-[15px] font-bold text-[var(--ink)]">{bullet.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{bullet.body}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {LANDING.footer && (
        <footer className="px-6 pb-8 text-center text-xs text-[var(--muted)]">
          {LANDING.footer}
        </footer>
      )}
    </main>
  );
}
