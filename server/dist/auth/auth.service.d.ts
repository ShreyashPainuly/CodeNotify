import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto, SigninDto, AuthResponse } from './dto/auth.dto';
import type { UserPreferences } from '../users/dto/user.dto';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
export declare class AuthService {
    private usersService;
    private passwordService;
    private tokenService;
    private configService;
    constructor(usersService: UsersService, passwordService: PasswordService, tokenService: TokenService, configService: ConfigService);
    signup(createUserDto: CreateUserDto): Promise<AuthResponse>;
    signin(signinDto: SigninDto): Promise<AuthResponse>;
    signout(userId: string): Promise<{
        message: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        preferences: UserPreferences;
        isActive: boolean;
        refreshToken?: string;
        lastLogin?: Date;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    validateOAuthUser(email: string, name: string): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        role: string;
        isEmailVerified: boolean;
        accessToken: string;
        refreshToken: string;
    }>;
    getFrontendUrl(): string;
}
