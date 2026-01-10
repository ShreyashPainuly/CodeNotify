import { z } from 'zod';
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SigninSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SignoutSchema: z.ZodObject<{}, z.core.$strip>;
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateUserDto extends CreateUserDto_base {
}
declare const SigninDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class SigninDto extends SigninDto_base {
}
declare const SignoutDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{}, z.core.$strip>> & {
    io: "input";
};
export declare class SignoutDto extends SignoutDto_base {
}
export interface AuthResponse {
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
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    phoneNumber?: string;
    role: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export {};
