import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TShirtCTA() {
  return (
    <section className='bg-primary text-white'>
      <div className='container mx-auto flex flex-col items-start gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:py-12'>
        <div className='max-w-2xl'>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-white/75'>
            Reserva abierta
          </p>
          <h2 className='mt-2 text-3xl font-bold uppercase leading-tight md:text-5xl'>
            Camiseta Sobre la Gravedad
          </h2>
          <p className='mt-3 text-base leading-relaxed text-white/90 md:text-lg'>
            Tirada bajo demanda, 15 euros y entrega en mano.
          </p>
        </div>

        <Button
          asChild
          className='shrink-0 bg-neutral-900 px-6 py-6 text-base font-bold uppercase text-white hover:bg-neutral-900/80'
        >
          <Link href='/reserva-camiseta'>
            Reservar camiseta <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
    </section>
  );
}
