import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './platform/swagger/setup-swagger.util';
import { ConsoleLogger } from '@nestjs/common';
import { patchNestJsSwagger } from 'nestjs-zod';

// patch in support for zod schema
patchNestJsSwagger();

const bootstrap = async () => {
  const logger = new ConsoleLogger('app');

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5174'],
    },
  });

  setupSwagger({
    title: 'MonoSar API',
    description: "Backend for Mono County Sheriff's Search and Rescue",
    app,
    apiPath: 'api',
    localPath: 'openapi.json',
    logger,
    modules: [AppModule],
  });

  await app.listen(8080);
};
bootstrap();
