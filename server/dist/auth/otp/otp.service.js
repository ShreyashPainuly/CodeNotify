"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const otp_schema_1 = require("./schemas/otp.schema");
const users_service_1 = require("../../users/users.service");
const crypto_util_1 = require("../../common/utils/crypto.util");
const constants_1 = require("../../common/constants");
let OtpService = OtpService_1 = class OtpService {
    otpModel;
    usersService;
    logger = new common_1.Logger(OtpService_1.name);
    constructor(otpModel, usersService) {
        this.otpModel = otpModel;
        this.usersService = usersService;
    }
    generateOtp() {
        return (0, crypto_util_1.generateOtp)(constants_1.OTP.CODE_LENGTH);
    }
    async hashOtp(code) {
        return bcrypt.hash(code, constants_1.OTP.SALT_ROUNDS);
    }
    async verifyOtpCode(plainCode, hashedCode) {
        return bcrypt.compare(plainCode, hashedCode);
    }
    async createOtp(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.isEmailVerified) {
            throw new common_1.BadRequestException('Email is already verified');
        }
        await this.otpModel.deleteMany({ email }).exec();
        const code = this.generateOtp();
        const hashedCode = await this.hashOtp(code);
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + constants_1.OTP.EXPIRY_MINUTES);
        const otpRecord = new this.otpModel({
            email,
            code: hashedCode,
            expiresAt,
            attempts: 0,
            verified: false,
        });
        await otpRecord.save();
        this.logger.log(`OTP created for email: ${email}`);
        return { code, expiresAt };
    }
    async verifyOtp(email, code) {
        const otpRecord = await this.otpModel.findOne({ email }).exec();
        if (!otpRecord) {
            throw new common_1.BadRequestException('No OTP found. Please request a new one.');
        }
        if (otpRecord.verified) {
            throw new common_1.BadRequestException('OTP already used. Please request a new one.');
        }
        if (new Date() > otpRecord.expiresAt) {
            await this.otpModel.deleteOne({ email }).exec();
            throw new common_1.BadRequestException('OTP has expired. Please request a new one.');
        }
        if (otpRecord.attempts >= constants_1.OTP.MAX_ATTEMPTS) {
            await this.otpModel.deleteOne({ email }).exec();
            throw new common_1.BadRequestException('Maximum verification attempts exceeded. Please request a new OTP.');
        }
        const isValid = await this.verifyOtpCode(code, otpRecord.code);
        if (!isValid) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            const remainingAttempts = constants_1.OTP.MAX_ATTEMPTS - otpRecord.attempts;
            throw new common_1.BadRequestException(`Invalid OTP code. ${remainingAttempts} attempt(s) remaining.`);
        }
        otpRecord.verified = true;
        await otpRecord.save();
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isEmailVerified = true;
        await user.save();
        await this.otpModel.deleteOne({ email }).exec();
        this.logger.log(`Email verified successfully for: ${email}`);
        return user;
    }
    async resendOtp(email) {
        return this.createOtp(email);
    }
    async deleteOtp(email) {
        await this.otpModel.deleteOne({ email }).exec();
        this.logger.log(`OTP deleted for email: ${email}`);
    }
    async cleanupExpiredOtps() {
        const result = await this.otpModel
            .deleteMany({ expiresAt: { $lt: new Date() } })
            .exec();
        this.logger.log(`Cleaned up ${result.deletedCount} expired OTPs`);
        return result.deletedCount;
    }
    async getOtpStatus(email) {
        const otpRecord = await this.otpModel.findOne({ email }).exec();
        if (!otpRecord) {
            return { exists: false };
        }
        return {
            exists: true,
            expiresAt: otpRecord.expiresAt,
            attempts: otpRecord.attempts,
        };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], OtpService);
//# sourceMappingURL=otp.service.js.map