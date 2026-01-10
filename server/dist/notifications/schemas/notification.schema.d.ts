import { Document, Schema as MongooseSchema } from 'mongoose';
export type NotificationDocument = Notification & Document;
export declare enum NotificationStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED",
    RETRYING = "RETRYING"
}
export declare enum NotificationChannel {
    EMAIL = "email",
    WHATSAPP = "whatsapp",
    PUSH = "push"
}
export declare enum NotificationType {
    CONTEST_REMINDER = "CONTEST_REMINDER",
    CONTEST_STARTING = "CONTEST_STARTING",
    CONTEST_ENDING = "CONTEST_ENDING",
    DAILY_DIGEST = "DAILY_DIGEST",
    WEEKLY_DIGEST = "WEEKLY_DIGEST",
    SYSTEM_ALERT = "SYSTEM_ALERT"
}
interface ChannelDeliveryStatus {
    channel: NotificationChannel;
    status: NotificationStatus;
    sentAt?: Date;
    failedAt?: Date;
    error?: string;
    retryCount: number;
    lastRetryAt?: Date;
}
export declare class Notification {
    userId: MongooseSchema.Types.ObjectId;
    contestId?: MongooseSchema.Types.ObjectId;
    type: NotificationType;
    title: string;
    message: string;
    payload?: Record<string, any>;
    channels: NotificationChannel[];
    deliveryStatus: ChannelDeliveryStatus[];
    status: NotificationStatus;
    scheduledAt?: Date;
    sentAt?: Date;
    failedAt?: Date;
    retryCount: number;
    maxRetries: number;
    lastRetryAt?: Date;
    nextRetryAt?: Date;
    error?: string;
    errorHistory?: Array<{
        timestamp: Date;
        error: string;
        channel?: NotificationChannel;
    }>;
    isRead: boolean;
    readAt?: Date;
    isActive: boolean;
    expiresAt?: Date;
    get isDelivered(): boolean;
    get isFailed(): boolean;
    get isPending(): boolean;
    get canRetry(): boolean;
    get successfulChannels(): NotificationChannel[];
    get failedChannels(): NotificationChannel[];
}
export declare const NotificationSchema: MongooseSchema<Notification, import("mongoose").Model<Notification, any, any, any, Document<unknown, any, Notification, any, {}> & Notification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, Document<unknown, {}, import("mongoose").FlatRecord<Notification>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Notification> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
