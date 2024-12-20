import User from "../models/user";
import { ObjectId } from "mongodb";
import { UserRole } from "./constants";

export const getUserById = async (id: string) => {
    const user = await User.findById(id).select([
      "_id",
      "username",

      "role",
    ]);
    if (!user) return { message: `User with ID ${id} not found`, role: "" };
    return user;
  };

  export async function validateOverseers(subRegionalOverseerID: string, regionalOverseerID: string): Promise<boolean> {
  try {
    // Validate that the IDs are valid ObjectIds
    if (!ObjectId.isValid(subRegionalOverseerID) || !ObjectId.isValid(regionalOverseerID)) {
      return false;
    }

    // Find both overseers in the database
    const [subRegionalOverseer, regionalOverseer] = await Promise.all([
      User.findById(subRegionalOverseerID),
      User.findById(regionalOverseerID)
    ]);

    // Verify both users exist and have correct roles
    return (
      subRegionalOverseer?.role === UserRole.SUB_REGIONAL_OVERSEER &&
      regionalOverseer?.role === UserRole.REGIONAL_OVERSEER
    );
  } catch (error) {
    console.error('Overseer validation error:', error);
    return false;
  }
}

export async function validateRegionalOverseer(regionalOverseerID: string): Promise<boolean> {
    try {
      // Validate that the ID is a valid ObjectId
      if (!ObjectId.isValid(regionalOverseerID)) {
        return false;
      }
  
      const regionalOverseer = await User.findById(regionalOverseerID);
      return regionalOverseer?.role === UserRole.REGIONAL_OVERSEER;
    } catch (error) {
      console.error('Regional overseer validation error:', error);
      return false;
    }}