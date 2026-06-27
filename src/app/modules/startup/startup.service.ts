import slugify from "slugify";
import httpStatus from "http-status";

import { prisma } from "../../db/prisma.js";
import ApiError from "../../errors/ApiError.js";

import { buildStartupPrompt } from "../ai/ai.prompt.js";
import { generateStartup } from "../ai/ai.service.js";

import { TGenerateStartupPayload } from "./startup.interface.js";
import { StartupStatus } from "@prisma/client";

const generateUniqueSlug = async (title: string) => {
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

const generateStartupIdea = async (payload: TGenerateStartupPayload, userId: string) => {
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

const getMyStartups = async (userId: string) => {
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

const getStartupBySlug = async (slug: string, userId: string) => {
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

const toggleFavorite = async (id: string, userId: string) => {
  const startup = await prisma.startup.findFirst({
    where: {
      id,
      userId,
      deletedAt: null,
    },
  });

  if (!startup) {
    throw new ApiError(httpStatus.NOT_FOUND, "Startup not found.");
  }

  return prisma.startup.update({
    where: { id },
    data: {
      isFavorite: !startup.isFavorite,
    },
  });
};

const softDeleteStartup = async (id: string, userId: string) => {
  const startup = await prisma.startup.findFirst({
    where: {
      id,
      userId,
      deletedAt: null,
    },
  });

  if (!startup) {
    throw new ApiError(httpStatus.NOT_FOUND, "Startup not found.");
  }

  await prisma.startup.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  return null;
};

export const StartupService = {
  generateStartupIdea,
  getMyStartups,
  getStartupBySlug,
  toggleFavorite,
  softDeleteStartup,
};
