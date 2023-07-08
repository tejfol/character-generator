import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  // Setup the mongodb connection
  fastify.register(fastifyMongo, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    url: fastify.config.MONGO_URL,
  });
}

export default fastifyPlugin(dbConnector);
