'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const p1Ref = useRef<HTMLDivElement | null>(null);
  const p2Ref = useRef<HTMLParagraphElement | null>(null);
  const spotifyRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion || isMobile) {
      [titleRef, p1Ref, p2Ref, spotifyRef].forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { clearProps: 'all' });
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const animateOnScroll = (
        el: HTMLElement | null,
        start = 'top bottom',
        end = 'top center',
      ) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: true,
            },
          },
        );
      };

      animateOnScroll(titleRef.current);
      animateOnScroll(p1Ref.current);
      animateOnScroll(p2Ref.current);
      animateOnScroll(spotifyRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen bg-neutral-0'
      aria-labelledby='about-title'
    >
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 py-12 md:p-12'>
        <h2
          ref={titleRef}
          id='about-title'
          className='text-3xl md:text-6xl font-bold text-primary mb-4 md:mb-8 uppercase text-left max-w-4xl w-full'
        >
          Hotel Sur
        </h2>

        <div
          ref={p1Ref}
          className='text-xl md:text-2xl text-neutral-900 max-w-4xl text-left mb-8 text-balance w-full'
        >
          <p className='mb-6'>
            Hotel Sur cruza rock alternativo y electrónica con un enfoque
            cinematográfico: atmósferas densas, groove y canciones construidas
            por capas entre banda y electrónica en vivo.
          </p>
          <p>
            Su segundo trabajo, &quot;Sobre la Gravedad (Parte 1)&quot;, explora
            la pérdida en sus distintas formas a través de nueve canciones con
            narrativa propia. El primero de un proyecto en dos entregas. La
            Parte 2 está en desarrollo.
          </p>
        </div>

        <p
          ref={p2Ref}
          className='text-md md:text-lg text-neutral-900 max-w-4xl text-left w-full'
        >
          Escucha nuestros temas en Spotify:
        </p>

        <div
          ref={spotifyRef}
          className='w-full max-w-4xl mt-8 mb-16 md:mb-8'
          aria-label='Reproductor de Spotify'
        >
          <iframe
            title='Reproductor de Spotify: Hotel Sur'
            style={{
              borderRadius: '12px',
              zIndex: 4,
              border: 0,
            }}
            src='https://open.spotify.com/embed/artist/5ZsW4wbMl8qYFZ0L9xvBeu?utm_source=generator&theme=0'
            width='100%'
            height='352'
            allow='encrypted-media'
            loading='lazy'
          ></iframe>
        </div>
      </div>
    </section>
  );
}
