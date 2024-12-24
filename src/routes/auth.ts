import express from "express";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import { login, register } from "../controllers/authController";
import { adminLogin } from "../utils/admin";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/admin-login").post(adminLogin);

export default router;
