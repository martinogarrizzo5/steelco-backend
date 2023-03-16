import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import { z } from "zod";

export const getFactories: RequestHandler = async (req, res) => {
  const data = await prisma.factory.findMany({ orderBy: { name: "asc" } });
  return res.json(data);
};

export const getFactoryById: RequestHandler = async (req, res) => {
  const factoryId = req.body.id;

  const factory = await prisma.factory.findUnique({
    where: { id: factoryId },
    include: { _count: { select: { injuries: true } } },
  });
  return res.json(factory);
};

export const addFactory: RequestHandler = async (req, res) => {
  const factoryAddress = req.body.address;
  const factoryName = req.body.name;

  await prisma.factory.create({
    data: { address: factoryAddress, name: factoryName },
  });

  return res
    .status(201)
    .json({ message: "Stabilimento aggiunto con successo" });
};

const updateSchema = z.object({
  address: z.string().min(1),
  name: z.string().min(1),
});

export const updateFactory: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const result = updateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { address, name } = result.data;

  await prisma.factory.update({
    where: { id: +id },
    data: { address: address, name: name },
  });

  return res.json({ message: "Stabilimento aggiornato con successo" });
};

export const deleteFactory: RequestHandler = async (req, res) => {
  const factoryId = +req.params.id;

  const factory = await prisma.factory.delete({
    where: { id: factoryId },
  });

  return res.json();
};
