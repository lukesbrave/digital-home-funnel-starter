'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { OPT_IN } from '@/funnel/config';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';

export interface OptInValues {
  email: string;
  name: string;
  phone: string;
}

export default function OptInStep({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: OptInValues) => void;
  submitting: boolean;
}) {
  const theme = useTheme();
  const [values, setValues] = useState<OptInValues>({ email: '', name: '', phone: '' });
  const emailValid = /.+@.+\..+/.test(values.email);
  const nameValid = !OPT_IN.fields.name || values.name.trim().length > 0;

  const fieldClass =
    'w-full border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-[16px] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]';
  const fieldRadius =
    theme.options === 'line' ? { borderRadius: '2px' } : { borderRadius: '12px' };

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        <h2 className="text-[clamp(30px,4vw,42px)]" style={displayStyle(theme)}>
          {OPT_IN.headline}
        </h2>
        {OPT_IN.subline && <p className="mt-4 text-[var(--muted)]">{OPT_IN.subline}</p>}

        <form
          className="mt-8 space-y-3.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (emailValid && nameValid && !submitting) onSubmit(values);
          }}
        >
          {OPT_IN.fields.name && (
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className={fieldClass}
              style={fieldRadius}
            />
          )}
          <input
            type="email"
            autoComplete="email"
            placeholder="Your email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={fieldClass}
            style={fieldRadius}
          />
          {OPT_IN.fields.phone && (
            <input
              type="tel"
              autoComplete="tel"
              placeholder="Phone (optional)"
              value={values.phone}
              onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
              className={fieldClass}
              style={fieldRadius}
            />
          )}
          <button
            type="submit"
            disabled={!emailValid || !nameValid || submitting}
            className="w-full px-8 py-4 transition-opacity disabled:opacity-40 cursor-pointer"
            style={buttonStyle(theme)}
          >
            {submitting ? 'One moment' : OPT_IN.buttonLabel}
          </button>
        </form>

        {OPT_IN.disclaimer && (
          <p className="mt-4 text-xs text-[var(--muted)]">{OPT_IN.disclaimer}</p>
        )}
      </motion.div>
    </main>
  );
}
