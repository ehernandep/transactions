import { Router } from "express";
import {
  createClientRequest,
  deleteClientRequest,
  getAgentRequests,
  getClientRequests,
  getRequestsAdmin,
  updateClientRequest,
} from "../controllers/requests";

/* import { checkJwt } from "../middleware/session"; */

const router = Router();
router.get("/", /* checkJwt, */ getRequestsAdmin);
router.get("/client/:id", /* checkJwt, */ getClientRequests);
router.get("/agent/:id", /* checkJwt, */ getAgentRequests);
router.post("/", /* checkJwt, */ createClientRequest);
router.put("/:id", /* checkJwt, */ updateClientRequest);
router.delete("/:id", /* checkJwt, */ deleteClientRequest);

export { router };
