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
var AdminEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEmailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_notification_service_1 = require("./email-notification.service");
const user_schema_1 = require("../../users/schemas/user.schema");
const contest_schema_1 = require("../../contests/schemas/contest.schema");
const announcement_template_1 = require("../templates/announcement.template");
let AdminEmailService = AdminEmailService_1 = class AdminEmailService {
    userModel;
    contestModel;
    emailService;
    logger = new common_1.Logger(AdminEmailService_1.name);
    constructor(userModel, contestModel, emailService) {
        this.userModel = userModel;
        this.contestModel = contestModel;
        this.emailService = emailService;
    }
    async sendCustomEmail(dto) {
        if (!this.emailService.isEnabled()) {
            throw new Error('Email service is not configured');
        }
        const resend = this.emailService
            .resend;
        const fromEmail = this.emailService
            .fromEmail;
        if (!resend) {
            throw new Error('Resend client not initialized');
        }
        const recipients = Array.isArray(dto.to) ? dto.to : [dto.to];
        const results = [];
        for (const email of recipients) {
            try {
                const result = await resend.emails.send({
                    from: fromEmail,
                    to: email,
                    subject: dto.subject,
                    html: dto.html,
                    text: dto.text,
                    replyTo: dto.replyTo,
                });
                results.push({
                    email,
                    success: !result.error,
                    messageId: result.data?.id,
                    error: result.error?.message,
                });
                this.logger.log(`Custom email sent to ${email}`);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                results.push({
                    email,
                    success: false,
                    error: errorMessage,
                });
                this.logger.error(`Failed to send custom email to ${email}: ${errorMessage}`);
            }
        }
        return {
            total: recipients.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        };
    }
    async sendBulkEmail(dto) {
        const users = await this.userModel
            .find({
            _id: { $in: dto.userIds },
            isActive: true,
        })
            .select('email name')
            .exec();
        if (users.length === 0) {
            throw new common_1.NotFoundException('No active users found with provided IDs');
        }
        const resend = this.emailService
            .resend;
        const fromEmail = this.emailService
            .fromEmail;
        if (!resend) {
            throw new Error('Resend client not initialized');
        }
        const results = [];
        for (const user of users) {
            if (!user.email)
                continue;
            try {
                const result = await resend.emails.send({
                    from: fromEmail,
                    to: user.email,
                    subject: dto.subject,
                    html: dto.html,
                    text: dto.text,
                });
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: !result.error,
                    messageId: result.data?.id,
                    error: result.error?.message,
                });
                this.logger.log(`Bulk email sent to ${user.email}`);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: false,
                    error: errorMessage,
                });
                this.logger.error(`Failed to send bulk email to ${user.email}: ${errorMessage}`);
            }
        }
        return {
            total: users.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        };
    }
    async sendAnnouncement(dto) {
        const query = {};
        if (dto.filters) {
            if (dto.filters.platforms && dto.filters.platforms.length > 0) {
                query['preferences.platforms'] = { $in: dto.filters.platforms };
            }
            if (dto.filters.isActive !== undefined) {
                query.isActive = dto.filters.isActive;
            }
        }
        else {
            query.isActive = true;
        }
        const users = await this.userModel.find(query).select('email name').exec();
        if (users.length === 0) {
            throw new common_1.NotFoundException('No users found matching the filters');
        }
        const resend = this.emailService
            .resend;
        const fromEmail = this.emailService
            .fromEmail;
        if (!resend) {
            throw new Error('Resend client not initialized');
        }
        const html = (0, announcement_template_1.formatAnnouncementEmail)(dto);
        const results = [];
        for (const user of users) {
            if (!user.email)
                continue;
            try {
                const result = await resend.emails.send({
                    from: fromEmail,
                    to: user.email,
                    subject: dto.subject,
                    html,
                });
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: !result.error,
                    messageId: result.data?.id,
                    error: result.error?.message,
                });
                this.logger.log(`Announcement sent to ${user.email}`);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: false,
                    error: errorMessage,
                });
                this.logger.error(`Failed to send announcement to ${user.email}: ${errorMessage}`);
            }
        }
        return {
            total: users.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            filters: dto.filters,
            results,
        };
    }
    async sendContestReminder(dto) {
        const contest = await this.contestModel.findById(dto.contestId).exec();
        if (!contest) {
            throw new common_1.NotFoundException(`Contest with ID ${dto.contestId} not found`);
        }
        const users = await this.userModel
            .find({
            _id: { $in: dto.userIds },
            isActive: true,
        })
            .select('email name')
            .exec();
        if (users.length === 0) {
            throw new common_1.NotFoundException('No active users found with provided IDs');
        }
        const results = [];
        const now = new Date();
        const hoursUntilStart = Math.round((contest.startTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        for (const user of users) {
            if (!user.email)
                continue;
            try {
                const payload = {
                    userId: String(user.id),
                    contestId: String(contest._id),
                    contestName: contest.name,
                    platform: contest.platform,
                    startTime: contest.startTime,
                    hoursUntilStart,
                };
                const result = await this.emailService.send(user.email, payload);
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: result.success,
                    messageId: result.messageId,
                    error: result.error,
                });
                this.logger.log(`Contest reminder sent to ${user.email}`);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                results.push({
                    userId: String(user.id),
                    email: user.email,
                    username: user.name,
                    success: false,
                    error: errorMessage,
                });
                this.logger.error(`Failed to send contest reminder to ${user.email}: ${errorMessage}`);
            }
        }
        return {
            contest: {
                id: String(contest._id),
                name: contest.name,
                platform: contest.platform,
                startTime: contest.startTime,
            },
            total: users.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        };
    }
};
exports.AdminEmailService = AdminEmailService;
exports.AdminEmailService = AdminEmailService = AdminEmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(contest_schema_1.Contest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        email_notification_service_1.EmailNotificationService])
], AdminEmailService);
//# sourceMappingURL=admin-email.service.js.map