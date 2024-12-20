import express from "express";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import {
  login,
  register,
} from "../controllers/authController";
import authProtect from "../middleware/authMiddleware";
import { UserRole } from "../utils/constants";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
