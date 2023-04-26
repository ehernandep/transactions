import { Request } from "../interfaces/request.interface";
import RequestMessagesModel from "../models/requestMessages";
import RequestModel from "../models/requests";

const createRequestForClient = async (request: Request) => {
  const requestWithDate = { ...request, startDate: new Date() };
  const createdRequest = await RequestModel.create(requestWithDate);
  return createdRequest;
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
  const responseClient = await RequestModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  return responseClient;
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
