import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
//load envirenment variables
dotenv.config();
connectDB();

const app = express();

//midleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ... ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
