import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({ message: "Qualcosa è andato storto. Riprova più tardi" });
};

export default errorHandler;
