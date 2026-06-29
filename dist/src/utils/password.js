import bcrypt from "bcrypt";
import config from "../app/config/index.js";
export const hashPassword = async (password) => {
    return bcrypt.hash(password, config.bcryptSaltRounds);
};
export const comparePassword = async (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};
//# sourceMappingURL=password.js.map