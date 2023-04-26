import { Router } from "express";
import { getUsersToAdmin } from "../controllers/users";

/* import { checkJwt } from "../middleware/session"; */

const router = Router();
router.get("/", /* checkJwt, */ getUsersToAdmin);

export { router };
