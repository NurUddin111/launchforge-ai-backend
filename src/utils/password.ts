import bcrypt from "bcrypt";
import config from "../app/config/index.js";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, config.bcryptSaltRounds);
};

export const comparePassword = async (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};
