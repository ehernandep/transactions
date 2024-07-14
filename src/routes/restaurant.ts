import { Router } from "express";
import { getRestaurantToAdmin } from "../controllers/restaurant";

import { checkJwt } from "../middleware/session";

const router = Router();
router.get("/", getRestaurantToAdmin);

export { router };
