import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.hande";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    // en el header authorization
    const jwtByUser = req.headers.authorization || null;
    const jwt = jwtByUser?.split(" ").pop();
    const isOk = verifyToken(`${jwt}`);
    if (!isOk) {
      res.status(401);
      res.send("YOU_DONT_HAVE_AUTHORIZATION");
    }
    next();
  } catch (e) {
    res.status(400);
    res.send("SESSION_NOT_VERIFIED");
  }
};

export { checkJwt };
