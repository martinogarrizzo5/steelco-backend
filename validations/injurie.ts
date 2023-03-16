import { z } from "zod";
import { numericString } from "../utils/zodExtensions";

export const getAllInjuerieData = z.object({
  date: z.date(),
  description: z.string().min(1),
  factoryId: numericString(z.number()),
  id: numericString(z.number()),
});

export const getInjurieId = z.object({
  id: numericString(z.number()),
});

export const getSomeInjurieData = z.object({
  date: z.string(),
  description: z.string().min(1),
  factoryId: numericString(z.number()),
});
