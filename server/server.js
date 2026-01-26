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

//middleware for 404 Not Found
app.use((req,res,next)=>{
  const error=new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
})

//Main Error Handler (this converts errors to json)
app.use((err,req,res,next)=>{
  const statusCode=res.statusCode===200?500:res.statusCode;
  res.status(statusCode);
  res.json({
    message:err.message,
    // only show the stack trace if we are in development mode 
    stack:process.env.NODE_ENV ==='production'?'null':err.stack,
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
