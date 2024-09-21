// import { join } from "path";
import fastify, { FastifyInstance } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const start = async () => {
  const app: FastifyInstance = fastify({ logger: true });

  // loading all routes with prefix "/api" and following the folder structer:
  // if in folder ./routes/authenticantion => url: api.domain.com/api/authentication
  app.register(fastifyAutoload, { dir: join(__dirname, "routes"), options: { prefix: "/api" } });

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
