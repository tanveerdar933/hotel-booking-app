import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
const PORT = 8000;

mongoose.connect(process.env.MONGO_DB_URI as string)
  .then(() => console.log("MongoDB connection established successfully!"))

const app = express();

app.use(express.json()); //help convert every req body into json
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from express endpoint!" })
})

app.listen(PORT, () => {
  console.log("Server is running on localhost:", PORT);
})