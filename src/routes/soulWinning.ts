import {Router} from "express"
import { createSoulWinningRecord, getSoulWinningRecords, getRegionSoulWinningRecords, getSubRegionSoulWinningRecords, getAllSoulWinningRecords } from "../controllers/soulWinningController";
import { checkRole } from "../middleware/checkRole";
import { checkJwt } from "../middleware/checkJwt";
import { UserRole } from "../utils/constants";

const router = Router();

router.post("/create", checkJwt,
    checkRole([UserRole.PASTOR, UserRole.SUB_REGIONAL_OVERSEER, UserRole.REGIONAL_OVERSEER, UserRole.BISHOP]),
    createSoulWinningRecord
);

router.get("/getRecords/:ministerId", checkJwt,
    checkRole([UserRole.PASTOR, UserRole.SUB_REGIONAL_OVERSEER, UserRole.REGIONAL_OVERSEER, UserRole.BISHOP]),
    getSoulWinningRecords
);
router.get("/soulWinningRecords", checkJwt,
    checkRole([UserRole.REGIONAL_OVERSEER]),
    getRegionSoulWinningRecords
);
router.get("/subRegionSoulWinningRecords", checkJwt,
    checkRole([UserRole.SUB_REGIONAL_OVERSEER]),
    getSubRegionSoulWinningRecords
);
router.get("/getAllSoulWinningRecords", checkJwt,
    checkRole([UserRole.BISHOP]),
    getAllSoulWinningRecords
);
export default router;