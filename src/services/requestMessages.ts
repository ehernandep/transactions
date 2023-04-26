import { RequestMessage } from "../interfaces/requestMessage.interface";
import RequestMessagesModel from "../models/requestMessages";

const createMessageForRequest = async (
  messages: RequestMessage & { imageFile?: Express.Multer.File }
) => {
  try {
    const { request_id, description, senderName, senderLastName, imageFile } =
      messages;
    const imageUrl = imageFile
      ? `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
          "base64"
        )}`
      : null;
    const responseInsert = await RequestMessagesModel.create({
      request_id,
      description,
      senderName,
      senderLastName,
      imageUrl,
    });
    return responseInsert;
  } catch (err) {
    console.error("Error creating message:", err);
    throw new Error("Error creating message");
  }
};

const getMessageFromRequest = async (
  requestId: string
): Promise<RequestMessage[] | { error: string }> => {
  try {
    const response = await RequestMessagesModel.find({ request_id: requestId });
    return response;
  } catch (e) {
    return { error: "ERROR_GET_MESSAGES" };
  }
};

export { getMessageFromRequest, createMessageForRequest };
