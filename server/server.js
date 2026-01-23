import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
//load envirenment variables
dotenv.config();
connectDB();

const app = express();

//midleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use('/api/users',userRoutes)

app.get("/", (req, res) => {
  res.send("API is running ... ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
