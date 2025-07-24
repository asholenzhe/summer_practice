import { z } from 'zod';

const emailPattern = /^\S+@\S+\.\S+$/;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(8, { message: 'Email must be at least 8 characters' })
      .regex(emailPattern, { message: 'Invalid email format' }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
