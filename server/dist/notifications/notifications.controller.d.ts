import { NotificationsService } from './notifications.service';
import { EmailNotificationService } from './services/email-notification.service';
import { WhatsAppNotificationService } from './services/whatsapp-notification.service';
import { PushNotificationService } from './services/push-notification.service';
import { AdminEmailService } from './services/admin-email.service';
import type { SendCustomEmailDto, SendBulkEmailDto, SendAnnouncementDto, SendContestReminderDto } from './dto/email.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly emailService;
    private readonly whatsappService;
    private readonly pushService;
    private readonly adminEmailService;
    constructor(notificationsService: NotificationsService, emailService: EmailNotificationService, whatsappService: WhatsAppNotificationService, pushService: PushNotificationService, adminEmailService: AdminEmailService);
    testEmail(body: {
        email: string;
    }): Promise<{
        message: string;
        payload: {
            userId: string;
            contestId: string;
            contestName: string;
            platform: string;
            startTime: Date;
            hoursUntilStart: number;
        };
        success: boolean;
        channel: string;
        messageId?: string;
        error?: string;
    }>;
    testWhatsApp(body: {
        phoneNumber: string;
    }): Promise<{
        message: string;
        payload: {
            userId: string;
            contestId: string;
            contestName: string;
            platform: string;
            startTime: Date;
            hoursUntilStart: number;
        };
        success: boolean;
        channel: string;
        messageId?: string;
        error?: string;
    }>;
    testPush(body: {
        userId: string;
    }): Promise<{
        message: string;
        payload: {
            userId: string;
            contestId: string;
            contestName: string;
            platform: string;
            startTime: Date;
            hoursUntilStart: number;
        };
        success: boolean;
        channel: string;
        messageId?: string;
        error?: string;
    }>;
    getStatus(): {
        email: {
            enabled: boolean;
            channel: string;
        };
        whatsapp: {
            enabled: boolean;
            channel: string;
        };
        push: {
            enabled: boolean;
            channel: string;
        };
    };
    healthCheck(): Promise<{
        email: boolean;
        whatsapp: boolean;
        push: boolean;
        overall: boolean;
    }>;
    sendCustomEmail(body: SendCustomEmailDto): Promise<import("./types/email-result.types").CustomEmailResponse>;
    sendBulkEmail(body: SendBulkEmailDto): Promise<import("./types/email-result.types").BulkEmailResponse>;
    sendAnnouncement(body: SendAnnouncementDto): Promise<import("./types/email-result.types").AnnouncementResponse>;
    sendContestReminder(body: SendContestReminderDto): Promise<import("./types/email-result.types").ContestReminderResponse>;
    getNotifications(query: Record<string, unknown>): Promise<{
        notifications: (import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").NotificationDocument, {}, {}> & import("./schemas/notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getNotificationStats(query: Record<string, unknown>): Promise<{
        total: number;
        sent: number;
        failed: number;
        pending: number;
        byChannel: {
            email: number;
            whatsapp: number;
            push: number;
        };
        byType: import("./notifications.service").TypeStatsMap;
        successRate: number;
    }>;
    cleanupNotifications(daysOld?: string): Promise<{
        deletedCount: number;
    }>;
    getNotificationById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").NotificationDocument, {}, {}> & import("./schemas/notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | {
        error: string;
    }>;
    markAsRead(id: string): Promise<{
        success: boolean;
        notification: import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").NotificationDocument, {}, {}> & import("./schemas/notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        notification?: undefined;
    }>;
    markAllAsRead(userId: string): Promise<{
        modifiedCount: number;
    }>;
    retryNotification(id: string): Promise<{
        success: boolean;
        notification: import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").NotificationDocument, {}, {}> & import("./schemas/notification.schema").Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        notification?: undefined;
    }>;
}
