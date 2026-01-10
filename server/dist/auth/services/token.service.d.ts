import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export declare class TokenService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateTokens(userId: string, email: string, role: string): Promise<TokenPair>;
    verifyRefreshToken(refreshToken: string): Promise<JwtPayload>;
}
