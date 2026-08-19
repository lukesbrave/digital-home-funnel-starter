'use client';

import { createContext, useContext } from 'react';
import type { Theme } from '@/themes';

const ThemeContext = createContext<Theme | null>(null);

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme outside ThemeProvider');
  return theme;
}

/**
 * Applies a theme: design tokens become CSS variables on a wrapper,
 * treatments come through context. The preview route nests its own
 * provider to render any theme regardless of the configured one.
 */
export default function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const vars = {
    '--background': theme.tokens.background,
    '--surface': theme.tokens.surface,
    '--border': theme.tokens.border,
    '--ink': theme.tokens.ink,
    '--muted': theme.tokens.muted,
    '--accent': theme.tokens.accent,
    '--accent-ink': theme.tokens.accentInk,
    '--button-bg': theme.tokens.buttonBg,
    '--button-ink': theme.tokens.buttonInk,
    '--font-display': theme.font.display,
    '--font-body': theme.font.body,
    '--button-radius': theme.button.radius,
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={vars}
        className="relative flex-1 flex flex-col font-[family-name:var(--font-body)] bg-[var(--background)] text-[var(--ink)]"
      >
        {theme.atmosphere === 'glow' && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(900px 500px at 70% -10%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%),
                radial-gradient(700px 400px at 10% 110%, color-mix(in srgb, var(--accent) 5%, transparent), transparent 60%)`,
            }}
          />
        )}
        <div className="relative flex-1 flex flex-col">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}

/** Shared display-type styles derived from the theme. */
export function displayStyle(theme: Theme): React.CSSProperties {
  return {
    fontFamily: 'var(--font-display)',
    fontWeight: theme.display.weight,
    letterSpacing: theme.display.tracking,
    lineHeight: theme.display.leading,
    textTransform: theme.display.transform,
  };
}

/** Shared button styles derived from the theme. */
export function buttonStyle(theme: Theme): React.CSSProperties {
  return {
    background: 'var(--button-bg)',
    color: 'var(--button-ink)',
    borderRadius: 'var(--button-radius)',
    ...(theme.button.label === 'caps'
      ? { textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '13px', fontWeight: 700 }
      : { fontSize: '16px', fontWeight: 600 }),
  };
}
