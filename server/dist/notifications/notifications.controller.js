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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const notifications_service_1 = require("./notifications.service");
const email_notification_service_1 = require("./services/email-notification.service");
const whatsapp_notification_service_1 = require("./services/whatsapp-notification.service");
const push_notification_service_1 = require("./services/push-notification.service");
const admin_email_service_1 = require("./services/admin-email.service");
const email_dto_1 = require("./dto/email.dto");
const notification_dto_1 = require("./dto/notification.dto");
let NotificationsController = class NotificationsController {
    notificationsService;
    emailService;
    whatsappService;
    pushService;
    adminEmailService;
    constructor(notificationsService, emailService, whatsappService, pushService, adminEmailService) {
        this.notificationsService = notificationsService;
        this.emailService = emailService;
        this.whatsappService = whatsappService;
        this.pushService = pushService;
        this.adminEmailService = adminEmailService;
    }
    async testEmail(body) {
        const testPayload = {
            userId: 'test-user',
            contestId: 'test-contest',
            contestName: 'Test Contest - Codeforces Round #123',
            platform: 'codeforces',
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            hoursUntilStart: 2,
        };
        const result = await this.emailService.send(body.email, testPayload);
        return {
            ...result,
            message: result.success
                ? `Test email sent to ${body.email}`
                : `Failed to send email: ${result.error}`,
            payload: testPayload,
        };
    }
    async testWhatsApp(body) {
        const testPayload = {
            userId: 'test-user',
            contestId: 'test-contest',
            contestName: 'Test Contest - LeetCode Weekly Contest 400',
            platform: 'leetcode',
            startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
            hoursUntilStart: 3,
        };
        const result = await this.whatsappService.send(body.phoneNumber, testPayload);
        return {
            ...result,
            message: result.success
                ? `Test WhatsApp sent to ${body.phoneNumber}`
                : `Failed to send WhatsApp: ${result.error}`,
            payload: testPayload,
        };
    }
    async testPush(body) {
        const testPayload = {
            userId: body.userId,
            contestId: 'test-contest',
            contestName: 'Test Contest - AtCoder Beginner Contest 350',
            platform: 'atcoder',
            startTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
            hoursUntilStart: 1,
        };
        const result = await this.pushService.send(body.userId, testPayload);
        return {
            ...result,
            message: result.success
                ? `Test push notification sent to user ${body.userId}`
                : `Failed to send push: ${result.error}`,
            payload: testPayload,
        };
    }
    getStatus() {
        return this.notificationsService.getServiceStatus();
    }
    async healthCheck() {
        return await this.notificationsService.healthCheckAll();
    }
    async sendCustomEmail(body) {
        const validated = email_dto_1.SendCustomEmailSchema.parse(body);
        return await this.adminEmailService.sendCustomEmail(validated);
    }
    async sendBulkEmail(body) {
        const validated = email_dto_1.SendBulkEmailSchema.parse(body);
        return await this.adminEmailService.sendBulkEmail(validated);
    }
    async sendAnnouncement(body) {
        const validated = email_dto_1.SendAnnouncementSchema.parse(body);
        return await this.adminEmailService.sendAnnouncement(validated);
    }
    async sendContestReminder(body) {
        const validated = email_dto_1.SendContestReminderSchema.parse(body);
        return await this.adminEmailService.sendContestReminder(validated);
    }
    async getNotifications(query) {
        const validated = notification_dto_1.NotificationQuerySchema.parse(query);
        const { userId, status, type, startDate, endDate, page, limit } = validated;
        return await this.notificationsService.getNotificationHistory(userId || '', {
            page,
            limit,
            status,
            type,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        });
    }
    async getNotificationStats(query) {
        const validated = notification_dto_1.NotificationStatsSchema.parse(query);
        const { userId, startDate, endDate } = validated;
        return await this.notificationsService.getNotificationStats(userId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    async cleanupNotifications(daysOld) {
        const days = daysOld ? parseInt(daysOld, 10) : 90;
        return await this.notificationsService.cleanupOldNotifications(days);
    }
    async getNotificationById(id) {
        const notification = await this.notificationsService.getNotificationById(id);
        if (!notification) {
            return { error: 'Notification not found' };
        }
        return notification;
    }
    async markAsRead(id) {
        try {
            const notification = await this.notificationsService.markNotificationAsRead(id);
            return {
                success: true,
                notification,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    async markAllAsRead(userId) {
        return await this.notificationsService.markAllNotificationsAsRead(userId);
    }
    async retryNotification(id) {
        try {
            const notification = await this.notificationsService.retryFailedNotification(id);
            return {
                success: true,
                notification,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)('test/email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "testEmail", null);
__decorate([
    (0, common_1.Post)('test/whatsapp'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "testWhatsApp", null);
__decorate([
    (0, common_1.Post)('test/push'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "testPush", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Post)('emails/custom'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendCustomEmail", null);
__decorate([
    (0, common_1.Post)('emails/bulk'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendBulkEmail", null);
__decorate([
    (0, common_1.Post)('emails/announcement'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendAnnouncement", null);
__decorate([
    (0, common_1.Post)('emails/contest-reminder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendContestReminder", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('notifications/stats'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getNotificationStats", null);
__decorate([
    (0, common_1.Delete)('notifications/cleanup'),
    __param(0, (0, common_1.Query)('daysOld')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "cleanupNotifications", null);
__decorate([
    (0, common_1.Get)('notifications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getNotificationById", null);
__decorate([
    (0, common_1.Patch)('notifications/:id/read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('notifications/user/:userId/read-all'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Post)('notifications/:id/retry'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "retryNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.EmailVerifiedGuard),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        email_notification_service_1.EmailNotificationService,
        whatsapp_notification_service_1.WhatsAppNotificationService,
        push_notification_service_1.PushNotificationService,
        admin_email_service_1.AdminEmailService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map