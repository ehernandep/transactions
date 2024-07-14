import TransactionModel from "../models/transaction";

const getTransactions = async () => {
  try {
    const transactions = await TransactionModel.find();
    return transactions;
  } catch (e) {
    throw new Error("Error getting transactions");
  }
};
export { getTransactions };
