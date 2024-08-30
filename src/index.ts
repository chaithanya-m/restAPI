import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

// Define routes
app.use("/auth", userRouter);
app.use("/api", movieRouter);

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler middleware
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
