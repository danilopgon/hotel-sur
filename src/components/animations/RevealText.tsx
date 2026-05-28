'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create('reveal-spring', '0.22, 1, 0.36, 1');
CustomEase.create('reveal-keynote', '0.16, 1, 0.3, 1');

// SSR-safe: useLayoutEffect on client, useEffect as fallback on server
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type EffectId =
  | 'soft-blur-in'
  | 'mask-reveal-up'
  | 'per-word-crossfade'
  | 'line-by-line-slide';

type Spec = {
  target: 'per-character' | 'per-word' | 'per-line';
  mask: boolean;
  duration: number;
  stagger: number;
  ease: string;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
};

const SPECS: Record<EffectId, Spec> = {
  'soft-blur-in': {
    target: 'per-character',
    mask: false,
    duration: 0.9,
    stagger: 0.025,
    ease: 'reveal-spring',
    from: { opacity: 0, y: 16, filter: 'blur(12px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'mask-reveal-up': {
    target: 'per-line',
    mask: true,
    duration: 0.76,
    stagger: 0.09,
    ease: 'reveal-spring',
    from: { opacity: 0, y: 30, filter: 'blur(6px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'per-word-crossfade': {
    target: 'per-word',
    mask: false,
    duration: 0.7,
    stagger: 0.07,
    ease: 'reveal-keynote',
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0 },
  },
  'line-by-line-slide': {
    target: 'per-line',
    mask: false,
    duration: 0.9,
    stagger: 0.12,
    ease: 'reveal-spring',
    from: { opacity: 0, x: -48 },
    to: { opacity: 1, x: 0 },
  },
};

type AllowedTag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

type RevealTextProps = {
  effect: EffectId;
  delay?: number;
  as?: AllowedTag;
  className?: string;
  children: string;
  id?: string;
};

function splitPerCharacter(text: string) {
  const words = text.split(' ');
  const parts: React.ReactNode[] = [];
  words.forEach((word, wi) => {
    parts.push(
      <span key={`w-${wi}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, ci) => (
          <span key={`c-${wi}-${ci}`} className='rt-unit' style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) {
      parts.push(<span key={`s-${wi}`}>&nbsp;</span>);
    }
  });
  return <>{parts}</>;
}

function splitPerWord(text: string) {
  const words = text.split(' ');
  const parts: React.ReactNode[] = [];
  words.forEach((word, i) => {
    parts.push(
      <span key={`w-${i}`} className='rt-unit' style={{ display: 'inline-block' }}>
        {word}
      </span>,
    );
    if (i < words.length - 1) {
      parts.push(<span key={`s-${i}`}> </span>);
    }
  });
  return <>{parts}</>;
}

function splitPerLine(text: string, mask: boolean) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) =>
        mask ? (
          <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
            <span className='rt-unit' style={{ display: 'block' }}>
              {line}
            </span>
          </span>
        ) : (
          <span key={i} className='rt-unit' style={{ display: 'block' }}>
            {line}
          </span>
        ),
      )}
    </>
  );
}

function applyMobileFrom(
  from: Record<string, number | string>,
  isMobile: boolean,
): Record<string, number | string> {
  if (!isMobile) return from;
  const result = { ...from };
  if (typeof result.y === 'number') result.y = result.y * 0.6;
  if (typeof result.x === 'number') result.x = result.x * 0.6;
  if (typeof result.filter === 'string') {
    result.filter = result.filter.replace(
      /blur\(([\d.]+)px\)/,
      () => 'blur(0px)',
    );
  }
  return result;
}

export function RevealText({
  effect,
  delay = 0,
  as: Tag = 'div',
  className,
  children,
  id,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  // Apply initial hidden state before paint to prevent flash of visible content
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;
    const spec = SPECS[effect];
    const units = container.querySelectorAll<HTMLElement>('.rt-unit');
    if (!units.length) return;
    const from = applyMobileFrom(spec.from, isMobile);
    gsap.set(units, from);
  }, [effect, reduceMotion, isMobile]);

  // Set up the scroll-driven animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spec = SPECS[effect];
    const units = container.querySelectorAll<HTMLElement>('.rt-unit');
    if (!units.length) return;

    if (reduceMotion) {
      gsap.set(units, spec.to);
      return;
    }

    const from = applyMobileFrom(spec.from, isMobile);
    const mobileStagger = spec.stagger * (isMobile ? 0.7 : 1);

    const ctx = gsap.context(() => {
      gsap.set(units, from);

      gsap.to(units, {
        ...spec.to,
        stagger: mobileStagger,
        duration: spec.duration,
        ease: spec.ease,
        delay,
        scrollTrigger: {
          trigger: container,
          // 'top bottom-=1' fires immediately for above-fold elements on init,
          // and fires as elements enter the viewport bottom for below-fold elements
          start: 'top bottom-=1',
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [effect, delay, reduceMotion, isMobile]);

  const spec = SPECS[effect];
  let content: React.ReactNode;
  if (spec.target === 'per-character') {
    content = splitPerCharacter(children);
  } else if (spec.target === 'per-word') {
    content = splitPerWord(children);
  } else {
    content = splitPerLine(children, spec.mask);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={containerRef as any} className={className} id={id} aria-label={children}>
      <span aria-hidden='true'>{content}</span>
    </Tag>
  );
}
