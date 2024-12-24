import { Request, Response } from "express";
import { CustomRequest } from "../middleware/checkJwt";
import { createSoulWinningRecordSchema } from "../utils/validation";
import SoulWinningRecord from "../models/soulWinningRecord";
import User from "../models/user";
import { ZodError } from "zod";

export const createSoulWinningRecord = async (req: Request, res: Response) => {
  const { minister, date, soulsWon, contacts, eventName } = req.body;
  const validatedData = createSoulWinningRecordSchema.parse({ minister, date, soulsWon, contacts, eventName });

  try {
    // Validate that number of contacts matches souls won
    if (validatedData.contacts.length !== validatedData.soulsWon) {
      return res.status(400).json({
        message: "Number of contacts must match number of souls won",
        error: `Expected ${validatedData.soulsWon} contacts but got ${validatedData.contacts.length}`,
      });
    }
    const soulWinningRecord = await SoulWinningRecord.create({
      minister: validatedData.minister,
      date: validatedData.date,
      soulsWon: validatedData.soulsWon,
      contacts: validatedData.contacts,
      eventName: eventName,
    });

    return res.status(201).json({
      message: "Record created successfully",
      data: soulWinningRecord,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: "Failed to create soul winning record",
        error: error.message,
      });
    } else if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid input data",
        error: error.errors,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: "An unexpected error occurred",
    });
  }
};

export const getSoulWinningRecords = async (req: Request, res: Response) => {
  const { ministerId } = req.params;
  const soulWinningRecords = await SoulWinningRecord.find({ minister: ministerId });
  return res.status(200).json({
    message: "Records fetched successfully",
    data: soulWinningRecords,
  });
};

export const getSubRegionSoulWinningRecords = async (req: Request, res: Response) => {
  try {
    const id = (req as CustomRequest).token.payload.userId;
    // Get all pastors under this sub regional overseer
    const pastors = await User.find({
      subRegionalOverseer: id,
      role: "PASTOR",
    });

    const pastorIds = pastors.map((pastor) => pastor._id);

    // Get soul winning records for all pastors under this sub regional overseer
    const soulWinningRecords = await SoulWinningRecord.find({
      minister: { $in: pastorIds },
    });

    return res.status(200).json({
      message: "Sub region soul winning records fetched successfully",
      data: soulWinningRecords,
    });
  } catch (error: any) {
    console.error("Error fetching sub region soul winning records:", error);
    return res.status(500).json({
      message: "Failed to fetch sub region soul winning records",
      error: error.message,
    });
  }
};

export const getRegionSoulWinningRecords = async (req: Request, res: Response) => {
  try {
    const id = (req as CustomRequest).token.payload.userId;

    // Get all pastors and sub-regional overseers under this regional overseer
    const subRegionalOverseers = await User.find({
      regionalOverseer: id,
      role: "SUB_REGIONAL_OVERSEER",
    });

    const subOverseerIds = subRegionalOverseers.map((so) => so._id);

    const pastors = await User.find({
      $or: [{ regionalOverseer: id }, { subRegionalOverseer: { $in: subOverseerIds } }],
      role: "PASTOR",
    });

    const pastorIds = pastors.map((pastor) => pastor._id);

    // Get soul winning records for all pastors in the region
    const soulWinningRecords = await SoulWinningRecord.find({
      minister: { $in: pastorIds },
    });

    return res.status(200).json({
      message: "Region soul winning records fetched successfully",
      data: soulWinningRecords,
    });
  } catch (error: any) {
    console.error("Error fetching region soul winning records:", error);
    return res.status(500).json({
      message: "Failed to fetch region soul winning records",
      error: error.message,
    });
  }
};

export const getAllSoulWinningRecords = async (req: Request, res: Response) => {
  const soulWinningRecords = await SoulWinningRecord.find();
  return res.status(200).json({
    message: "All soul winning records fetched successfully",
    data: soulWinningRecords,
  });
};
