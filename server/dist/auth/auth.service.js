"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const password_service_1 = require("./services/password.service");
const token_service_1 = require("./services/token.service");
let AuthService = class AuthService {
    usersService;
    passwordService;
    tokenService;
    configService;
    constructor(usersService, passwordService, tokenService, configService) {
        this.usersService = usersService;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    async signup(createUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
        const user = await this.usersService.createUser({
            ...createUserDto,
            password: hashedPassword,
        });
        const tokens = await this.tokenService.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async signin(signinDto) {
        const user = await this.usersService.findByEmail(signinDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        const isPasswordValid = await this.passwordService.verifyPassword(signinDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.tokenService.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        await this.usersService.updateLastLogin(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async signout(userId) {
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        await this.usersService.updateRefreshToken(userId, null);
        return { message: 'Successfully signed out' };
    }
    async refreshAccessToken(refreshToken) {
        let payload;
        try {
            payload = await this.tokenService.verifyRefreshToken(refreshToken);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.usersService.getUserById(payload.sub);
        if (!user || !user.refreshToken) {
            throw new common_1.UnauthorizedException('Access denied');
        }
        if (user.refreshToken !== refreshToken) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.tokenService.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user &&
            (await this.passwordService.verifyPassword(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async validateOAuthUser(email, name) {
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            user = await this.usersService.createUser({
                email,
                name,
                password: '',
                phoneNumber: undefined,
            });
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        if (!user.isEmailVerified) {
            await this.usersService.updateEmailVerification(user.id, true);
        }
        const tokens = await this.tokenService.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        await this.usersService.updateLastLogin(user.id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            role: user.role,
            isEmailVerified: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    getFrontendUrl() {
        return this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        password_service_1.PasswordService,
        token_service_1.TokenService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map