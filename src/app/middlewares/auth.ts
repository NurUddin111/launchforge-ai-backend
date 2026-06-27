import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { Role } from "@prisma/client";

import config from "../config/index.js";
import ApiError from "../errors/ApiError.js";

import { verifyToken } from "../../utils/jwt.js";

const auth =
  (...requiredRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    const token = authorization.startsWith("Bearer ") ? authorization.split(" ")[1] : authorization;

    try {
      const decoded = verifyToken<{
        userId: string;
        email: string;
        role: Role;
      }>(token, config.jwt.accessSecret);

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      req.user = decoded;

      next();
    } catch {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
    }
  };

export default auth;
