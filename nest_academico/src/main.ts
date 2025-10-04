import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './commons/exceptions/filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
//Configuração do CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8001'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
