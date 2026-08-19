'use client';

import { motion } from 'framer-motion';
import { LANDING } from '@/funnel/landing';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl text-center"
        >
          {LANDING.eyebrow && (
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--accent)] mb-6">
              {LANDING.eyebrow}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-[var(--ink)]">
            {LANDING.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            {LANDING.subheadline}
          </p>
          <div className="mt-10">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-[var(--accent-ink)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {LANDING.buttonLabel}
            </button>
            {LANDING.microcopy && (
              <p className="mt-4 text-sm text-[var(--muted)]">{LANDING.microcopy}</p>
            )}
          </div>
        </motion.div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-3">
          {LANDING.bullets.map((bullet, i) => (
            <motion.div
              key={bullet.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="font-medium text-[var(--ink)]">{bullet.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{bullet.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {LANDING.footer && (
        <footer className="px-6 pb-8 text-center text-xs text-[var(--muted)]">
          {LANDING.footer}
        </footer>
      )}
    </main>
  );
}
