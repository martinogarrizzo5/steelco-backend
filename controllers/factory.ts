import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";

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

  const factory = await prisma.factory.create({
    data: { address: factoryAddress, name: factoryName },
  });
  return res.json();
};

export const updateFactory: RequestHandler = async (req, res) => {
  const factoryAddress = req.body.address;
  const factoryName = req.body.name;

  const factory = await prisma.factory.update({
    where: { id: +req.params.id },
    data: { address: factoryAddress, name: factoryName },
  });
  return res.json();
};

export const deleteFactory: RequestHandler = async (req, res) => {
  const factoryId = +req.params.id;

  const factory = await prisma.factory.delete({
    where: { id: factoryId },
  });
  return res.json();
};
