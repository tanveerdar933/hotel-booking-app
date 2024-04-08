import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
const PORT = 8000;

mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => console.log("MongoDB connection established successfully!"));

const app = express();

app.use(express.json()); //help convert every req body into json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on localhost:", PORT);
});
