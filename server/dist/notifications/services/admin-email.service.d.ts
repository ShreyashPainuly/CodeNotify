import { Model } from 'mongoose';
import { EmailNotificationService } from './email-notification.service';
import { UserDocument } from '../../users/schemas/user.schema';
import { ContestDocument } from '../../contests/schemas/contest.schema';
import { SendCustomEmailDto, SendBulkEmailDto, SendAnnouncementDto, SendContestReminderDto } from '../dto/email.dto';
import type { CustomEmailResponse, BulkEmailResponse, AnnouncementResponse, ContestReminderResponse } from '../types/email-result.types';
export declare class AdminEmailService {
    private userModel;
    private contestModel;
    private readonly emailService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, contestModel: Model<ContestDocument>, emailService: EmailNotificationService);
    sendCustomEmail(dto: SendCustomEmailDto): Promise<CustomEmailResponse>;
    sendBulkEmail(dto: SendBulkEmailDto): Promise<BulkEmailResponse>;
    sendAnnouncement(dto: SendAnnouncementDto): Promise<AnnouncementResponse>;
    sendContestReminder(dto: SendContestReminderDto): Promise<ContestReminderResponse>;
}
