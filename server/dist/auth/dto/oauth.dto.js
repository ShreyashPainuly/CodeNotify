"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthLinkDto = exports.OAuthLinkSchema = exports.OAuthLoginDto = exports.OAuthLoginSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.OAuthLoginSchema = zod_1.z.object({
    provider: zod_1.z.enum(['google', 'github', 'facebook']),
    accessToken: zod_1.z.string().min(1, 'Access token is required'),
});
class OAuthLoginDto extends (0, nestjs_zod_1.createZodDto)(exports.OAuthLoginSchema) {
}
exports.OAuthLoginDto = OAuthLoginDto;
exports.OAuthLinkSchema = zod_1.z.object({
    provider: zod_1.z.enum(['google', 'github', 'facebook']),
    accessToken: zod_1.z.string().min(1, 'Access token is required'),
});
class OAuthLinkDto extends (0, nestjs_zod_1.createZodDto)(exports.OAuthLinkSchema) {
}
exports.OAuthLinkDto = OAuthLinkDto;
//# sourceMappingURL=oauth.dto.js.map