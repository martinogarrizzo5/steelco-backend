import { query, RequestHandler } from "express";
import prisma from "../prisma/db_connection";
import asyncHandler from "../middlewares/asyncHandler";
import * as validation from "../validation/report";
import { Prisma } from "@prisma/client";

export const getReport: RequestHandler = asyncHandler(async (req, res) => {
  const factoriesWithLastInjury = await prisma.factory.findMany({
    orderBy: { name: "asc" },
    include: {
      injuries: {
        orderBy: { date: "desc" },
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

export const getFactoryHistory: RequestHandler = asyncHandler(
  async (req, res) => {
    const paramsResult = validation.getByIdParams.safeParse(req.params);
    const queryResult = validation.getByIdQuery.safeParse(req.query);
    if (!paramsResult.success || !queryResult.success) {
      return res.status(400).json({ error: "Id stabilimento invalido" });
    }
    const { factoryId } = paramsResult.data;
    const { year } = queryResult.data;

    let whereCondition = Prisma.sql`WHERE i.factoryId = ${factoryId}`;
    if (year) {
      whereCondition = Prisma.sql`${whereCondition} AND YEAR(i.date) = ${year}`;
    }

    let dbQuery = Prisma.sql`
      SELECT 
      DATEFROMPARTS(YEAR(date), MONTH(date), 1) AS date,
      COUNT(*) AS count
      FROM Injury i ${whereCondition}
      GROUP BY DATEFROMPARTS(YEAR(date), MONTH(date), 1) 
      ORDER BY DATEFROMPARTS(YEAR(date), MONTH(date), 1) 
    `;

    let factoryHistory = await prisma.$queryRaw(dbQuery);

    res.json(factoryHistory);
  }
);
