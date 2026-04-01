'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const pressQuotes = [
  {
    quote:
      'Un bailable de nostalgia y frustración... habla de la distancia que construimos entre quienes fuimos y quienes somos ahora.',
    source: 'Arepa Volátil',
    date: 'enero 2026',
  },
  {
    quote:
      'Un manifiesto de perseverancia... captura la esencia de una banda que no teme explorar los mundos de la calma y el caos.',
    source: 'Zona Emergente',
    date: 'México, junio 2025',
  },
  {
    quote: 'Un ritmo que te hace sentir la nostalgia en carne propia.',
    source: 'Indie Dream',
    date: 'México, junio 2025',
  },
];

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quotesRef = useRef<(HTMLLIElement | null)[]>([]);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top bottom',
              end: 'top center',
              scrub: true,
            },
          },
        );
      }

      quotesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className='relative bg-neutral-900 py-24 px-6 md:px-12'
      aria-labelledby='press-title'
    >
      <div className='max-w-4xl mx-auto'>
        <h2
          ref={titleRef}
          id='press-title'
          className='text-3xl md:text-6xl font-bold text-primary mb-12 uppercase'
        >
          Prensa
        </h2>

        <ul className='space-y-10'>
          {pressQuotes.map(({ quote, source, date }, i) => (
            <li
              key={source}
              ref={(el) => {
                quotesRef.current[i] = el;
              }}
              className='border-l-2 border-primary pl-6'
            >
              <blockquote className='text-xl md:text-2xl text-neutral-100 mb-3'>
                &ldquo;{quote}&rdquo;
              </blockquote>
              <cite className='not-italic text-sm md:text-base text-neutral-400 uppercase tracking-wide'>
                — {source}, {date}
              </cite>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
