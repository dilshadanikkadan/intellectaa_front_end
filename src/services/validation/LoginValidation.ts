import { z } from 'zod';

export const LoginValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be between 4 and 20 char" }),
});
