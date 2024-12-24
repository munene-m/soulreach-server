import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import config from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { connectDB } from "./config/db";
//routes
import authRoute from "./routes/auth";
import regionRoute from "./routes/region";
import subRegionRoute from "./routes/subRegion";
import churchRoute from "./routes/church";
import userRoute from "./routes/user";
import soulWinningRoute from "./routes/soulWinning";
import { adminRegister } from "./utils/admin";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
connectDB();

const PORT = config.port;

app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to the soulreach server" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/${config.prefix}/auth`, authRoute);
app.use(`/${config.prefix}/region`, regionRoute);
app.use(`/${config.prefix}/subRegion`, subRegionRoute);
app.use(`/${config.prefix}/user`, userRoute);
app.use(`/${config.prefix}/soulWinning`, soulWinningRoute);
app.use(`/${config.prefix}/church`, churchRoute);

app.listen(PORT, async () => {
  // await adminRegister();
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  console.log("Goodbye!");
  process.exit(0);
});
