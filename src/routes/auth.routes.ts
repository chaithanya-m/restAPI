// routes/auth.routes.ts

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authentication } from "../middlewares/auth.middleware";

const router = Router();

// Define routes and link them to controller methods
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/profile",authentication, AuthController.getProfile); // You may need to add authentication middleware here

export { router as authRouter };
