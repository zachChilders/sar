import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './platform/swagger/setup-swagger.util';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const logger = new ConsoleLogger('app');

  const app = await NestFactory.create(AppModule);

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
}
bootstrap();
