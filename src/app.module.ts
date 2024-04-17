import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./controllers/create-account.controller";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "./controllers/authenticate-controller";
import { CreateQuestionController } from "./controllers/create-question.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // isGlobal: true para que o módulo seja global e não seja necessário importá-lo em outros módulos
    }),
    AuthModule,
  ], // Configuração do dotenv
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
  ], // Tudo que tem requisição http
  providers: [PrismaService], // Tudo que não tem requisição http
})
export class AppModule {}
