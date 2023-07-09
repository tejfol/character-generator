class CharacterService {
  static async getAllCharacters(collection) {
    const results = await collection.find().toArray();

    if (results.length === 0) {
      throw new Error("No documents found");
    }

    return { list: results };
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
    return await collection.insertOne(payload);
  }

  /**
   * Check if a character exists
   * @returns {Promise} Promise object represents the existence of a character in the database.
   */
  static async checkIfExists(collection, name) {
    return (await collection.findOne({ name })) ? true : false;
  }
}

export default CharacterService;
