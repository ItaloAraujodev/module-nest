import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["warn", "error"],
    }); // Chama o construtor da classe pai (PrismaClient)
  }

  // Importante fazer a conexão e desconexão do banco de dados no início e no fim do módulo
  onModuleInit() {
    return this.$connect(); // Quando o módulo for inicializado, conecta ao banco de dados
  }

  onModuleDestroy() {
    return this.$disconnect(); // Quando o módulo for destruído, desconecta do banco de dados
  }
}
