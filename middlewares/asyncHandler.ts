import { Request, Response, NextFunction, RequestHandler } from "express";

// handle async errors in controllers
const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };

export default asyncHandler;
