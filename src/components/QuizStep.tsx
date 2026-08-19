'use client';

import { motion } from 'framer-motion';
import type { Answers, QuizQuestion } from '@/lib/types';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';

interface QuizStepProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  answers: Answers;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  answers,
  onAnswer,
  onNext,
  onBack,
}: QuizStepProps) {
  const theme = useTheme();
  const current = answers[question.id];
  const selected = Array.isArray(current) ? current : current ? [current] : [];
  const hasAnswer = selected.length > 0;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const toggle = (value: string) => {
    if (question.type === 'single') {
      onAnswer(question.id, value);
      // Single-choice advances on tap; a beat so the selection is seen.
      setTimeout(onNext, 250);
    } else {
      const next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onAnswer(question.id, next);
    }
  };

  const counter =
    theme.numerals === 'serif' ? (
      <span
        className="text-[15px] text-[var(--accent)] tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {pad(stepIndex + 1)} / {pad(totalSteps)}
      </span>
    ) : (
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        Step {stepIndex + 1} of {totalSteps}
      </span>
    );

  return (
    <main className="flex-1 flex flex-col px-6 py-12">
      <div className="relative mx-auto w-full max-w-xl flex-1 flex flex-col">
        {theme.numerals === 'ghost' && (
          <span
            aria-hidden
            className="pointer-events-none absolute -top-2 right-0 select-none text-[130px] leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'transparent',
              WebkitTextStroke: '1px var(--border)',
            }}
          >
            {pad(stepIndex + 1)}
          </span>
        )}

        {/* Header: back, counter, progress */}
        <div className="relative">
          <div
            className={`flex items-baseline justify-between ${
              theme.progress === 'hairline' ? 'border-b border-[var(--border)] pb-3.5' : ''
            }`}
          >
            <button
              onClick={onBack}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--ink)] cursor-pointer"
            >
              ← Back
            </button>
            {counter}
          </div>
          {theme.progress === 'hairline' ? (
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-[var(--accent)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ marginBottom: '-1px', height: '2px' }}
            />
          ) : (
            <div
              className={`mt-4 overflow-hidden bg-[var(--border)] ${
                theme.progress === 'meter' ? 'h-1.5 rounded-[3px]' : 'h-1 rounded-full'
              }`}
            >
              <motion.div
                className="h-full bg-[var(--accent)]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ borderRadius: 'inherit' }}
              />
            </div>
          )}
        </div>

        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative"
        >
          <h2
            className="mt-11 text-[clamp(26px,4vw,38px)]"
            style={{ ...displayStyle(theme), lineHeight: 1.15, textTransform: 'none' }}
          >
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="mt-2 text-sm text-[var(--muted)]">{question.subtitle}</p>
          )}

          <div
            className={
              theme.options === 'line'
                ? 'mt-9 border-t border-[var(--border)]'
                : 'mt-9 grid gap-3'
            }
          >
            {question.options.map((option) => {
              const isSelected = selected.includes(option.value);
              if (theme.options === 'line') {
                return (
                  <button
                    key={option.value}
                    onClick={() => toggle(option.value)}
                    className={`flex w-full items-center gap-5 border-b border-[var(--border)] px-2 py-5 text-left transition-colors cursor-pointer ${
                      isSelected ? 'font-semibold' : ''
                    }`}
                  >
                    <span
                      className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent)]'
                          : 'border-[var(--muted)]'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-ink)]" />
                      )}
                    </span>
                    <span className="text-[17px] text-[var(--ink)]">{option.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={option.value}
                  onClick={() => toggle(option.value)}
                  className="w-full rounded-xl border bg-[var(--surface)] px-5.5 py-5 text-left transition-all cursor-pointer"
                  style={{
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    borderLeftWidth: '3px',
                    borderLeftColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    boxShadow: isSelected ? '0 0 0 1px var(--accent)' : 'none',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <span className="text-[16.5px] text-[var(--ink)]">{option.label}</span>
                </button>
              );
            })}
          </div>

          {question.type === 'multiple' && (
            <button
              onClick={onNext}
              disabled={!hasAnswer}
              className="mt-9 inline-flex items-center justify-center px-9 py-4 transition-opacity disabled:opacity-40 cursor-pointer"
              style={buttonStyle(theme)}
            >
              Continue
            </button>
          )}
        </motion.div>
      </div>
    </main>
  );
}
