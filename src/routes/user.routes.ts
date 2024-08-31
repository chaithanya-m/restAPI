import * as express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controllers";
import { authorization } from "../middlewares/authorization";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get(
  "/users",
  authentication,
  authorization(["admin"]),
  UserController.getUsers
);
Router.get(
  "/profile",
  authentication,
  authorization(["user", "admin"]),
  AuthController.getProfile
);
Router.put(
  "/update/:id",
  authentication,
  authorization(["user", "admin"]),
  UserController.updateUser
);
Router.delete(
  "/delete/:id",
  authentication,
  authorization(["admin"]),
  UserController.deleteUser
);
export { Router as userRouter };
