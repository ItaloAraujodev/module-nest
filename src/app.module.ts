import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  controllers: [AppController], // Tudo que tem requisição http
  providers: [AppService, PrismaService], // Tudo que não tem requisição http
})
export class AppModule {}
