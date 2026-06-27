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
    const result = await StartupService.getStartupBySlug(req.params.slug, req.user.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Startup retrieved successfully",
        data: result,
    });
});
export const StartupController = {
    generateStartup,
    getMyStartups,
    getStartupBySlug,
};
//# sourceMappingURL=startup.controller.js.map