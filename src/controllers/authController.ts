import { Request, Response } from "express";
import User from "../models/user";
import Church from "../models/church";
import bcrypt from "bcrypt";
import { isValidEmail } from "../utils/validation";
import { UserRole } from "../utils/constants";
import { generateAccessToken } from "../utils/tokens";
import { validateOverseers, validateRegionalOverseer } from "../utils/user";



export const register = async (req: Request, res: Response) => {
  try {
    const { username, church, region, subRegionalOverseer, regionalOverseer, email, password, role } = req.body;

    if (!email || !password || !username || !church || !region || !role) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const churchExists = await Church.findOne({ _id: church });
    if (!churchExists) {
      return res.status(400).json({
        message: "Invalid church selected",
      });
    }

    // Role-specific validation
    switch (role) {
      case UserRole.PASTOR:
        if (!subRegionalOverseer || !regionalOverseer) {
          return res.status(400).json({
            message: "Pastors must specify both sub-regional and regional overseers",
          });
        }
        if (!(await validateOverseers(subRegionalOverseer, regionalOverseer))) {
          return res.status(400).json({
            message: "Invalid overseer selection",
          });
        }
        break;
      case UserRole.SUB_REGIONAL_OVERSEER:
        if (!regionalOverseer) {
          return res.status(400).json({
            message: "Sub-regional overseers must specify their regional overseer",
          });
        }
        if (!(await validateRegionalOverseer(regionalOverseer))) {
          return res.status(400).json({
            message: "Invalid regional overseer selection",
          });
        }
        break;
      case UserRole.REGIONAL_OVERSEER:
      case UserRole.BISHOP:
        // No additional required fields
        break;
      default:
        return res.status(400).json({ message: "Invalid role specified" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      church,
      region,
      subRegionalOverseer,
      regionalOverseer,
      email,
      password: passwordHash,
      role,
    });

    return res.status(201).json({
      token: generateAccessToken(newUser.id, newUser.email, newUser.role),
      message: "Account created successfully",
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      token: generateAccessToken(user.id, user.email, user.role),
      user: {
        id: user.id,
        username: user.username,
        church: user.church,
        region: user.region,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};



export const getRegionalOverseers = async (req: Request, res: Response) => {
  try {
    const regionalOverseers = await User.find({ role: UserRole.REGIONAL_OVERSEER }, { _id: 1, username: 1, region: 1 });

    return res.json(regionalOverseers);
  } catch (error) {
    console.error("Error fetching regional overseers:", error);
    return res.status(500).json({ message: "Failed to fetch regional overseers" });
  }
};

export const getSubRegionalOverseers = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;

    const query: { role: UserRole; region?: string } = { role: UserRole.SUB_REGIONAL_OVERSEER };
    if (region) {
      query.region = region as string;
    }

    const subRegionalOverseers = await User.find(query, { _id: 1, username: 1, region: 1 });

    return res.json(subRegionalOverseers);
  } catch (error) {
    console.error("Error fetching sub-regional overseers:", error);
    return res.status(500).json({ message: "Failed to fetch sub-regional overseers" });
  }
};
