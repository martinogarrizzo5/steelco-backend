import { RequestHandler } from "express";

export const getInjuries: RequestHandler = async (req, res) => {
  return res.json({ message: "Hello World" });
};
