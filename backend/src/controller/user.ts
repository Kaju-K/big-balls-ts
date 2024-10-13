import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, LoginUser, TokenDataUser, User } from "../types/user.js";
import { user } from "../models/user.js";
import { saltRounds } from "../globals/authentication.js";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import jwt from "jsonwebtoken";

export async function createUser(req: FastifyRequest<{ Body: CreateUser }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await user.create(fastify.prisma, { username, email, password: hashedPassword });

    // TODO: add email for user validation
    return { success: true };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return reply.code(400).send({ success: false, message: "One of the fields already exist", error: err.meta?.target });
    }

    return reply.code(400).send({ success: false, message: "An unexpected error occured." });
  }
}

export async function loginUser(req: FastifyRequest<{ Body: LoginUser }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { email, password } = req.body;

  try {
    const userFound = await user.findOne(fastify.prisma, { email });
    if (!userFound) {
      return reply.code(400).send({ success: false, message: "Email is incorrect", isUserFound: false });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return reply.code(400).send({ success: false, message: "Wrong Password", isPasswordRight: false });
    }

    const tokenData: TokenDataUser = {
      username: userFound.username,
      email: userFound.email
    };

    if (userFound.chearingteamId) {
      tokenData.chearingteamId = userFound.chearingteamId;
    }

    const tokenSecret = process.env.TOKEN_SECRET as string;

    const token = jwt.sign(tokenData, tokenSecret, { expiresIn: "5 days", subject: "test" });

    return reply.code(200).send({ success: true, token });
  } catch (err) {
    console.log(err);

    if (err instanceof PrismaClientKnownRequestError) {
      return reply.code(400).send({ success: false, message: "User does not exist" });
    }

    return reply.code(400).send({ success: false, message: "An unexpected error occured." });
  }
}
