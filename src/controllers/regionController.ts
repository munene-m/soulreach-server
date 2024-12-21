import Region from "../models/region";
import SubRegion from "../models/subRegion";
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

export const createSubRegion = async (req: Request, res: Response) => {
    const { region, name } = req.body;
    if(!region || !name){
        return res.status(400).json({
            message: "Region and name are required"
        });
    }
    const existingRegion = await Region.findById(region);
    if(!existingRegion){
        return res.status(400).json({
            message: "Region not found"
        });
    }
    const existingSubRegion = await SubRegion.findOne({region, name});
    if(existingSubRegion){
        return res.status(400).json({
            message: "SubRegion already exists"
        });
    }
    const subRegion = await SubRegion.create({region, name});
    return res.status(201).json({
        message: "SubRegion created successfully",
        subRegion
    });
 }

 export const getSubRegions = async (req: Request, res: Response) => {
    const { region } = req.params;
    if(!region){
        return res.status(400).json({
            message: "Region is required"
        });
    }
    const existingRegion = await Region.findById(region);
    if(!existingRegion){
        return res.status(400).json({
            message: "Region not found"
        });
    }
    const subRegions = await SubRegion.find({region});
    return res.status(200).json({
        message: "SubRegions fetched successfully",
        subRegions
    });
 }
