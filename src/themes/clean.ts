import type { Theme } from './types';

/**
 * clean — the default. Quiet, sans-serif, generous white, one
 * restrained accent. The theme that suits the most brands with the
 * least risk.
 */
export const clean: Theme = {
  id: 'clean',
  vibe: 'Quiet confidence: generous white space, plain speech, zero costume.',
  tokens: {
    background: '#fbfbfa',
    surface: '#ffffff',
    border: '#e7e7e4',
    ink: '#17181a',
    muted: '#6d6f74',
    accent: '#3a55c9',
    accentInk: '#ffffff',
    buttonBg: '#17181a',
    buttonInk: '#ffffff',
  },
  font: { display: 'var(--font-instrument)', body: 'var(--font-instrument)' },
  display: { transform: 'none', weight: 600, tracking: '-0.025em', leading: 1.08 },
  heroAlign: 'center',
  eyebrow: 'plain',
  button: { radius: '12px', label: 'normal' },
  numerals: 'plain',
  progress: 'slim',
  options: 'card',
  sections: 'soft',
  proof: 'soft',
  atmosphere: 'none',
  price: 'boxed',
};
