import { Model } from 'mongoose';
import { UserDocument } from '../users/schemas/user.schema';
import { ContestDocument } from '../contests/schemas/contest.schema';
import { Notification, NotificationDocument, NotificationStatus, NotificationType } from './schemas/notification.schema';
import { EmailNotificationService } from './services/email-notification.service';
import { WhatsAppNotificationService } from './services/whatsapp-notification.service';
import { PushNotificationService } from './services/push-notification.service';
export interface TypeStatsMap {
    [key: string]: number;
}
export declare class NotificationsService {
    private userModel;
    private contestModel;
    private notificationModel;
    private readonly emailService;
    private readonly whatsappService;
    private readonly pushService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, contestModel: Model<ContestDocument>, notificationModel: Model<NotificationDocument>, emailService: EmailNotificationService, whatsappService: WhatsAppNotificationService, pushService: PushNotificationService);
    getUsersForNotification(contest: ContestDocument): Promise<UserDocument[]>;
    private wasNotificationSent;
    private createNotificationRecord;
    private updateNotificationStatus;
    sendNotification(user: UserDocument, contest: ContestDocument): Promise<void>;
    notifyUpcomingContests(contests: ContestDocument[]): Promise<void>;
    private formatNotificationPayload;
    getUpcomingContestsForUser(user: UserDocument, hoursAhead: number): Promise<ContestDocument[]>;
    getUsersForDigest(frequency: 'daily' | 'weekly'): Promise<UserDocument[]>;
    sendDigestNotification(user: UserDocument, contests: ContestDocument[], frequency: 'daily' | 'weekly'): Promise<void>;
    getServiceStatus(): {
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
    healthCheckAll(): Promise<{
        email: boolean;
        whatsapp: boolean;
        push: boolean;
        overall: boolean;
    }>;
    getNotificationHistory(userId: string, options?: {
        page?: number;
        limit?: number;
        status?: NotificationStatus;
        type?: NotificationType;
        startDate?: Date;
        endDate?: Date;
    }): Promise<{
        notifications: (import("mongoose").Document<unknown, {}, NotificationDocument, {}, {}> & Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getNotificationById(notificationId: string): Promise<(import("mongoose").Document<unknown, {}, NotificationDocument, {}, {}> & Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    markNotificationAsRead(notificationId: string): Promise<import("mongoose").Document<unknown, {}, NotificationDocument, {}, {}> & Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    markAllNotificationsAsRead(userId: string): Promise<{
        modifiedCount: number;
    }>;
    getNotificationStats(userId?: string, startDate?: Date, endDate?: Date): Promise<{
        total: number;
        sent: number;
        failed: number;
        pending: number;
        byChannel: {
            email: number;
            whatsapp: number;
            push: number;
        };
        byType: TypeStatsMap;
        successRate: number;
    }>;
    cleanupOldNotifications(daysOld?: number): Promise<{
        deletedCount: number;
    }>;
    retryFailedNotification(notificationId: string): Promise<import("mongoose").Document<unknown, {}, NotificationDocument, {}, {}> & Notification & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
