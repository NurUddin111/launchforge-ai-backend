import httpStatus from "http-status";

import ApiError from "../../errors/ApiError.js";
import { prisma } from "../../db/prisma.js";

import { comparePassword, hashPassword } from "../../../utils/password.js";

import { TRegisterUser } from "./auth.interface.js";
import config from "../../config/index.js";
import { createToken } from "../../../utils/jwt.js";

const registerUser = async (payload: TRegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "Email already exists");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  return user;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const passwordMatched = await comparePassword(payload.password, user.password);

  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn as import("ms").StringValue
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn as import("ms").StringValue
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

export const AuthService = {
  registerUser,
  loginUser,
  getMe
};
