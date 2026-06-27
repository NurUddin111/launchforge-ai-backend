import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";

import { StartupService } from "./startup.service.js";

const generateStartup = catchAsync(async (req, res) => {
  const result = await StartupService.generateStartupIdea(req.body, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Startup generated successfully",
    data: result,
  });
});

const getMyStartups = catchAsync(async (req, res) => {
  const result = await StartupService.getMyStartups(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Startups retrieved successfully",
    data: result,
  });
});

const getStartupBySlug = catchAsync(async (req, res) => {
  const result = await StartupService.getStartupBySlug(req.params.slug as string, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Startup retrieved successfully",
    data: result,
  });
});

const toggleFavorite = catchAsync(async (req, res) => {
  const result = await StartupService.toggleFavorite(req.params.id as string, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Favorite updated successfully",
    data: result,
  });
});

const softDeleteStartup = catchAsync(async (req, res) => {
  await StartupService.softDeleteStartup(req.params.id as string, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Startup deleted successfully",
  });
});

export const StartupController = {
  generateStartup,
  getMyStartups,
  getStartupBySlug,
  toggleFavorite,
  softDeleteStartup,
};
