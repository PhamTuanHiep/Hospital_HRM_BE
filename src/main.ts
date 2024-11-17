declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  app.enableCors({
    // origin: 'http://localhost:5173', // Địa chỉ frontend
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Nếu bạn cần gửi cookie hoặc thông tin xác thực
  });
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
