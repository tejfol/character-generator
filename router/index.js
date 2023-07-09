import CharacterService from "../services/character.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("characters");

  //✦ Get all the created characters
  fastify.get("/", async (req, res) => {
    return await CharacterService.getAllCharacters(collection);
  });

  /**
   * ✦ Create a character
   *
   */
  fastify.post("/create", async (req, res) => {
    const { avatar, name, sex, realm, type, personality, motto } = req.body;

    if (await CharacterService.checkIfExists(collection, name)) {
      res.statusCode = 409;

      throw new Error("Character with this name already exists.");
    }

    res.statusCode = 201;
    return await CharacterService.createCharacter(collection, {
      avatar,
      name,
      sex,
      realm,
      type,
      personality,
      motto,
    });
  });
}

export default routes;
