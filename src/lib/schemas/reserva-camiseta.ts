import { z } from 'zod';

export const reservaCamisetaSchema = z.object({
  nombre: z.string().trim().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().trim().email({ message: 'Email inválido' }),
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
