'use client';
import { RevealText } from '@/components/animations/RevealText';
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
          className='text-3xl md:text-6xl font-bold text-primary mb-2 uppercase'
        >
          Prensa
        </h2>

        <ul className='mt-16 divide-y divide-neutral-800'>
          {pressQuotes.map(({ quote, source, date }) => (
            <li
              key={source}
              className='py-10 md:py-12'
            >
              <div className='flex flex-col md:grid md:grid-cols-[1fr_180px] gap-6 md:gap-12'>
                <blockquote className='text-xl md:text-2xl text-neutral-100 leading-relaxed'>
                  <RevealText
                    as='span'
                    effect='per-word-crossfade'
                    className='block'
                  >
                    {`“${quote}”`}
                  </RevealText>
                </blockquote>
                <cite className='not-italic flex flex-col gap-1 md:text-right md:self-end shrink-0'>
                  <span className='text-sm font-bold uppercase tracking-widest text-primary'>
                    {source}
                  </span>
                  <span className='text-xs text-neutral-500 uppercase tracking-wide'>
                    {date}
                  </span>
                </cite>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
