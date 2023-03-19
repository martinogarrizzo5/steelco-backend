import { z } from "zod";
import { sqlId } from "../utils/zod";

export const getAllQuery = z.object({
  factoryId: z.coerce.number().optional(),
});

export const getByIdParams = z.object({
  id: sqlId,
});

export const postBody = z.object({
  date: z.coerce.date(),
  description: z.string().min(1),
  factoryId: sqlId,
});

export const putParams = z.object({
  id: sqlId,
});
export const putBody = z.object({
  date: z.coerce.date().optional(),
  description: z.string().min(1).optional(),
  factoryId: sqlId.optional(),
});

export const deleteParams = z.object({
  id: sqlId,
});
