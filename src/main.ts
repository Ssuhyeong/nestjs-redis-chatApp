import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { RedisIoAdapter } from './adapters/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.SERVER_PORT) || 3000;

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  const logger = new Logger('Main');

  app.enableCors({ origin: true });
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(PORT, () => {
    logger.debug(`Server started on port ${PORT}`);
  });
}
bootstrap();
