import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, // Desabilita o logger padrão do NestJS, pq mais pra frente vai ficar muito logger no console
  });
  await app.listen(3333);
}
bootstrap();
