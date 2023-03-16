import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import prisma from "../prisma/db_connection";

const isAuth: RequestHandler = asyncHandler(async (req, res, next) => {
  const bearerToken = req.get("Authorization");

  if (!bearerToken) {
    return res.status(400).json({ message: "Bearer token mancante" });
  }

  const [bearerString, token] = bearerToken.split(" ");

  if (bearerString !== "Bearer") {
    return res.status(400).json({ message: "Bearer token richiesto" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return res.status(401).json({ message: "Token invalido" });
  }

  const userId = (<jwt.JwtPayload>decodedToken).userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Utente inesistente" });
  }

  req.user = user;
  next();
});

export default isAuth;
