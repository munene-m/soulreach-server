import { Schema, model } from "mongoose";

interface IRegion {
  name: string;
}

const regionSchema = new Schema<IRegion>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

const Region = model<IRegion>("Region", regionSchema);

export default Region; 