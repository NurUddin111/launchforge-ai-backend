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
export const StartupValidation = {
    generateStartupSchema,
};
//# sourceMappingURL=startup.validation.js.map