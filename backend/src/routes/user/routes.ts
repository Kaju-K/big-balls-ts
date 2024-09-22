import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/create-user", async (_req, _reply) => {
    return { hello: "world" };
  });
}

export default routes;
