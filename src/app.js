import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Coinbase clone backend is running",
    routes: [
      "GET /api/register",
      "POST /api/register",
      "GET /api/login",
      "POST /api/login",
      "POST /api/logout",
      "GET /api/profile",
      "GET /api/crypto",
      "GET /api/crypto/gainers",
      "GET /api/crypto/new",
      "POST /api/crypto",
    ],
  });
});

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", cryptoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
