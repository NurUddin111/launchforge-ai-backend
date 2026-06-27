const sendResponse = (res, payload) => {
    const { statusCode, ...rest } = payload;
    return res.status(statusCode).json(rest);
};
export default sendResponse;
//# sourceMappingURL=sendResponse.js.map