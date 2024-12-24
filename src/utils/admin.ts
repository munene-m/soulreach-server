import { login } from "../controllers/authController";
import User, { UserRole } from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateAccessToken } from "./tokens";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    return res.status(200).json({
      token: generateAccessToken(user.id, user.email, user.role),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      message: "Failed to login admin",
      error: error.message,
    });
  }
};

export const adminRegister = async () => {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  try {
    await User.create({
      email,
      password: await bcrypt.hash(password, 12),
      role: UserRole.ADMIN,
      username: "admin",
    });
    console.log("Admin created successfully");
    return true;
  } catch (error: any) {
    console.error("Admin registration error:", error);
    return false;
  }
};
