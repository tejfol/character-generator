import Fastify from "fastify";
import fastifyEnv from "@fastify/env";

import router from "./router/index.js";

import { options } from "./config/config.js";
import dbConnector from "./config/db-connector.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

// Register dotenv
fastify.register(fastifyEnv, options).ready((err) => {
  if (err) console.error(err);
});
await fastify.after();

fastify.register(import("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/static/",
});

fastify.register(import("@fastify/cors"), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});
fastify.register(import("@fastify/multipart"), {
  attachFieldsToBody: true,
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fileSize: 1000000, // For multipart forms, the max file size in bytes
  },
});
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
