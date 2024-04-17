import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, // Desabilita o logger padrão do NestJS, pq mais pra frente vai ficar muito logger no console
  });
  const configService: ConfigService<Env, true> = app.get(ConfigService); // Pega o serviço de configuração
  const port = configService.get("PORT", { infer: true }); // Pega a porta do arquivo .env
  await app.listen(port);
}
bootstrap();
