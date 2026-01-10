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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const contest_schema_1 = require("../contests/schemas/contest.schema");
const notification_schema_1 = require("./schemas/notification.schema");
const email_notification_service_1 = require("./services/email-notification.service");
const whatsapp_notification_service_1 = require("./services/whatsapp-notification.service");
const push_notification_service_1 = require("./services/push-notification.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    userModel;
    contestModel;
    notificationModel;
    emailService;
    whatsappService;
    pushService;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(userModel, contestModel, notificationModel, emailService, whatsappService, pushService) {
        this.userModel = userModel;
        this.contestModel = contestModel;
        this.notificationModel = notificationModel;
        this.emailService = emailService;
        this.whatsappService = whatsappService;
        this.pushService = pushService;
        this.logger.log('NotificationsService initialized with database-backed notification persistence');
    }
    async getUsersForNotification(contest) {
        const now = new Date();
        const hoursUntilStart = (contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        const users = await this.userModel
            .find({
            isActive: true,
            isEmailVerified: true,
            'preferences.platforms': contest.platform,
            'preferences.notifyBefore': { $gte: Math.floor(hoursUntilStart) },
            'preferences.alertFrequency': 'immediate',
        })
            .exec();
        return users;
    }
    async wasNotificationSent(userId, contestId) {
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
        const existingNotification = await this.notificationModel
            .findOne({
            userId,
            contestId,
            status: notification_schema_1.NotificationStatus.SENT,
            sentAt: { $gte: twelveHoursAgo },
        })
            .exec();
        return !!existingNotification;
    }
    async createNotificationRecord(user, contest, channels) {
        const now = new Date();
        const hoursUntilStart = Math.round((contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        const notification = new this.notificationModel({
            userId: String(user._id),
            contestId: String(contest._id),
            type: notification_schema_1.NotificationType.CONTEST_REMINDER,
            title: `Contest Starting Soon: ${contest.name}`,
            message: `${contest.name} on ${contest.platform} starts in ${hoursUntilStart} hours`,
            payload: {
                contestName: contest.name,
                platform: contest.platform,
                startTime: contest.startTime,
                hoursUntilStart,
                websiteUrl: contest.websiteUrl,
            },
            channels,
            deliveryStatus: channels.map((channel) => ({
                channel,
                status: notification_schema_1.NotificationStatus.PENDING,
                retryCount: 0,
            })),
            status: notification_schema_1.NotificationStatus.PENDING,
            scheduledAt: now,
        });
        return notification.save();
    }
    async updateNotificationStatus(notificationId, results) {
        const notification = await this.notificationModel.findById(notificationId);
        if (!notification)
            return;
        const now = new Date();
        const deliveryStatus = results.map((result) => ({
            channel: result.channel,
            status: result.success
                ? notification_schema_1.NotificationStatus.SENT
                : notification_schema_1.NotificationStatus.FAILED,
            sentAt: result.success ? now : undefined,
            failedAt: result.success ? undefined : now,
            error: result.error,
            retryCount: 0,
        }));
        const allSuccess = results.every((r) => r.success);
        const anySuccess = results.some((r) => r.success);
        notification.deliveryStatus = deliveryStatus;
        notification.status = allSuccess
            ? notification_schema_1.NotificationStatus.SENT
            : anySuccess
                ? notification_schema_1.NotificationStatus.SENT
                : notification_schema_1.NotificationStatus.FAILED;
        notification.sentAt = anySuccess ? now : undefined;
        notification.failedAt = allSuccess ? undefined : now;
        if (!allSuccess) {
            notification.errorHistory = results
                .filter((r) => !r.success)
                .map((r) => ({
                timestamp: now,
                error: r.error || 'Unknown error',
                channel: r.channel,
            }));
        }
        await notification.save();
    }
    async sendNotification(user, contest) {
        if (await this.wasNotificationSent(user.id, String(contest._id))) {
            this.logger.debug(`Skipping duplicate notification for user ${user.email} and contest ${contest.name}`);
            return;
        }
        const payload = this.formatNotificationPayload(user, contest);
        const channels = user.preferences.notificationChannels || {
            whatsapp: true,
            email: true,
            push: false,
        };
        const enabledChannels = [];
        if (channels.email && user.email && this.emailService.isEnabled()) {
            enabledChannels.push(notification_schema_1.NotificationChannel.EMAIL);
        }
        if (channels.whatsapp &&
            user.phoneNumber &&
            this.whatsappService.isEnabled()) {
            enabledChannels.push(notification_schema_1.NotificationChannel.WHATSAPP);
        }
        if (channels.push && this.pushService.isEnabled()) {
            enabledChannels.push(notification_schema_1.NotificationChannel.PUSH);
        }
        if (enabledChannels.length === 0) {
            this.logger.debug(`No enabled channels for user ${user.email}, skipping notification`);
            return;
        }
        const notification = await this.createNotificationRecord(user, contest, enabledChannels);
        const promises = [];
        if (channels.email && user.email && this.emailService.isEnabled()) {
            promises.push(this.emailService.send(user.email, payload));
        }
        if (channels.whatsapp &&
            user.phoneNumber &&
            this.whatsappService.isEnabled()) {
            promises.push(this.whatsappService.send(user.phoneNumber, payload));
        }
        if (channels.push && this.pushService.isEnabled()) {
            promises.push(this.pushService.send(user.id, payload));
        }
        const results = await Promise.all(promises);
        await this.updateNotificationStatus(String(notification._id), results);
        const successfulChannels = results
            .filter((r) => r.success)
            .map((r) => r.channel);
        const failedChannels = results
            .filter((r) => !r.success)
            .map((r) => r.channel);
        if (successfulChannels.length > 0) {
            this.logger.log(`Sent notifications to user ${user.email} for contest ${contest.name} via: ${successfulChannels.join(', ')}`);
        }
        if (failedChannels.length > 0) {
            this.logger.warn(`Failed to send notifications to user ${user.email} via: ${failedChannels.join(', ')}`);
        }
    }
    async notifyUpcomingContests(contests) {
        if (!contests || contests.length === 0) {
            this.logger.log('No contests to notify about');
            return;
        }
        this.logger.log(`Processing ${contests.length} upcoming contests`);
        for (const contest of contests) {
            try {
                const users = await this.getUsersForNotification(contest);
                this.logger.log(`Found ${users.length} users to notify for contest: ${contest.name}`);
                for (const user of users) {
                    try {
                        await this.sendNotification(user, contest);
                    }
                    catch (error) {
                        this.logger.error(`Failed to send notification to user ${user.email}: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Failed to process contest ${contest.name}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
    formatNotificationPayload(user, contest) {
        const now = new Date();
        const hoursUntilStart = Math.round((contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        return {
            userId: user.id,
            contestId: String(contest._id),
            contestName: contest.name,
            platform: contest.platform,
            startTime: contest.startTime,
            hoursUntilStart,
        };
    }
    async getUpcomingContestsForUser(user, hoursAhead) {
        const now = new Date();
        const endTime = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
        const contests = await this.contestModel
            .find({
            platform: { $in: user.preferences.platforms },
            startTime: { $gte: now, $lte: endTime },
            phase: 'BEFORE',
            isActive: true,
        })
            .sort({ startTime: 1 })
            .exec();
        const hoursUntilStart = (contest) => (contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        const notifyBefore = user.preferences.notifyBefore || 24;
        return contests.filter((contest) => notifyBefore >= hoursUntilStart(contest));
    }
    async getUsersForDigest(frequency) {
        return this.userModel
            .find({
            isActive: true,
            isEmailVerified: true,
            'preferences.alertFrequency': frequency,
        })
            .exec();
    }
    async sendDigestNotification(user, contests, frequency) {
        if (contests.length === 0) {
            this.logger.debug(`No contests for ${frequency} digest for user ${user.email}`);
            return;
        }
        const contestsData = contests.map((contest) => {
            const now = new Date();
            const hoursUntilStart = Math.round((contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60));
            return {
                name: contest.name,
                platform: contest.platform,
                startTime: contest.startTime,
                hoursUntilStart,
                websiteUrl: contest.websiteUrl,
            };
        });
        try {
            const result = await this.emailService.sendDigestEmail(user.email, contestsData, frequency);
            const notificationType = frequency === 'daily'
                ? notification_schema_1.NotificationType.DAILY_DIGEST
                : notification_schema_1.NotificationType.WEEKLY_DIGEST;
            const notification = new this.notificationModel({
                userId: String(user._id),
                type: notificationType,
                title: `${frequency === 'daily' ? 'Daily' : 'Weekly'} Contest Digest`,
                message: `${contests.length} upcoming contest${contests.length > 1 ? 's' : ''}`,
                payload: {
                    contests: contestsData,
                    frequency,
                },
                channels: [notification_schema_1.NotificationChannel.EMAIL],
                deliveryStatus: [
                    {
                        channel: notification_schema_1.NotificationChannel.EMAIL,
                        status: result.success
                            ? notification_schema_1.NotificationStatus.SENT
                            : notification_schema_1.NotificationStatus.FAILED,
                        sentAt: result.success ? new Date() : undefined,
                        failedAt: result.success ? undefined : new Date(),
                        error: result.error,
                        retryCount: 0,
                    },
                ],
                status: result.success
                    ? notification_schema_1.NotificationStatus.SENT
                    : notification_schema_1.NotificationStatus.FAILED,
                scheduledAt: new Date(),
                sentAt: result.success ? new Date() : undefined,
                failedAt: result.success ? undefined : new Date(),
            });
            await notification.save();
            if (result.success) {
                this.logger.log(`Sent ${frequency} digest to ${user.email} with ${contests.length} contests`);
            }
            else {
                this.logger.error(`Failed to send ${frequency} digest to ${user.email}: ${result.error}`);
            }
        }
        catch (error) {
            this.logger.error(`Error sending ${frequency} digest to ${user.email}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    getServiceStatus() {
        return {
            email: {
                enabled: this.emailService.isEnabled(),
                channel: this.emailService.channel,
            },
            whatsapp: {
                enabled: this.whatsappService.isEnabled(),
                channel: this.whatsappService.channel,
            },
            push: {
                enabled: this.pushService.isEnabled(),
                channel: this.pushService.channel,
            },
        };
    }
    async healthCheckAll() {
        const [emailHealth, whatsappHealth, pushHealth] = await Promise.all([
            this.emailService.healthCheck(),
            this.whatsappService.healthCheck(),
            this.pushService.healthCheck(),
        ]);
        return {
            email: emailHealth,
            whatsapp: whatsappHealth,
            push: pushHealth,
            overall: emailHealth || whatsappHealth || pushHealth,
        };
    }
    async getNotificationHistory(userId, options = {}) {
        const { page = 1, limit = 20, status, type, startDate, endDate } = options;
        if (!userId || userId.trim() === '') {
            return {
                notifications: [],
                pagination: {
                    page,
                    limit,
                    total: 0,
                    totalPages: 0,
                },
            };
        }
        const query = { userId };
        if (status) {
            query.status = status;
        }
        if (type) {
            query.type = type;
        }
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = startDate;
            }
            if (endDate) {
                query.createdAt.$lte = endDate;
            }
        }
        const skip = (page - 1) * limit;
        const [notifications, total] = await Promise.all([
            this.notificationModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('contestId', 'name platform startTime')
                .exec(),
            this.notificationModel.countDocuments(query).exec(),
        ]);
        return {
            notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getNotificationById(notificationId) {
        return this.notificationModel
            .findById(notificationId)
            .populate('userId', 'email name')
            .populate('contestId', 'name platform startTime')
            .exec();
    }
    async markNotificationAsRead(notificationId) {
        const notification = await this.notificationModel.findById(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        notification.isRead = true;
        notification.readAt = new Date();
        return notification.save();
    }
    async markAllNotificationsAsRead(userId) {
        const result = await this.notificationModel.updateMany({ userId, isRead: false }, { isRead: true, readAt: new Date() });
        return {
            modifiedCount: result.modifiedCount,
        };
    }
    async getNotificationStats(userId, startDate, endDate) {
        const query = {};
        if (userId && userId.trim() !== '') {
            query.userId = userId;
        }
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = startDate;
            }
            if (endDate) {
                query.createdAt.$lte = endDate;
            }
        }
        const results = await Promise.all([
            this.notificationModel.countDocuments(query),
            this.notificationModel.countDocuments({
                ...query,
                status: notification_schema_1.NotificationStatus.SENT,
            }),
            this.notificationModel.countDocuments({
                ...query,
                status: notification_schema_1.NotificationStatus.FAILED,
            }),
            this.notificationModel.countDocuments({
                ...query,
                status: notification_schema_1.NotificationStatus.PENDING,
            }),
            this.notificationModel.aggregate([
                { $match: query },
                { $unwind: '$channels' },
                {
                    $group: {
                        _id: '$channels',
                        count: { $sum: 1 },
                    },
                },
            ]),
            this.notificationModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: '$type',
                        count: { $sum: 1 },
                    },
                },
            ]),
        ]);
        const total = results[0];
        const sent = results[1];
        const failed = results[2];
        const pending = results[3];
        const byChannel = results[4];
        const byType = results[5];
        const channelStats = {
            email: 0,
            whatsapp: 0,
            push: 0,
        };
        byChannel.forEach((item) => {
            if (item._id in channelStats) {
                channelStats[item._id] = item.count;
            }
        });
        const typeStats = {};
        byType.forEach((item) => {
            typeStats[item._id] = item.count;
        });
        const successRate = total > 0 ? (sent / total) * 100 : 0;
        return {
            total,
            sent,
            failed,
            pending,
            byChannel: channelStats,
            byType: typeStats,
            successRate: Math.round(successRate * 100) / 100,
        };
    }
    async cleanupOldNotifications(daysOld = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        const result = await this.notificationModel.deleteMany({
            createdAt: { $lt: cutoffDate },
            status: { $ne: notification_schema_1.NotificationStatus.PENDING },
        });
        this.logger.log(`Cleaned up ${result.deletedCount} notifications older than ${daysOld} days`);
        return {
            deletedCount: result.deletedCount,
        };
    }
    async retryFailedNotification(notificationId) {
        const notification = await this.notificationModel.findById(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        if (!notification.canRetry) {
            throw new Error('Notification cannot be retried');
        }
        const user = await this.userModel.findById(notification.userId);
        const contest = notification.contestId
            ? await this.contestModel.findById(notification.contestId)
            : null;
        if (!user || !contest) {
            throw new Error('User or contest not found');
        }
        notification.retryCount += 1;
        notification.lastRetryAt = new Date();
        notification.status = notification_schema_1.NotificationStatus.RETRYING;
        await notification.save();
        await this.sendNotification(user, contest);
        return notification;
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(contest_schema_1.Contest.name)),
    __param(2, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        email_notification_service_1.EmailNotificationService,
        whatsapp_notification_service_1.WhatsAppNotificationService,
        push_notification_service_1.PushNotificationService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map