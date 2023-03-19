import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler";
import * as validation from "../validation/auth";
import prisma from "../prisma/db_connection";

export const login = asyncHandler(async (req, res, next) => {
  const result = validation.loginBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Parametri invalidi o mancanti" });
  }

  const { username, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user || password !== user.password) {
    return res.status(401).json({ message: "Credenziali invalide" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.status(200).json({
    message: "Accesso consentito",
    token: token,
  });
});

export const getUser: RequestHandler = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Nessun utente loggato" });
  }
  const user = req.user;

  return res.json({
    message: "Accesso consentito",
    user: {
      id: user.id,
      username: user.username,
    },
  });
});
