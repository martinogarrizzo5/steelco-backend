import { z } from "zod";
import { numericString } from "../utils/zodExtensions";

export const getFactoryId = z.object({
  id: numericString(z.number()),
});

export const getFactoryData = z.object({
  address: z.string().min(1),
  name: z.string().min(1),
});
