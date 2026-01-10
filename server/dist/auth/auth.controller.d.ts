import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, SigninDto, type AuthResponse } from './dto/auth.dto';
import type { UserDocument } from '../users/schemas/user.schema';
import { GoogleUser } from './strategies/google.strategy';
interface GoogleOAuthRequest extends Request {
    user: GoogleUser;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<AuthResponse>;
    signin(signinDto: SigninDto): Promise<AuthResponse>;
    signout(user: UserDocument): Promise<{
        message: string;
    }>;
    refreshAccessToken(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleAuth(): void;
    googleCallback(req: GoogleOAuthRequest, res: Response): void;
}
export {};
