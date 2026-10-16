import type { Theme } from './types';

/**
 * manuscript — a beautifully typeset questionnaire from a private
 * studio. Warm paper, high-contrast serif, hairline rules.
 */
export const manuscript: Theme = {
  id: 'manuscript',
  vibe: 'Editorial calm: warm paper, serif display, printed questionnaire.',
  tokens: {
    background: '#f6f2ea',
    surface: '#fffdf8',
    border: '#e2dbcd',
    ink: '#221e15',
    muted: '#8a8171',
    accent: '#2f4a3c',
    accentInk: '#f6f2ea',
    buttonBg: '#2f4a3c',
    buttonInk: '#f6f2ea',
  },
  font: { display: 'var(--font-fraunces)', body: 'var(--font-karla)' },
  display: { transform: 'none', weight: 500, tracking: '-0.015em', leading: 1.06 },
  heroAlign: 'center',
  eyebrow: 'rules',
  button: { radius: '999px', label: 'caps' },
  numerals: 'serif',
  progress: 'hairline',
  options: 'line',
  sections: 'rule',
  proof: 'columns',
  atmosphere: 'none',
  price: 'boxed',
};
