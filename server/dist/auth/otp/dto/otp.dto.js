"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOtpDto = exports.VerifyOtpDto = exports.RequestOtpDto = exports.ResendOtpSchema = exports.VerifyOtpSchema = exports.RequestOtpSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.RequestOtpSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Invalid email format' }),
});
exports.VerifyOtpSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Invalid email format' }),
    code: zod_1.z
        .string()
        .length(6, 'OTP code must be exactly 6 digits')
        .regex(/^\d{6}$/, 'OTP code must contain only digits'),
});
exports.ResendOtpSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Invalid email format' }),
});
class RequestOtpDto extends (0, nestjs_zod_1.createZodDto)(exports.RequestOtpSchema) {
}
exports.RequestOtpDto = RequestOtpDto;
class VerifyOtpDto extends (0, nestjs_zod_1.createZodDto)(exports.VerifyOtpSchema) {
}
exports.VerifyOtpDto = VerifyOtpDto;
class ResendOtpDto extends (0, nestjs_zod_1.createZodDto)(exports.ResendOtpSchema) {
}
exports.ResendOtpDto = ResendOtpDto;
//# sourceMappingURL=otp.dto.js.map