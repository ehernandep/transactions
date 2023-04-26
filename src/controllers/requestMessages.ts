import { Request, Response } from "express";
import {
  createMessageForRequest,
  getMessageFromRequest,
} from "../services/requestMessages";
import { handleHttp } from "../utils/error.handle";

const getRequestMessages = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;
    const response = await getMessageFromRequest(requestId);
    res.send(response);
  } catch (e) {
    return { error: "ERROR_GET_CLIENTS" };
  }
};

const createRequestMessage = async (req: Request, res: Response) => {
  try {
    const { request_id, description, senderName, senderLastName } = req.body;
    const imageFile = req.file;

    const responseClient = await createMessageForRequest({
      request_id,
      description,
      senderName,
      senderLastName,
      imageFile,
    });
    res.send(responseClient);
  } catch (e) {
    handleHttp(res, "ERROR_POST_CLIENT");
  }
};

export { getRequestMessages, createRequestMessage };
