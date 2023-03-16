import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import * as validation from "../validation/factory";

export const getFactories: RequestHandler = async (req, res) => {
  const data = await prisma.factory.findMany({ orderBy: { name: "asc" } });
  return res.json(data);
};

export const getFactoryById: RequestHandler = async (req, res) => {
  const result = validation.getByIdParams.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  const factory = await prisma.factory.findUnique({
    where: { id: id },
    include: { _count: { select: { injuries: true } } },
  });
  return res.json(factory);
};

export const createFactory: RequestHandler = async (req, res) => {
  const result = validation.postBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { address, name } = result.data;

  await prisma.factory.create({
    data: { address: address, name: name },
  });

  return res
    .status(201)
    .json({ message: "Stabilimento aggiunto con successo" });
};

export const updateFactory: RequestHandler = async (req, res) => {
  const bodyResult = validation.putBody.safeParse(req.body);
  const paramsResult = validation.putParams.safeParse(req.params);

  if (!bodyResult.success || !paramsResult.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { address, name } = bodyResult.data;
  const { id } = paramsResult.data;

  await prisma.factory.update({
    where: { id: id },
    data: { address: address, name: name },
  });

  return res.json({ message: "Stabilimento aggiornato con successo" });
};

export const deleteFactory: RequestHandler = async (req, res) => {
  const result = validation.deleteParams.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  await prisma.factory.delete({
    where: { id: id },
  });

  return res.json({ message: "Stabilimento eliminato con successo" });
};
