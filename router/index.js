/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("characters");

  fastify.get("/", async (req, res) => {
    const insert = await collection.insertOne({
      avatar: "https://w.wallhaven.cc/full/1p/wallhaven-1prmmv.jpg",
      name: "Hosho Marine",
      sex: "female",
      realm: "Humans",
      type: "waifu",
      personality: "",
      motto: "Dream, explore, discover",
    });

    const result = await collection.find().toArray();

    if (result.length === 0) {
      throw new Error("No documents found");
    }

    return result;
  });
}

export default routes;
