import { z } from "zod";

export const sqlId = z.coerce.number().positive();
