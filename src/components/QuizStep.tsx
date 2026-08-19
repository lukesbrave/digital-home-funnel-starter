'use client';

import { motion } from 'framer-motion';
import type { Answers, QuizQuestion } from '@/lib/types';

interface QuizStepProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  answers: Answers;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  answers,
  onAnswer,
  onNext,
  onBack,
}: QuizStepProps) {
  const current = answers[question.id];
  const selected = Array.isArray(current) ? current : current ? [current] : [];
  const hasAnswer = selected.length > 0;

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

  return (
    <main className="flex-1 flex flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-xl flex-1 flex flex-col">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
            <button onClick={onBack} className="hover:text-[var(--ink)] transition-colors">
              Back
            </button>
            <span>
              {stepIndex + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={false}
              animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>

        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="mt-2 text-sm text-[var(--muted)]">{question.subtitle}</p>
          )}

          <div className="mt-8 space-y-3">
            {question.options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggle(option.value)}
                  className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--surface)] ring-1 ring-[var(--accent)]'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)]'
                  }`}
                >
                  <span className="text-[var(--ink)]">{option.label}</span>
                </button>
              );
            })}
          </div>

          {question.type === 'multiple' && (
            <button
              onClick={onNext}
              disabled={!hasAnswer}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3.5 text-base font-medium text-[var(--accent-ink)] transition-opacity disabled:opacity-40"
            >
              Continue
            </button>
          )}
        </motion.div>
      </div>
    </main>
  );
}
