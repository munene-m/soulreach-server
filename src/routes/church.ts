import { Router } from "express";
import { createChurch, getChurches } from "../controllers/churchController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.post("/", checkJwt, checkRole([UserRole.ADMIN, UserRole.BISHOP]), createChurch);
router.get("/", getChurches);

export default router;
