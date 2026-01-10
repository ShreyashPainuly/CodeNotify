import { z } from 'zod';
export declare const RequestOtpSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const VerifyOtpSchema: z.ZodObject<{
    email: z.ZodEmail;
    code: z.ZodString;
}, z.core.$strip>;
export declare const ResendOtpSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
declare const RequestOtpDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>> & {
    io: "input";
};
export declare class RequestOtpDto extends RequestOtpDto_base {
}
declare const VerifyOtpDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
    code: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class VerifyOtpDto extends VerifyOtpDto_base {
}
declare const ResendOtpDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>> & {
    io: "input";
};
export declare class ResendOtpDto extends ResendOtpDto_base {
}
export interface OtpResponse {
    message: string;
    expiresIn?: number;
}
export interface VerifyOtpResponse {
    message: string;
    isEmailVerified: boolean;
    user: {
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        role: string;
        isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
}
export {};
