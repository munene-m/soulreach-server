import Region from "../models/region";
import SubRegion from "../models/subRegion";
import { Request, Response } from "express";

export const createSubRegion = async (req: Request, res: Response) => {
  const { region, name } = req.body;
  if (!region || !name) {
    return res.status(400).json({
      message: "Region and name are required",
    });
  }
  const existingRegion = await Region.findById(region);
  if (!existingRegion) {
    return res.status(400).json({
      message: "Region not found",
    });
  }
  const existingSubRegion = await SubRegion.findOne({ region, name });
  if (existingSubRegion) {
    return res.status(400).json({
      message: "SubRegion already exists",
    });
  }
  const subRegion = await SubRegion.create({ region, name });
  return res.status(201).json({
    message: "SubRegion created successfully",
    subRegion,
  });
};

export const getSubRegions = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;

    if (region) {
      const existingRegion = await Region.findById(region);
      if (!existingRegion) {
        return res.status(404).json({
          message: "Region specified not found",
        });
      }
    }

    const query = region ? { region } : {};
    const subRegions = await SubRegion.find(query);

    return res.status(200).json({
      message: "SubRegions fetched successfully",
      data: subRegions,
    });
  } catch (error: any) {
    console.error("Error fetching subRegions:", error);
    return res.status(500).json({
      message: "Failed to fetch subRegions",
      error: error.message,
    });
  }
};
