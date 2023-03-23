import { date, number, string, z } from "zod";
import { sqlId, sqlYear } from "../utils/zod";

export const getByIdParams = z.object({
  factoryId: sqlId,
});

export const getByYearQuery = z.object({
  injuryYear: sqlYear,
});
