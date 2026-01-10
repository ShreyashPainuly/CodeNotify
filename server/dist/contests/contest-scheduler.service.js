"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContestSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_1 = require("@nestjs/config");
const contests_service_1 = require("./contests.service");
const notifications_service_1 = require("../notifications/notifications.service");
const constants_1 = require("../common/constants");
let ContestSchedulerService = ContestSchedulerService_1 = class ContestSchedulerService {
    contestsService;
    notificationsService;
    configService;
    logger = new common_1.Logger(ContestSchedulerService_1.name);
    syncEnabled;
    syncInterval;
    constructor(contestsService, notificationsService, configService) {
        this.contestsService = contestsService;
        this.notificationsService = notificationsService;
        this.configService = configService;
        this.syncEnabled = this.configService.get('CONTEST_SYNC_ENABLED', constants_1.SCHEDULER.CONTEST_SYNC_ENABLED);
        this.syncInterval = this.configService.get('CONTEST_SYNC_INTERVAL', constants_1.SCHEDULER.CONTEST_SYNC_INTERVAL);
        this.logger.log(`Contest Scheduler initialized - Enabled: ${this.syncEnabled}, Interval: ${this.syncInterval}`);
    }
    async handleContestSync() {
        if (!this.syncEnabled) {
            this.logger.debug('Contest sync is disabled via configuration');
            return;
        }
        this.logger.log('Starting scheduled contest sync');
        try {
            const results = await this.contestsService.syncAllPlatforms();
            Object.entries(results).forEach(([platform, stats]) => {
                this.logger.log(`${platform}: ${stats.synced} new, ${stats.updated} updated, ${stats.failed} failed`);
            });
            const totals = Object.values(results).reduce((acc, stats) => ({
                synced: acc.synced + stats.synced,
                updated: acc.updated + stats.updated,
                failed: acc.failed + stats.failed,
            }), { synced: 0, updated: 0, failed: 0 });
            this.logger.log(`Scheduled sync completed - Total: ${totals.synced} new, ${totals.updated} updated, ${totals.failed} failed`);
        }
        catch (error) {
            this.logger.error(`Scheduled contest sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
        }
    }
    async handleCleanup() {
        const cleanupEnabled = this.configService.get('CONTEST_CLEANUP_ENABLED', constants_1.SCHEDULER.CONTEST_CLEANUP_ENABLED);
        if (!cleanupEnabled) {
            this.logger.debug('Contest cleanup is disabled via configuration');
            return;
        }
        const daysToKeep = this.configService.get('CONTEST_CLEANUP_DAYS', constants_1.SCHEDULER.CONTEST_CLEANUP_DAYS);
        this.logger.log(`Starting cleanup of contests older than ${daysToKeep} days`);
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
            const result = await this.contestsService['contestModel'].deleteMany({
                endTime: { $lt: cutoffDate },
                phase: 'FINISHED',
            });
            this.logger.log(`Cleanup completed - Deleted ${result.deletedCount} old contests`);
        }
        catch (error) {
            this.logger.error(`Contest cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
        }
    }
    async handleUpcomingContests() {
        const notificationsEnabled = this.configService.get('NOTIFICATIONS_ENABLED', constants_1.NOTIFICATIONS.ENABLED);
        if (!notificationsEnabled) {
            this.logger.debug('Notifications are disabled via configuration');
            return;
        }
        try {
            const now = new Date();
            const notificationWindow = this.configService.get('NOTIFICATION_WINDOW_HOURS', constants_1.NOTIFICATIONS.WINDOW_HOURS);
            const windowEnd = new Date(now.getTime() + notificationWindow * 60 * 60 * 1000);
            const upcomingContests = await this.contestsService['contestModel'].find({
                startTime: {
                    $gte: now,
                    $lte: windowEnd,
                },
                phase: 'BEFORE',
                isActive: true,
            });
            if (upcomingContests.length > 0) {
                this.logger.log(`Found ${upcomingContests.length} contests starting within ${notificationWindow} hours`);
                await this.notificationsService.notifyUpcomingContests(upcomingContests);
            }
        }
        catch (error) {
            this.logger.error(`Failed to check upcoming contests: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async handleDailyDigest() {
        const notificationsEnabled = this.configService.get('NOTIFICATIONS_ENABLED', constants_1.NOTIFICATIONS.ENABLED);
        if (!notificationsEnabled) {
            this.logger.debug('Notifications are disabled via configuration');
            return;
        }
        this.logger.log('Starting daily digest processing');
        try {
            const users = await this.notificationsService.getUsersForDigest('daily');
            this.logger.log(`Found ${users.length} users for daily digest`);
            let sentCount = 0;
            let failedCount = 0;
            for (const user of users) {
                try {
                    const contests = await this.notificationsService.getUpcomingContestsForUser(user, 24);
                    if (contests.length > 0) {
                        await this.notificationsService.sendDigestNotification(user, contests, 'daily');
                        sentCount++;
                    }
                }
                catch (error) {
                    failedCount++;
                    this.logger.error(`Failed to send daily digest to ${user.email}: ${error instanceof Error ? error.message : String(error)}`);
                }
            }
            this.logger.log(`Daily digest completed - Sent: ${sentCount}, Failed: ${failedCount}`);
        }
        catch (error) {
            this.logger.error(`Daily digest processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async handleWeeklyDigest() {
        const notificationsEnabled = this.configService.get('NOTIFICATIONS_ENABLED', constants_1.NOTIFICATIONS.ENABLED);
        if (!notificationsEnabled) {
            this.logger.debug('Notifications are disabled via configuration');
            return;
        }
        this.logger.log('Starting weekly digest processing');
        try {
            const users = await this.notificationsService.getUsersForDigest('weekly');
            this.logger.log(`Found ${users.length} users for weekly digest`);
            let sentCount = 0;
            let failedCount = 0;
            for (const user of users) {
                try {
                    const contests = await this.notificationsService.getUpcomingContestsForUser(user, 168);
                    if (contests.length > 0) {
                        await this.notificationsService.sendDigestNotification(user, contests, 'weekly');
                        sentCount++;
                    }
                }
                catch (error) {
                    failedCount++;
                    this.logger.error(`Failed to send weekly digest to ${user.email}: ${error instanceof Error ? error.message : String(error)}`);
                }
            }
            this.logger.log(`Weekly digest completed - Sent: ${sentCount}, Failed: ${failedCount}`);
        }
        catch (error) {
            this.logger.error(`Weekly digest processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async triggerManualSync() {
        this.logger.log('Manual contest sync triggered');
        await this.handleContestSync();
    }
};
exports.ContestSchedulerService = ContestSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_6_HOURS, {
        name: 'sync-all-contests',
        timeZone: 'UTC',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestSchedulerService.prototype, "handleContestSync", null);
__decorate([
    (0, schedule_1.Cron)('0 2 * * *', {
        name: 'cleanup-old-contests',
        timeZone: 'UTC',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestSchedulerService.prototype, "handleCleanup", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES, {
        name: 'check-upcoming-contests',
        timeZone: 'UTC',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestSchedulerService.prototype, "handleUpcomingContests", null);
__decorate([
    (0, schedule_1.Cron)('0 8 * * *', {
        name: 'daily-digest',
        timeZone: 'UTC',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestSchedulerService.prototype, "handleDailyDigest", null);
__decorate([
    (0, schedule_1.Cron)('0 8 * * 1', {
        name: 'weekly-digest',
        timeZone: 'UTC',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestSchedulerService.prototype, "handleWeeklyDigest", null);
exports.ContestSchedulerService = ContestSchedulerService = ContestSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contests_service_1.ContestsService,
        notifications_service_1.NotificationsService,
        config_1.ConfigService])
], ContestSchedulerService);
//# sourceMappingURL=contest-scheduler.service.js.map