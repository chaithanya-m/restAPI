import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure currentUser is available on the request object
      const currentUser = req["currentUser"];
      if (!currentUser || !currentUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Convert currentUser.id to a number if necessary
      const userId = typeof currentUser.id === "string" ? parseInt(currentUser.id, 10) : currentUser.id;

      // Fetch the user from the database
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: userId },
      });

      // If user is not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's role is authorized
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
