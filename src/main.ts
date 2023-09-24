import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configuration';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerConfig, Logger, validationPipeOptions } from './utils';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: Logger.logger,
  });
  app.use(
    compression({
      level: 9,
      memLevel: 9,
      chunkSize: 16 * 1024,
    }),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SwaggerConfig.title)
    .setDescription(SwaggerConfig.description)
    .setVersion(SwaggerConfig.version)
    .setTermsOfService(SwaggerConfig.termsOfService)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(config().port);
}
bootstrap();
