import { z } from 'zod';

export const reservaCamisetaSchema = z.object({
  nombre: z
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
  talla: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'], {
    required_error: 'Selecciona una talla',
    message: 'Selecciona una talla',
  }),
  entrega: z.enum(['concierto-20-junio', 'miembro-hotel', 'no-se-cuando'], {
    required_error: 'Selecciona cómo quieres recibirla',
    message: 'Selecciona cómo quieres recibirla',
  }),
});

export type ReservaCamisetaFormValues = z.infer<typeof reservaCamisetaSchema>;
