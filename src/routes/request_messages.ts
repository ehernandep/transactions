import { Router } from "express";
import {
  createRequestMessage,
  getRequestMessages,
} from "../controllers/requestMessages";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
/* import { checkJwt } from "../middleware/session"; */

const router = Router();

router.get("/:id", /* checkJwt, */ getRequestMessages);
router.post("/", upload.single("imageFile"), createRequestMessage);

export { router };
