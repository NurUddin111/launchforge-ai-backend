import dotenv from "dotenv";
dotenv.config();
export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    clientUrl: process.env.CLIENT_URL,
    geminiApiKey: process.env.GEMINI_API_KEY,
};
//# sourceMappingURL=index.js.map