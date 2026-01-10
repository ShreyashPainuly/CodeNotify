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
var PushNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PushNotificationService = PushNotificationService_1 = class PushNotificationService {
    configService;
    logger = new common_1.Logger(PushNotificationService_1.name);
    enabled;
    serverKey;
    channel = 'push';
    constructor(configService) {
        this.configService = configService;
        this.serverKey = this.configService.get('FIREBASE_SERVER_KEY');
        this.enabled = !!this.serverKey;
        if (this.enabled) {
            this.logger.log('Push notification service initialized');
        }
        else {
            this.logger.warn('Push notification service disabled - FIREBASE_SERVER_KEY not configured');
        }
    }
    isEnabled() {
        return this.enabled;
    }
    async send(userId, payload) {
        if (!this.enabled) {
            this.logger.warn(`[PUSH DISABLED] Would send to user ${userId}: Contest "${payload.contestName}" starts in ${payload.hoursUntilStart} hours`);
            return {
                success: false,
                channel: this.channel,
                error: 'Push notification service not configured',
            };
        }
        this.logger.log(`[PUSH] Sending notification to user ${userId}`);
        try {
            this.logger.warn(`[PUSH STUB] Contest "${payload.contestName}" on ${payload.platform} starts in ${payload.hoursUntilStart} hours`);
            await new Promise((resolve) => setTimeout(resolve, 100));
            return {
                success: true,
                channel: this.channel,
                messageId: 'stub-push-message-id',
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`[PUSH FAILED] Failed to send to user ${userId}: ${errorMessage}`);
            return {
                success: false,
                channel: this.channel,
                error: errorMessage,
            };
        }
    }
    async healthCheck() {
        if (!this.enabled) {
            return false;
        }
        try {
            await Promise.resolve();
            return !!this.serverKey;
        }
        catch (error) {
            this.logger.error(`Push notification service health check failed: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
};
exports.PushNotificationService = PushNotificationService;
exports.PushNotificationService = PushNotificationService = PushNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PushNotificationService);
//# sourceMappingURL=push-notification.service.js.map