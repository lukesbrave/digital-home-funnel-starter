import type { Theme } from './types';

/**
 * bali — editorial calm with weight behind it, after The Bali Chapter
 * event page on bravebrand.com: cream paper, claret ink, Sentient serif
 * display set light and tight, Inter uppercase eyebrows, square caps
 * buttons, hairline rules and numbered rows. The inverted band is that
 * page's booking section: claret ground, cream type.
 */
export const bali: Theme = {
  id: 'bali',
  vibe: 'Editorial claret on cream: serif display, hairlines, numbered rows.',
  tokens: {
    background: '#f2eee7',
    surface: '#e8e0d4',
    border: '#d3c6b6',
    ink: '#47141a',
    muted: '#7d5a5e',
    accent: '#47141a',
    accentInk: '#f0e9df',
    buttonBg: '#47141a',
    buttonInk: '#f0e9df',
  },
  font: { display: 'var(--font-sentient)', body: 'var(--font-inter)' },
  display: { transform: 'none', weight: 400, tracking: '-0.04em', leading: 0.94 },
  heroAlign: 'left',
  eyebrow: 'plain',
  button: { radius: '0px', label: 'caps' },
  numerals: 'plain',
  progress: 'hairline',
  options: 'line',
  sections: 'rule',
  proof: 'columns',
  atmosphere: 'none',
  price: 'editorial',
};
