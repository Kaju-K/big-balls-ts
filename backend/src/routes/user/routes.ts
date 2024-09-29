import { FastifyInstance } from "fastify";
import { CreateUser } from "../../types/user.js";
import { createUserSchemaBody } from "../../schemas/user.js";
import { createUser } from "../../controller/user.js";

const createUserSchema = { body: createUserSchemaBody };

async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateUser }>("/create-user", { schema: createUserSchema }, async (req, reply) => {
    return createUser(req, reply, fastify);
  });
}

export default routes;
