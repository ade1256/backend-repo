import express from "express";
import userRoutes from "../routes/userRoutes";
import ApiError from "../entities/ApiError";

var cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", userRoutes);

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.statusCode || 500).send({ error: err.message });
  }
);

export default app;
