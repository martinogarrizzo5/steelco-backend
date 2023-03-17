import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import injuryRoutes from "./routes/injury";
import factoryRoutes from "./routes/factory";
import reportRoutes from "./routes/report";
import prisma from "./prisma/db_connection";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./controllers/error";

dotenv.config();
const app = express();

// base middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// api routes
app.use("/api", [injuryRoutes, factoryRoutes, reportRoutes]);
// app.use("/auth", authRoutes);
app.use(errorHandler);

// send frontend files from the build only in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🔥 Server listening on port ${port}`);
});
