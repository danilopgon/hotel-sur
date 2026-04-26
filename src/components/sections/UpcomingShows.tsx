'use client';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  time: string;
  admission: string;
  posterSrc: string;
  posterAlt: string;
}

const shows: Show[] = [
  {
    id: 'los-clasicos-2026',
    date: '20 junio 2026',
    venue: 'Los Clásicos',
    city: 'Cuenca',
    time: '23:00h',
    admission: 'Libre',
    posterSrc: '/images/hotel-sur-los-clasicos-2026.jpg',
    posterAlt:
      'Cartel del concierto de Hotel Sur en Los Clásicos, Cuenca – 20 de junio de 2026',
  },
];

export default function UpcomingShows() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const posterDesktopRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const fadeUp = (
        el: HTMLElement | null,
        start = 'top 95%',
        end = 'top 70%',
      ) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start, end, scrub: true },
          },
        );
      };

      fadeUp(titleRef.current);
      fadeUp(infoRef.current);

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20 },
          {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (!isMobile && posterDesktopRef.current) {
        gsap.fromTo(
          posterDesktopRef.current,
          { y: -20 },
          {
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, isMobile]);

  if (shows.length === 0) return null;

  const show = shows[0];

  return (
    <section
      ref={sectionRef}
      className='relative bg-neutral-900 py-24 px-6 md:px-12 overflow-hidden'
      aria-labelledby='shows-title'
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center'>
        <div className='flex flex-col gap-8 order-2 md:order-1'>
          <h2
            ref={titleRef}
            id='shows-title'
            className='text-3xl md:text-6xl font-bold uppercase text-primary'
          >
            Próximos conciertos
          </h2>

          {/* Cartel en mobile */}
          <div className='relative w-full max-w-sm mx-auto md:hidden aspect-[5/7]'>
            <Image
              src={show.posterSrc}
              alt={show.posterAlt}
              fill
              className='object-contain'
              sizes='100vw'
            />
          </div>

          <div ref={infoRef}>
            <dl className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <dt className='text-xs uppercase tracking-widest text-neutral-400'>
                  Fecha
                </dt>
                <dd className='text-2xl md:text-3xl font-bold uppercase text-white'>
                  {show.date}
                </dd>
              </div>
              <div className='flex flex-col gap-1'>
                <dt className='text-xs uppercase tracking-widest text-neutral-400'>
                  Lugar
                </dt>
                <dd className='text-xl md:text-2xl font-bold uppercase text-white'>
                  {show.venue}
                </dd>
              </div>
              <div className='flex flex-col gap-1'>
                <dt className='text-xs uppercase tracking-widest text-neutral-400'>
                  Ciudad
                </dt>
                <dd className='text-lg uppercase text-neutral-200'>
                  {show.city}
                </dd>
              </div>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-1'>
                  <dt className='text-xs uppercase tracking-widest text-neutral-400'>
                    Hora
                  </dt>
                  <dd className='text-lg text-neutral-200'>{show.time}</dd>
                </div>
                <div className='flex flex-col gap-1'>
                  <dt className='text-xs uppercase tracking-widest text-neutral-400'>
                    Entrada
                  </dt>
                  <dd className='text-lg text-neutral-200'>{show.admission}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div ref={ctaRef}>
            <Button
              asChild
              className='bg-primary hover:bg-primary/90 text-white uppercase font-bold w-fit'
            >
              <a
                href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hotel+Sur+en+Los+Cl%C3%A1sicos&dates=20260620T210000Z/20260621T000000Z&details=Concierto+de+Hotel+Sur&location=Los+Cl%C3%A1sicos%2C+Cuenca'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Guardar fecha del concierto en Google Calendar'
              >
                Guardar fecha
              </a>
            </Button>
          </div>
        </div>

        {/* Cartel en desktop */}
        <div
          ref={posterDesktopRef}
          className='relative w-full hidden md:block order-1 md:order-2 aspect-[5/7]'
        >
          <Image
            src={show.posterSrc}
            alt={show.posterAlt}
            fill
            className='object-contain'
            sizes='50vw'
          />
        </div>
      </div>
    </section>
  );
}
