import mongoose from "mongoose";
import { UserRole } from "../utils/constants";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  church: mongoose.Schema.Types.ObjectId;
  region: mongoose.Schema.Types.ObjectId;
  subRegionalOverseer?: mongoose.Schema.Types.ObjectId;
  regionalOverseer?: mongoose.Schema.Types.ObjectId;
  password: string;
  role: UserRole;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    church: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: function (this: IUser) {
        return ![UserRole.ADMIN].includes(this.role);
      },
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: function (this: IUser) {
        return ![UserRole.ADMIN].includes(this.role);
      },
    },
    subRegionalOverseer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function (this: IUser) {
        return [UserRole.PASTOR].includes(this.role);
      },
    },
    regionalOverseer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function (this: IUser) {
        return [UserRole.PASTOR, UserRole.SUB_REGIONAL_OVERSEER].includes(this.role);
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User as default, UserRole };
