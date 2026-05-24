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
import { Textarea } from '@/components/ui/textarea';
import { contactoSchema, type ContactoFormValues } from '@/lib/schemas/contacto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const fieldClassName =
  'border-neutral-700 bg-neutral-800 text-white placeholder:text-white/35';

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactoFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      form.reset();
      toast.success('Mensaje enviado correctamente');
    } catch (error) {
      toast.error('Error al enviar el mensaje, por favor intenta de nuevo');
      console.error('Error al enviar el correo:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className='min-h-screen bg-neutral-900 text-white'>
      <section className='container mx-auto px-4 py-20 md:py-28'>
        <div className='grid min-h-[70vh] gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center md:gap-16'>
          <div className='max-w-sm'>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-primary'>
              Contacto
            </p>
            <h1 className='mt-3 text-4xl font-bold uppercase leading-none text-primary md:text-6xl'>
              Escríbenos
            </h1>
            <p className='mt-5 text-sm leading-relaxed text-white/65'>
              Para contrataciones, prensa, colaboraciones o cualquier duda sobre
              la banda y el merchandising.
            </p>
          </div>

          <div className='rounded-md border border-neutral-700 bg-neutral-900/80 p-6 md:p-8'>
            <div className='mb-7 flex items-center gap-3 text-primary'>
              <Mail className='size-5' />
              <h2 className='text-2xl font-bold uppercase md:text-3xl'>
                Formulario de contacto
              </h2>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Tu nombre'
                          {...field}
                          className={fieldClassName}
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
                          {...field}
                          className={fieldClassName}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='subject'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Asunto
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Reserva, concierto, prensa...'
                          {...field}
                          className={fieldClassName}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs uppercase tracking-wide text-white/70'>
                        Mensaje
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Cuéntanos qué necesitas'
                          className={`min-h-[150px] ${fieldClassName}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-primary py-6 text-base font-bold text-neutral-900 hover:bg-primary/90'
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
