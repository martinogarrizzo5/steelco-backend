import { RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import asyncHandler from "../middlewares/asyncHandler";
import * as validation from "../validation/report";

/* 
  return a list with all factories and the date of the last
  injury on each of them
*/
export const getReport: RequestHandler = asyncHandler(async (req, res) => {
  const factoriesWithLastInjury = await prisma.factory.findMany({
    orderBy: { name: "asc" },
    include: {
      injuries: {
        orderBy: { date: "asc" },
        take: 1,
      },
    },
  });

  const formattedData = factoriesWithLastInjury.map(factory => ({
    id: factory.id,
    name: factory.name,
    address: factory.address,
    lastInjuryDate: factory.injuries.length ? factory.injuries[0].date : null,
  }));

  res.json(formattedData);
});

//dato un id di uno stabilimento ottenere il numero di infortuni di ogni mese
export const getFactoryHistory: RequestHandler = asyncHandler(
  async (req, res) => {
    const result = validation.getByIdParams.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ error: "Id stabilimento invalido" });
    }

    const { factoryId } = result.data;

    const factoryHistory = await prisma.$queryRaw`
      SELECT 
      DATEFROMPARTS(YEAR(date), MONTH(date), 1) AS date,
      COUNT(*) AS count
      FROM Injury
      WHERE factoryId = ${factoryId}
      GROUP BY DATEFROMPARTS(YEAR(date), MONTH(date), 1)
      ORDER BY DATEFROMPARTS(YEAR(date), MONTH(date), 1)
    `;

    res.json(factoryHistory);
  }
);
