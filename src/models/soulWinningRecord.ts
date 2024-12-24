import mongoose from "mongoose";

interface IContact {
  name: string;
  phoneNumber: string;
}

interface ISoulWinningRecord extends mongoose.Document {
  minister: mongoose.Schema.Types.ObjectId;
  date: Date;
  soulsWon: number;
  contacts: IContact[];
  eventName: string;
  createdAt: Date;
  updatedAt: Date;
}

const soulWinningRecordSchema = new mongoose.Schema<ISoulWinningRecord>({
  minister: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  soulsWon: {
    type: Number,
    required: true,
    min: 0
  },
  contacts: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    }
  }],
  eventName: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const SoulWinningRecord = mongoose.model<ISoulWinningRecord>('SoulWinningRecord', soulWinningRecordSchema);

export default SoulWinningRecord;