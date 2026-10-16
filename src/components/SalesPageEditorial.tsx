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
import type { SalesImage, SalesSection } from '@/lib/types';
import CheckoutModal, { OpenCheckoutContext, useOpenCheckout } from './CheckoutModal';

/* The event page's type scale and rhythm, verbatim. */
const SECTION = 'px-7 py-[clamp(4.5rem,9vw,8rem)] max-[809px]:px-5';
const BLOCK_GAP = 'space-y-[clamp(3rem,5.5vw,5.5rem)]';
const T_DISPLAY = 'text-[clamp(2.7rem,5.6vw,5.9rem)] leading-[0.92] tracking-[-0.04em]';
const T_SUBHEAD = 'text-[clamp(1.35rem,1.9vw,1.8rem)] leading-[1.1] tracking-[-0.02em]';
const T_BODY = 'text-[clamp(1.02rem,1.32vw,1.22rem)] leading-[1.78]';
const T_BODY_SM = 'text-[clamp(0.95rem,1.1vw,1.03rem)] leading-[1.8]';
const T_META = 'text-[10px] uppercase tracking-[0.2em]';
const MEASURE = 'mx-auto max-w-[760px]';
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

/** "/ Label": the event page's eyebrow. */
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-medium uppercase tracking-[0.22em] opacity-70">/ {children}</p>;
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
    <h2 className={`text-balance ${T_DISPLAY} ${center ? 'mx-auto max-w-[1100px] text-center' : 'max-w-[920px]'} ${className}`} style={display}>
      <Emphasis text={text} emphasis={emphasis} />
    </h2>
  );
}

function Figure({ image, tone }: { image: SalesImage; tone: Tone }) {
  return (
    <Reveal>
      <figure>
        <div className="relative aspect-[2.1] w-full overflow-hidden max-[809px]:aspect-[1.35]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        {image.caption && (
          <figcaption className={`mt-5 text-center text-[10px] uppercase tracking-[0.18em] ${muted(tone)}`}>{image.caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/** One CTA, three dressings: solid claret on cream, solid cream on ink, or the underlined editorial link. */
function Cta({ label, variant, className = '' }: { label: string; variant: 'solid' | 'cream' | 'link'; className?: string }) {
  const ref = useReferralCode();
  const openCheckout = useOpenCheckout();
  const base =
    variant === 'link'
      ? 'inline-flex cursor-pointer items-center border-b border-current pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-65'
      : variant === 'cream'
        ? 'inline-flex h-[54px] cursor-pointer items-center justify-center bg-[var(--background)] px-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-opacity hover:opacity-90'
        : 'inline-flex h-[54px] cursor-pointer items-center justify-center bg-[var(--ink)] px-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90';
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
          <Cta
            label={`${section.buttonLabel} ↗`}
            variant="solid"
            className="!h-[62px] !px-12 !text-[11px] !tracking-[0.22em] shadow-[0_22px_48px_rgba(71,20,26,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
          />
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

function Rows({ items, tone, numerals = true }: { items: { title: string; body?: string; aside?: string }[]; tone: Tone; numerals?: boolean }) {
  return (
    <ol className={`border-t ${rule(tone)}`}>
      {items.map((item, i) => (
        <li key={item.title} className={`grid grid-cols-[44px_1fr_auto] items-start gap-5 border-b ${rule(tone)} py-6`}>
          <span className={`pt-1 ${T_META} ${muted(tone)}`}>{numerals ? String(i + 1).padStart(2, '0') : '·'}</span>
          <div>
            <p className={T_SUBHEAD} style={display}>{item.title}</p>
            {item.body && <p className={`mt-3 max-w-[56ch] ${T_BODY_SM} ${muted(tone)}`}>{item.body}</p>}
          </div>
          {item.aside && <span className={`whitespace-nowrap pt-1 ${T_META} ${muted(tone)}`}>{item.aside}</span>}
        </li>
      ))}
    </ol>
  );
}

function Section({ section }: { section: SalesSection }) {
  switch (section.kind) {
    case 'hero':
      return <Hero section={section} />;

    case 'problem': {
      const tone: Tone = 'cream';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <div className="flex flex-col items-center gap-[clamp(1.75rem,2.6vw,2.5rem)]">
                {section.kicker && <Label>{section.kicker}</Label>}
                <Display text={section.headline} emphasis={section.emphasis} center />
              </div>
            </Reveal>
            <Reveal>
              <div className={`${MEASURE} space-y-7`}>
                {section.body.map((para, i) => (
                  <p key={i} className={`${T_BODY} ${i === 0 ? '' : muted(tone)}`}>{para}</p>
                ))}
              </div>
            </Reveal>
            {section.image && <Figure image={section.image} tone={tone} />}
          </div>
        </div>
      );
    }

    case 'story': {
      const tone: Tone = 'dark';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <div className="flex flex-col items-center gap-[clamp(1.75rem,2.6vw,2.5rem)]">
                {section.kicker && <Label>{section.kicker}</Label>}
                <Display text={section.headline} emphasis={section.emphasis} center />
                {section.body && <p className={`${MEASURE} text-center text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.7] opacity-85`}>{section.body}</p>}
              </div>
            </Reveal>
            {section.image && <Figure image={section.image} tone={tone} />}
            <Reveal>
              <div className="mx-auto max-w-[1000px]">
                <Rows items={section.steps.map((s) => ({ title: s.title, body: s.body }))} tone={tone} />
              </div>
            </Reveal>
          </div>
        </div>
      );
    }

    case 'credentials': {
      const tone: Tone = 'cream';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[1.1fr_0.9fr] gap-[8vw] max-[809px]:grid-cols-1 max-[809px]:gap-14`}>
            <Reveal>
              {section.kicker && <Label>{section.kicker}</Label>}
              <Display text={section.headline} emphasis={section.emphasis} className="mt-[clamp(1.75rem,2.6vw,2.5rem)]" />
              <div className="mt-9 max-w-[620px] space-y-7">
                {section.body.map((para, i) => (
                  <p key={i} className={`${T_BODY} ${i === 0 ? '' : muted(tone)}`}>{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              {section.image && (
                <div className="relative aspect-[1.2] w-full overflow-hidden max-[809px]:aspect-[1.35]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              {section.facts && section.facts.length > 0 && (
                <ul className={`${section.image ? 'mt-10' : ''} border-t ${rule(tone)}`}>
                  {section.facts.map((f) => (
                    <li key={f.label} className={`grid grid-cols-[1fr_auto] items-baseline gap-6 border-b ${rule(tone)} py-5`}>
                      <span className={`${T_META} ${muted(tone)}`}>{f.label}</span>
                      <span className={T_SUBHEAD} style={display}>{f.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </div>
      );
    }

    case 'scarcity':
    case 'guarantee':
    case 'warning': {
      const tone: Tone = section.kind === 'scarcity' ? 'dark' : section.kind === 'warning' ? 'claret' : 'cream';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} ${BLOCK_GAP}`}>
            <Reveal>
              <div className="flex flex-col items-center gap-[clamp(1.75rem,2.6vw,2.5rem)]">
                {section.kicker && <Label>{section.kicker}</Label>}
                <Display text={section.headline} emphasis={section.emphasis} center />
              </div>
            </Reveal>
            <Reveal>
              <div className={`${MEASURE} space-y-7`}>
                {section.body.map((para, i) => (
                  <p key={i} className={`${T_BODY} ${i === 0 ? '' : muted(tone)}`}>{para}</p>
                ))}
              </div>
            </Reveal>
            {section.kind !== 'scarcity' && section.buttonLabel && (
              <Reveal>
                <div className="flex justify-center">
                  <Cta label={section.buttonLabel} variant={tone === 'claret' ? 'cream' : 'solid'} />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      );
    }

    case 'offer': {
      const tone: Tone = 'claret';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[1.1fr_0.9fr] gap-[9vw] max-[809px]:grid-cols-1 max-[809px]:gap-16`}>
            <Reveal>
              {section.kicker && <Label>{section.kicker}</Label>}
              <Display text={section.headline} emphasis={section.emphasis} className="mt-[clamp(1.75rem,2.6vw,2.5rem)]" />
              {section.body && <p className={`mt-9 max-w-[580px] ${T_BODY_SM} opacity-70`}>{section.body}</p>}
              {section.buttonLabel && (
                <div className="mt-12">
                  <Cta label={section.buttonLabel} variant="cream" />
                </div>
              )}
            </Reveal>
            <Reveal>
              <p className={`border-b ${rule(tone)} pb-5 ${T_META} opacity-60`}>Included</p>
              <ul>
                {section.items.map((item, i) => (
                  <li key={item.label} className={`grid grid-cols-[44px_1fr_auto] gap-4 border-b ${rule(tone)} py-5 ${T_BODY_SM}`}>
                    <span className="opacity-40">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                    {item.tag && <span className={`whitespace-nowrap ${T_META} opacity-55`}>{item.tag}</span>}
                  </li>
                ))}
              </ul>
              {section.image && (
                <div className="mt-10">
                  <Figure image={section.image} tone={tone} />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      );
    }

    case 'value-stack': {
      const tone: Tone = 'cream';
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[1fr_1.1fr] gap-[8vw] max-[809px]:grid-cols-1 max-[809px]:gap-14`}>
            <Reveal>
              {section.kicker && <Label>{section.kicker}</Label>}
              <Display text={section.headline} emphasis={section.emphasis} className="mt-[clamp(1.75rem,2.6vw,2.5rem)]" />
              {section.body && <p className={`mt-9 max-w-[520px] ${T_BODY_SM} ${muted(tone)}`}>{section.body}</p>}
              {section.buttonLabel && (
                <div className="mt-12 max-[809px]:hidden">
                  <Cta label={section.buttonLabel} variant="solid" />
                </div>
              )}
            </Reveal>
            <Reveal>
              <Rows items={section.items.map((it) => ({ title: it.label, body: it.detail, aside: it.value }))} tone={tone} />
              {section.total && (
                <div className="flex items-baseline justify-between gap-6 py-7">
                  <span className={`${T_META} ${muted(tone)}`}>{section.total.label}</span>
                  <span className="text-[clamp(2rem,3.2vw,3.2rem)] leading-none" style={display}>{section.total.value}</span>
                </div>
              )}
              {section.buttonLabel && (
                <div className="mt-6 hidden max-[809px]:block">
                  <Cta label={section.buttonLabel} variant="solid" className="w-full" />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      );
    }

    case 'proof': {
      const tone: Tone = 'dark';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={WIDE}>
            {section.kicker && <Label>{section.kicker}</Label>}
            <div className="mt-12 grid grid-cols-[0.7fr_1.3fr] gap-[8vw] max-[809px]:grid-cols-1 max-[809px]:gap-12">
              <Display text={section.headline} emphasis={section.emphasis} className="leading-[0.9]" />
              <div className="space-y-16">
                {section.quotes.map((q) => (
                  <Reveal key={q.who}>
                    <figure className={`border-t ${rule(tone)} pt-8`}>
                      <blockquote className="text-[clamp(1.6rem,2.8vw,3.1rem)] italic leading-[1.12] tracking-[-0.025em]" style={display}>
                        “{q.quote}”
                      </blockquote>
                      <figcaption className="mt-10">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">{q.who}</p>
                        {q.role && <p className="mt-2 text-[10px] uppercase tracking-[0.16em] opacity-45">{q.role}</p>}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pricing': {
      const tone: Tone = 'claret';
      return (
        <div className={`${toneClass[tone]} ${SECTION}`}>
          <div className={`${WIDE} grid grid-cols-[1.1fr_0.9fr] items-end gap-[9vw] max-[809px]:grid-cols-1 max-[809px]:gap-14`}>
            <Reveal>
              {section.kicker && <Label>{section.kicker}</Label>}
              <Display text={section.headline} emphasis={section.emphasis} className="mt-[clamp(1.75rem,2.6vw,2.5rem)]" />
              {section.body && <p className={`mt-9 max-w-[580px] ${T_BODY_SM} opacity-70`}>{section.body}</p>}
            </Reveal>
            <Reveal>
              <div className={`flex flex-col border ${rule(tone)} bg-black/15 p-9 max-[809px]:p-6`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className={`${T_META} opacity-60`}>{section.cardLabel ?? 'Option 01'}</p>
                  {section.priceNote && <p className={`${T_META} opacity-80`}>{section.priceNote}</p>}
                </div>
                <div className="mt-8 flex items-baseline gap-4">
                  <span className="text-[clamp(3.2rem,4.8vw,4.8rem)] leading-none" style={display}>{section.price}</span>
                  {section.currencyLabel && <span className={`${T_META} opacity-55`}>{section.currencyLabel}</span>}
                </div>
                <div className="mt-9">
                  <Cta label={section.buttonLabel} variant="cream" className="w-full" />
                </div>
                {section.guarantee && <p className={`mt-6 ${T_BODY_SM} opacity-60`}>{section.guarantee}</p>}
              </div>
            </Reveal>
          </div>
        </div>
      );
    }

    case 'faq': {
      const tone: Tone = 'cream';
      return (
        <div className={`bg-[var(--background)] text-[var(--ink)] ${SECTION}`}>
          <div className={WIDE}>
            {section.kicker && <Label>{section.kicker}</Label>}
            <div className="mt-[clamp(1.75rem,2.6vw,2.5rem)] grid grid-cols-[0.72fr_1.28fr] gap-[8vw] max-[809px]:grid-cols-1 max-[809px]:gap-10">
              <h2 className="text-balance text-[clamp(2.7rem,3.5vw,3.9rem)] italic leading-[0.9] tracking-[-0.04em]" style={display}>
                <Emphasis text={section.headline} emphasis={section.emphasis} />
              </h2>
              <div className={`border-t ${rule(tone)}`}>
                {section.items.map((item) => (
                  <details key={item.q} className={`group border-b ${rule(tone)} py-6`}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-[12px] font-semibold uppercase tracking-[0.12em]">
                      <span>{item.q}</span>
                      <span className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className={`max-w-[650px] pt-5 ${T_BODY_SM} ${muted(tone)}`}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'final-cta':
      return (
        <div className={`relative flex min-h-[88vh] items-end overflow-hidden px-7 py-16 max-[809px]:px-5 ${section.image ? 'text-[#f5f0e7]' : toneClass.claret}`}>
          {section.image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.image.src} alt={section.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.16),rgba(8,9,7,.82))]" />
            </>
          )}
          <div className={`relative ${WIDE} flex w-full items-end justify-between gap-12 max-[809px]:flex-col max-[809px]:items-start`}>
            <div>
              {section.body && <p className={T_META}>{section.body}</p>}
              <h2 className="mt-6 max-w-[920px] text-balance text-[clamp(2.7rem,5.6vw,5.9rem)] leading-[0.86] tracking-[-0.05em]" style={display}>
                <Emphasis text={section.headline} emphasis={section.emphasis} />
              </h2>
            </div>
            <Cta label={section.buttonLabel} variant="link" className="shrink-0" />
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
