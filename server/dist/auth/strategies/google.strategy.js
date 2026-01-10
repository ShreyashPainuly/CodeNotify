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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    configService;
    authService;
    constructor(configService, authService) {
        const clientID = configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
        super({
            clientID: clientID || 'not-configured',
            clientSecret: clientSecret || 'not-configured',
            callbackURL: configService.get('GOOGLE_CALLBACK_URL', '/auth/google/callback'),
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
        this.configService = configService;
        this.authService = authService;
        if (!clientID || !clientSecret) {
            console.warn('⚠️  Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables to enable Google sign-in.');
        }
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const { emails, name, photos } = profile;
            if (!emails || emails.length === 0) {
                return done(new common_1.UnauthorizedException('No email found from Google'), false);
            }
            const email = emails[0].value;
            const userName = name?.givenName && name?.familyName
                ? `${name.givenName} ${name.familyName}`
                : 'Google User';
            const picture = photos && photos.length > 0 ? photos[0].value : undefined;
            const user = (await this.authService.validateOAuthUser(email, userName));
            const googleUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                picture,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            };
            done(null, googleUser);
        }
        catch (error) {
            done(error instanceof Error ? error : new Error(String(error)), false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map