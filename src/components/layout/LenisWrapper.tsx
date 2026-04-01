'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useReduceMotion } from '@/hooks/useReduceMotion';

gsap.registerPlugin(ScrollTrigger);

export default function LenisWrapper({ children }: { children: ReactNode }) {
  const reduceMotion = useReduceMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (reduceMotion) return;

    const isMobile =
      window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    const lenis = new Lenis({
      lerp: isMobile ? 0.03 : 0.15,
      duration: isMobile ? 0.3 : 1.2,
      touchMultiplier: isMobile ? 1 : 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
