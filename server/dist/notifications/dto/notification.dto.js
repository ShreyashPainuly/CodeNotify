"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatsSchema = exports.UpdateNotificationSchema = exports.NotificationQuerySchema = void 0;
const zod_1 = require("zod");
const notification_schema_1 = require("../schemas/notification.schema");
exports.NotificationQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    contestId: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(notification_schema_1.NotificationStatus).optional(),
    type: zod_1.z.nativeEnum(notification_schema_1.NotificationType).optional(),
    channel: zod_1.z.nativeEnum(notification_schema_1.NotificationChannel).optional(),
    isRead: zod_1.z
        .string()
        .transform((val) => val === 'true')
        .optional(),
    startDate: zod_1.z.iso.datetime().optional(),
    endDate: zod_1.z.iso.datetime().optional(),
    page: zod_1.z.coerce.number().default(1),
    limit: zod_1.z.coerce.number().default(20),
    sortBy: zod_1.z.enum(['createdAt', 'sentAt', 'scheduledAt']).default('createdAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.UpdateNotificationSchema = zod_1.z.object({
    isRead: zod_1.z.boolean().optional(),
    status: zod_1.z.nativeEnum(notification_schema_1.NotificationStatus).optional(),
});
exports.NotificationStatsSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=notification.dto.js.map