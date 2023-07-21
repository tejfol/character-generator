import CharacterService from "../services/character.service.js";

import fs from "fs";
import util from "util";
import { pipeline } from "stream";

const pump = util.promisify(pipeline);

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
    const { name, sex, realm, type, personality, motto } = req.body;

    if (await CharacterService.checkIfExists(collection, name.value)) {
      res.statusCode = 409;

      throw new Error("Character with this name already exists.");
    }

    // upload and save the file
    await pump(
      req.body.avatar.toBuffer(),
      fs.createWriteStream(`./uploads/${req.body.avatar.filename}`)
    );

    res.statusCode = 201;

    // Must change /static/${req.body.avatar.filename} for uuid or something
    try {
      await CharacterService.createCharacter(collection, {
        avatar: `/static/${req.body.avatar.filename}`,
        name: name.value,
        sex: sex.value,
        realm: realm.value,
        type: type.value,
        personality: personality.value,
        motto: motto.value,
      });

      return { status: "Successfully created" };
    } catch (error) {
      console.error(error);
      return error;
    }
  });

  /**
   * ✦ Create a character
   *
   */
  fastify.delete("/character/:id", async (req, res) => {
    const { id } = req.params;

    console.log(`delete with id: ${id}`);

    try {
      await CharacterService.deleteCharacter(collection, id);
    } catch (error) {
      throw new Error(error);
    }

    res.send({ "Successfully delete": id });
  });
}

export default routes;
