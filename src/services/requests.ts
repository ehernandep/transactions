import { ses } from "../aws-config";
import { Request } from "../interfaces/request.interface";
import { User } from "../interfaces/user.interface";
import RequestMessagesModel from "../models/requestMessages";
import RequestModel from "../models/requests";
import UserModel from "../models/user";

const createRequestForClient = async (request: Request) => {
  try {
    const agentId = request.agent;
    const clientId = request.client;
    const agent: User | null = await UserModel.findById(agentId);
    const client: User | null = await UserModel.findById(clientId);
    if (!agent) {
      throw new Error("Agent not found");
    }
    if (!client) {
      throw new Error("client not found");
    }
    const requestWithDate = { ...request, startDate: new Date() };
    const createdRequest = await RequestModel.create(requestWithDate);
    const params = {
      Destination: {
        ToAddresses: [agent.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<p>New request received from ${client.name}</p>`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "New request received",
        },
      },
      Source: "support@bonnettanalytics.com",
    };
    await ses.sendEmail(params).promise();
    return createdRequest;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create request for client");
  }
};

const getRequestsForClient = async (id: string) => {
  const responseClient = await RequestModel.find({ client: id });
  return responseClient;
};

const getRequests = async () => {
  const responseClient = await RequestModel.find({});
  return responseClient;
};

const getRequestsForAgent = async (id: string) => {
  const responseClient = await RequestModel.find({ agent: id });
  return responseClient;
};

const updateRequestsForClient = async (id: string, data: Request) => {
  try {
    const responseClient = await RequestModel.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );

    if (responseClient?.status === "closed") {
      const agent = await UserModel.findById(responseClient.agent);
      const params = {
        Destination: {
          ToAddresses: [agent?.email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `<p>Your request was closed by ${agent?.email} if you want more info write to that email.</p>`,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Request Closed",
          },
        },
        Source: "support@bonnettanalytics.com",
      };

      await ses.sendEmail(params).promise();
    }

    return responseClient;
  } catch (err) {
    console.error("Error updating request:", err);
    throw new Error("Error updating request");
  }
};
const deleteRequestFromClient = async (id: string) => {
  await RequestMessagesModel.remove({ request_id: id });

  // Remove the document from the RequestModel collection with the specified id
  const responseClient = await RequestModel.remove({ _id: id });
  return responseClient;
};

export {
  deleteRequestFromClient,
  createRequestForClient,
  getRequestsForClient,
  updateRequestsForClient,
  getRequests,
  getRequestsForAgent,
};
