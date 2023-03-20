import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import * as validation from "../validation/injury";
import asyncHandler from "../middlewares/asyncHandler";

export const getInjuries: RequestHandler = asyncHandler(async (req, res) => {
  const result = validation.getAllQuery.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { factoryId } = result.data;

  const injuries = await prisma.injury.findMany({
    orderBy: { date: "asc" },
    where: { factoryId: factoryId },
  });

  return res.json(injuries);
});

export const getInjurieById: RequestHandler = asyncHandler(async (req, res) => {
  const result = validation.getByIdParams.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  const injurie = await prisma.injury.findUnique({ where: { id: id } });
  if (!injurie) {
    return res.status(404).json({ message: "Infortunio non trovato" });
  }

  return res.json(injurie);
});

export const addInjurie: RequestHandler = asyncHandler(async (req, res) => {
  const result = validation.postBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { date, description, factoryId } = result.data;

  await prisma.injury.create({
    data: {
      date: date,
      description: description,
      factoryId: factoryId,
    },
  });

  return res.status(201).json({ message: "Infortunio aggiunto con successo" });
});

export const updateInjurie: RequestHandler = asyncHandler(async (req, res) => {
  const bodyResult = validation.putBody.safeParse(req.body);
  const paramsResult = validation.putParams.safeParse(req.params);

  if (!bodyResult.success || !paramsResult.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { date, description, factoryId } = bodyResult.data;
  const { id } = paramsResult.data;

  await prisma.injury.update({
    where: { id: id },
    data: {
      date: date,
      description: description,
      factoryId: factoryId,
    },
  });

  return res.json({ message: "Infortunio aggiornato con successo" });
});

export const deleteInjurie: RequestHandler = asyncHandler(async (req, res) => {
  const result = validation.deleteParams.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ message: "Valori inseriti invalidi" });
  }

  const { id } = result.data;

  await prisma.injury.delete({ where: { id: id } });

  return res.json({ message: "Infortunio eliminato con successo" });
});
