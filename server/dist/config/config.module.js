"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('8000'),
    NODE_ENV: zod_1.z.enum(['dev', 'production', 'test']).default('dev'),
    MONGO_URI: zod_1.z.string().min(1, 'MONGO_URI is required'),
    JWT_SECRET: zod_1.z.string().min(10, 'JWT_SECRET must be at least 10 characters'),
    JWT_REFRESH_SECRET: zod_1.z.string().optional(),
    GOOGLE_CLIENT_ID: zod_1.z.string().optional(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().optional(),
    GOOGLE_CALLBACK_URL: zod_1.z.string().optional(),
    FRONTEND_URL: zod_1.z.string().optional(),
    CODEFORCES_API: zod_1.z.url().optional(),
    LEETCODE_API: zod_1.z.url().optional(),
    RESEND_API_KEY: zod_1.z.string().optional(),
    EMAIL_FROM: zod_1.z.string().optional(),
    WHATSAPP_API_KEY: zod_1.z.string().optional(),
    WHATSAPP_PHONE_ID: zod_1.z.string().optional(),
    WHATSAPP_BUSINESS_ACCOUNT_ID: zod_1.z.string().optional(),
});
const validateEnv = (config) => {
    const parsed = envSchema.safeParse(config);
    if (!parsed.success) {
        const errorTree = zod_1.z.treeifyError(parsed.error);
        console.error('❌ Invalid environment variables:\n', JSON.stringify(errorTree, null, 2));
        throw new Error('Invalid environment variables');
    }
    return parsed.data;
};
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env.local',
                validate: validateEnv,
            }),
        ],
    })
], ConfigModule);
//# sourceMappingURL=config.module.js.map