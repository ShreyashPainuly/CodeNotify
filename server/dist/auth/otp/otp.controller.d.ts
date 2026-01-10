import { OtpService } from './otp.service';
import { EmailNotificationService } from '../../notifications/services/email-notification.service';
import { TokenService } from '../services/token.service';
import { UsersService } from '../../users/users.service';
import { RequestOtpDto, VerifyOtpDto, ResendOtpDto, OtpResponse, VerifyOtpResponse } from './dto/otp.dto';
export declare class OtpController {
    private readonly otpService;
    private readonly emailService;
    private readonly tokenService;
    private readonly usersService;
    private readonly logger;
    constructor(otpService: OtpService, emailService: EmailNotificationService, tokenService: TokenService, usersService: UsersService);
    requestOtp(dto: RequestOtpDto): Promise<OtpResponse>;
    verifyOtp(dto: VerifyOtpDto): Promise<VerifyOtpResponse>;
    resendOtp(dto: ResendOtpDto): Promise<OtpResponse>;
}
