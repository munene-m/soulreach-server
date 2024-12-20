import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./checkJwt";
import { UserRole } from "../utils/constants";
import { getUserById } from "../utils/user";

export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById((req as CustomRequest).token.payload.userId);

    if (!user) {
      res
        .status(404)
        .type("json")
        .send(JSON.stringify({ message: "User not found" }));
      return;
    }
    if (!user.role) {
      res
        .status(403)
        .type("json")
        .send(JSON.stringify({ message: "User has no role" }));
      return;
    }

    if (roles.indexOf(user.role as UserRole) > -1) next();
    else {
      res
        .status(403)
        .type("json")
        .send(
          JSON.stringify({
            message: `Not enough permissions, this user is a ${user.role}`,
          })
        );

      return;
    }
  };
};
