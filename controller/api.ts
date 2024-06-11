import { Request, Response, NextFunction } from "express";
import { db } from "../config/firebaseConfig";
import ApiError from "../entities/ApiError";

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid, data } = req.body;

  if (!uid || !data) {
    return next(ApiError.badRequest("Missing uid or data"));
  }

  try {
    await db.collection("USERS").doc(uid).set(data, { merge: true });
    res.status(200).send({ ...req.body, message: "User data updated successfully" });
  } catch (error) {
    next(ApiError.internal("Error updating user data"));
  }
};

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;

  if (!uid) {
    return next(ApiError.badRequest("Missing uid"));
  }

  try {
    const userDoc = await db.collection("USERS").doc(uid).get();

    if (!userDoc.exists) {
      return next(ApiError.badRequest("User not found"));
    }

    res.status(200).send(userDoc.data());
  } catch (error) {
    next(ApiError.internal("Error fetching user data"));
  }
};
