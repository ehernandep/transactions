import { model, Schema } from "mongoose";
import { Request } from "../interfaces/request.interface";

const RequestSchema = new Schema<Request>({
  client: {
    type: String,
    required: true,
  },
  agent: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  status: { type: String, required: true },
});

const RequestModel = model("Requests", RequestSchema);
export default RequestModel;
