'use client';
import { useRef } from 'react';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Shop from '@/components/sections/Shop';
import Releases from '@/components/sections/Releases';
import TShirtCTA from '@/components/sections/TShirtCTA';
import Press from '@/components/sections/Press';
import UpcomingShows from '@/components/sections/UpcomingShows';

export default function Home() {
  const ref = useRef(null);

  return (
    <div ref={ref} className='relative'>
      <Hero />
      <TShirtCTA />
      <Releases />
      <AboutUs />
      <Press />
      <Shop />
      <UpcomingShows />
    </div>
  );
}
