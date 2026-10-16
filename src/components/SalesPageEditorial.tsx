'use client';

/**
 * The editorial sales-page composition: the long-form event-page
 * grammar rather than the conversion stack. Full-bleed hero media,
 * serif display headlines with one italic word, slash eyebrows, prose
 * at a reading measure, numbered hairline rows, bands that go full ink,
 * a booking-style price card, details-and-plus questions, a closing
 * photograph. Ported from the BraveBrand event page's section kit so a
 * page built here reads as the next page of that site.
 *
 * Driven by the same SALES sections as the stack; the editorial-only
 * fields (media, emphasis, image, cardLabel, currencyLabel) are optional
 * and the stack ignores them. Same four beacons, same CTA, same popup.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND, CTA } from '@/funnel/config';
import { SALES } from '@/funnel/sales';
import { trackEvent, rememberReferralCode } from '@/lib/events';
import { ctaHref } from '@/lib/referral';
import { useReferralCode } from '@/lib/useReferralCode';
import type { SalesSection } from '@/lib/types';
import CheckoutModal, { OpenCheckoutContext, useOpenCheckout } from './CheckoutModal';

/* The event page's type scale and rhythm, verbatim. */
const SECTION = 'px-7 py-[clamp(4.5rem,9vw,8rem)] max-[809px]:px-5';
const BLOCK_GAP = 'space-y-[clamp(3rem,5.5vw,5.5rem)]';
/* Section headlines take the hero's sentence scale, never display size. */
const T_DISPLAY = 'text-[clamp(1.9rem,3vw,3rem)] leading-[1.12] tracking-[-0.03em]';
const T_BODY_SM = 'text-[clamp(0.95rem,1.1vw,1.03rem)] leading-[1.8]';
const T_META = 'text-[10px] uppercase tracking-[0.2em]';
const WIDE = 'mx-auto max-w-[1380px]';

/* Grounds. Cream and claret come from the theme; the photo sections sit on
   near-black like the event page. Written as literal class strings because
   Tailwind only generates classes it can read at build time. */

const display: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 400 };
const ease = [0.22, 1, 0.36, 1] as const;

type Tone = 'cream' | 'dark' | 'claret';
const toneClass: Record<Tone, string> = {
  cream: 'bg-[var(--surface)] text-[var(--ink)]',
  dark: 'bg-[#171814] text-[#eee8de]',
  claret: 'bg-[var(--ink)] text-[var(--background)]',
};
const muted = (tone: Tone) =>
  tone === 'cream' ? 'text-[color-mix(in_srgb,var(--ink)_62%,transparent)]' : 'text-current/62';
const rule = (tone: Tone) =>
  tone === 'cream' ? 'border-[color-mix(in_srgb,var(--ink)_22%,transparent)]' : 'border-current/22';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A headline with its emphasised words in italic. */
function Emphasis({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis) return <>{text}</>;
  const at = text.indexOf(emphasis);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="italic">{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </>
  );
}

function Display({ text, emphasis, center = false, className = '' }: { text: string; emphasis?: string; center?: boolean; className?: string }) {
  return (
    <h2 className={`text-balance ${T_DISPLAY} ${center ? 'mx-auto max-w-[640px] text-center' : 'max-w-[600px]'} ${className}`} style={display}>
      <Emphasis text={text} emphasis={emphasis} />
    </h2>
  );
}

/** One CTA, three dressings: solid claret on cream, solid cream on ink, or the underlined editorial link. */
function Cta({ label, variant, className = '' }: { label: string; variant: 'solid' | 'cream' | 'link'; className?: string }) {
  const ref = useReferralCode();
  const openCheckout = useOpenCheckout();
  const button =
    'inline-flex h-[62px] cursor-pointer items-center justify-center px-12 text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.22em] transition-transform duration-300 hover:-translate-y-0.5 max-[809px]:h-auto max-[809px]:min-h-[58px] max-[809px]:px-7 max-[809px]:py-4';
  const base =
    variant === 'link'
      ? 'inline-flex cursor-pointer items-center border-b border-current pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-65'
      : variant === 'cream'
        ? `${button} bg-[var(--background)] text-[var(--ink)] shadow-[0_22px_48px_rgba(0,0,0,0.35)]`
        : `${button} bg-[var(--ink)] text-[var(--background)] shadow-[0_22px_48px_rgba(71,20,26,0.28)]`;
  const text = variant === 'link' ? `${label} ↗` : label;
  const onClick = () => trackEvent('cta_click', { data: { cta: CTA.kind } });

  if (CTA.kind === 'two-step-checkout') {
    return (
      <button type="button" className={`${base} ${className}`} onClick={() => { onClick(); openCheckout(); }}>
        {text}
      </button>
    );
  }
  if (CTA.kind === 'lead-capture') {
    return (
      <button type="button" className={`${base} ${className}`} onClick={() => { onClick(); document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' }); }}>
        {text}
      </button>
    );
  }
  return (
    <a href={ctaHref(CTA, ref)} onClick={onClick} className={`${base} ${className}`}>
      {text}
    </a>
  );
}

function SplitHero({ section }: { section: Extract<SalesSection, { kind: 'hero' }> }) {
  const reduceMotion = useReducedMotion();
  const media = section.media;
  const panel = section.panel;
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPreviewOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [previewOpen]);
  return (
    <div className="grid min-h-[100svh] grid-cols-[0.47fr_0.53fr] bg-[var(--surface)] text-[var(--ink)] max-[809px]:grid-cols-1">
      <div className="relative flex flex-col items-center justify-center px-10 pb-12 pt-24 text-center max-[809px]:px-5 max-[809px]:pt-24 max-[809px]:pb-12">
        {section.eyebrow && (
          <p className="rise mb-8 text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{section.eyebrow}</p>
        )}
        <h1
          className={`rise rise-2 text-balance ${
            section.headline.length > 70
              ? 'max-w-[560px] text-[clamp(1.7rem,2.5vw,2.6rem)] leading-[1.15] tracking-[-0.03em]'
              : 'max-w-[560px] text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[0.95] tracking-[-0.04em]'
          }`}
          style={display}
        >
          <Emphasis text={section.headline} emphasis={section.emphasis} />
        </h1>
        <p className="rise rise-3 mt-7 max-w-[480px] text-[14px] leading-[1.75] opacity-75">{section.subheadline}</p>
        {/* One button, big enough to be the point of the column. */}
        <div className="rise rise-4 mt-9 flex flex-col items-center gap-5">
          <Cta label={section.buttonLabel} variant="solid" />
          {section.microcopy && <p className="max-w-[320px] text-[10px] leading-[1.7] opacity-60">{section.microcopy}</p>}
          {section.secondaryLabel && (
            <a href="#next" className="border-b border-current/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
              {section.secondaryLabel}
            </a>
          )}
        </div>
        {section.inset && (
          <div className="rise rise-4 mt-10 w-[min(240px,60%)]">
            <div className="relative aspect-[1.6] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.inset.src} alt={section.inset.alt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        )}
      </div>
      <div className="relative min-h-[60vh] overflow-hidden bg-[#151713] max-[809px]:min-h-[70vh]">
        {media && (media.video && !reduceMotion ? (
          <video src={media.video} poster={media.image} autoPlay muted loop playsInline preload="auto" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.image} alt={media.alt ?? ''} className="absolute inset-0 h-full w-full object-cover" />
        ))}
        {panel && (
          /* A small black rectangle in the corner. On hover it grows and a
             thumbnail of the clip fades in, so it reads as a video before the
             click. Touch screens have no hover, so under 810px the thumbnail
             is always visible at the small size. */
          <button
            type="button"
            onClick={() => panel.preview && setPreviewOpen(true)}
            aria-label={panel.preview ? `Play a preview: ${panel.label ?? 'clip'}` : panel.label}
            className={`group absolute bottom-0 right-0 h-[120px] w-[220px] overflow-hidden bg-[#0f100e] text-left text-[#f2eee7] transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:h-[240px] hover:w-[360px] max-[809px]:h-[110px] max-[809px]:w-[190px] ${panel.preview ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {panel.preview?.poster && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={panel.preview.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-[809px]:opacity-100"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.55),rgba(8,9,7,.15)_45%,rgba(8,9,7,.8))] opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-[809px]:opacity-100" aria-hidden />
              </>
            )}
            <span className="absolute left-5 top-4 text-[20px] leading-none transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" aria-hidden>↖</span>
            <span className="absolute right-5 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-current/60 text-[9px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-[809px]:opacity-100" aria-hidden>▶</span>
            {panel.label && (
              <span className="absolute inset-x-5 bottom-4 block text-[12px] font-medium tracking-[0.02em]">{panel.label}</span>
            )}
            {panel.caption && (
              <span className="absolute inset-x-5 bottom-10 block max-h-0 overflow-hidden text-[9px] leading-[1.6] opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-12 group-hover:opacity-80">{panel.caption}</span>
            )}
          </button>
        )}
      </div>
      {panel?.preview && previewOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={panel.label ?? 'Preview'}
          onClick={() => setPreviewOpen(false)}
        >
          <div className="w-full max-w-[960px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 text-[#f2eee7]">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">{panel.label}</span>
              <button type="button" onClick={() => setPreviewOpen(false)} className="cursor-pointer text-[10px] uppercase tracking-[0.2em] opacity-70 hover:opacity-100">Close</button>
            </div>
            <video src={panel.preview.video} poster={panel.preview.poster} controls autoPlay playsInline className="aspect-video w-full bg-black" />
          </div>
        </div>
      )}
    </div>
  );
}

function Hero({ section }: { section: Extract<SalesSection, { kind: 'hero' }> }) {
  const reduceMotion = useReducedMotion();
  const media = section.media;
  if (section.variant === 'split') return <SplitHero section={section} />;
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#151713] text-[#f2eee7]">
      {media && (
        <div className="absolute -inset-[4%]">
          {media.video && !reduceMotion ? (
            <video src={media.video} poster={media.image} autoPlay muted loop playsInline preload="auto" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.image} alt={media.alt ?? ''} className="absolute inset-0 h-full w-full object-cover" />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.78),rgba(8,9,7,.5)_42%,rgba(8,9,7,.8))]" />
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-24 pt-28 text-center">
        {/* CSS entrance only: a JS-driven entrance that never finishes leaves
            the headline invisible, and a stage demo cannot carry that risk. */}
        {section.eyebrow && (
          <p className="rise mb-7 text-[10px] font-medium uppercase tracking-[0.26em]">{section.eyebrow}</p>
        )}
        <div className="overflow-hidden py-2">
          {/* A short headline is display type; a sentence-length one takes the
              event page's sentence scale, or it becomes a wall of serif. */}
          <h1
            className={`rise rise-2 text-balance ${
              section.headline.length > 70
                ? 'max-w-[820px] text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.15] tracking-[-0.035em]'
                : 'max-w-[1100px] text-[clamp(3.4rem,7.5vw,7.6rem)] leading-[0.88] tracking-[-0.045em]'
            }`}
            style={display}
          >
            <Emphasis text={section.headline} emphasis={section.emphasis} />
          </h1>
        </div>
        <p className="rise rise-3 mt-8 max-w-[610px] text-[15px] leading-[1.75] tracking-[0.05em] text-white/82">
          {section.subheadline}
        </p>
        <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-8">
          <Cta label={section.buttonLabel} variant="link" />
          {section.secondaryLabel && (
            <a href="#next" className="border-b border-white/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
              {section.secondaryLabel}
            </a>
          )}
        </div>
        {section.microcopy && <p className="rise rise-4 mt-6 text-[10px] uppercase tracking-[0.2em] text-white/60">{section.microcopy}</p>}
      </div>
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.22em]">
        <span>Scroll down</span>
        <span className="h-10 w-px overflow-hidden bg-white/35">
          <motion.span className="block h-full w-full bg-white" animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </div>
    </div>
  );
}

/** The hero's black rectangle: arrow mark top-left, content below. */
function BlackPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#0f100e] text-[#f2eee7] ${className}`}>
      <span className="absolute left-6 top-5 text-[20px] leading-none" aria-hidden>↖</span>
      {children}
    </div>
  );
}

/** A text column in the hero's manner: centred, eyebrow, headline, prose, button. */
function Column({ kicker, headline, emphasis, paragraphs, buttonLabel, tone, children }: {
  kicker?: string; headline: string; emphasis?: string; paragraphs?: string[]; buttonLabel?: string; tone: Tone; children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {kicker && <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{kicker}</p>}
      <Display text={headline} emphasis={emphasis} center />
      {paragraphs && paragraphs.length > 0 && (
        <div className="mt-7 max-w-[520px] space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className={`${T_BODY_SM} ${i === 0 ? 'opacity-85' : muted(tone)}`}>{para}</p>
          ))}
        </div>
      )}
      {children}
      {buttonLabel && (
        <div className="mt-9">
          <Cta label={buttonLabel} variant={tone === 'cream' ? 'solid' : 'cream'} />
        </div>
      )}
    </div>
  );
}

/**
 * The seminars as a row of cards along the bottom of a photograph. One is
 * open at a time as the hero's black panel; the rest sit compressed and
 * shift as the open one moves. Click a card or use the arrows. Under 810px
 * the row becomes a stack with the open card expanded in place.
 */
function ExpandingRow({ items }: { items: { label: string; detail?: string; group?: string }[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const go = (i: number) => setActive((i + n) % n);
  return (
    <div>
      <div className="flex gap-2 max-[809px]:flex-col">
        {items.map((it, i) => {
          const open = i === active;
          return (
            <button
              key={it.label}
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={open}
              style={{ flexGrow: open ? 3.4 : 1, flexBasis: 0 }}
              className={`group relative min-w-0 overflow-hidden text-left transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[809px]:w-full ${
                open ? 'h-[280px] bg-[#0f100e] text-[#f2eee7] max-[809px]:h-auto' : 'h-[280px] bg-[rgba(15,16,14,0.55)] text-[#f2eee7] backdrop-blur-sm hover:bg-[rgba(15,16,14,0.75)] max-[809px]:h-[64px]'
              }`}
            >
              <span className="absolute left-5 top-4 text-[10px] uppercase tracking-[0.2em] opacity-70">{String(i + 1).padStart(2, '0')}</span>
              {open && <span className="absolute right-5 top-4 text-[18px] leading-none" aria-hidden>↖</span>}
              {open ? (
                <span className="absolute inset-x-6 bottom-6 block max-[809px]:relative max-[809px]:inset-auto max-[809px]:px-5 max-[809px]:pb-6 max-[809px]:pt-12">
                  {it.group && <span className="block text-[9px] uppercase tracking-[0.2em] opacity-60">{it.group}</span>}
                  <span className="mt-3 block max-w-[26ch] text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.15] tracking-[-0.02em]" style={display}>{it.label}</span>
                  {it.detail && <span className="mt-4 block max-w-[46ch] text-[13px] leading-[1.7] opacity-75">{it.detail}</span>}
                </span>
              ) : (
                <span className="absolute inset-x-5 bottom-5 block text-[12px] leading-[1.35] tracking-[0.01em] opacity-90 max-[809px]:bottom-auto max-[809px]:top-1/2 max-[809px]:left-14 max-[809px]:-translate-y-1/2 max-[809px]:text-[13px]" style={display}>{it.label}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="h-px w-[160px] bg-[rgba(242,238,231,0.25)]">
          <div className="h-px bg-[#f2eee7] transition-[width] duration-500" style={{ width: `${((active + 1) / n) * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous seminar" className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[rgba(15,16,14,0.55)] text-[#f2eee7] backdrop-blur-sm transition-colors hover:bg-[#0f100e]">←</button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next seminar" className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[rgba(15,16,14,0.55)] text-[#f2eee7] backdrop-blur-sm transition-colors hover:bg-[#0f100e]">→</button>
        </div>
      </div>
    </div>
  );
}

/** A pull quote in the column: the line the reader is meant to stop on. */
function PullLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-[640px] text-center text-[clamp(1.4rem,2.2vw,2rem)] italic leading-[1.3] tracking-[-0.02em]" style={display}>
      {children}
    </p>
  );
}

function Section({ section }: { section: SalesSection }) {
  switch (section.kind) {
    case 'hero':
      return <Hero section={section} />;

    /* 2. The manifesto: one reading column, the headline, the prose, the
       third paragraph lifted as a pull line, then a full-width photograph
       with the black caption panel. */
    case 'problem': {
      const tone: Tone = 'cream';
      const [first, second, third, ...rest] = section.body;
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} paragraphs={[first, second].filter(Boolean)} tone={tone} />
            </Reveal>
            {third && (
              <Reveal>
                <PullLine>{third}</PullLine>
              </Reveal>
            )}
            {rest.length > 0 && (
              <Reveal>
                <div className="mx-auto max-w-[520px] space-y-5">
                  {rest.map((para, i) => (
                    <p key={i} className={`${T_BODY_SM} ${i === 0 ? 'opacity-85' : muted(tone)}`}>{para}</p>
                  ))}
                </div>
              </Reveal>
            )}
            {section.image && (
              <Reveal>
                <div className="relative aspect-[2.1] w-full overflow-hidden max-[809px]:aspect-[1.2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  {section.image.caption && (
                    <BlackPanel className="absolute bottom-0 right-0 h-[110px] w-[240px]">
                      <span className="absolute inset-x-5 bottom-4 block text-[9px] leading-[1.6] opacity-80">{section.image.caption}</span>
                    </BlackPanel>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    /* 3. The modules: a photograph that stays put while the numbered steps
       scroll past it as tall panels. */
    case 'story': {
      const tone: Tone = 'dark';
      return (
        <div className={`${toneClass[tone]} grid grid-cols-[0.42fr_0.58fr] max-[809px]:grid-cols-1`}>
          <div className="relative max-[809px]:min-h-[50vh]">
            <div className="sticky top-0 h-screen max-[809px]:relative max-[809px]:h-[50vh]">
              {section.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,24,20,.15),rgba(23,24,20,.85))]" />
              <div className="absolute inset-x-8 bottom-10 max-[809px]:inset-x-5 max-[809px]:bottom-6">
                {section.kicker && <p className="text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{section.kicker}</p>}
                <h2 className={`mt-5 max-w-[420px] text-balance ${T_DISPLAY}`} style={display}>
                  <Emphasis text={section.headline} emphasis={section.emphasis} />
                </h2>
              </div>
            </div>
          </div>
          <div className={`border-l ${rule(tone)} max-[809px]:border-l-0`}>
            {section.body && (
              <div className={`border-b ${rule(tone)} px-10 py-14 max-[809px]:px-5 max-[809px]:py-10`}>
                <p className={`max-w-[520px] ${T_BODY_SM} opacity-85`}>{section.body}</p>
              </div>
            )}
            {section.steps.map((st, i) => (
              <Reveal key={st.title} className={`flex min-h-[52vh] flex-col justify-between border-b ${rule(tone)} px-10 py-12 max-[809px]:min-h-0 max-[809px]:px-5 max-[809px]:py-10`}>
                <div className="flex items-baseline justify-between">
                  <span className={`${T_META} opacity-60`}>{String(i + 1).padStart(2, '0')} / {String(section.steps.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-16 max-w-[520px] max-[809px]:mt-10">
                  <h3 className="text-[clamp(1.5rem,2.3vw,2.2rem)] leading-[1.1] tracking-[-0.025em]" style={display}>{st.title}</h3>
                  <p className={`mt-5 ${T_BODY_SM} opacity-70`}>{st.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      );
    }

    /* 4. The profile: a square portrait with the black caption panel, the
       words beside it, and a strip of facts across the bottom. */
    case 'credentials': {
      const tone: Tone = 'cream';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={WIDE}>
            <div className="grid grid-cols-[0.4fr_0.6fr] items-center gap-[6vw] max-[809px]:grid-cols-1 max-[809px]:gap-10">
              {section.image && (
                <Reveal>
                  <div className="relative aspect-square w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    <BlackPanel className="absolute bottom-0 left-0 h-[96px] w-[200px]">
                      <span className="absolute inset-x-5 bottom-4 block text-[9px] uppercase tracking-[0.16em] opacity-80">{section.image.alt}</span>
                    </BlackPanel>
                  </div>
                </Reveal>
              )}
              <Reveal>
                {section.kicker && <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{section.kicker}</p>}
                <Display text={section.headline} emphasis={section.emphasis} />
                <div className="mt-7 max-w-[560px] space-y-5">
                  {section.body.map((para, i) => (
                    <p key={i} className={`${T_BODY_SM} ${i === 0 ? 'opacity-85' : muted(tone)}`}>{para}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            {section.facts && section.facts.length > 0 && (
              <Reveal>
                <ul className={`mt-16 grid grid-cols-4 border-t ${rule(tone)} max-[809px]:grid-cols-2`}>
                  {section.facts.map((f) => (
                    <li key={f.label} className={`border-b ${rule(tone)} py-7 pr-6`}>
                      <p className="text-[clamp(1.8rem,2.6vw,2.6rem)] leading-none" style={display}>{f.value}</p>
                      <p className={`mt-3 ${T_META} ${muted(tone)}`}>{f.label}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    /* 5. What you get: a dark band, the words centred, the items as a grid
       of bordered cells with numerals. */
    case 'offer': {
      const tone: Tone = 'dark';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} paragraphs={section.body ? [section.body] : undefined} tone={tone} />
            </Reveal>
            <Reveal>
              <ul className={`mx-auto grid max-w-[1100px] grid-cols-2 border-l border-t ${rule(tone)} max-[809px]:grid-cols-1`}>
                {section.items.map((item, i) => (
                  <li key={item.label} className={`flex min-h-[200px] flex-col justify-between border-b border-r ${rule(tone)} p-7`}>
                    <div className="flex items-baseline justify-between">
                      <span className={`${T_META} opacity-55`}>{String(i + 1).padStart(2, '0')}</span>
                      {item.tag && <span className={`${T_META} opacity-55`}>{item.tag}</span>}
                    </div>
                    <p className="mt-10 max-w-[30ch] text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.25] tracking-[-0.015em]" style={display}>{item.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            {section.buttonLabel && (
              <Reveal>
                <div className="flex justify-center">
                  <Cta label={section.buttonLabel} variant="cream" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    /* 6. Stories: large italic quotes on cream, one above the other, each
       with a hairline and its name set small. */
    case 'proof': {
      const tone: Tone = 'cream';
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[0.3fr_0.7fr] gap-[6vw] max-[809px]:grid-cols-1 max-[809px]:gap-10`}>
            <div>
              {section.kicker && <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{section.kicker}</p>}
              <Display text={section.headline} emphasis={section.emphasis} />
            </div>
            <div>
              {section.quotes.map((q) => (
                <Reveal key={q.who}>
                  <figure className={`border-t ${rule(tone)} py-10`}>
                    <blockquote className="max-w-[760px] text-[clamp(1.35rem,2vw,1.9rem)] italic leading-[1.3] tracking-[-0.015em]" style={display}>
                      “{q.quote}”
                    </blockquote>
                    <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{q.who}</span>
                      {q.role && <span className={`${T_META} ${muted(tone)}`}>{q.role}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* 7. The programme: a photograph band, the words at the top, the
       seminars as an expanding row along the bottom, the anchor beneath. */
    case 'value-stack': {
      return (
        <div className="relative overflow-hidden bg-[#151713] text-[#f2eee7]">
          {section.image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.72),rgba(8,9,7,.35)_45%,rgba(8,9,7,.7))]" />
            </>
          )}
          <div className={`relative ${WIDE} ${SECTION} !px-0`}>
            <Reveal>
              <div className="max-w-[560px] px-7 max-[809px]:px-5">
                <Display text={section.headline} emphasis={section.emphasis} />
                {section.body && <p className={`mt-6 max-w-[460px] ${T_BODY_SM} opacity-80`}>{section.body}</p>}
              </div>
            </Reveal>
            <Reveal className="mt-[clamp(3rem,6vw,6rem)] px-7 max-[809px]:px-5">
              <ExpandingRow items={section.items} />
            </Reveal>
            {(section.total || section.buttonLabel) && (
              <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-8 px-7 max-[809px]:px-5">
                {section.total && (
                  <p className="flex items-baseline gap-4">
                    <span className={`${T_META} opacity-70`}>{section.total.label}</span>
                    <span className="text-[clamp(1.8rem,2.8vw,2.8rem)] leading-none" style={display}>{section.total.value}</span>
                  </p>
                )}
                {section.buttonLabel && <Cta label={section.buttonLabel} variant="cream" />}
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    /* 8. Why now: a photograph band with the words over it. */
    case 'scarcity': {
      return (
        <div className={`relative overflow-hidden bg-[#151713] text-[#f2eee7] ${SECTION}`}>
          {section.image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.7),rgba(8,9,7,.55)_50%,rgba(8,9,7,.8))]" />
            </>
          )}
          <div className={`relative ${WIDE}`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} paragraphs={section.body} tone="dark" />
            </Reveal>
          </div>
        </div>
      );
    }

    /* 9. The guarantee: three pillars across, numbered, with the button. */
    case 'guarantee': {
      const tone: Tone = 'cream';
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} tone={tone} />
            </Reveal>
            <Reveal>
              <ol className={`mx-auto grid max-w-[1100px] grid-cols-3 gap-8 border-t ${rule(tone)} pt-8 max-[809px]:grid-cols-1`}>
                {section.body.map((para, i) => (
                  <li key={i}>
                    <span className={`${T_META} ${muted(tone)}`}>{String(i + 1).padStart(2, '0')}</span>
                    <p className={`mt-4 ${T_BODY_SM} opacity-85`}>{para}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            {section.buttonLabel && (
              <Reveal>
                <div className="flex justify-center">
                  <Cta label={section.buttonLabel} variant="solid" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    /* 10. The price: the words beside the hero's black panel. */
    case 'pricing': {
      const tone: Tone = 'cream';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[0.5fr_0.5fr] items-center gap-[7vw] max-[809px]:grid-cols-1 max-[809px]:gap-12`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} paragraphs={section.body ? [section.body] : undefined} tone={tone} />
            </Reveal>
            <Reveal>
              <BlackPanel className="mx-auto w-full max-w-[460px] p-8 pt-16 max-[809px]:p-6 max-[809px]:pt-14">
                <div className="flex items-baseline justify-between gap-4">
                  <p className={`${T_META} opacity-70`}>{section.cardLabel ?? 'The offer'}</p>
                  {section.priceNote && <p className={`${T_META} opacity-70`}>{section.priceNote}</p>}
                </div>
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-[clamp(3rem,4.6vw,4.6rem)] leading-none" style={display}>{section.price}</span>
                  {section.currencyLabel && <span className={`${T_META} opacity-55`}>{section.currencyLabel}</span>}
                </div>
                <div className="mt-9 [&_button]:w-full [&_a]:w-full">
                  <Cta label={section.buttonLabel} variant="cream" />
                </div>
                {section.guarantee && <p className="mt-6 text-[10px] leading-[1.7] opacity-60">{section.guarantee}</p>}
              </BlackPanel>
            </Reveal>
          </div>
        </div>
      );
    }

    /* 11. The warning: dark, the first paragraph set as the pull line. */
    case 'warning': {
      const [first, ...rest] = section.body;
      return (
        <div className={`${toneClass.dark} ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <Column kicker={section.kicker} headline={section.headline} emphasis={section.emphasis} tone="dark" />
            </Reveal>
            {first && (
              <Reveal>
                <PullLine>{first}</PullLine>
              </Reveal>
            )}
            <Reveal>
              <div className="mx-auto max-w-[520px] space-y-5">
                {rest.map((para, i) => (
                  <p key={i} className={`${T_BODY_SM} ${i === 0 ? 'opacity-85' : 'opacity-65'}`}>{para}</p>
                ))}
              </div>
            </Reveal>
            {section.buttonLabel && (
              <Reveal>
                <div className="flex justify-center">
                  <Cta label={section.buttonLabel} variant="cream" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    case 'faq': {
      const tone: Tone = 'cream';
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[0.4fr_0.6fr] gap-[7vw] max-[809px]:grid-cols-1 max-[809px]:gap-10`}>
            <div>
              {section.kicker && <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.26em] opacity-70">{section.kicker}</p>}
              <h2 className={`text-balance ${T_DISPLAY} italic`} style={display}>
                <Emphasis text={section.headline} emphasis={section.emphasis} />
              </h2>
            </div>
            <div className={`border-t ${rule(tone)}`}>
              {section.items.map((item) => (
                <details key={item.q} className={`group border-b ${rule(tone)} py-5`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-[11px] font-semibold uppercase tracking-[0.12em]">
                    <span>{item.q}</span>
                    <span className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className={`max-w-[560px] pt-4 ${T_BODY_SM} ${muted(tone)}`}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* 13. The closing mirrors the hero: photograph, then the column with the button. */
    case 'final-cta':
      return (
        <div className="grid grid-cols-[0.55fr_0.45fr] max-[809px]:grid-cols-1">
          <div className="relative min-h-[70vh] bg-[#151713] max-[809px]:min-h-[50vh]">
            {section.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            )}
          </div>
          <div className={`flex items-center justify-center bg-[var(--surface)] text-[var(--ink)] ${SECTION}`}>
            <Column kicker={section.body} headline={section.headline} emphasis={section.emphasis} buttonLabel={section.buttonLabel} tone="cream" />
          </div>
        </div>
      );
  }
}

const NAV_LABELS: Partial<Record<SalesSection['kind'], string>> = {
  story: 'The sessions',
  credentials: 'Paul',
  offer: 'Inside',
  'value-stack': 'Included',
  proof: 'Stories',
  pricing: 'Get access',
  faq: 'Questions',
};

export default function SalesPageEditorial() {
  const [showBar, setShowBar] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    rememberReferralCode();
    trackEvent('start');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const id = el.dataset.section;
          if (!id) continue;
          trackEvent('view', { screenIndex: Number(el.dataset.index), screenId: id });
          if (id === 'final-cta') trackEvent('complete', { data: { depth: 'final-cta' } });
        }
      },
      { threshold: 0.2 }
    );
    const refs = sectionRefs.current;
    refs.forEach((el) => observer.observe(el));
    const onScroll = () => setShowBar(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const nav = SALES.sections
    .filter((s) => NAV_LABELS[s.kind])
    .map((s) => ({ label: NAV_LABELS[s.kind]!, href: `#${s.kind}` }));
  const firstAfterHero = SALES.sections.find((s) => s.kind !== 'hero')?.kind;

  return (
    <OpenCheckoutContext.Provider value={openCheckout}>
      <main className="flex-1 bg-[var(--background)] text-[var(--ink)]">
        {/* Thin brand rail over the hero, then a sticky jump-nav in the event page's manner. */}
        <header className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-7 py-6 max-[809px]:px-5 ${SALES.sections[0]?.kind === 'hero' && SALES.sections[0].variant === 'split' ? 'text-[var(--ink)]' : 'text-[#f2eee7]'}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">{BRAND.wordmark}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 max-[809px]:hidden">{SALES.stickyBar?.text}</span>
        </header>

        {SALES.sections.map((section, i) => (
          <section
            key={`${section.kind}-${i}`}
            id={section.kind === firstAfterHero ? 'next' : section.kind}
            data-section={section.kind}
            data-index={i}
            ref={(el) => {
              if (el) sectionRefs.current.set(section.kind, el);
            }}
            className="scroll-mt-[56px]"
          >
            {section.kind === firstAfterHero && <span id={section.kind} />}
            {i === 1 && nav.length > 0 && (
              <nav className="sticky top-0 z-20 flex items-center justify-center gap-10 overflow-x-auto border-b border-[color-mix(in_srgb,var(--ink)_15%,transparent)] bg-[var(--background)] px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] max-[809px]:justify-start max-[809px]:gap-7">
                {nav.map((l) => (
                  <a key={l.href} href={l.href} className="whitespace-nowrap transition-opacity hover:opacity-60">{l.label}</a>
                ))}
              </nav>
            )}
            <Section section={section} />
          </section>
        ))}

        <footer className="border-t border-[color-mix(in_srgb,var(--ink)_15%,transparent)] px-7 py-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">{BRAND.wordmark}</p>
          {SALES.footer && <p className={`mt-3 ${T_META} opacity-50`}>{SALES.footer}</p>}
        </footer>

        {SALES.stickyBar && (
          <div className={`fixed inset-x-0 bottom-0 z-20 flex items-center justify-center gap-6 bg-[var(--ink)] px-5 py-3 text-[var(--background)] transition-transform duration-300 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}>
            <span className={`hidden sm:inline ${T_META}`}>{SALES.stickyBar.text}</span>
            <Cta label={SALES.stickyBar.buttonLabel} variant="cream" className="!h-[42px] !px-6" />
          </div>
        )}

        {CTA.kind === 'two-step-checkout' && <CheckoutModal open={checkoutOpen} onClose={closeCheckout} cta={CTA} />}
      </main>
    </OpenCheckoutContext.Provider>
  );
}
