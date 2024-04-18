// Esse arquivo por se tratar de ser do vitest e não do nest, tem que instalar o dotenv
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import "dotenv/config";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }
  const url = new URL(process.env.DATABASE_URL); // Pega a url do banco de dados e transforma em um objeto

  url.searchParams.set("schema", schemaId); // Pegar o final da url que é o schema, e troca pelo schemaId. Trocando o valor do schema pelo schemaId que é único, não precisa criar um banco de dados

  return url.toString(); // Retorna a url completa em string
}
const schemaId = randomUUID();

// Antes de todos os testes
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl(schemaId);
  process.env.DATABASE_URL = databaseUrl; // Sobre escreve a variável de ambiente DATABASE_URL com a url gerada

  execSync("npx prisma db push"); // migrate deploy roda só as migrações que ainda não foram rodadas, já o migrate dev vai ler o schema e vai gerar novas migration
});

// Depois de todos os testes
afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
