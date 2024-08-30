import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate request data
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find the user by email
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      // If user not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate the password
      const isPasswordValid = await encrypt.comparepassword(password, user.password); // assuming comparePassword is async
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate token
      const token = encrypt.generateToken({ id: user.id });

      // Send response excluding the password
      return res.status(200).json({
        message: "Login successful",
        user: { ...user, password: undefined },
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      // Assuming currentUser is added to the request object through middleware
      const currentUser = req.currentUser as { id: number } | undefined;
      
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Find the user by id
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: currentUser.id },
      });

      // If user not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send response excluding the password
      return res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
