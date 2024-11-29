import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ?? 연산자: 좌항이 null이나 undefined일 대만 우항을 반환하고, 그 외의 falsy 값에 대해서는 좌항 그대로 반환함
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
