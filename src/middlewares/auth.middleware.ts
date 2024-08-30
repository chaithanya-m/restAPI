import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

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
      currentUser?: DecodedToken; // Adjust the type to match your use case
    }
  }
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Assign the decoded payload to req.currentUser
    // req.currentUser = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
