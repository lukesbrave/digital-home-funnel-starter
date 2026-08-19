'use client';

import { motion } from 'framer-motion';
import { CTA } from '@/funnel/config';
import type { QuizResult } from '@/lib/types';

export default function ResultsPage({
  result,
  onCtaClick,
}: {
  result: QuizResult;
  onCtaClick: () => void;
}) {
  const ctaHref = 'url' in CTA ? CTA.url : undefined;

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
            Your result
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--ink)]">
            {result.archetype.name}
          </h1>
          <p className="mt-3 text-lg text-[var(--muted)]">{result.archetype.headline}</p>
          <p className="mt-6 text-left leading-relaxed text-[var(--ink)]">
            {result.archetype.description}
          </p>
        </motion.header>

        <div className="mt-12 space-y-6">
          {result.sections.map((section, i) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7"
            >
              <h2 className="text-xl font-semibold tracking-tight text-[var(--ink)]">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--ink)]">{section.body}</p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="mt-14 text-center"
        >
          {ctaHref ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-[var(--accent-ink)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {CTA.label}
            </a>
          ) : (
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-[var(--accent-ink)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {CTA.label}
            </button>
          )}
          {CTA.note && <p className="mt-4 text-sm text-[var(--muted)]">{CTA.note}</p>}
        </motion.div>
      </div>
    </main>
  );
}
