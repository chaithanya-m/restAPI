import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import { errorHandler } from "./middlewares/error.middleware";
import listEndpoints from "express-list-endpoints";

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

// Define routes
app.use("/auth",authRouter);
app.use("/users", userRouter);
app.use("/api", movieRouter);

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.get("/list-endpoints", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});
// Error handler middleware
app.use(errorHandler);

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Log all available routes


AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
