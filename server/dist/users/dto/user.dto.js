"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDto = exports.UpdateUserRoleBodyDto = exports.UpdateUserRoleDto = exports.GetAllUsersDto = exports.GetUserByIdDto = exports.UpdateUserDto = exports.DeleteUserSchema = exports.UpdateUserRoleBodySchema = exports.UpdateUserRoleSchema = exports.GetAllUsersSchema = exports.GetUserByIdSchema = exports.UpdateUserSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long').optional(),
    phoneNumber: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
    preferences: zod_1.z
        .object({
        platforms: zod_1.z
            .array(zod_1.z.enum(['codeforces', 'leetcode', 'codechef', 'atcoder']))
            .optional(),
        alertFrequency: zod_1.z.enum(['immediate', 'daily', 'weekly']).optional(),
        contestTypes: zod_1.z.array(zod_1.z.string()).optional(),
        notificationChannels: zod_1.z
            .object({
            whatsapp: zod_1.z.boolean().optional(),
            email: zod_1.z.boolean().optional(),
            push: zod_1.z.boolean().optional(),
        })
            .optional(),
        notifyBefore: zod_1.z.number().min(1).max(168).optional(),
    })
        .optional(),
});
exports.GetUserByIdSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'User ID is required'),
});
exports.GetAllUsersSchema = zod_1.z.object({
    limit: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 20)),
    offset: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 0)),
});
exports.UpdateUserRoleSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'User ID is required'),
});
exports.UpdateUserRoleBodySchema = zod_1.z.object({
    role: zod_1.z.enum(['user', 'admin']),
});
exports.DeleteUserSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'User ID is required'),
});
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;
class GetUserByIdDto extends (0, nestjs_zod_1.createZodDto)(exports.GetUserByIdSchema) {
}
exports.GetUserByIdDto = GetUserByIdDto;
class GetAllUsersDto extends (0, nestjs_zod_1.createZodDto)(exports.GetAllUsersSchema) {
}
exports.GetAllUsersDto = GetAllUsersDto;
class UpdateUserRoleDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateUserRoleSchema) {
}
exports.UpdateUserRoleDto = UpdateUserRoleDto;
class UpdateUserRoleBodyDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateUserRoleBodySchema) {
}
exports.UpdateUserRoleBodyDto = UpdateUserRoleBodyDto;
class DeleteUserDto extends (0, nestjs_zod_1.createZodDto)(exports.DeleteUserSchema) {
}
exports.DeleteUserDto = DeleteUserDto;
//# sourceMappingURL=user.dto.js.map