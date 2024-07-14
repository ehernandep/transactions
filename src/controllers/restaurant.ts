import { Request, response, Response } from "express";

import { getRestaurantsByZipCode } from "../services/restaurant";
import { handleHttp } from "../utils/error.handle";
const getRestaurantToAdmin = async (req: Request, res: Response) => {
  try {
    const zipCode = req.query.zipCode as string;

    if (!zipCode) {
      return res.status(400).send("zipCode  are required.");
    }
    const response = await getRestaurantsByZipCode(zipCode);

    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_RESTAURANTS");
  }
};

export { getRestaurantToAdmin };
