import { RequestHandler } from "express";
import { date } from "zod";
import prisma from "../prisma/db_connection";

//deve ritornare su una webpage la tabella con tutti i dati
export const getReport: RequestHandler = async (req, res) => {
  const lastInjuryDate = await prisma.injury.groupBy({
    by: ["factoryId"],
    _max: { date: true },
  });

  const factory = await prisma.factory.findMany();

  const result = lastInjuryDate.map((element) => ({
    factory: factory.find((factory) => factory.id === element.factoryId),
    lastInjuryDate: element._max.date,
  }));
  res.json(result);
};
