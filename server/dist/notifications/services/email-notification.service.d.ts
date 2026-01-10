import { INotificationService, NotificationPayload, NotificationResult } from '../interfaces/notification.interface';
export declare class EmailNotificationService implements INotificationService {
    private readonly logger;
    private readonly resend;
    private readonly fromEmail;
    private readonly enabled;
    readonly channel = "email";
    constructor();
    isEnabled(): boolean;
    send(email: string, payload: NotificationPayload): Promise<NotificationResult>;
    healthCheck(): Promise<boolean>;
    sendOtpEmail(email: string, otpCode: string): Promise<void>;
    sendDigestEmail(email: string, contests: Array<{
        name: string;
        platform: string;
        startTime: Date;
        hoursUntilStart: number;
        websiteUrl?: string;
    }>, frequency: 'daily' | 'weekly'): Promise<NotificationResult>;
}
