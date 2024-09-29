import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, User } from "../types/user.js";
import { user } from "../models/user.js";
import { saltRounds } from "../globals/authentication.js";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export async function createUser(req: FastifyRequest<{ Body: CreateUser }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await user.create(fastify.prisma, { username, email, password: hashedPassword });

    return { success: true };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return reply.code(400).send({ success: false, message: "One of the fields already exist", error: err.meta?.target });
    }

    return reply.code(400).send({ success: false, message: "An unexpected error occured." });
  }
}
