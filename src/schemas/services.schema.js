import { z } from 'zod';

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listarSchema = z.object({
  buscar: z.string().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(50).default(10),
  orden: z.enum(['nombre', 'precio', 'duracion_min']).default('nombre'),
});


export const crearSchema = z.object({
  nombre: z.string().min(3).max(100),
  descripcion: z.string().optional(),
  duracion_min: z.number().int().positive(),
  precio: z.number().min(0),
});

export const actualizarSchema = crearSchema.extend({ activo: z.boolean() }).partial();
