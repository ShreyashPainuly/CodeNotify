export interface NotificationPayload {
    userId: string;
    contestId: string;
    contestName: string;
    platform: string;
    startTime: Date;
    hoursUntilStart: number;
}
export interface NotificationResult {
    success: boolean;
    channel: string;
    messageId?: string;
    error?: string;
}
export interface INotificationService {
    readonly channel: string;
    isEnabled(): boolean;
    send(recipient: string, payload: NotificationPayload): Promise<NotificationResult>;
    healthCheck(): Promise<boolean>;
}
