import { z } from "zod";
import { sqlId } from "../utils/zod";

export const getByIdParams = z.object({
  factoryId: sqlId,
});
