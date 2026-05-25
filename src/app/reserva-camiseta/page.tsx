'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  reservaCamisetaSchema,
  type ReservaCamisetaFormValues,
} from '@/lib/schemas/reserva-camiseta';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  CalendarDays,
  Handshake,
  Mail,
  Shirt,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  text: string;
};

const fieldClassName =
  'border-neutral-700 bg-neutral-800 text-white placeholder:text-white/35';

function Feature({ icon: Icon, title, text }: FeatureProps) {
  return (
    <li className='flex items-start gap-4'>
      <span className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800'>
        <Icon className='size-4 text-primary' />
      </span>
      <div>
        <p className='text-sm font-bold uppercase tracking-wide text-white'>
          {title}
        </p>
        <p className='mt-0.5 text-sm text-white/60'>{text}</p>
      </div>
    </li>
  );
}

export default function ReservaCamiseta() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservaCamisetaFormValues>({
    resolver: zodResolver(reservaCamisetaSchema),
    defaultValues: {
      nombre: '',
      email: '',
      talla: undefined,
      entrega: undefined,
    },
  });

  async function onSubmit(data: ReservaCamisetaFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reserva-camiseta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al enviar la reserva');
      form.reset();
      toast.success('Reserva enviada correctamente');
    } catch (error) {
      toast.error('Error al enviar la reserva, por favor intenta de nuevo');
      console.error('Error al enviar la reserva:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className='min-h-screen bg-neutral-900 text-white'>
      <section className='container mx-auto px-4 pb-20 pt-20 md:pb-28 md:pt-28'>
        <div className='grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-16 lg:gap-24'>
          <div className='flex flex-col gap-8'>
            <p className='text-xs uppercase tracking-widest text-primary'>
              Edición bajo demanda
            </p>

            <h1 className='text-5xl font-bold uppercase leading-[0.9] text-primary md:text-7xl 2xl:text-8xl'>
              Reserva tu
              <br />
              camiseta
            </h1>

            <div className='flex max-w-xs items-center gap-6 rounded-md border-2 border-primary px-6 py-5'>
              <span className='text-5xl font-bold text-primary'>15 €</span>
              <div className='text-xs uppercase leading-relaxed tracking-wide'>
                <p className='text-white'>Talla oversize</p>
              </div>
            </div>

            <p className='text-lg text-white/80'>
              Camiseta &ldquo;Sobre La Gravedad&rdquo; · Entrega en mano ·
              Edición limitada
            </p>

            <ul className='flex flex-col gap-5'>
              <Feature
                icon={Handshake}
                title='Entrega en mano'
                text='Sin envíos. La recogerás en un concierto o te la da un miembro de Hotel Sur.'
              />
              <Feature
                icon={Shirt}
                title='Bajo demanda'
                text='Producimos solo lo necesario. No vamos a tener stock.'
              />
              <Feature
                icon={CalendarDays}
                title='¿Cuándo la recibo?'
                text='Te avisaremos cuando esté lista y te la entregaremos cuando nos veamos.'
              />
            </ul>

            <aside className='rounded-md border border-primary bg-neutral-800/40 p-5'>
              <div className='mb-2 flex items-center gap-2 text-primary'>
                <AlertCircle className='size-4' />
                <span className='text-xs font-bold uppercase tracking-wide'>
                  Importante
                </span>
              </div>
              <p className='text-sm text-white/70'>
                Por favor, no reserves si no vas a comprarla. Producimos solo lo
                necesario y cada reserva cuenta. Si tienes dudas sobre el
                proceso o la entrega,{' '}
                <Link
                  href='/contacto'
                  className='font-bold text-primary underline underline-offset-4 transition-colors hover:text-white'
                >
                  escríbenos antes
                </Link>
                .
              </p>
            </aside>
          </div>

          <div className='relative md:pt-10'>
            <div className='absolute -left-6 top-8 hidden h-32 w-32 rounded-full border border-primary/40 md:block' />
            <div className='relative aspect-[4/5] min-h-[420px] overflow-hidden border border-white/10 bg-neutral-800 md:min-h-[560px]'>
              <Image
                src='/images/fondo-hero.webp'
                alt=''
                fill
                sizes='(min-width: 768px) 48vw, 100vw'
                className='object-cover opacity-55 saturate-150 contrast-125'
              />
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,80,51,0.34),transparent_34%),linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.84))]' />
              <div className='absolute inset-x-6 top-8 z-20 h-px bg-primary/70 md:inset-x-10' />
              <div className='absolute bottom-8 left-6 z-20 h-px w-24 bg-primary/70 md:left-10' />
              <Image
                src='/images/espalda-camiseta-sobre-la-gravedad.webp'
                alt='Espalda de la camiseta Sobre la Gravedad de Hotel Sur'
                fill
                priority
                sizes='(min-width: 768px) 48vw, 100vw'
                className='z-10 object-contain object-center p-4 contrast-110 drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)] grayscale-[8%] md:p-8'
              />

              <p className='absolute left-6 top-6 z-20 text-xs font-bold uppercase tracking-[0.2em] text-white/70 md:left-10 md:top-10'>
                Sobre la gravedad
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='border-t border-white/10 bg-neutral-800/35 py-16 md:py-24'>
        <div className='container mx-auto grid gap-10 px-4 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-16'>
          <div className='max-w-sm'>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-primary'>
              Reserva abierta
            </p>
            <h2 className='mt-3 text-3xl font-bold uppercase leading-none text-primary md:text-5xl'>
              Deja tu talla reservada
            </h2>
            <p className='mt-5 text-sm leading-relaxed text-white/65'>
              No pagas ahora. Solo necesitamos tus datos para producir la talla
              correcta y avisarte cuando esté lista.
            </p>
          </div>

          <div className='rounded-md border border-neutral-700 bg-neutral-900/80 p-6 md:p-8'>
            <div className='mb-7 flex items-center gap-3 text-primary'>
              <Mail className='size-5' />
              <h3 className='text-2xl font-bold uppercase md:text-3xl'>
                Formulario de reserva
              </h3>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='nombre'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Tu nombre'
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='tu@email.com'
                          type='email'
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='talla'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Talla
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || undefined)
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className={fieldClassName}
                        >
                          <option value='' disabled>
                            Selecciona tu talla
                          </option>
                          <option value='XS'>XS</option>
                          <option value='S'>S</option>
                          <option value='M'>M</option>
                          <option value='L'>L</option>
                          <option value='XL'>XL</option>
                          <option value='XXL'>XXL</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='entrega'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        ¿Cómo quieres recibirla?
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || undefined)
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className={fieldClassName}
                        >
                          <option value='' disabled>
                            Selecciona una opción
                          </option>
                          <option value='concierto-20-junio'>
                            Voy a estar en el próximo concierto (20 de junio en
                            Cuenca)
                          </option>
                          <option value='miembro-hotel'>
                            Me la da un miembro de Hotel Sur
                          </option>
                          <option value='no-se-cuando'>
                            La quiero pero no sé cuándo os voy a ver
                          </option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-primary py-6 text-base font-bold uppercase text-neutral-900 hover:bg-primary/90'
                >
                  {isSubmitting ? 'Enviando...' : 'Reservar camiseta'}
                </Button>

                <p className='text-center text-xs leading-relaxed text-white/45'>
                  Te escribiremos para confirmar disponibilidad, entrega y
                  recogida en mano.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
