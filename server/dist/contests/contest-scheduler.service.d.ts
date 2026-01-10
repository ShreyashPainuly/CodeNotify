import { ConfigService } from '@nestjs/config';
import { ContestsService } from './contests.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ContestSchedulerService {
    private readonly contestsService;
    private readonly notificationsService;
    private readonly configService;
    private readonly logger;
    private readonly syncEnabled;
    private readonly syncInterval;
    constructor(contestsService: ContestsService, notificationsService: NotificationsService, configService: ConfigService);
    handleContestSync(): Promise<void>;
    handleCleanup(): Promise<void>;
    handleUpcomingContests(): Promise<void>;
    handleDailyDigest(): Promise<void>;
    handleWeeklyDigest(): Promise<void>;
    triggerManualSync(): Promise<void>;
}
