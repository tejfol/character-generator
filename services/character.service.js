import { ObjectId } from "@fastify/mongodb";

class CharacterService {
  static async getAllCharacters(collection, { limit }) {
    return {
      list:
        (await collection
          .find()
          .limit(limit)
          .sort({ createdAt: -1 })
          .toArray()) || [],
    };
  }

  /**
   * Creates a Character
   * @param {Object} payload
   * @param {string} payload.avatar
   * @param {string} payload.name
   * @param {string} payload.sex
   * @param {string} payload.realm
   * @param {string} payload.type
   * @param {string} payload.personality
   * @param {string} payload.motto
   * @returns {Promise} Created and inserted Character object to database.
   */
  static async createCharacter(collection, payload) {
    return await collection.insertOne({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Check if a character exists
   * @returns {Promise} Promise object represents the existence of a character in the database.
   */
  static async checkIfExists(collection, name) {
    return (await collection.findOne({ name })) ? true : false;
  }

  /**
   * Delete a character
   * @returns {Promise} Promise object represents the existence of a character in the database.
   */
  static async deleteCharacter(collection, id) {
    return await collection.deleteOne({
      _id: new ObjectId(id),
    });
  }

  static async getCharacter(collection, id) {
    return await collection.findOne({
      _id: new ObjectId(id),
    });
  }
}

export default CharacterService;
