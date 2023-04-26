import { Request, response, Response } from "express";
import { getUsers } from "../services/users";

import { handleHttp } from "../utils/error.handle";
const getUsersToAdmin = async (req: Request, res: Response) => {
  try {
    const response = await getUsers();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_CLIENTS");
  }
};

export {getUsersToAdmin};
