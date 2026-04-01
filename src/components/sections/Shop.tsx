'use client';
import { Button } from '@/components/ui/button';
import { merchProducts } from '@/data/merchProducts';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReduceMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion || isMobile) {
      [titleRef, contentRef, bentoRef, bgRef].forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { clearProps: 'all' });
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const fadeUp = (el: HTMLElement | null, startOffset = 'top 80%') => {
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
              start: startOffset,
              end: 'top center',
              scrub: true,
            },
          },
        );
      };

      gsap.fromTo(
        bgRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: bgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      fadeUp(titleRef.current);
      fadeUp(contentRef.current, 'top 75%');
      fadeUp(bentoRef.current, 'top 70%');
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby='shop-title'
      className='relative min-h-screen overflow-hidden'
    >
      <div ref={bgRef} className='absolute inset-0 bg-neutral-50 z-0'></div>

      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-4 md:p-12'>
        <h2
          ref={titleRef}
          id='shop-title'
          className='text-3xl md:text-6xl font-bold text-primary pb-4 uppercase max-w-4xl w-full text-center'
        >
          Merchandising
        </h2>

        <p
          ref={contentRef}
          id='shop-description'
          className='text-xl md:text-2xl text-neutral-900 max-w-4xl text-center mb-8 w-full'
        >
          Productos exclusivos de Hotel Sur
        </p>

        <div ref={bentoRef} className='w-full max-w-7xl'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4'>
            {merchProducts.map((product) => (
              <article
                key={product.id}
                aria-labelledby={`product-title-${product.id}`}
                aria-describedby={`product-desc-${product.id}`}
                className={`${product.size} rounded-md shadow-lg overflow-hidden transition-all hover:scale-[1.02] min-h-[400px]`}
              >
                <a
                  href={product.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block w-full h-full'
                >
                  <div className='relative w-full h-full group'>
                    <div
                      className='absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0'
                      style={{ backgroundImage: `url(${product.image})` }}
                      aria-hidden='true'
                    ></div>
                    <div
                      className='absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                      style={{ backgroundImage: `url(${product.hoverImage})` }}
                      aria-hidden='true'
                    ></div>
                    <div className='relative z-10 bg-black/50 p-4 h-full flex flex-col justify-between'>
                      <div>
                        <h3
                          id={`product-title-${product.id}`}
                          className='text-lg md:text-xl font-bold text-white'
                        >
                          {product.name}
                        </h3>
                        <p
                          id={`product-desc-${product.id}`}
                          className='text-sm text-white/80 mt-1'
                        >
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          <div className='mt-4 md:mt-12 text-center'>
            <a
              href='https://tienda.hotelsur.es'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Ver catálogo completo de productos de Hotel Sur'
            >
              <Button variant='default' className='bg-primary text-white'>
                Ver todo el catálogo
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
