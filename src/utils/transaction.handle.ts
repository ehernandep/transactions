import TransactionModel from "../models/transaction";

const createNewTransaction = async (action: string, endpoint: string) => {
  const newTransaction = new TransactionModel({
    action,
    endpoint,
  });

  try {
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  } catch (error) {
    await newTransaction.remove();
    throw error;
  }
};

export { createNewTransaction };
