import { z } from 'zod';

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const fechaHora = z.string().refine((valor) => !Number.isNaN(Date.parse(valor)), {
  message: 'fecha_hora debe ser una fecha y hora válidas',
});

export const crearSchema = z.object({
  servicio_id: z.number().int().positive(),
  fecha_hora: fechaHora,
  // El paciente no tiene cuenta: la reserva lleva su propio contacto.
  nombre_contacto: z.string().trim().min(2).max(100),
  email_contacto: z.string().trim().toLowerCase().pipe(z.email()),
  telefono: z.string().trim().max(30).optional(),
  notas: z.string().trim().max(500).optional(),
});

export const actualizarSchema = z
  .object({
    estado: z.enum(['pendiente', 'confirmada', 'cancelada', 'atendida']).optional(),
    fecha_hora: fechaHora.optional(),
    notas: z.string().trim().max(500).optional(),
  })
  .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe indicar al menos un campo a actualizar',
  });
