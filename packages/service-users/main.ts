import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from '@my-project/service-users/app.module';

declare const module: any;

async function bootstrap() {
  const options = {
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? +process.env.PORT : 20001
  };
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options
  });

  await microservice.listenAsync();
  console.log(`Application is running at tcp://${options.host}:${options.port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => microservice.close());
  }
}

bootstrap();
