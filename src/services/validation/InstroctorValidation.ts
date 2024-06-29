import { z } from "zod";

export const instructorValidationSchema = z.object({
  firstName: z.string().min(1, { message: "firstName is required" }),
  lastName: z.string().min(1, { message: "lastname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  socialMedia: z.string().min(1, { message: "socialMedia Link is required" })
});
