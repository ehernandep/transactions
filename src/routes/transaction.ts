import { Router } from "express";
import { getTransactionToAdmin } from "../controllers/transaction";

import { checkJwt } from "../middleware/session";

const router = Router();
router.get("/", getTransactionToAdmin);

export { router };
