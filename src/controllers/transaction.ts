import { Request, response, Response } from "express";
import { getTransactions } from "../services/transaction";

import { handleHttp } from "../utils/error.handle";
const getTransactionToAdmin = async (req: Request, res: Response) => {
  try {
    const response = await getTransactions();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_TRANSACTIONS");
  }
};

export {getTransactionToAdmin};
