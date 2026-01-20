import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Production-ready CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? [
          process.env.FRONTEND_URL,
          'https://code-notify-woad.vercel.app', // Your actual Vercel URL
          'https://*.vercel.app', // Allow all Vercel preview deployments
        ]
      : [
          'http://localhost:3000',
          'http://localhost:3001',
        ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Trust proxy (for Railway/Render)
  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);


  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
