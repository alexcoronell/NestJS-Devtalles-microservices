/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(envs.PREFIX);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Gateway running on port ${envs.PORT}`);
}
bootstrap();
