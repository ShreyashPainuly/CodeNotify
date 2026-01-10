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
var EmailNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const common_constants_1 = require("../../common/common.constants");
const contest_alert_template_1 = require("../templates/contest-alert.template");
const otp_verification_1 = require("../../auth/otp/templates/otp-verification");
const digest_email_template_1 = require("../templates/digest-email.template");
let EmailNotificationService = EmailNotificationService_1 = class EmailNotificationService {
    logger = new common_1.Logger(EmailNotificationService_1.name);
    resend = null;
    fromEmail;
    enabled;
    channel = 'email';
    constructor() {
        const apiKey = common_constants_1.EMAIL.RESEND_API_KEY;
        this.fromEmail = common_constants_1.EMAIL.EMAIL_FROM;
        this.enabled = !!apiKey;
        if (this.enabled && apiKey) {
            this.resend = new resend_1.Resend(apiKey);
            this.logger.log('Email notification service initialized with Resend');
        }
        else {
            this.logger.warn('Email notification service disabled - RESEND_API_KEY not configured');
        }
    }
    isEnabled() {
        return this.enabled;
    }
    async send(email, payload) {
        if (!this.enabled || !this.resend) {
            this.logger.warn(`[EMAIL DISABLED] Would send to ${email}: Contest "${payload.contestName}" starts in ${payload.hoursUntilStart} hours`);
            return {
                success: false,
                channel: this.channel,
                error: 'Email service not configured',
            };
        }
        this.logger.log(`[EMAIL] Sending notification to ${email}`);
        try {
            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: `🚨 Contest Alert: ${payload.contestName}`,
                html: (0, contest_alert_template_1.formatContestAlertEmail)(payload),
            });
            if (error) {
                throw new Error(`Resend API error: ${error.message}`);
            }
            this.logger.log(`[EMAIL SUCCESS] Sent to ${email}, Message ID: ${data?.id}`);
            return {
                success: true,
                channel: this.channel,
                messageId: data?.id,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`[EMAIL FAILED] Failed to send to ${email}: ${errorMessage}`);
            return {
                success: false,
                channel: this.channel,
                error: errorMessage,
            };
        }
    }
    async healthCheck() {
        if (!this.enabled || !this.resend) {
            return false;
        }
        try {
            await Promise.resolve();
            return true;
        }
        catch (error) {
            this.logger.error(`Email service health check failed: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
    async sendOtpEmail(email, otpCode) {
        if (!this.enabled || !this.resend) {
            throw new Error('Email service not configured');
        }
        this.logger.log(`[EMAIL] Sending OTP to ${email}`);
        try {
            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: 'Verify Your Email - CodeNotify',
                html: (0, otp_verification_1.formatOtpEmail)(otpCode),
            });
            if (error) {
                throw new Error(`Resend API error: ${error.message}`);
            }
            this.logger.log(`[EMAIL SUCCESS] OTP sent to ${email}, Message ID: ${data?.id}`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`[EMAIL FAILED] Failed to send OTP to ${email}: ${errorMessage}`);
            throw error;
        }
    }
    async sendDigestEmail(email, contests, frequency) {
        if (!this.enabled || !this.resend) {
            this.logger.warn(`[EMAIL DISABLED] Would send ${frequency} digest to ${email} with ${contests.length} contests`);
            return {
                success: false,
                channel: this.channel,
                error: 'Email service not configured',
            };
        }
        this.logger.log(`[EMAIL] Sending ${frequency} digest to ${email} with ${contests.length} contests`);
        try {
            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: `${frequency === 'daily' ? '📅 Daily' : '📆 Weekly'} Contest Digest - ${contests.length} Upcoming Contest${contests.length > 1 ? 's' : ''}`,
                html: (0, digest_email_template_1.formatDigestEmail)(contests, frequency),
            });
            if (error) {
                throw new Error(`Resend API error: ${error.message}`);
            }
            this.logger.log(`[EMAIL SUCCESS] ${frequency} digest sent to ${email}, Message ID: ${data?.id}`);
            return {
                success: true,
                channel: this.channel,
                messageId: data?.id,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`[EMAIL FAILED] Failed to send ${frequency} digest to ${email}: ${errorMessage}`);
            return {
                success: false,
                channel: this.channel,
                error: errorMessage,
            };
        }
    }
};
exports.EmailNotificationService = EmailNotificationService;
exports.EmailNotificationService = EmailNotificationService = EmailNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailNotificationService);
//# sourceMappingURL=email-notification.service.js.map