export const createUserSchemaBody = {
  type: "object",
  required: ["username", "email", "password"],
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string", minLength: 7 }
  }
};

export const loginUserSchemaBody = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: 7 }
  }
};
