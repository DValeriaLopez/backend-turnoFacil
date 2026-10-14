import { z } from 'zod';

const email = z.string().trim().toLowerCase().pipe(z.email());

export const registroSchema = z.object({
  nombre: z.string().trim().min(2).max(100),
  email,
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1),
});
