import dotenv from "dotenv";
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET, // to sign and validate signatures
    audience: process.env.JWT_AUDIENCE, // this and issuer are for validation
    issuer: process.env.JWT_ISSUER,
  },
  port: process.env.PORT || 8080,
  prefix: process.env.API_PREFIX,
  databaseUri: process.env.MONGO_URI,
  enrouteEmail: process.env.ENROUTE_EMAIL,
  enrouteEmailPass: process.env.ENROUTE_EMAIL_PASSWORD,
  replyToEmail: process.env.REPLY_TO_EMAIL,
  smtpHost: process.env.SMTP_HOST,
  nodeEnv: process.env.NODE_ENV,
  africasTalkingApiKey: process.env.AFRICASTALKING_API_KEY,
  africasTalkingSenderId: process.env.AFRICASTALKING_SENDER_ID,
  africasTalkingUser: process.env.AFRICASTALKING_USER,
  minioEndpoint: process.env.MINIO_ENDPOINT,
  minioPort: process.env.MINIO_PORT,
  minioAccessKey: process.env.MINIO_ACCESS_KEY,
  minioSecretKey: process.env.MINIO_SECRET_KEY,
  minioBucketName: process.env.MINIO_BUCKET_NAME,
  minioFolderName: process.env.MINIO_FOLDER_NAME,
  apiBaseUrl: process.env.API_BASE_URL,
};

export default config;
