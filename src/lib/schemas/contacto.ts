import { z } from 'zod';

export const contactoSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;
