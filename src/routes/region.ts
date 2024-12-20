import { Router } from "express";
import { createRegion } from "../controllers/regionController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../utils/constants";

const router = Router();

router.post("/create", 
    // checkRole([UserRole.BISHOP]),
     createRegion);

export default router;
