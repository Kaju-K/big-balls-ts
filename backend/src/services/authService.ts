import jwt, { JwtPayload } from "jsonwebtoken";
import { AccessTokenDataUser, User } from "../types/user";
import { FastifyRequest } from "fastify";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

interface ValidatedAccessToken extends JwtPayload {
  email: string;
}

export function getTokenFromHeaders(req: FastifyRequest) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader?.split(" ")[authHeader?.split(" ").length - 1];
  return token;
}

export function generateAccessToken(data: AccessTokenDataUser, userFound: User) {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "30m", subject: userFound.id.toString() });
}

export function generateRefreshToken(userFound: User) {
  return jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: "15 days", subject: userFound.id.toString() });
}

export function validateAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function validateRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
