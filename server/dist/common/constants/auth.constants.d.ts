export declare const AUTH: {
    readonly JWT_SECRET: string;
    readonly JWT_REFRESH_SECRET: string;
    readonly IS_PUBLIC_KEY: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly GOOGLE_CALLBACK_URL: string;
    readonly FRONTEND_URL: string;
};
export declare const IS_PUBLIC_KEY: string;
export declare const OTP: {
    readonly EXPIRY_MINUTES: 10;
    readonly MAX_ATTEMPTS: 3;
    readonly SALT_ROUNDS: 10;
    readonly CODE_LENGTH: 6;
};
export declare const PASSWORD: {
    readonly SALT_ROUNDS: 12;
    readonly MIN_LENGTH: 6;
};
export declare const TOKEN: {
    readonly ACCESS_TOKEN_EXPIRY: "15m";
    readonly REFRESH_TOKEN_EXPIRY: "7d";
};
