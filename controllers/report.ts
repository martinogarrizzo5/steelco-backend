import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import asyncHandler from "../middlewares/asyncHandler";

/* 
  return a list with all factories and the date of the last
  injury on each of them
*/
export const getReport: RequestHandler = asyncHandler(async (req, res) => {
  const factoriesWithLastInjury = await prisma.factory.findMany({
    include: {
      injuries: {
        orderBy: { date: "asc" },
        take: 1,
      },
    },
  });

  const formattedData = factoriesWithLastInjury.map((factory) => ({
    id: factory.id,
    name: factory.name,
    address: factory.address,
    lastInjuryDate: factory.injuries.length ? factory.injuries[0].date : null,
  }));

  res.json(formattedData);
});

//dato un id di uno stabilimento ottenere il numero di infortuni di ogni mese
export const getFactoryHistory: RequestHandler = async (req, res) => {};
