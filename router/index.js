import CharacterService from "../services/character.service.js";

import fs from "fs";
import util from "util";
import { pipeline } from "stream";

const pump = util.promisify(pipeline);

async function characterRouters(fastify) {
  const collection = fastify.mongo.db.collection("characters");

  //✦ Get the list of characters
  // TODO: With pagination
  fastify.get("/", async (req, res) => {
    return await CharacterService.getAllCharacters(collection);
  });

  fastify.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      return await CharacterService.getCharacter(collection, id);
    } catch (error) {
      console.error(error);
    }
  });

  /**
   * ✦ Create a character
   */
  fastify.post("/create", async (req, res) => {
    const { avatar, name, sex, realm, type, personality, motto } = req.body;

    if (await CharacterService.checkIfExists(collection, name.value)) {
      res.statusCode = 404;

      throw new Error("Character with this name already exists.");
    }

    // upload and save the file
    await pump(
      avatar.toBuffer(),
      fs.createWriteStream(`./uploads/${avatar.filename}`)
    );

    res.statusCode = 201;

    // Must change /static/${req.body.avatar.filename} for uuid or something
    try {
      await CharacterService.createCharacter(collection, {
        avatar: `/static/${avatar.filename}`,
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
      return { error };
    }
  });

  /**
   * ✦ Create a character
   *
   */
  fastify.delete("/:id", async (req, res) => {
    const { id } = req.params;

    console.log(`delete with id: ${id}`);

    try {
      const { avatar } = await CharacterService.getCharacter(collection, id);

      const fileName = avatar.replace(/\/static\//, "");

      fs.unlink(`./uploads/${fileName}`, (err) => {
        if (err) {
          console.log("Error deleting image file:", err);
        } else {
          console.log("Image file deleted successfully.");
        }
      });

      await CharacterService.deleteCharacter(collection, id);
    } catch (error) {
      throw new Error(error);
    }

    res.send({ "Successfully delete": id });
  });

  fastify.log.info("Character routes registered.");
}

export default characterRouters;
