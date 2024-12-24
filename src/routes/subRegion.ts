import { Router } from "express";
import { createSubRegion, getSubRegions } from "../controllers/subRegionController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.post("/", checkJwt, checkRole([UserRole.ADMIN, UserRole.BISHOP]), createSubRegion);
router.get("/", getSubRegions);

export default router;
