import mongoose from "mongoose";

const subRegionSchema = new mongoose.Schema({
    region:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Region",
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const SubRegion = mongoose.model("SubRegion", subRegionSchema);

export default SubRegion;