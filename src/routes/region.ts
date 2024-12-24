import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";
import { checkJwt } from "../middleware/checkJwt";
import { createRegion, getRegions } from "../controllers/regionController";

const router = Router();

router.post("/", checkJwt, checkRole([UserRole.ADMIN, UserRole.BISHOP]), createRegion);
router.get("/", getRegions);

export default router;
