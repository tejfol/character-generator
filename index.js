import Fastify from "fastify";
import fastifyEnv from "@fastify/env";

import router from "./router/index.js";

import { options } from "./config/config.js";
import dbConnector from "./config/db-connector.js";

const fastify = Fastify({
  logger: true,
});

// Register dotenv
fastify.register(fastifyEnv, options).ready((err) => {
  if (err) console.error(err);
});
await fastify.after();

fastify.register(dbConnector);
fastify.register(router);

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: fastify.config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
