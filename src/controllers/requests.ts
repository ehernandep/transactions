import { Request, response, Response } from "express";
import {
  createRequestForClient,
  deleteRequestFromClient,
  getRequestsForClient,
  updateRequestsForClient,
  getRequests,
  getRequestsForAgent
} from "../services/requests";

import { handleHttp } from "../utils/error.handle";
const getRequestsAdmin = async (req: Request, res: Response) => {
  try {
    const response = await getRequests();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_CLIENTS");
  }
};
const getClientRequests = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;
    const response = await getRequestsForClient(requestId);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_CLIENTS");
  }
};

const getAgentRequests = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;
    const response = await getRequestsForAgent(requestId);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_CLIENTS");
  }
};

const updateClientRequest = async (
  { params, body }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const response = await updateRequestsForClient(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_CLIENT");
  }
};

const createClientRequest = async ({ body }: Request, res: Response) => {
  try {
    const responseClient = await createRequestForClient(body);
    res.send(responseClient);
  } catch (e) {
    handleHttp(res, "ERROR_POST_CLIENT");
  }
};

const deleteClientRequest = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteRequestFromClient(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_CLIENT");
  }
};

export {
  getClientRequests,
  updateClientRequest,
  createClientRequest,
  deleteClientRequest,
  getAgentRequests,
  getRequestsAdmin
};
