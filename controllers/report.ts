import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";

/* 
  return a list with all factories and the date of the last
  injury on each of them
*/
export const getReport: RequestHandler = async (req, res) => {
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
};

export const getFactoryHistory: RequestHandler = async (req, res) => {};
