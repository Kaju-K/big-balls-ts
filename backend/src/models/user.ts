import { PrismaClient } from "@prisma/client";
import { CreateUser, FindUser, User } from "../types/user";
import { RequireAtLeastOne } from "../types/general";

export const user = {
  async create(prisma: PrismaClient, { username, email, password }: CreateUser) {
    const user = await prisma.user.create({ data: { username, email, password } });
    return user;
  },

  async findOne(prisma: PrismaClient, search: RequireAtLeastOne<FindUser>, select = {}) {
    const user = await prisma.user.findUnique({ where: search, select: Object.keys(select).length ? select : undefined });
    return user;
  }
};
