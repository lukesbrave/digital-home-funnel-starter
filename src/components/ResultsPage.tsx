'use client';

import { motion } from 'framer-motion';
import { CTA } from '@/funnel/config';
import { ctaHref as buildCtaHref } from '@/lib/referral';
import { useReferralCode } from '@/lib/useReferralCode';
import type { QuizResult } from '@/lib/types';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';
import { SiteHeader, SiteFooter } from './SiteChrome';

const roman = ['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.'];

export default function ResultsPage({
  result,
  onCtaClick,
}: {
  result: QuizResult;
  onCtaClick: () => void;
}) {
  const theme = useTheme();
  const ref = useReferralCode();
  const ctaHref = buildCtaHref(CTA, ref);

  const sectionClass =
    theme.sections === 'rule'
      ? 'border-t border-[var(--border)] pt-9'
      : theme.sections === 'panel'
        ? 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8'
        : 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8';

  const eyebrow =
    theme.eyebrow === 'chip' ? (
      <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        Your result
      </span>
    ) : theme.eyebrow === 'rules' ? (
      <span className="inline-flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
        <span className="h-px w-9 bg-[var(--accent)] opacity-50" />
        Your result
        <span className="h-px w-9 bg-[var(--accent)] opacity-50" />
      </span>
    ) : (
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        Your result
      </span>
    );

  const centered = theme.heroAlign === 'center';

  return (
    <main className="flex-1 flex flex-col">
      <SiteHeader />
      <div className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={centered ? 'text-center' : 'text-left'}
        >
          {eyebrow}
          <h1 className="mt-6 text-[clamp(36px,5.5vw,58px)]" style={displayStyle(theme)}>
            {result.archetype.name}
          </h1>
          <p
            className="mt-4 text-lg"
            style={
              theme.numerals === 'serif'
                ? { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--muted)', fontSize: '20px' }
                : { color: 'var(--accent)', fontWeight: 600 }
            }
          >
            {result.archetype.headline}
          </p>
          <p className="mt-7 text-left leading-relaxed text-[var(--ink)]">
            {result.archetype.description}
          </p>
        </motion.header>

        <div className={theme.sections === 'rule' ? 'mt-14 space-y-14' : 'mt-12 space-y-6'}>
          {result.sections.map((section, i) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className={sectionClass}
            >
              <span
                className="text-[13px] font-semibold tracking-[0.14em] text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {theme.numerals === 'serif' ? roman[i] : String(i + 1).padStart(2, '0')}
              </span>
              <h2
                className="mt-2.5 text-[22px]"
                style={{
                  ...displayStyle(theme),
                  textTransform: 'none',
                  fontSize: theme.sections === 'rule' ? '26px' : '22px',
                  lineHeight: 1.25,
                }}
              >
                {section.title}
              </h2>
              <p className="mt-3.5 leading-relaxed text-[var(--ink)]">{section.body}</p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-6 text-[var(--muted)]">
                      <span className="absolute left-0 top-[11px] h-[2px] w-3 bg-[var(--accent)]" />
                      {bullet}
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
          className={`mt-16 text-center ${
            theme.sections === 'rule' ? 'border-t border-[var(--border)] pt-14' : ''
          }`}
        >
          {ctaHref ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center px-10 py-4.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={buttonStyle(theme)}
            >
              {CTA.label}
            </a>
          ) : (
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center px-10 py-4.5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={buttonStyle(theme)}
            >
              {CTA.label}
            </button>
          )}
          {CTA.note && <p className="mt-4 text-sm text-[var(--muted)]">{CTA.note}</p>}
        </motion.div>
      </div>
    </div>
      <SiteFooter />
    </main>
  );
}
