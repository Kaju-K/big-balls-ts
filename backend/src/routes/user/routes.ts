import { FastifyInstance } from "fastify";
import { CreateUser, LoginUser, RefreshTokenReq } from "../../types/user.js";
import { createUserSchemaBody, loginUserSchemaBody, refreshTokenSchemaBody, sessionSchemaHeaders } from "../../schemas/user.js";
import { createUser, getSession, loginUser, refreshToken } from "../../controller/user.js";

const createUserSchema = { body: createUserSchemaBody };
const loginUserSchema = { body: loginUserSchemaBody };
const refreshTokenSchema = { body: refreshTokenSchemaBody };
const sessionSchema = { headers: sessionSchemaHeaders };

async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateUser }>("/create-user", { schema: createUserSchema }, async (req, reply) => {
    return createUser(req, reply, fastify);
  });

  fastify.post<{ Body: LoginUser }>("/login", { schema: loginUserSchema }, async (req, reply) => {
    return loginUser(req, reply, fastify);
  });

  fastify.post<{ Body: RefreshTokenReq }>("/refreshToken", { schema: refreshTokenSchema }, async (req, reply) => {
    return refreshToken(req, reply, fastify);
  });

  fastify.get("/get-session", { schema: sessionSchema }, async (req, reply) => {
    return getSession(req, reply, fastify);
  });
}

export default routes;
