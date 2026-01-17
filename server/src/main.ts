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
          'https://your-domain.vercel.app',
        ]
      : [
          'http://localhost:3000',
          'http://localhost:3001',
        ],
    credentials: true,
  });

  // Trust proxy (for Railway/Render)
  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);


  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
