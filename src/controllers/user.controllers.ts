import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import * as cache from "memory-cache";

export class UserController {
  // Get all users with caching
  static async getUsers(req: Request, res: Response) {
    try {
      const cachedUsers = cache.get("users");
      if (cachedUsers) {
        console.log("Serving from cache");
        return res.status(200).json({ data: cachedUsers });
      } else {
        console.log("Serving from database");
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        cache.put("users", users, 6000); // Cache for 6 seconds
        return res.status(200).json({ data: users });
      }
    } catch (error) {
      console.error("Get users error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update user details
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      // Validate request data
      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name;
      user.email = email;

      await userRepository.save(user);
      return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Update user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete user
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await userRepository.remove(user);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
