import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler";
import * as validation from "../validation/auth";
import prisma from "../db_connection";
import cookie from "cookie";

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

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });

  const refreshTokenCookie = cookie.serialize("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 giorni
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshTokenCookie);

  res.status(200).json({
    message: "Accesso consentito",
    token: accessToken,
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

export const refreshToken: RequestHandler = asyncHandler(async (req, res) => {
  const result = validation.refreshBody.safeParse(req.body);
  const oldRefreshToken = req.cookies.refreshToken;
  if (!result.success || !oldRefreshToken) {
    return res.status(401).json({ message: "Token mancanti" });
  }

  const { accessToken } = result.data;

  const { refreshToken } = cookie.parse(oldRefreshToken);

  let payload: any = null;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_SECRET!);
  } catch (err) {
    return res.status(401).json({ message: "Autenticazione scaduta" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Utente inesistente" });
  }

  const newAccessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );

  return res.json({
    message: "Accesso consentito",
    accessToken: newAccessToken,
  });
});

export const logout: RequestHandler = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");

  return res.json({
    message: "Logout effettuato",
  });
});
