import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";

export const getInjuries: RequestHandler = async (req, res) => {
  const injuries = await prisma.injury.findMany({ orderBy: { date: "asc" } });
  return res.json(injuries);
};

export const getInjurieById: RequestHandler = async (req, res) => {
  const injurieId = req.body.id;

  const injurie = await prisma.injury.findUnique({ where: { id: injurieId } });
  return res.json(injurie);
};

export const addInjurie: RequestHandler = async (req, res) => {
  const InjurieDate = req.body.date;
  const InjurieDescription = req.body.description;
  const factoryId = req.body.id;

  const injuries = await prisma.injury.create({
    data: {
      date: InjurieDate,
      description: InjurieDescription,
      factoryId: factoryId,
    },
  });
  return res.json();
};

export const updateInjurie: RequestHandler = async (req, res) => {
  const InjurieDate = req.body.date;
  const InjurieDescription = req.body.description;
  const InjurieId = req.body.id;

  const injuries = await prisma.injury.update({
    where: { id: InjurieId },
    data: { date: InjurieDate, description: InjurieDescription },
  });
  return res.json();
};

export const deleteInjurie: RequestHandler = async (req, res) => {
  const InjurieDate = req.body.date;
  const InjurieDescription = req.body.description;
  const factoryId = req.body.id;

  return res.json();
};
