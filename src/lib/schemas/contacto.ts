import { z } from 'zod';

export const contactoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'El nombre no puede superar los 100 caracteres' })
    .regex(/^[^<>"'`]+$/, { message: 'El nombre contiene caracteres no permitidos' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Email inválido' })
    .max(254, { message: 'Email demasiado largo' })
    .toLowerCase(),
  subject: z
    .string()
    .trim()
    .min(5, { message: 'El asunto debe tener al menos 5 caracteres' })
    .max(200, { message: 'El asunto no puede superar los 200 caracteres' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
    .max(5000, { message: 'El mensaje no puede superar los 5000 caracteres' }),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;
