'use client';
import { CardProps } from '@/models/TCardProps';
import { TMusicRelease } from '@/models/TMusicRelease';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

function sizeToGridClasses(size: TMusicRelease['size']) {
  switch (size) {
    case 'large':
      return 'h-96 md:h-auto md:col-span-2 md:row-span-2';
    case 'medium':
      return 'h-96 md:h-auto md:col-span-2 md:row-span-1';
    case 'small':
    default:
      return 'h-96 md:h-auto md:col-span-2 md:row-span-1';
  }
}

export function ReleaseCard({ release }: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    if (!cardRef.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(imgRef.current, { scale: 1.02, xPercent: 0, yPercent: 0 });

      if (reducedMotion) return;

      const enter = () => {
        gsap.to(imgRef.current, {
          scale: 1.08,
          xPercent: 2,
          yPercent: -2,
          duration: 0.6,
          ease: 'power3.out',
        });
      };

      const leave = () => {
        gsap.to(imgRef.current, {
          scale: 1.02,
          xPercent: 0,
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      };

      const el = cardRef.current!;
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('focusin', enter);
      el.addEventListener('focusout', leave);

      return () => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('focusin', enter);
        el.removeEventListener('focusout', leave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const isLinked = !release.comingSoon && !!release.externalUrl;
  const gridClass = sizeToGridClasses(release.size);

  const card = (
    <div
      ref={cardRef}
      className={[
        'relative overflow-hidden rounded-xl isolate',
        isLinked ? 'h-full cursor-pointer' : gridClass,
        'ring-1 ring-white/5 hover:ring-white/10 hover:shadow-xl transition-shadow',
        release.comingSoon ? 'cursor-default' : '',
        !isLinked
          ? 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={
        release.comingSoon
          ? `${release.title} — próximamente`
          : release.title
      }
      aria-disabled={release.comingSoon ? true : undefined}
      tabIndex={isLinked ? -1 : 0}
    >
      <div
        ref={imgRef}
        className='absolute inset-0 bg-cover bg-center will-change-transform'
        style={{ backgroundImage: `url(${release.coverUrl})` }}
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0 pointer-events-none' />

      {release.comingSoon && (
        <div className='absolute inset-0 bg-neutral-900/70 backdrop-blur-[1px] grid place-items-center'>
          <span className='text-white text-base md:text-lg font-semibold bg-primary/25 px-4 py-2 rounded-full'>
            Próximamente
          </span>
        </div>
      )}

      <div className='absolute inset-0 flex flex-col justify-end p-5 md:p-6'>
        <h3
          className={[
            'font-bold text-white text-balance uppercase',
            release.size === 'large'
              ? 'text-2xl md:text-3xl'
              : release.size === 'medium'
                ? 'text-xl'
                : 'text-lg',
          ].join(' ')}
        >
          {release.title}
        </h3>

        {release.credit && (
          <p className='mt-2 text-xs text-white/60'>
            {`${release.type === 'animation' ? 'Animación' : 'Vídeo'} | ${release.credit}`}
          </p>
        )}

        {!release.comingSoon && (
          <div className='mt-3 inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-primary/35 group-focus-within:bg-primary/35 transition-colors w-fit'>
            <Play className='w-4 h-4 md:w-5 md:h-5 text-primary fill-current' />
            <span className='sr-only'>Reproducir {release.title}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (isLinked) {
    return (
      <a
        href={release.externalUrl}
        target='_blank'
        rel='noopener noreferrer'
        className={[
          gridClass,
          'group block rounded-xl',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
        ].join(' ')}
        aria-label={release.title}
      >
        {card}
      </a>
    );
  }

  return card;
}
