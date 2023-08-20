import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configuration';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    compression({
      level: 9,
      memLevel: 9,
      chunkSize: 16 * 1024,
    }),
  );
  await app.listen(config().port);
}
bootstrap();
