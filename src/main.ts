import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://xdtsxklg:wNcUIVNIbbBzqfhUnQKDQkVS_E84DUDR@cattle.rmq2.cloudamqp.com/xdtsxklg',
        ],
        queue: 'notification_queue',
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
}

async function bootstrap2() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 4005).then(() => {
    console.log('listent at ', process.env.PORT || 4005);
  });
}
bootstrap2();

bootstrap();
