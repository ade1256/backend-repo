import { Request, Response, NextFunction } from "express";
import ApiError from "../entities/ApiError";
import { admin } from "../config/firebaseConfig";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(ApiError.badRequest("No token provided"));
  }

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    next(ApiError.internal("Failed to authenticate token"));
  }
};

export default authMiddleware;
