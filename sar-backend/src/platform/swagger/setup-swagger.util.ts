import { writeFileSync } from 'fs';
import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

// eslint-disable-next-line @typescript-eslint/ban-types
type NestModule = Function;

type Params = {
  title: string;
  description: string;
  app: INestApplication;
  apiPath: string;
  localPath: `${string}.json`;
  modules: NestModule[];
  logger: ConsoleLogger;
};

export const setupSwagger = ({
  title,
  description,
  app,
  apiPath,
  localPath,
  modules,
  logger,
}: Params) => {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion('')
      .addBearerAuth()
      .addServer('http://localhost:8080')
      .build(),
    {
      include: modules,

      // apparently deep only means uno mas
      deepScanRoutes: true,
    },
  );
  SwaggerModule.setup(apiPath, app, document, {
    customSiteTitle: 'MonoSar API',
    customfavIcon: '/favicon.ico',

    // These are trashed with `!important` because the theme CSS abuses it
    customCss: `
      @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
      ${new SwaggerTheme('v3').getDefaultConfig('dark').customCss}
      html, body, .swagger-ui .scheme-container {
        background-color: black !important; 
        font-family: "Montserrat", sans-serif !important;
      }
      .opblock-tag *, .info *:not(code) { 
        font-family: "Montserrat" !important;
      }
      .swagger-ui .topbar { display: none }
    `,
  });

  // Write to disk if we are running codegen
  writeFileSync(localPath, JSON.stringify(document));
  logger.log(`Generated ${localPath}`);
};
