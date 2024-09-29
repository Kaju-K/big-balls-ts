import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUser, FindUser } from "../types/user";
import { RequireAtLeastOne } from "../types/general";

export const user = {
  async create(prisma: PrismaClient, { username, email, password }: CreateUser) {
    const user = await prisma.user.create({ data: { username, email, password } });
    return user;
  },

  async findOne(prisma: PrismaClient, search: RequireAtLeastOne<FindUser>) {
    const user = await prisma.user.findUnique({ where: search });
    return user;
  }
};
