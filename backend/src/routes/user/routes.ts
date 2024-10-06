import { FastifyInstance } from "fastify";
import { CreateUser, LoginUser } from "../../types/user.js";
import { createUserSchemaBody, loginUserSchemaBody } from "../../schemas/user.js";
import { createUser, loginUser } from "../../controller/user.js";

const createUserSchema = { body: createUserSchemaBody };
const loginUserSchema = { body: loginUserSchemaBody };

async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateUser }>("/create-user", { schema: createUserSchema }, async (req, reply) => {
    return createUser(req, reply, fastify);
  });

  fastify.post<{ Body: LoginUser }>("/login", { schema: loginUserSchema }, async (req, reply) => {
    return loginUser(req, reply, fastify);
  });
}

export default routes;
