import * as express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { MovieController } from "../controllers/movie.controller";
import { authorization } from "../middlewares/authorization";

const Router = express.Router();

Router.get("/movies", authentication, MovieController.getAllMovies);
Router.post("/movies", authentication, MovieController.createMovie);

Router.put(
  "/movies/:id",
  authentication,
  authorization(["admin"]),
  MovieController.updateMovie
);
Router.delete(
  "/movies/:id",
  authentication,
  authorization(["admin"]),
  MovieController.deleteMovie
);
export { Router as movieRouter };