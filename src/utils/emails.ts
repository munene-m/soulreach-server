import { render } from "@react-email/components";
import React from "react";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { EmailTemplate, EmailData, EmailError } from "./constants";
import ResetPasswordEmail from "../templates/ChangePassword";
import VerifyEmail from "../templates/Verify";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: 587,
  secure: false,
  auth: {
    user: config.enrouteEmail,
    pass: config.enrouteEmailPass,
  },
  tls: {
    rejectUnauthorized: config.nodeEnv === "production",
  },
  pool: true, // Use pooled connections
  maxConnections: 5,
  maxMessages: 100,
});
const RETRY_DELAYS = [2000, 4000, 8000];
const MAX_RETRIES = 3;

export const templates: Record<EmailTemplate, React.ComponentType<any>> = {
  Verify: VerifyEmail,
  ChangePassword: ResetPasswordEmail,
};

export const renderTemplate = async (
  templateName: EmailTemplate,
  data: Record<string, any>
): Promise<string> => {
  const Template = templates[templateName];
  if (!Template) {
    throw new Error(`Template not found: ${templateName}`);
  }

  try {
    return await render(React.createElement(Template, data));
  } catch (error) {
    console.log(`Template rendering error for ${templateName}:`, error);
    throw error;
  }
};

export const createMailOptions = async (
  emailData: EmailData,
  htmlContent: string
) => {
  const { to, subject } = emailData;
  return {
    from: `Enroute <${config.enrouteEmail}>`,
    to,
    subject,
    html: htmlContent,
    replyTo: config.replyToEmail,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "high",
    },
    messageId: `<${Date.now()}.${Math.random().toString(36).substring(2)}@${
      config.smtpHost
    }>`,
  };
};

export const sendEmail = async (
  emailData: EmailData
): Promise<SentMessageInfo> => {
  const { to, templateName, data } = emailData;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const error = new Error("Email sending timed out") as EmailError;
      error.code = "ETIMEDOUT";
      reject(error);
    }, 10000);

    (async () => {
      try {
        const htmlContent = await renderTemplate(templateName, data);

        let header = "Enroute";
        let sender = config.enrouteEmail;
        const mailOptions = {
          from: `${header} <${sender}>`,
          to,
          subject: emailData.subject,
          html: htmlContent,
          replyTo: config.replyToEmail,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", {
          response: info.response,
          messageId: info.messageId,
          template: templateName,
          recipient: to,
        });

        clearTimeout(timeout);
        resolve(info);
      } catch (error) {
        clearTimeout(timeout);
        console.log("Email sending failed:", {
          error,
          template: templateName,
          recipient: to,
        });
        reject(error);
      }
    })();
  });
};
export const sendEmailWithRetry = async (
  emailData: EmailData
): Promise<SentMessageInfo> => {
  let lastError: EmailError | undefined;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await sendEmail(emailData);
    } catch (error) {
      lastError = error as EmailError;
      lastError.attemptCount = attempt + 1;

      console.log("Email sending failed, attempting retry", {
        attempt: attempt + 1,
        maxRetries: MAX_RETRIES,
        error: lastError,
        template: emailData.templateName,
        recipient: emailData.to,
      });

      // Don't wait on the last attempt
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAYS[attempt])
        );
      }
    }
  }
  throw new Error("Max retries reached");
};
