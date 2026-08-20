'use client';

/**
 * /preview — static design QA for any theme, no quiz-walking needed.
 *
 *   /preview?theme=clean&screen=landing
 *   /preview?theme=signal&screen=quiz
 *   /preview?theme=manuscript&screen=results
 *   /preview?theme=clean&screen=sales
 *
 * screen: landing | quiz | optin | results (omit for all stacked).
 * Sales-page composition: screen=sales renders the full page;
 * sales-hero / sales-offer / sales-proof render capture slices (the
 * page starting from that section) so a fixed-viewport screenshot
 * lands on the right content without scrolling.
 * Used to pre-render the previews/ screenshot set, and by the
 * funnel-builder agent to re-render previews after injecting data.
 * Motion is disabled so captures are deterministic.
 */
import { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import QuizStep from '@/components/QuizStep';
import OptInStep from '@/components/OptInStep';
import ResultsPage from '@/components/ResultsPage';
import SalesPage from '@/components/SalesPage';
import ThemeProvider from '@/components/ThemeProvider';
import { resolveTheme } from '@/themes';
import { PALETTE_OVERRIDES, THEME } from '@/funnel/config';
import { QUESTIONS } from '@/funnel/questions';
import { computeResult } from '@/lib/engine';
import type { Answers } from '@/lib/types';

/** Capture slices: hide everything before this section so the
 *  viewport-sized screenshot starts exactly there. */
const SALES_SLICES: Record<string, string> = {
  'sales-hero': 'hero',
  'sales-offer': 'offer',
  'sales-proof': 'proof',
};

const noop = () => {};

/** A representative profile so quiz + results screens have real content. */
const SAMPLE_ANSWERS: Answers = Object.fromEntries(
  QUESTIONS.map((q) => [
    q.id,
    q.type === 'multiple' ? [q.options[0].value] : q.options[Math.min(1, q.options.length - 1)].value,
  ])
);

function PreviewInner() {
  const params = useSearchParams();
  const themeId = params.get('theme') ?? THEME;
  const screen = params.get('screen');
  const theme = resolveTheme(themeId, PALETTE_OVERRIDES);

  const question = QUESTIONS[1] ?? QUESTIONS[0];
  const result = computeResult(SAMPLE_ANSWERS);

  const screens: Record<string, React.ReactNode> = {
    landing: <LandingPage onStart={noop} />,
    quiz: (
      <QuizStep
        question={question}
        stepIndex={1}
        totalSteps={QUESTIONS.length}
        answers={SAMPLE_ANSWERS}
        onAnswer={noop}
        onNext={noop}
        onBack={noop}
      />
    ),
    optin: <OptInStep onSubmit={noop} submitting={false} />,
    results: <ResultsPage result={result} onCtaClick={noop} />,
  };

  const shown = screen && screens[screen] ? [screen] : Object.keys(screens);

  const isSales = screen === 'sales' || (screen !== null && screen in SALES_SLICES);
  const sliceFrom = screen ? SALES_SLICES[screen] : undefined;

  return (
    <MotionConfig reducedMotion="always">
      {/* Captures must be deterministic: neutralize entrance motion. */}
      <style>{`[data-static] main * { opacity: 1 !important; transform: none !important; }`}</style>
      {sliceFrom && (
        <style>{`[data-static] main > section#${sliceFrom} ~ section { display: block; }
          [data-static] main > section:has(~ section#${sliceFrom}) { display: none; }`}</style>
      )}
      <div data-static className="flex-1 flex flex-col">
        <ThemeProvider theme={theme}>
          {isSales ? (
            <SalesPage />
          ) : (
            shown.map((key) => (
              <div key={key} className="flex flex-col min-h-screen">
                {screens[key]}
              </div>
            ))
          )}
        </ThemeProvider>
      </div>
    </MotionConfig>
  );
}

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewInner />
    </Suspense>
  );
}
