import * as express from "express";
import { authentification } from "../middlewares/auth.middleware";
import { MovieController } from "../controllers/movie.controller";
import { authorization } from "../middlewares/authorization";

const Router = express.Router();

Router.get("/movies", authentification, MovieController.getAllMovies);
Router.post("/movies", authentification, MovieController.createMovie);

Router.put(
  "/movies/:id",
  authentification,
  authorization(["admin"]),
  MovieController.updateMovie
);
Router.delete(
  "/movies/:id",
  authentification,
  authorization(["admin"]),
  MovieController.deleteMovie
);
export { Router as movieRouter };