import { Request, Response } from "express";
import Church from "../models/church";
import SubRegion from "../models/subRegion";

export const createChurch = async (req: Request, res: Response) => {
  try {
    const { name, subRegion } = req.body;

    if (!name || !subRegion) {
      return res.status(400).json({
        message: "Church name and subRegion are required",
      });
    }

    const existingSubRegion = await SubRegion.findOne({ _id: subRegion });
    if (!existingSubRegion) {
      return res.status(400).json({
        message: "Sub region doesn't exist",
      });
    }

    const church = await Church.create({ name, subRegion });

    return res.status(201).json({
      message: "Church created successfully",
      church,
    });
  } catch (error: any) {
    console.error("Church creation error:", error);
    return res.status(500).json({
      message: "Failed to create church",
      error: error.message,
    });
  }
};

export const getChurches = async (req: Request, res: Response) => {
  try {
    const { subRegion } = req.query;

    if (subRegion) {
      const existingSubRegion = await SubRegion.findById(subRegion);
      if (!existingSubRegion) {
        return res.status(400).json({
          message: "Sub region doesn't exist",
        });
      }
    }

    const query = subRegion ? { subRegion } : {};
    const churches = await Church.find(query).populate("subRegion");

    return res.status(200).json({
      message: "Churches fetched successfully",
      data: churches,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to fetch churches",
      error: error.message,
    });
  }
};
