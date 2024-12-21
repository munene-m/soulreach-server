import { Router } from "express";
import { createRegion, createSubRegion, getSubRegions } from "../controllers/regionController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.post("/create", checkJwt, checkRole([UserRole.BISHOP]), createRegion);
router.post("/createSubRegion", checkJwt, checkRole([UserRole.BISHOP]), createSubRegion);
router.get("/getSubRegions/:region", checkJwt, checkRole([UserRole.BISHOP]), getSubRegions);

export default router;
