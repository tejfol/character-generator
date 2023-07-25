import CharacterService from "../services/character.service.js";

import fs from "fs";

import base64Img from "base64-img";

async function characterRouters(fastify) {
  const collection = fastify.mongo.db.collection("characters");

  //✦ Get the list of characters
  // TODO: With pagination
  fastify.get("/", async (req, res) => {
    const { limit } = req.query;

    return await CharacterService.getAllCharacters(collection, {
      limit: parseInt(limit),
    });
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
  fastify.post("/", async (req, res) => {
    const { avatar, name, sex, realm, type, personality, motto } = req.body;

    if (await CharacterService.checkIfExists(collection, name)) {
      res.statusCode = 404;

      throw new Error("Character with this name already exists.");
    }

    // upload and save the file

    const filePath = new Promise((resolve, reject) => {
      base64Img.img(avatar.image, "./uploads", Date.now(), (err, filepath) => {
        resolve(filepath.split("/")[1]);
      });
    });
    try {
      await CharacterService.createCharacter(collection, {
        avatar: `${await filePath}`,
        name: name.value,
        sex: sex.value,
        realm: realm.value,
        type: type.value,
        personality: personality.value,
        motto: motto.value,
      });

      res.statusCode = 201;

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
