import mongoose from "mongoose";

interface IAuditLog {
  userId: mongoose.Schema.Types.ObjectId;
  action: string;
  details: string;
  timestamp: Date;
}

const AuditLogSchema = new mongoose.Schema<IAuditLog>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
