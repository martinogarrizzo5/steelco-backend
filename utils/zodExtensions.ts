import { z } from "zod";

export const numericString = (schema: z.ZodTypeAny) =>
  z.preprocess((n) => {
    if (typeof n === "string") {
      return parseInt(n, 10);
    } else if (typeof n === "number") {
      return n;
    } else {
      return undefined;
    }
  }, schema) as z.ZodEffects<z.ZodTypeAny, number, number>;
