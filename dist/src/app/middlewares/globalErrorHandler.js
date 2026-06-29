import ApiError from "../errors/ApiError.js";
const globalErrorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map