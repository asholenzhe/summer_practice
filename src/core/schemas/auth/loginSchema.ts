import { z } from 'zod';

const emailPattern = /^\S+@\S+\.\S+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(8, { message: 'Email must be at least 8 characters' })
    .regex(emailPattern, { message: 'Invalid email format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});
