import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import rateLimit from "express-rate-limit";
import { refreshAccessToken } from "../utils/tokens";

export interface DecodedToken extends JwtPayload {
  userId: string; // Adjust the structure as needed based on your token
}

// Define a rate limit middleware for authenticated users
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Maximum requests per windowMs per user
  keyGenerator: (req) => {
    // Generate a unique key based on the user's identifier (e.g., user ID)
    if (req.user) {
      return req.user.id.toString();
    }
    // Return a default key for unauthenticated users
    return "unauthenticated";
  },
  message: "Too many requests from this user, please try again later.",
});

const authProtect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as DecodedToken;

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Unauthorized attempt" });
      }

      req.user = { id: user._id, ...user };

      if (req.params.riderId && req.params.riderId !== user.id) {
        return res.status(403).json({ message: "Forbidden attempt" });
      }

      // Apply rate limiting for authenticated users
      authLimiter(req, res, (err) => {
        if (err) {
          return res
            .status(429)
            .json({ message: "Rate limit exceeded. Try again later." });
        }
        next();
      });
    } catch (error: any) {
      // Handle errors other than TokenExpiredError
      if (error.name !== "TokenExpiredError") {
        console.log("error on rider auth middleware: ", error);
        return res.status(401).json({ message: "Unauthorized attempt" });
      }

      // If the error is TokenExpiredError, proceed to refresh the token
      try {
        const decoded = jwt.decode(token) as DecodedToken;
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        const newAccessToken = await refreshAccessToken(user.id);
        if (
          newAccessToken === "Login session expired. Please log in again." ||
          newAccessToken === "An error occured. Please log in again."
        ) {
          return res.status(401).json({ message: newAccessToken });
        } else {
          res.setHeader("Authorization", `Bearer ${newAccessToken}`);
          req.user = { id: user._id, ...user };
          return next();
        }
      } catch (err) {
        console.error("Error decoding token or refreshing access token:", err);
        return res.status(500).json({
          message: "An error occured when trying to refresh access token",
          err,
        });
      }
    }
  } else {
    return res.status(401).json({ message: "Unauthorized attempt" });
  }
};

export default authProtect;
