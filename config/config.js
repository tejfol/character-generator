const schema = {
  type: "object",
  required: ["PORT", "MONGO_URL"],
  properties: {
    NODE_ENV: {
      type: "string",
      default: "development",
    },
    MONGO_URL: {
      type: "string",
      default: "mongodb://localhost:27017/character-generator",
    },
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

export const options = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
};
