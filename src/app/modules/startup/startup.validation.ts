import { z } from "zod";

const generateStartupSchema = z.object({
  body: z.object({
    idea: z.string().trim().min(10, "Idea must be at least 10 characters long"),

    industry: z.string().trim().min(2),

    targetAudience: z.string().trim().optional(),

    budget: z.coerce.number().int().positive().optional(),

    country: z.string().trim().optional(),
  }),
});

export const GeneratedStartupOutputSchema = z.object({
  title: z.string(),
  summary: z.string(),
  problem: z.string(),
  solution: z.string(),
  businessModel: z.string(),
  marketingStrategy: z.string(),
  mvpFeatures: z.array(z.string()),
  techStack: z.array(z.string()),
  estimatedBudget: z.string(),
  roadmap: z.string(),
});

export const StartupValidation = {
  generateStartupSchema,
};
