import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import * as validations from "../validations/injurie";

export const getInjuries: RequestHandler = async (req, res) => {
  const injuries = await prisma.injury.findMany({ orderBy: { date: "asc" } });
  return res.json(injuries);
};

export const getInjurieById: RequestHandler = async (req, res) => {
  const result = validations.getInjurieId.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  const injurie = await prisma.injury.findUnique({ where: { id: +id } });
  return res.json(injurie);
};

export const addInjurie: RequestHandler = async (req, res) => {
  const result = validations.getSomeInjurieData.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { date, description, factoryId } = result.data;

  await prisma.injury.create({
    data: {
      date: new Date(date),
      description: description,
      factoryId: factoryId,
    },
  });

  return res.status(201).json({ message: "Infortunio aggiunto con successo" });
};

export const updateInjurie: RequestHandler = async (req, res) => {
  const result = validations.getSomeInjurieData.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { date, description, factoryId } = result.data;
  const id = req.params.id;

  await prisma.injury.update({
    where: { id: +id },
    data: {
      date: new Date(date),
      description: description,
      factoryId: factoryId,
    },
  });

  return res.json({ message: "Infortunio aggiornato con successo" });
};

export const deleteInjurie: RequestHandler = async (req, res) => {
  const result = validations.getInjurieId.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  await prisma.injury.delete({ where: { id: +id } });

  return res.json({ message: "Infortunio eliminato con successo" });
};
