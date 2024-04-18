import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Fetch recent question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test("[GET]/questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "JohnnnDoe",
        email: "Jhonnn@gmail.com",
        password: "123456",
      },
    });
    const acessToken = jwt.sign({ sub: user.id });

    await prisma.question.createMany({
      data: [
        {
          title: "New Questions",
          content: "Question content",
          slug: "new-questions 0",
          authorId: user.id,
        },
        {
          title: "New Questions 2",
          content: "Question content",
          slug: "new-questions 2",
          authorId: user.id,
        },
        {
          title: "New Questions 3",
          content: "Question content",
          slug: "new-questions 3",
          authorId: user.id,
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get("/questions")
      .set("Authorization", `Bearer ${acessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: "New Questions" }),
        expect.objectContaining({ title: "New Questions 2" }),
        expect.objectContaining({ title: "New Questions 3" }),
      ],
    });
  });
});
