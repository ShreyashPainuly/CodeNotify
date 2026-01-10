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
var WhatsAppNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppNotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const whatsapp_message_template_1 = require("../templates/whatsapp-message.template");
let WhatsAppNotificationService = WhatsAppNotificationService_1 = class WhatsAppNotificationService {
    configService;
    logger = new common_1.Logger(WhatsAppNotificationService_1.name);
    enabled;
    apiKey;
    phoneId;
    channel = 'whatsapp';
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('WHATSAPP_API_KEY');
        this.phoneId = this.configService.get('WHATSAPP_PHONE_ID');
        this.enabled = !!(this.apiKey && this.phoneId);
        if (this.enabled) {
            this.logger.log('WhatsApp notification service initialized');
        }
        else {
            this.logger.warn('WhatsApp notification service disabled - WHATSAPP_API_KEY or WHATSAPP_PHONE_ID not configured');
        }
    }
    isEnabled() {
        return this.enabled;
    }
    async send(phoneNumber, payload) {
        if (!this.enabled) {
            this.logger.warn(`[WHATSAPP DISABLED] Would send to ${phoneNumber}: Contest "${payload.contestName}" starts in ${payload.hoursUntilStart} hours`);
            return {
                success: false,
                channel: this.channel,
                error: 'WhatsApp service not configured',
            };
        }
        this.logger.log(`[WHATSAPP] Sending notification to ${phoneNumber}`);
        try {
            const message = (0, whatsapp_message_template_1.formatWhatsAppMessage)(payload);
            this.logger.warn(`[WHATSAPP STUB] Would send message to ${phoneNumber}:\n${message}`);
            await new Promise((resolve) => setTimeout(resolve, 100));
            return {
                success: true,
                channel: this.channel,
                messageId: 'stub-whatsapp-message-id',
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`[WHATSAPP FAILED] Failed to send to ${phoneNumber}: ${errorMessage}`);
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
            return !!(this.apiKey && this.phoneId);
        }
        catch (error) {
            this.logger.error(`WhatsApp service health check failed: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
};
exports.WhatsAppNotificationService = WhatsAppNotificationService;
exports.WhatsAppNotificationService = WhatsAppNotificationService = WhatsAppNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsAppNotificationService);
//# sourceMappingURL=whatsapp-notification.service.js.map