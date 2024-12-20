import { z } from "zod";

export function isValidEmail(email: string): boolean {
  return /.+@.+/.test(email);
}

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email("Invalid email format").min(1).optional(),
  phone: z.string().min(1).optional(),
});
