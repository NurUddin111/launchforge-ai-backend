import slugify from "slugify";
import httpStatus from "http-status";
import { prisma } from "../../db/prisma.js";
import ApiError from "../../errors/ApiError.js";
import { buildStartupPrompt } from "../ai/ai.prompt.js";
import { generateStartup } from "../ai/ai.service.js";
import { StartupStatus } from "@prisma/client";
const generateUniqueSlug = async (title) => {
    const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });
    let slug = baseSlug;
    let count = 1;
    while (await prisma.startup.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${count++}`;
    }
    return slug;
};
const generateStartupIdea = async (payload, userId) => {
    const prompt = buildStartupPrompt(payload);
    const aiResult = await generateStartup(prompt);
    if (!aiResult.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, "AI failed to generate startup.");
    }
    const slug = await generateUniqueSlug(aiResult.title);
    const startup = await prisma.startup.create({
        data: {
            title: aiResult.title,
            slug,
            idea: payload.idea,
            industry: payload.industry,
            targetAudience: payload.targetAudience,
            budget: payload.budget,
            country: payload.country,
            generatedContent: aiResult,
            status: StartupStatus.GENERATED,
            userId,
        },
    });
    return startup;
};
const getMyStartups = async (userId) => {
    return prisma.startup.findMany({
        where: {
            userId,
            deletedAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getStartupBySlug = async (slug, userId) => {
    const startup = await prisma.startup.findFirst({
        where: {
            slug,
            userId,
            deletedAt: null,
        },
    });
    if (!startup) {
        throw new ApiError(httpStatus.NOT_FOUND, "Startup not found.");
    }
    return startup;
};
export const StartupService = {
    generateStartupIdea,
    getMyStartups,
    getStartupBySlug,
};
//# sourceMappingURL=startup.service.js.map