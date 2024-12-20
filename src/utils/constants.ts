import { sendEmailWithRetry } from "./emails";
import { Otp } from "../models/otp";

export enum UserRole {
  PASTOR = "PASTOR",
  REGIONAL_OVERSEER = "REGIONAL_OVERSEER",
  SUB_REGIONAL_OVERSEER = "SUB_REGIONAL_OVERSEER",
  BISHOP = "BISHOP"
}

export type EmailTemplate =
  | "Verify"
  | "ChangePassword"

export interface EmailData {
  to: string;
  subject: string;
  templateName: EmailTemplate;
  data: Record<string, any>;
}

export interface EmailError extends Error {
  code?: string;
  command?: string;
  attemptCount?: number;
}

// export async function sendOtp(type: "Email" | "Phone", value: string) {
 
//   await Otp.create({
//     [type.toLowerCase()]: value,
//     otp: code,
//     type: `${type} update request otp`,
//   });

//   if (type === "Email") {
//     await sendEmailWithRetry({
//       to: value,
//       subject: "Verify your new email",
//       templateName: "EnrouteVerify" as EmailTemplate,
//       data: { verificationCode: code },
//     });
//   }

//   return `${type} verification code sent successfully.`;
// }
