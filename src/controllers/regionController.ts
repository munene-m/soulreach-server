import Region from "../models/region";
import { Request, Response } from "express";

export const createRegion = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({
          message: "Region name is required"
        });
      }
  
      // Check if region already exists
      const existingRegion = await Region.findOne({ name });
      if (existingRegion) {
        return res.status(400).json({
          message: "Region already exists"
        });
      }
  
      const region = await Region.create({ name });
  
      return res.status(201).json({
        message: "Region created successfully",
        region
      });
    } catch (error: any) {
      console.error("Region creation error:", error);
      return res.status(500).json({
        message: "Failed to create region",
        error: error.message
      });
    }
  };