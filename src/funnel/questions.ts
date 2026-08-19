/**
 * QUESTION FLOW — the quiz itself.
 *
 * Rules the flow should keep:
 * - 5 to 9 questions, each earning its place.
 * - Balance the categories: situation, pain, goals, urgency,
 *   readiness, identity, and one qualifier.
 * - Branching lives here as showIf functions on answers, never in
 *   components.
 * - Options emit signals; signals drive the result engine in
 *   results.ts. An option with no signals still records the answer.
 */
import type { Answers, QuizQuestion } from '@/lib/types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'stage',
    category: 'situation',
    title: 'Where is your business right now?',
    type: 'single',
    options: [
      { value: 'starting', label: 'Just starting, still shaping the offer', signals: ['foundation'] },
      { value: 'trickle', label: 'Getting clients, but only through word of mouth', signals: ['visibility'] },
      { value: 'plateau', label: 'Steady work, but growth has flatlined', signals: ['conversion'] },
      { value: 'scaling', label: 'Growing, and it is getting hard to keep up', signals: ['conversion', 'systems'] },
    ],
  },
  {
    id: 'friction',
    category: 'pain',
    title: 'What frustrates you most about getting clients?',
    type: 'single',
    options: [
      { value: 'invisible', label: 'Nobody knows we exist', signals: ['visibility'] },
      { value: 'unclear', label: 'People do not get what makes us different', signals: ['foundation'] },
      { value: 'ghosted', label: 'Plenty of interest, but few say yes', signals: ['conversion'] },
      { value: 'feast-famine', label: 'Feast or famine, no steady pipeline', signals: ['systems'] },
    ],
  },
  {
    id: 'goal',
    category: 'goals',
    title: 'If the next 90 days went perfectly, what changed?',
    type: 'single',
    options: [
      { value: 'known', label: 'The right people finally know who we are', signals: ['visibility'] },
      { value: 'premium', label: 'We charge more and clients happily pay it', signals: ['foundation', 'conversion'] },
      { value: 'pipeline', label: 'Leads arrive every week without chasing', signals: ['systems'] },
      { value: 'freedom', label: 'The business runs without me in every detail', signals: ['systems'] },
    ],
  },
  {
    id: 'urgency',
    category: 'urgency',
    title: 'How urgent does fixing this feel?',
    type: 'single',
    options: [
      { value: 'now', label: 'Urgent. It is costing us money every week', signals: ['hot'] },
      { value: 'quarter', label: 'Important. It is this quarter’s priority', signals: ['warm'] },
      { value: 'someday', label: 'On the list, but not on fire', signals: ['cool'] },
    ],
  },
  {
    id: 'tried',
    category: 'readiness',
    title: 'What have you already tried?',
    subtitle: 'Pick everything that applies.',
    type: 'multiple',
    options: [
      { value: 'posting', label: 'Posting on social media', signals: ['visibility'] },
      { value: 'ads', label: 'Paid ads', signals: ['conversion'] },
      { value: 'referrals', label: 'Asking for referrals', signals: ['systems'] },
      { value: 'website', label: 'A website refresh', signals: ['foundation'] },
      { value: 'nothing', label: 'Honestly, not much yet', signals: ['foundation'] },
    ],
  },
  {
    id: 'identity',
    category: 'identity',
    title: 'Which sounds most like you?',
    type: 'single',
    options: [
      { value: 'craftsperson', label: 'The craftsperson: the work is great, selling it is the chore', signals: ['visibility'] },
      { value: 'connector', label: 'The connector: people love us, systems are the gap', signals: ['systems'] },
      { value: 'operator', label: 'The operator: organized and steady, but playing it safe', signals: ['foundation'] },
      { value: 'sprinter', label: 'The sprinter: bursts of effort, then it all goes quiet', signals: ['systems', 'visibility'] },
    ],
  },
  {
    id: 'investment',
    category: 'qualifier',
    title: 'When you find the right fix, how do you usually move?',
    type: 'single',
    options: [
      { value: 'invest', label: 'I invest in help and move fast', signals: ['hot'] },
      { value: 'diy-first', label: 'I try it myself first, then get help if stuck', signals: ['warm'] },
      { value: 'research', label: 'I research for a while before spending anything', signals: ['cool'] },
    ],
  },
];

/** Branching helper used by the orchestrator. */
export function getVisibleQuestions(answers: Answers): QuizQuestion[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers));
}
