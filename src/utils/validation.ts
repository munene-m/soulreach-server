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

export const createSoulWinningRecordSchema = z.object({
  minister: z.string().min(1),
  date: z.string().datetime(),
  soulsWon: z.number().min(1),
  contacts: z.array(
    z.object({
      name: z.string().min(1),
      phoneNumber: z.string().min(1),
    })
  ),
});
