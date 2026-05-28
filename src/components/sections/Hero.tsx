'use client';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const background = backgroundRef.current;
    const sphere = sphereRef.current;
    const cloud = cloudRef.current;
    const grain = grainRef.current;
    const text = textRef.current;

    const cta = ctaRef.current;
    if (!background || !sphere || !wrapper || !grain || !text || !cta) return;
    if (reduceMotion) return;

    const initialScale = isMobile ? 1.7 : 1.3;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        background,
        {
          y: '-5%',
          scale: initialScale,
          filter: 'blur(0px)',
        },
        {
          y: '5%',
          scale: 1.15,
          filter: 'blur(12px)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        sphere,
        {
          scale: 1,
          filter: 'blur(0px)',
        },
        {
          y: '5%',
          scale: initialScale,
          filter: 'blur(20px)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        cloud,
        {
          y: '-5%',
          scale: initialScale,
          filter: 'blur(0px)',
        },
        {
          y: '0%',
          scale: 1,
          filter: 'blur(5px)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        grain,
        { opacity: 0.6 },
        {
          opacity: 0.9,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'center top',
            scrub: true,
          },
        },
      );

      gsap.set(cta, { opacity: 0 });
      gsap.to(cta, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.1 });

      gsap.to(text, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [reduceMotion, isMobile]);

  return (
    <section
      ref={wrapperRef}
      className='relative h-[250vh]'
      aria-labelledby='hero-title'
    >
      <div className='sticky top-0 h-screen w-full overflow-hidden z-0'>
        <div
          ref={backgroundRef}
          className='absolute inset-0 w-full h-full'
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src='/images/fondo-hero.webp'
            alt='Fondo Portada Sobre La Gravedad'
            fill
            priority
            className='object-cover object-center'
            sizes='100vw'
          />
        </div>

        <div
          ref={sphereRef}
          className='absolute inset-0 z-10 w-full h-full'
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src='/images/esfera-hero.webp'
            alt='Esfera Portada Sobre La Gravedad'
            fill
            priority
            className='object-cover object-center'
            sizes='100vw'
          />
        </div>

        <div
          ref={cloudRef}
          className='absolute inset-0 z-40 w-full h-full'
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src='/images/nubes-hero.webp'
            alt='Nubes Portada Sobre La Gravedad'
            fill
            priority
            className='object-cover object-center'
            sizes='100vw'
          />
        </div>

        <div
          ref={grainRef}
          className='absolute inset-0 z-50 pointer-events-none mix-blend-overlay'
          aria-hidden='true'
          style={{
            backgroundImage: "url('/images/ruido.gif')",
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className='sticky top-0 w-full h-screen flex justify-center items-center p-6 md:p-12 z-30 pointer-events-none'>
        <div ref={textRef} className='text-center'>
          <RevealText
            as='h1'
            id='hero-title'
            effect='soft-blur-in'
            delay={0.2}
            className='text-4xl md:text-6xl 2xl:text-9xl font-bold uppercase text-primary'
          >
            Sobre La Gravedad
          </RevealText>
          <RevealText
            as='h2'
            effect='soft-blur-in'
            delay={0.4}
            className='text-xl md:text-4xl 2xl:text-6xl mt-6 uppercase text-primary'
          >
            (Parte 1)
          </RevealText>
          <div ref={ctaRef} className='mt-8'>
            <Button
              asChild
              className='pointer-events-auto bg-primary hover:bg-primary/90 text-white uppercase font-bold'
            >
              <a
                href='https://open.spotify.com/album/0KLgirssQr2u2wNDnaOOKb'
                target='_blank'
                rel='noopener noreferrer'
              >
                Escuchar ahora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
