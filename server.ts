import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import injuryRoutes from "./routes/injury";
import prisma from "./prisma/db_connection";

dotenv.config();
const app = express();

// base middlewares
app.use(bodyParser.json());

// api routes
app.use("/api", injuryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

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
