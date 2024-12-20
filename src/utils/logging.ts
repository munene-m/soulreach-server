import { AuditLog } from "../models/audit-log";

export async function createAuditLog(
  userId: string,
  action: string,
  details: string
) {
  try {
    await AuditLog.create({
      userId,
      action,
      details,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error creating audit log:", error);
  }
}
