import { Router } from "express";
import { createRegion } from "../controllers/regionController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.post("/create", checkJwt, checkRole([UserRole.BISHOP]), createRegion);

export default router;
