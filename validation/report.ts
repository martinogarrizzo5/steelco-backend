import { date, number, string, z } from "zod";
import { sqlId } from "../utils/zod";

export const getByIdParams = z.object({
  factoryId: sqlId,
});

export const getByIdQuery = z.object({
  year: z.coerce.number().positive().optional(),
});
