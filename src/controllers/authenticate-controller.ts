import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const autheticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AutheticateBodySchema = z.infer<typeof autheticateBodySchema>;

@Controller("/sessions")
@UsePipes(new ZodValidationPipe(autheticateBodySchema))
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body() body: AutheticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User not found");
    }

    const acessToken = this.jwt.sign({ sub: user.id });

    return {
      acessToken,
    };
  }
}
