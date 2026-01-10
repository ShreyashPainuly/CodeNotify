"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN = exports.PASSWORD = exports.OTP = exports.IS_PUBLIC_KEY = exports.AUTH = void 0;
exports.AUTH = {
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || '',
    IS_PUBLIC_KEY: process.env.IS_PUBLIC_KEY || 'isPublic',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};
exports.IS_PUBLIC_KEY = exports.AUTH.IS_PUBLIC_KEY;
exports.OTP = {
    EXPIRY_MINUTES: 10,
    MAX_ATTEMPTS: 3,
    SALT_ROUNDS: 10,
    CODE_LENGTH: 6,
};
exports.PASSWORD = {
    SALT_ROUNDS: 12,
    MIN_LENGTH: 6,
};
exports.TOKEN = {
    ACCESS_TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d',
};
//# sourceMappingURL=auth.constants.js.map