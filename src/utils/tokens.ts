import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import User from "../models/user";
import dotenv from "dotenv";
import config from "../config";
import { DecodedToken } from "../middleware/authMiddleware";

dotenv.config();

export interface CustomRequest extends Request {
  token: JwtPayload;
}
export async function refreshAccessToken(id: ObjectId): Promise<string | null> {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return "An error occured. Please log in again.";
    }

    const decoded = jwt.verify(
    user.refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as DecodedToken;

    const newAccessToken = generateAccessToken(decoded.userId, decoded.email, decoded.role);

    return newAccessToken;
  } catch (error: any) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return "Login session expired. Please log in again.";
    } else {
      return "An error occured. Please log in again.";
    }
  }
}

export const generateAccessToken = (id: string, email: string, role: string) => {
  return jwt.sign({
    userId: id,
    email,
    role
  },
  config.jwt.secret!,
  {
    expiresIn: "24h",
    algorithm: "HS256",
    audience: config.jwt.audience,
    issuer: config.jwt.issuer,
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "30d",
  });
};
