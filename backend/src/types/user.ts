export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  chearingteamId: number | null;
}

export type CreateUser = Pick<User, "username" | "email" | "password">;

export type LoginUser = Pick<User, "email" | "password">;

export type FindUser = Pick<User, "id" | "username" | "email">;

export type TokenDataUser = Pick<User, "username" | "email"> & Partial<Pick<User, "chearingteamId">>;
