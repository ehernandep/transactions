import { model, Schema } from "mongoose";
import { RequestMessage } from "../interfaces/requestMessage.interface";

const RequestMessagesSchema = new Schema<RequestMessage>({
  description: {
    type: String,
    required: true,
  },
  request_id: { type: String, required: true },
  senderName: { type: String, required: true },
  senderLastName: { type: String, required: true },
  imageUrl: { type: String },
});

const RequestMessagesModel = model("RequestMessages", RequestMessagesSchema);
export default RequestMessagesModel;
