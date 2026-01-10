import { Model } from 'mongoose';
import { OtpDocument } from './schemas/otp.schema';
import { UserDocument } from '../../users/schemas/user.schema';
import { UsersService } from '../../users/users.service';
export declare class OtpService {
    private otpModel;
    private usersService;
    private readonly logger;
    constructor(otpModel: Model<OtpDocument>, usersService: UsersService);
    generateOtp(): string;
    private hashOtp;
    private verifyOtpCode;
    createOtp(email: string): Promise<{
        code: string;
        expiresAt: Date;
    }>;
    verifyOtp(email: string, code: string): Promise<UserDocument>;
    resendOtp(email: string): Promise<{
        code: string;
        expiresAt: Date;
    }>;
    deleteOtp(email: string): Promise<void>;
    cleanupExpiredOtps(): Promise<number>;
    getOtpStatus(email: string): Promise<{
        exists: boolean;
        expiresAt?: Date;
        attempts?: number;
    }>;
}
