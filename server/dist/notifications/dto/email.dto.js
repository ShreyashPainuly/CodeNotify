"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendContestReminderSchema = exports.SendAnnouncementSchema = exports.SendBulkEmailSchema = exports.SendCustomEmailSchema = void 0;
const zod_1 = require("zod");
exports.SendCustomEmailSchema = zod_1.z.object({
    to: zod_1.z.union([zod_1.z.email(), zod_1.z.array(zod_1.z.string().email())]),
    subject: zod_1.z.string().min(1).max(200),
    html: zod_1.z.string().min(1),
    text: zod_1.z.string().optional(),
    replyTo: zod_1.z.email().optional(),
});
exports.SendBulkEmailSchema = zod_1.z.object({
    userIds: zod_1.z.array(zod_1.z.string()).min(1).max(1000),
    subject: zod_1.z.string().min(1).max(200),
    html: zod_1.z.string().min(1),
    text: zod_1.z.string().optional(),
});
exports.SendAnnouncementSchema = zod_1.z.object({
    subject: zod_1.z.string().min(1).max(200),
    title: zod_1.z.string().min(1).max(100),
    message: zod_1.z.string().min(1),
    actionUrl: zod_1.z.url().optional(),
    actionText: zod_1.z.string().optional(),
    filters: zod_1.z
        .object({
        platforms: zod_1.z.array(zod_1.z.string()).optional(),
        isActive: zod_1.z.boolean().optional(),
    })
        .optional(),
});
exports.SendContestReminderSchema = zod_1.z.object({
    contestId: zod_1.z.string(),
    userIds: zod_1.z.array(zod_1.z.string()).min(1).max(1000),
    customMessage: zod_1.z.string().optional(),
});
//# sourceMappingURL=email.dto.js.map