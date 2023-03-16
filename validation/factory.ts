import { z } from "zod";
import { sqlId } from "../utils/zod";

export const getByIdParams = z.object({
  id: sqlId,
});

export const postBody = z.object({
  address: z.string().min(1),
  name: z.string().min(1),
});

export const putParams = z.object({
  id: sqlId,
});
export const putBody = z.object({
  address: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
});

export const deleteParams = z.object({
  id: sqlId,
});
