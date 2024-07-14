import { model, Schema } from "mongoose";
import { Transaction } from "../interfaces/transaction.interface";

const TransactionSchema = new Schema<Transaction>(
  {
    action: { type: String, required: true },
    endpoint: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const TransactionModel = model("Transactions", TransactionSchema);
export default TransactionModel;
