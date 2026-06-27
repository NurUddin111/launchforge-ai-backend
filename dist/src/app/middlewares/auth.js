import httpStatus from "http-status";
import config from "../config/index.js";
import ApiError from "../errors/ApiError.js";
import { verifyToken } from "../../utils/jwt.js";
const auth = (...requiredRoles) => (req, _res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    const token = authorization.startsWith("Bearer ") ? authorization.split(" ")[1] : authorization;
    try {
        const decoded = verifyToken(token, config.jwt.accessSecret);
        if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
        }
        req.user = decoded;
        next();
    }
    catch {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
    }
};
export default auth;
//# sourceMappingURL=auth.js.map