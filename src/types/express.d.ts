// src/types/express.d.ts

import { User } from "../entity/User"; // Adjust the import path as necessary

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: User; // or any other type that represents your user
  }
}
