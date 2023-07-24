import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

async function dbConnector(fastify) {
  // Setup the mongodb connection
  fastify.register(fastifyMongo, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    url: fastify.config.MONGO_URL,
  });

  fastify.log.info("Connected to database.");
}

export default fastifyPlugin(dbConnector);
