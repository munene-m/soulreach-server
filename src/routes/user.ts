import {Router} from "express"
import { getRegionalOverseers, getSubRegionalOverseers } from "../controllers/authController";

const router = Router();

router.get("/regional-overseers", getRegionalOverseers);
router.get("/sub-regional-overseers", getSubRegionalOverseers);

export default router;

