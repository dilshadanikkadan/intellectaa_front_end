import { z } from 'zod';

export const SignUpValidationSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }).max(10,{message:'Name must be between 1 and 10'}),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be between 4 and 20 char" }),
});
