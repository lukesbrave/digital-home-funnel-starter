import type { Theme } from './types';

/**
 * signal — a confident studio instrument at night. Dark, kinetic,
 * one loud accent used sparingly.
 */
export const signal: Theme = {
  id: 'signal',
  vibe: 'Dark studio energy: graphite, bold caps, one signal accent.',
  tokens: {
    background: '#0d0e11',
    surface: '#15171c',
    border: '#262931',
    ink: '#f4f4f2',
    muted: '#8e929c',
    accent: '#ff5a1f',
    accentInk: '#0d0e11',
    buttonBg: '#ff5a1f',
    buttonInk: '#0d0e11',
  },
  font: { display: 'var(--font-archivo)', body: 'var(--font-figtree)' },
  display: { transform: 'uppercase', weight: 800, tracking: '-0.03em', leading: 1.02 },
  heroAlign: 'left',
  eyebrow: 'chip',
  button: { radius: '8px', label: 'caps' },
  numerals: 'ghost',
  progress: 'meter',
  options: 'card',
  sections: 'panel',
  proof: 'panel',
  atmosphere: 'glow',
};
