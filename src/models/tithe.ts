import mongoose from "mongoose";

interface ITithe extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  month: Date;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  transactionReference: string;
  paymentMethod: "MPESA";
  paymentDate?: Date;
  paystackTransactionId?: string;
  metadata?: Record<string, any>;
  church: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const titheSchema = new mongoose.Schema<ITithe>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  month: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  transactionReference: {
    type: String,
    required: true,
    unique: true
  },
  paymentMethod: {
    type: String,
    enum: ['MPESA'],
    required: true
  },
  paymentDate: {
    type: Date
  },
  paystackTransactionId: {
    type: String
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  church: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Church",
    required: true
  }
}, {
  timestamps: true
});

const Tithe = mongoose.model<ITithe>('Tithe', titheSchema);

export default Tithe;