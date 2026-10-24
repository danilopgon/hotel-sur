'use client';
import AboutUs from '@/components/sections/AboutUs';
import Hero from '@/components/sections/Hero';
import Press from '@/components/sections/Press';
import Releases from '@/components/sections/Releases';
import Shop from '@/components/sections/Shop';
import UpcomingShows from '@/components/sections/UpcomingShows';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);

  return (
    <div ref={ref} className='relative'>
      <Hero />
      <Releases />
      <AboutUs />
      <Press />
      <Shop />
      <UpcomingShows />
    </div>
  );
}
