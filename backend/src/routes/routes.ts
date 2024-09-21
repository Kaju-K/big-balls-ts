import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/test", async (req, reply) => {
    return { hello: "world" };
  });
}

export default routes;
