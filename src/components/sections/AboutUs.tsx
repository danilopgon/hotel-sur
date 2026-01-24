'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const p1Ref = useRef<HTMLParagraphElement | null>(null);
  const p2Ref = useRef<HTMLParagraphElement | null>(null);
  const spotifyRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || isMobile) {
      [titleRef, p1Ref, p2Ref, spotifyRef].forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { clearProps: 'all' });
        }
      });
      return;
    }

    const animateOnScroll = (
      el: React.RefObject<HTMLElement | null>,
      start = 'top bottom',
      end = 'top center',
    ) => {
      if (!el.current) return;
      gsap.fromTo(
        el.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el.current,
            start,
            end,
            scrub: true,
          },
        },
      );
    };

    animateOnScroll(titleRef);
    animateOnScroll(p1Ref);
    animateOnScroll(p2Ref);
    animateOnScroll(spotifyRef);
  }, [isMobile]);

  return (
    <section
      className='relative min-h-screen bg-neutral-0'
      aria-labelledby='about-title'
    >
      <div className='absolute inset-0 z-0'></div>

      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 py-12 md:p-12'>
        <h2
          ref={titleRef}
          id='about-title'
          className='text-3xl md:text-6xl font-bold text-primary mb-8 pb-4 uppercase'
        >
          Sobre nosotros
        </h2>

        <p
          ref={p1Ref}
          className='text-xl md:text-2xl text-neutral-900 max-w-3xl text-left mb-8 text-balance'
        >
          Hotel Sur es un proyecto musical fundado en 2019 que fusiona rock
          alternativo y electrónica con una identidad propia. Su sonido viaja
          entre el post-punk y la electrónica más experimental, tejiendo
          paisajes sonoros envolventes y letras cargadas de emoción y
          pensamiento crítico. Actualmente, la banda se encuentra inmersa en el
          lanzamiento de su segundo LP.
        </p>

        <p
          ref={p2Ref}
          className='text-md md:text-lg text-neutral-900 max-w-2xl text-center'
        >
          Escucha nuestros temas en Spotify:
        </p>

        <div
          ref={spotifyRef}
          className='w-full max-w-3xl mt-8 mb-16 md:mb-8'
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
