"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignoutDto = exports.SigninDto = exports.CreateUserDto = exports.SignoutSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Invalid email format' }),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long'),
    phoneNumber: zod_1.z.string().optional(),
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Invalid email format' }),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.SignoutSchema = zod_1.z.object({});
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateUserSchema) {
}
exports.CreateUserDto = CreateUserDto;
class SigninDto extends (0, nestjs_zod_1.createZodDto)(exports.SigninSchema) {
}
exports.SigninDto = SigninDto;
class SignoutDto extends (0, nestjs_zod_1.createZodDto)(exports.SignoutSchema) {
}
exports.SignoutDto = SignoutDto;
//# sourceMappingURL=auth.dto.js.map