import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();
 const secret = process.env.JWT_SECRET as string;


export class encrypt {
  static async encryptpass(password: string): Promise<string> {
    return bcrypt.hash(password, 12); // Use the async version
  }

  static async comparepassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword); // Use the async version
  }

  static generateToken(payload: any): string {
    return jwt.sign(payload, secret, { expiresIn: '1d', algorithm: 'HS256' });
  }
}
