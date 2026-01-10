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
var OtpController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const email_notification_service_1 = require("../../notifications/services/email-notification.service");
const token_service_1 = require("../services/token.service");
const users_service_1 = require("../../users/users.service");
const otp_dto_1 = require("./dto/otp.dto");
const decorators_1 = require("../../common/decorators");
let OtpController = OtpController_1 = class OtpController {
    otpService;
    emailService;
    tokenService;
    usersService;
    logger = new common_1.Logger(OtpController_1.name);
    constructor(otpService, emailService, tokenService, usersService) {
        this.otpService = otpService;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.usersService = usersService;
    }
    async requestOtp(dto) {
        try {
            const { code, expiresAt } = await this.otpService.createOtp(dto.email);
            await this.emailService.sendOtpEmail(dto.email, code);
            const expiresIn = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
            this.logger.log(`OTP requested for email: ${dto.email}`);
            return {
                message: 'OTP sent to your email address',
                expiresIn,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to request OTP for ${dto.email}: ${errorMessage}`);
            throw error;
        }
    }
    async verifyOtp(dto) {
        try {
            const user = await this.otpService.verifyOtp(dto.email, dto.code);
            const tokens = await this.tokenService.generateTokens(user.id, user.email, user.role);
            await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
            await this.usersService.updateLastLogin(user.id);
            this.logger.log(`Email verified successfully: ${dto.email}`);
            return {
                message: 'Email verified successfully',
                isEmailVerified: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                },
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to verify OTP for ${dto.email}: ${errorMessage}`);
            throw error;
        }
    }
    async resendOtp(dto) {
        try {
            const { code, expiresAt } = await this.otpService.resendOtp(dto.email);
            await this.emailService.sendOtpEmail(dto.email, code);
            const expiresIn = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
            this.logger.log(`OTP resent for email: ${dto.email}`);
            return {
                message: 'New OTP sent to your email address',
                expiresIn,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to resend OTP for ${dto.email}: ${errorMessage}`);
            throw error;
        }
    }
};
exports.OtpController = OtpController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "requestOtp", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "verifyOtp", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('resend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "resendOtp", null);
exports.OtpController = OtpController = OtpController_1 = __decorate([
    (0, common_1.Controller)('auth/otp'),
    __metadata("design:paramtypes", [otp_service_1.OtpService,
        email_notification_service_1.EmailNotificationService,
        token_service_1.TokenService,
        users_service_1.UsersService])
], OtpController);
//# sourceMappingURL=otp.controller.js.map