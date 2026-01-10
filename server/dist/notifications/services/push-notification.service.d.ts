import { ConfigService } from '@nestjs/config';
import { INotificationService, NotificationPayload, NotificationResult } from '../interfaces/notification.interface';
export declare class PushNotificationService implements INotificationService {
    private readonly configService;
    private readonly logger;
    private readonly enabled;
    private readonly serverKey;
    readonly channel = "push";
    constructor(configService: ConfigService);
    isEnabled(): boolean;
    send(userId: string, payload: NotificationPayload): Promise<NotificationResult>;
    healthCheck(): Promise<boolean>;
}
