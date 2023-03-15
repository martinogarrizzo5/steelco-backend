import { RequestHandler } from "express";

const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Login required" });
  }
  next();
};
