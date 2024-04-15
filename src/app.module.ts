import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./controllers/create-account.controller";

@Module({
  controllers: [CreateAccountController], // Tudo que tem requisição http
  providers: [PrismaService], // Tudo que não tem requisição http
})
export class AppModule {}
