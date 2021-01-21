import { AppModule } from '@my-project/graphql/app.module';
import { NestFactory } from '@nestjs/core';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
