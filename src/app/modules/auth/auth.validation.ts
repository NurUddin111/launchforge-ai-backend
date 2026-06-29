import { z } from "zod";

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    email: z.email().transform((value) => value.toLowerCase()),

    password: z.string().min(8).max(100),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.email().transform((email) => email.toLowerCase()),

    password: z.string().min(1),
  }),
});
