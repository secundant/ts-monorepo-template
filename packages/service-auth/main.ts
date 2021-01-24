import { NestFactory } from '@nestjs/core';
import { AppModule } from '@my-project/service-auth/app.module';

declare const module: any;

async function bootstrap() {
  const options = {
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? +process.env.PORT : 20001
  };
  const app = await NestFactory.create(AppModule);

  await app.listen(options.port, options.host);
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
