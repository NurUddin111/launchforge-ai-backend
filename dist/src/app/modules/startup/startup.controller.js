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
    const result = await StartupService.getMyStartups(req.user.userId, req.query);
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
const toggleFavorite = catchAsync(async (req, res) => {
    const result = await StartupService.toggleFavorite(req.params.id, req.user.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Favorite updated successfully",
        data: result,
    });
});
const softDeleteStartup = catchAsync(async (req, res) => {
    await StartupService.softDeleteStartup(req.params.id, req.user.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Startup deleted successfully",
    });
});
const exportStartup = catchAsync(async (req, res) => {
    const result = await StartupService.exportStartup(req.params.id, req.user.userId);
    res.setHeader("Content-Type", "text/markdown");
    res.setHeader("Content-Disposition", `attachment; filename="${result.filename}"`);
    res.send(result.markdown);
});
const getDashboardStats = catchAsync(async (req, res) => {
    const result = await StartupService.getDashboardStats(req.user.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Dashboard stats retrieved successfully",
        data: result,
    });
});
export const StartupController = {
    generateStartup,
    getMyStartups,
    getStartupBySlug,
    toggleFavorite,
    softDeleteStartup,
    exportStartup,
    getDashboardStats,
};
//# sourceMappingURL=startup.controller.js.map