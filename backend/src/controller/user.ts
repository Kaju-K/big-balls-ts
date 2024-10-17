import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, LoginUser, AccessTokenDataUser, RefreshTokenReq } from "../types/user.js";
import { user } from "../models/user.js";
import { saltRounds } from "../globals/authentication.js";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  getTokenFromHeaders,
  validateAccessToken,
  validateRefreshToken
} from "../services/authService.js";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export async function createUser(req: FastifyRequest<{ Body: CreateUser }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await user.create(fastify.prisma, { username, email, password: hashedPassword });

    // TODO: add email for user validation
    return { success: true };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return reply.code(400).send({ success: false, message: "One of the fields already exist", error: err.meta?.target });
    }

    return reply.code(400).send({ success: false, message: "An unexpected error occured." });
  }
}

export async function loginUser(req: FastifyRequest<{ Body: LoginUser }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { email, password } = req.body;

  try {
    const userFound = await user.findOne(fastify.prisma, { email });
    if (!userFound) {
      return reply.code(400).send({ success: false, message: "Email is incorrect", isUserFound: false });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return reply.code(400).send({ success: false, message: "Wrong Password", isPasswordWrong: true });
    }

    const accessTokenData: AccessTokenDataUser = {
      username: userFound.username,
      email: userFound.email
    };

    if (userFound.chearingteamId) {
      accessTokenData.chearingteamId = userFound.chearingteamId;
    }

    const accessToken = generateAccessToken(accessTokenData, userFound);
    const refreshToken = generateRefreshToken(userFound);

    const userInfo = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email
    };

    return reply.code(200).send({ success: true, accessToken, refreshToken, userInfo });
  } catch (err) {
    console.log(err);

    if (err instanceof PrismaClientKnownRequestError) {
      return reply.code(400).send({ success: false, message: "User does not exist", isUserFound: false });
    }

    return reply.code(400).send({ success: false, message: "An unexpected error occured." });
  }
}

export async function refreshToken(req: FastifyRequest<{ Body: RefreshTokenReq }>, reply: FastifyReply, fastify: FastifyInstance) {
  const { refreshToken } = req.body;
  try {
    const { sub } = validateRefreshToken(refreshToken);
    if (!sub) {
      throw new Error("Invalid Token");
    }

    const userFound = await user.findOne(fastify.prisma, { id: Number(sub) });
    if (!userFound) {
      return reply.code(400).send({ success: false, isUserFound: false });
    }

    const accessTokenData: AccessTokenDataUser = {
      username: userFound.username,
      email: userFound.email
    };

    if (userFound.chearingteamId) {
      accessTokenData.chearingteamId = userFound.chearingteamId;
    }

    const newAccessToken = generateAccessToken(accessTokenData, userFound);
    const newRefreshToken = generateRefreshToken(userFound);

    return reply.code(200).send({ success: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch {
    return reply.code(400).send({ success: false, isTokenValid: false });
  }
}

export async function getSession(req: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
  const accessToken = getTokenFromHeaders(req);
  if (!accessToken) {
    return reply.code(400).send({ success: false, isTokenNeeded: true });
  }

  try {
    const validatedToken = validateAccessToken(accessToken);

    if (typeof validatedToken !== "string" && validatedToken.email) {
      const email = validatedToken.email;
      const userFound = await user.findOne(fastify.prisma, { email });
      if (!userFound) {
        return reply.code(400).send({ success: false, isUserFound: false });
      }
      // TODO: add chearing team aswell if found on user, see this link to return with the name of the team already instead of id
      // https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
      return reply.code(200).send({ success: true, isUserFound: true, email: userFound.email, username: userFound.username });
    }

    return reply.code(400).send({ success: false, isTokenValid: false, isTokenNeeded: true });
  } catch {
    return reply.code(400).send({ success: false, isTokenValid: false, isTokenNeeded: true });
  }
}
