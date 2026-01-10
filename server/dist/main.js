"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const nestjs_zod_1 = require("nestjs-zod");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3000',
            'https://code-notify.vercel.app',
        ],
        credentials: true,
    });
    app.useGlobalPipes(new nestjs_zod_1.ZodValidationPipe());
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap().catch((err) => {
    console.error('Error starting application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map