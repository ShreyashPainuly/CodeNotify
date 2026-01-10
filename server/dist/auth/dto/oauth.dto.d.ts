import { z } from 'zod';
export interface GoogleAuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        picture?: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}
export declare const OAuthLoginSchema: z.ZodObject<{
    provider: z.ZodEnum<{
        google: "google";
        github: "github";
        facebook: "facebook";
    }>;
    accessToken: z.ZodString;
}, z.core.$strip>;
declare const OAuthLoginDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    provider: z.ZodEnum<{
        google: "google";
        github: "github";
        facebook: "facebook";
    }>;
    accessToken: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class OAuthLoginDto extends OAuthLoginDto_base {
}
export declare const OAuthLinkSchema: z.ZodObject<{
    provider: z.ZodEnum<{
        google: "google";
        github: "github";
        facebook: "facebook";
    }>;
    accessToken: z.ZodString;
}, z.core.$strip>;
declare const OAuthLinkDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    provider: z.ZodEnum<{
        google: "google";
        github: "github";
        facebook: "facebook";
    }>;
    accessToken: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class OAuthLinkDto extends OAuthLinkDto_base {
}
export {};
