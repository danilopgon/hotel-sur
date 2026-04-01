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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  subject: z
    .string()
    .min(5, { message: 'El asunto debe tener al menos 5 caracteres' }),
  message: z
    .string()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
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
    <div className='bg-neutral-900 text-white'>
      <div className='container mx-auto px-4 py-20'>
        <div className='relative z-10 min-h-screen flex justify-center items-center'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold mb-8 uppercase text-primary'>
              Contacto
            </h1>
            <p className='text-xl mb-8'>
              Si quieres contactar con nosotros, puedes enviarnos un mensaje a
              través de este formulario.
            </p>

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
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Tu nombre'
                          {...field}
                          className='bg-neutral-800 border-neutral-700 text-white'
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='tu@email.com'
                          type='email'
                          {...field}
                          className='bg-neutral-800 border-neutral-700 text-white'
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
                      <FormLabel>Asunto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Asunto del mensaje'
                          {...field}
                          className='bg-neutral-800 border-neutral-700 text-white'
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
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Escribe tu mensaje aquí'
                          className='min-h-[150px] bg-neutral-800 border-neutral-700 text-white'
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
                  className='w-full'
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
