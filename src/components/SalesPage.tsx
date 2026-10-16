'use client';

/**
 * The sales-page composition ("conversion stack"): full-bleed bands
 * that alternate ground / surface / inverted ink, an offer stack
 * card, boxed pricing, FAQ, sticky CTA bar. Entirely driven by
 * SALES data (src/funnel/sales.ts) and the theme; renders whatever
 * sections exist, in order.
 *
 * Events (same four beacons as the quiz, scroll-depth semantics):
 *   start     -> page landed
 *   view      -> a section first became visible (screen_id = kind)
 *   complete  -> the final-cta section reached
 *   cta_click -> any CTA pressed
 *
 * Referral: `?ref=<code>` on the landing URL is remembered for the
 * session, sent on every beacon, appended to a checkout CTA as
 * Stripe's client_reference_id, and sent with lead capture as
 * custom.referred_by (see src/lib/referral.ts).
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CTA, OPT_IN } from '@/funnel/config';
import { SALES } from '@/funnel/sales';
import { trackEvent, getFunnelSessionId, getReferralCode, rememberReferralCode } from '@/lib/events';
import { ctaHref } from '@/lib/referral';
import { useReferralCode } from '@/lib/useReferralCode';
import type { SalesSection } from '@/lib/types';
import { Eyebrow } from './LandingPage';
import { buttonStyle, displayStyle, useTheme } from './ThemeProvider';
import { SiteHeader, SiteFooter } from './SiteChrome';
import type { Theme } from '@/themes';

/** Band treatment per section kind: ground / surface / inverted. */
const BAND: Record<SalesSection['kind'], 'ground' | 'surface' | 'inverted'> = {
  hero: 'ground',
  problem: 'surface',
  story: 'ground',
  offer: 'inverted',
  proof: 'ground',
  pricing: 'surface',
  faq: 'ground',
  'final-cta': 'ground',
};

const bandClass = {
  ground: '',
  surface: 'bg-[var(--surface)] border-y border-[var(--border)]',
  inverted: 'bg-[var(--ink)] text-[var(--background)]',
};

/** Card radius follows the theme's section treatment. */
function cardRadius(theme: Theme) {
  return theme.sections === 'soft' ? 'rounded-2xl' : theme.sections === 'panel' ? 'rounded-xl' : 'rounded-lg';
}

/** Button that inverts cleanly on the ink band in every theme. */
function inverseButtonStyle(theme: Theme): React.CSSProperties {
  return {
    ...buttonStyle(theme),
    background: 'var(--background)',
    color: 'var(--ink)',
  };
}

function Kicker({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  if (!inverted) return <Eyebrow>{children}</Eyebrow>;
  return (
    <span
      className="text-xs font-semibold uppercase tracking-[0.2em]"
      style={{ color: 'color-mix(in srgb, var(--accent) 55%, var(--background))' }}
    >
      {children}
    </span>
  );
}

function Rise({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CaptureForm({ buttonLabel, inverted }: { buttonLabel: string; inverted?: boolean }) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending' || state === 'done') return;
    setState('sending');
    trackEvent('cta_click', { data: { cta: 'lead-capture' } });
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          session_id: getFunnelSessionId(),
          ref: getReferralCode(),
        }),
        keepalive: true,
      });
      if (!res.ok) throw new Error('capture failed');
      setState('done');
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  }

  if (state === 'done') {
    return (
      <p className="text-lg font-semibold">
        You are in. Check your inbox.
      </p>
    );
  }

  const fieldClass =
    'w-full rounded-[var(--button-radius)] border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]';

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-md flex-col gap-3">
      {OPT_IN.fields.name && (
        <input
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      )}
      <input
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldClass}
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center justify-center px-10 py-4 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60"
        style={inverted ? inverseButtonStyle(theme) : buttonStyle(theme)}
      >
        {state === 'sending' ? 'One moment' : state === 'error' ? 'Try again' : buttonLabel}
      </button>
      {OPT_IN.disclaimer && <p className="text-xs text-[var(--muted)]">{OPT_IN.disclaimer}</p>}
    </form>
  );
}

/** A CTA press: link kinds navigate, lead-capture scrolls to the form. */
function CtaButton({
  label,
  inverted,
  accent,
}: {
  label: string;
  inverted?: boolean;
  accent?: boolean;
}) {
  const theme = useTheme();
  const ref = useReferralCode();
  const style = inverted
    ? inverseButtonStyle(theme)
    : accent
      ? { ...buttonStyle(theme), background: 'var(--accent)', color: 'var(--accent-ink)' }
      : buttonStyle(theme);
  const className =
    'inline-flex items-center justify-center px-10 py-4 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer';

  const onClick = () => trackEvent('cta_click', { data: { cta: CTA.kind } });

  if (CTA.kind === 'lead-capture') {
    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => {
          onClick();
          document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {label}
      </button>
    );
  }
  return (
    <a href={ctaHref(CTA, ref)} onClick={onClick} className={className} style={style}>
      {label}
    </a>
  );
}

function Section({ section }: { section: SalesSection }) {
  const theme = useTheme();
  const band = BAND[section.kind];
  const inverted = band === 'inverted';
  const radius = cardRadius(theme);
  const mutedStyle = inverted
    ? { color: 'color-mix(in srgb, var(--background) 65%, transparent)' }
    : undefined;
  const mutedClass = inverted ? '' : 'text-[var(--muted)]';

  switch (section.kind) {
    case 'hero':
      return (
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-start text-left"
          >
            {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
            <h1 className="mt-7 max-w-[16ch] text-[clamp(38px,5.6vw,60px)]" style={displayStyle(theme)}>
              {section.headline}
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--muted)]">
              {section.subheadline}
            </p>
            <div className="mt-9">
              <CtaButton label={section.buttonLabel} accent />
            </div>
            {section.microcopy && <p className="mt-4 text-sm text-[var(--muted)]">{section.microcopy}</p>}
          </motion.div>
          {section.stats && section.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className={`hidden md:block border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.08)] ${radius}`}
            >
              {section.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between border-b border-[var(--border)] py-3 text-[15px] last:border-0"
                >
                  <span className="text-[var(--muted)]">{stat.label}</span>
                  <span className="font-semibold text-[var(--accent)]">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      );

    case 'problem':
      return (
        <Rise className="mx-auto w-full max-w-6xl px-6">
          {section.kicker && <Kicker>{section.kicker}</Kicker>}
          <h2 className="mt-5 max-w-[22ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
            {section.headline}
          </h2>
          {section.body.map((para) => (
            <p key={para} className={`mt-5 max-w-[56ch] text-lg leading-relaxed ${mutedClass}`} style={mutedStyle}>
              {para}
            </p>
          ))}
        </Rise>
      );

    case 'story':
      return (
        <Rise className="mx-auto w-full max-w-6xl px-6">
          {section.kicker && <Kicker>{section.kicker}</Kicker>}
          <h2 className="mt-5 max-w-[22ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
            {section.headline}
          </h2>
          {section.body && (
            <p className={`mt-5 max-w-[56ch] text-lg leading-relaxed ${mutedClass}`} style={mutedStyle}>
              {section.body}
            </p>
          )}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {section.steps.map((step, i) => (
              <div key={step.title} className={`border border-[var(--border)] bg-[var(--surface)] p-7 ${radius}`}>
                <span
                  className="text-3xl font-semibold text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                  {theme.numerals === 'serif' ? `No. ${i + 1}` : `0${i + 1}`}
                </span>
                <h3 className="mt-3 text-[17px] font-bold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{step.body}</p>
              </div>
            ))}
          </div>
        </Rise>
      );

    case 'offer':
      return (
        <Rise className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            {section.kicker && <Kicker inverted>{section.kicker}</Kicker>}
            <h2 className="mt-5 max-w-[18ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
              {section.headline}
            </h2>
            {section.body && (
              <p className="mt-5 max-w-[44ch] text-lg leading-relaxed" style={mutedStyle}>
                {section.body}
              </p>
            )}
            {section.buttonLabel && (
              <div className="mt-8">
                <CtaButton label={section.buttonLabel} inverted />
              </div>
            )}
          </div>
          <ul
            className={`bg-[var(--surface)] text-[var(--ink)] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)] ${radius}`}
          >
            {section.items.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-3.5 text-[15px] last:border-0"
              >
                <span>{item.label}</span>
                {item.tag && <span className="whitespace-nowrap text-[var(--muted)]">{item.tag}</span>}
              </li>
            ))}
          </ul>
        </Rise>
      );

    case 'proof':
      return (
        <Rise className="mx-auto w-full max-w-6xl px-6">
          {section.kicker && <Kicker>{section.kicker}</Kicker>}
          <h2 className="mt-5 max-w-[22ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
            {section.headline}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {section.quotes.map((q) => (
              <figure
                key={q.quote}
                className={`m-0 border border-[var(--border)] bg-[var(--surface)] p-7 text-[17px] leading-relaxed ${radius}`}
              >
                <blockquote className="m-0">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-[var(--muted)]">{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </Rise>
      );

    case 'pricing':
      return (
        <Rise className="mx-auto w-full max-w-6xl px-6 text-center">
          {section.kicker && <Kicker>{section.kicker}</Kicker>}
          <h2 className="mx-auto mt-5 max-w-[22ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
            {section.headline}
          </h2>
          <div
            className={`mx-auto mt-10 max-w-md border border-[var(--border)] bg-[var(--background)] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] ${radius}`}
          >
            <div
              className="text-5xl font-semibold text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              {section.price}
            </div>
            {section.priceNote && <p className="mt-2 text-[var(--muted)]">{section.priceNote}</p>}
            <div className="mt-7">
              <CtaButton label={section.buttonLabel} accent />
            </div>
            {section.guarantee && (
              <p
                className="mx-auto mt-6 inline-block rounded-full px-5 py-2 text-sm font-medium text-[var(--accent)]"
                style={{ background: 'color-mix(in srgb, var(--accent) 9%, transparent)' }}
              >
                {section.guarantee}
              </p>
            )}
          </div>
        </Rise>
      );

    case 'faq':
      return (
        <Rise className="mx-auto w-full max-w-3xl px-6">
          <div className="text-center">
            {section.kicker && <Kicker>{section.kicker}</Kicker>}
            <h2 className="mx-auto mt-5 max-w-[22ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
              {section.headline}
            </h2>
          </div>
          <div className="mt-10">
            {section.items.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className={`mb-3 border border-[var(--border)] bg-[var(--surface)] px-6 py-4.5 ${radius}`}
              >
                <summary className="cursor-pointer font-semibold text-[var(--ink)]">{item.q}</summary>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </Rise>
      );

    case 'final-cta':
      return (
        <Rise className="mx-auto w-full max-w-6xl px-6 text-center">
          <h2 className="mx-auto max-w-[24ch] text-[clamp(28px,4vw,42px)]" style={displayStyle(theme)}>
            {section.headline}
          </h2>
          {section.body && (
            <p className="mx-auto mt-4 max-w-[44ch] text-lg text-[var(--muted)]">{section.body}</p>
          )}
          <div className="mt-8">
            {CTA.kind === 'lead-capture' ? (
              <CaptureForm buttonLabel={section.buttonLabel} />
            ) : (
              <CtaButton label={section.buttonLabel} accent />
            )}
          </div>
        </Rise>
      );
  }
}

export default function SalesPage() {
  const [showBar, setShowBar] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // start on land; view per section as it scrolls in; complete at the
  // final CTA. trackEvent dedupes, so observers can fire repeatedly.
  useEffect(() => {
    rememberReferralCode();
    trackEvent('start');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.section;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!id) continue;
          trackEvent('view', { screenIndex: index, screenId: id });
          if (id === 'final-cta') trackEvent('complete', { data: { depth: 'final-cta' } });
        }
      },
      { threshold: 0.25 }
    );
    const refs = sectionRefs.current;
    refs.forEach((el) => observer.observe(el));

    const onScroll = () => setShowBar(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const NAV_LABELS: Partial<Record<SalesSection['kind'], string>> = {
    offer: 'What you get',
    proof: 'Proof',
    pricing: 'Pricing',
    faq: 'FAQ',
  };
  const nav = SALES.sections
    .filter((s) => NAV_LABELS[s.kind])
    .map((s) => ({ label: NAV_LABELS[s.kind]!, href: `#${s.kind}` }));

  return (
    <main className="flex-1">
      <SiteHeader nav={nav} />
      {SALES.sections.map((section, i) => (
        <section
          key={`${section.kind}-${i}`}
          id={section.kind}
          data-section={section.kind}
          data-index={i}
          ref={(el) => {
            if (el) sectionRefs.current.set(section.kind, el);
          }}
          className={`py-20 md:py-24 ${section.kind === 'hero' ? 'pt-24 md:pt-28' : ''} ${bandClass[BAND[section.kind]]}`}
        >
          <Section section={section} />
        </section>
      ))}

      <div className="pb-14" />
      <SiteFooter note={SALES.footer || undefined} />

      {SALES.stickyBar && (
        <div
          className={`fixed inset-x-0 bottom-0 z-20 flex items-center justify-center gap-5 bg-[var(--ink)] px-5 py-3 text-sm text-[var(--background)] transition-transform duration-300 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <span className="hidden sm:inline">{SALES.stickyBar.text}</span>
          <span className="[&_a]:!px-5 [&_a]:!py-2.5 [&_button]:!px-5 [&_button]:!py-2.5">
            <CtaButton label={SALES.stickyBar.buttonLabel} inverted />
          </span>
        </div>
      )}
    </main>
  );
}
