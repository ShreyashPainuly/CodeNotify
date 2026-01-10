import { ConfigService } from '@nestjs/config';
import { INotificationService, NotificationPayload, NotificationResult } from '../interfaces/notification.interface';
export declare class WhatsAppNotificationService implements INotificationService {
    private readonly configService;
    private readonly logger;
    private readonly enabled;
    private readonly apiKey;
    private readonly phoneId;
    readonly channel = "whatsapp";
    constructor(configService: ConfigService);
    isEnabled(): boolean;
    send(phoneNumber: string, payload: NotificationPayload): Promise<NotificationResult>;
    healthCheck(): Promise<boolean>;
}
