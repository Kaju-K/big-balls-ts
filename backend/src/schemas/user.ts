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

export const refreshTokenSchemaBody = {
  type: "object",
  required: ["refreshToken"],
  properties: {
    refreshToken: { type: "string" }
  }
};

export const sessionSchemaHeaders = {
  type: "object",
  properties: {
    authorization: { type: "string" }
  }
};
