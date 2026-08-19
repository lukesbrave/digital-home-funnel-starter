import type { Theme, ThemeTokens } from './types';
import { clean } from './clean';
import { manuscript } from './manuscript';
import { signal } from './signal';

export type { Theme, ThemeTokens } from './types';

export const THEMES: Record<string, Theme> = { clean, manuscript, signal };

/** Resolve a theme id, applying any per-funnel token overrides. */
export function resolveTheme(
  id: string,
  overrides: Partial<ThemeTokens> = {}
): Theme {
  const base = THEMES[id] ?? clean;
  return { ...base, tokens: { ...base.tokens, ...overrides } };
}
