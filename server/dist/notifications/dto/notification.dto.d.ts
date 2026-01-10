import { z } from 'zod';
import { NotificationStatus, NotificationChannel, NotificationType } from '../schemas/notification.schema';
export declare const NotificationQuerySchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    contestId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<typeof NotificationStatus>>;
    type: z.ZodOptional<z.ZodEnum<typeof NotificationType>>;
    channel: z.ZodOptional<z.ZodEnum<typeof NotificationChannel>>;
    isRead: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>>;
    startDate: z.ZodOptional<z.ZodISODateTime>;
    endDate: z.ZodOptional<z.ZodISODateTime>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        scheduledAt: "scheduledAt";
        sentAt: "sentAt";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type NotificationQueryDto = z.infer<typeof NotificationQuerySchema>;
export declare const UpdateNotificationSchema: z.ZodObject<{
    isRead: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodOptional<z.ZodEnum<typeof NotificationStatus>>;
}, z.core.$strip>;
export type UpdateNotificationDto = z.infer<typeof UpdateNotificationSchema>;
export declare const NotificationStatsSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type NotificationStatsDto = z.infer<typeof NotificationStatsSchema>;
export interface NotificationResponseDto {
    id: string;
    userId: string;
    contestId?: string;
    type: NotificationType;
    title: string;
    message: string;
    payload?: Record<string, any>;
    channels: NotificationChannel[];
    status: NotificationStatus;
    deliveryStatus: Array<{
        channel: NotificationChannel;
        status: NotificationStatus;
        sentAt?: Date;
        failedAt?: Date;
        error?: string;
        retryCount: number;
    }>;
    scheduledAt?: Date;
    sentAt?: Date;
    failedAt?: Date;
    isRead: boolean;
    readAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface NotificationStatsResponseDto {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    byChannel: {
        email: number;
        whatsapp: number;
        push: number;
    };
    byType: {
        [key in NotificationType]: number;
    };
    successRate: number;
    averageDeliveryTime?: number;
}
export interface PaginatedNotificationsResponseDto {
    notifications: NotificationResponseDto[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
