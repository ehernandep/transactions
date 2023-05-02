import { ses } from "../aws-config";
import { RequestMessage } from "../interfaces/requestMessage.interface";
import RequestMessagesModel from "../models/requestMessages";
import RequestModel from "../models/requests";
import UserModel from "../models/user";

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

    // Get the request associated with the message
    const request = await RequestModel.findById(request_id);
    if (!request) {
      throw new Error("Request not found");
    }

    // Get the agent associated with the request
    const agent = await UserModel.findById(request.agent);
    if (!agent) {
      throw new Error("Agent not found");
    }

    const { email } = agent;

    // Create the message
    const responseInsert = await RequestMessagesModel.create({
      request_id,
      description,
      senderName,
      senderLastName,
      imageUrl,
    });

    // Send email notification to the agent
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<p>New request message from ${senderName} ${senderLastName}</p>`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "New Request Message",
        },
      },
      Source: "support@bonnettanalytics.com",
    };

    await ses.sendEmail(params).promise();

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
