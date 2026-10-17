'use client';

/**
 * Two-step checkout, step one: a small modal that takes the email,
 * captures it to the CRM (tag checkout-started, custom.referred_by
 * when a ref code is in the session), fires cta_click with step
 * checkout-email, then hands the visitor to checkout (step two, built
 * in src/lib/checkout.ts):
 *
 *   method 'get'  -> navigate to checkout.url with prefilled_email,
 *                    client_reference_id and fields as query params
 *   method 'post' -> submit a hidden HTML form (no fetch, so no CORS)
 *                    with email, ref and fields; the server answers
 *                    with a 303 to the payment page
 *
 * A CRM hiccup never blocks a sale: a network error or a 5xx from the
 * relay still proceeds to checkout. Only a 4xx (the relay rejecting
 * the input) keeps the modal open with an inline error.
 *
 * Theme tokens only; closes on Escape and on the backdrop.
 */
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import {
  CHECKOUT_EMAIL_STEP,
  CHECKOUT_STARTED_TAG,
  buildGetCheckoutUrl,
  buildPostCheckoutFields,
} from '@/lib/checkout';
import { getFunnelSessionId, getReferralCode, trackEvent } from '@/lib/events';
import type { CtaConfig } from '@/lib/types';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';

export type TwoStepCheckoutCta = Extract<CtaConfig, { kind: 'two-step-checkout' }>;

/** Any CTA button can open the page's one modal through this. */
export const OpenCheckoutContext = createContext<() => void>(() => {});
export function useOpenCheckout() {
  return useContext(OpenCheckoutContext);
}

const DEFAULTS = {
  headline: 'Where should your access go?',
  body: 'Enter your email. Your access link lands there the moment you have paid.',
  buttonLabel: 'Continue to secure checkout',
};

/** Step two for method 'post': a plain form submit, full navigation. */
function submitHiddenForm(url: string, fields: Record<string, string>) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = url;
  form.style.display = 'none';
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function CheckoutModal({
  open,
  onClose,
  cta,
}: {
  open: boolean;
  onClose: () => void;
  cta: TwoStepCheckoutCta;
}) {
  const theme = useTheme();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
  const emailValid = /.+@.+\..+/.test(email);

  // Escape closes; focus lands in the field; page scroll locks.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  function proceed() {
    const ref = getReferralCode();
    if (cta.checkout.method === 'post') {
      submitHiddenForm(cta.checkout.url, buildPostCheckoutFields(cta.checkout, email, ref));
    } else {
      window.location.assign(buildGetCheckoutUrl(cta.checkout, email, ref));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid || state === 'sending') return;
    setState('sending');
    trackEvent('cta_click', {
      screenId: CHECKOUT_EMAIL_STEP,
      data: { cta: cta.kind, step: CHECKOUT_EMAIL_STEP },
    });
    let res: Response | undefined;
    try {
      res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          session_id: getFunnelSessionId(),
          ref: getReferralCode(),
          tags: [CHECKOUT_STARTED_TAG],
        }),
        keepalive: true,
      });
    } catch {
      // Network error: the CRM must never stand between a buyer and checkout.
      proceed();
      return;
    }
    if (res.ok || res.status >= 500) {
      proceed();
      return;
    }
    setState('error');
  }

  const copy = { ...DEFAULTS, ...cta.modal };
  const fieldClass =
    'w-full rounded-[var(--button-radius)] border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-[16px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]';
  const radius = theme.sections === 'soft' ? 'rounded-2xl' : theme.sections === 'panel' ? 'rounded-xl' : 'rounded-lg';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.55)] p-4 sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md border border-[var(--border)] bg-[var(--background)] p-7 text-[var(--ink)] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-9 ${radius}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-[clamp(22px,3vw,28px)]" style={displayStyle(theme)}>
            {copy.headline}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 cursor-pointer p-2 text-2xl leading-none text-[var(--muted)] hover:text-[var(--ink)]"
          >
            &times;
          </button>
        </div>
        {copy.body && <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{copy.body}</p>}
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <input
            ref={inputRef}
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === 'error') setState('idle');
            }}
            className={fieldClass}
          />
          {state === 'error' && (
            <p role="alert" className="text-sm text-[var(--accent)]">
              We could not save that email. Check it and try again.
            </p>
          )}
          <button
            type="submit"
            disabled={!emailValid || state === 'sending'}
            className="inline-flex w-full items-center justify-center px-8 py-4 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={buttonStyle(theme)}
          >
            {state === 'sending' ? 'One moment' : copy.buttonLabel}
          </button>
          {cta.note && <p className="text-xs text-[var(--muted)]">{cta.note}</p>}
        </form>
      </div>
    </div>
  );
}
