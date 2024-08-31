import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

dotenv.config();

// Define the shape of the decoded token
interface DecodedToken {
  id: string;
  role: string;
}

// Extend the Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: User; // Update type to User
    }
  }
}


const secret = process.env.JWT_SECRET as string;

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;


  if (!header) {
    // console.log('Token:', token);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and decode it

    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] }) as DecodedToken;

    // Fetch the user from the database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: Number(decoded.id) } });

    // If user is not found
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Assign the full user object to req.currentUser
    req.currentUser = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
