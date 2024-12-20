import { ObjectId } from "mongoose";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: ObjectId;
      };
      files: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

export {};
