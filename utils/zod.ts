import { z } from "zod";

export const sqlId = z.coerce.number().positive();

export const sqlYear = z.coerce.number().positive();
