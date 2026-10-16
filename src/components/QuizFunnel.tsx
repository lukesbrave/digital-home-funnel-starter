'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuizStep from '@/components/QuizStep';
import OptInStep, { OptInValues } from '@/components/OptInStep';
import LoadingScreen from '@/components/LoadingScreen';
import ResultsPage from '@/components/ResultsPage';
import { getVisibleQuestions } from '@/funnel/questions';
import { OPT_IN } from '@/funnel/config';
import { trackEvent, getFunnelSessionId, getReferralCode, rememberReferralCode } from '@/lib/events';
import type { Answers, AppStep, QuizResult } from '@/lib/types';

/**
 * Orchestrator. Screens are components; flow and branching are data.
 *
 * Funnel events fire at exactly these moments:
 *   start      -> the visitor taps the landing CTA
 *   view       -> each quiz step (and the opt-in) first shown
 *   complete   -> the quiz profile is finished (opt-in submitted, or
 *                 last question answered when the gate is disabled)
 *   cta_click  -> the results CTA is clicked
 */
export default function QuizFunnel() {
  const [step, setStep] = useState<AppStep>('landing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const finishingRef = useRef(false);

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[questionIndex];

  // Remember an attendee's `?ref=` on land, before any beacon fires.
  useEffect(() => {
    rememberReferralCode();
  }, []);

  const handleStart = () => {
    trackEvent('start');
    setStep('quiz');
    setQuestionIndex(0);
  };

  // One view per step per session; trackEvent dedupes by screen_id.
  useEffect(() => {
    if (step === 'quiz' && currentQuestion) {
      trackEvent('view', { screenIndex: questionIndex, screenId: currentQuestion.id });
    }
    if (step === 'optin') {
      trackEvent('view', { screenIndex: visibleQuestions.length, screenId: 'optin' });
    }
  }, [step, questionIndex, currentQuestion, visibleQuestions.length]);

  const handleAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const generateResult = useCallback(async (finalAnswers: Answers): Promise<QuizResult> => {
    const res = await fetch('/api/generate-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: finalAnswers }),
    });
    if (!res.ok) throw new Error('result generation failed');
    return res.json();
  }, []);

  const finishQuiz = useCallback(
    async (contact?: OptInValues) => {
      // State-based `submitting` lags a fast double tap; the ref
      // guard makes finishing idempotent so capture fires once.
      if (finishingRef.current) return;
      finishingRef.current = true;
      setSubmitting(true);
      setStep('loading');
      trackEvent('complete', { data: { question_count: visibleQuestions.length } });
      try {
        const computed = await generateResult(answers);
        if (contact) {
          // Lead capture is fire-and-forget for the visitor; the
          // server route logs failures without blocking results.
          fetch('/api/capture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: contact.email,
              name: contact.name || undefined,
              phone: contact.phone || undefined,
              archetype: computed.archetype.id,
              answers,
              session_id: getFunnelSessionId(),
              ref: getReferralCode(),
            }),
            keepalive: true,
          }).catch(() => {});
        }
        // A brief beat so the loading screen reads as real work.
        await new Promise((r) => setTimeout(r, 1600));
        setResult(computed);
        setStep('results');
      } catch {
        finishingRef.current = false;
        setStep(OPT_IN.enabled ? 'optin' : 'quiz');
      } finally {
        setSubmitting(false);
      }
    },
    [answers, generateResult, visibleQuestions.length]
  );

  const handleNext = () => {
    if (questionIndex < visibleQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else if (OPT_IN.enabled) {
      setStep('optin');
    } else {
      void finishQuiz();
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
    } else {
      setStep('landing');
    }
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { data: { archetype: result?.archetype.id } });
  };

  // No AnimatePresence here on purpose: mode="wait" exit gating can
  // wedge under prefers-reduced-motion, leaving the funnel stuck on
  // the landing screen. Screens own their entrance animations.
  return (
    <div
      key={step === 'quiz' ? `quiz-${currentQuestion?.id ?? questionIndex}` : step}
      className="flex-1 flex flex-col"
    >
        {step === 'landing' && <LandingPage onStart={handleStart} />}
        {step === 'quiz' && currentQuestion && (
          <QuizStep
            question={currentQuestion}
            stepIndex={questionIndex}
            totalSteps={visibleQuestions.length}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 'optin' && (
          <OptInStep submitting={submitting} onSubmit={(values) => void finishQuiz(values)} />
        )}
        {step === 'loading' && <LoadingScreen />}
        {step === 'results' && result && (
          <ResultsPage result={result} onCtaClick={handleCtaClick} />
        )}
    </div>
  );
}
