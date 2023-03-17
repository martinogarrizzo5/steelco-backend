import { z } from "zod";

export const loginBody = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});
