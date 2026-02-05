"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.NODE_ENV === 'production'
            ? [
                process.env.FRONTEND_URL,
                'https://your-domain.vercel.app',
            ]
            : [
                'http://localhost:3000',
                'http://localhost:3001',
            ],
        credentials: true,
    });
    const server = app.getHttpAdapter().getInstance();
    server.set('trust proxy', 1);
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map