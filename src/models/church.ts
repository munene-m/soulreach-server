import mongoose from "mongoose";

const churchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subRegion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubRegion",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Church = mongoose.model("Church", churchSchema);

export default Church;
