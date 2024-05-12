import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/dotenv-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(envs.PORT);
}
bootstrap();
