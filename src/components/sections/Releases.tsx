'use client';

import { ReleaseCard } from '@/components/blocks/ReleaseCard';
import { musicReleases } from '@/data/musicReleases';

export default function Releases() {
  return (
    <section aria-labelledby='releases-title' className='relative min-h-screen'>
      <div className='absolute inset-0 bg-neutral-900' />
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 py-12 md:p-12'>
        <h2
          id='releases-title'
          className='text-3xl md:text-6xl font-bold text-primary mb-4 md:mb-8 pb-2 uppercase tracking-tight'
        >
          Singles de &quot;Sobre la Gravedad&quot;
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:auto-rows-[350px]'>
          {musicReleases.map((r) => (
            <ReleaseCard key={r.id} release={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
