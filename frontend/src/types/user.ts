export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  chearingteamId: number | null;
}

export type CreateUserFetch = Pick<User, "username" | "email" | "password">;

export type CreateUserForm = Pick<User, "username" | "email" | "password"> & {
  repeatedPassword: string;
};
