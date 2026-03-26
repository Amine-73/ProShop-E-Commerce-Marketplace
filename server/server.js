import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser'; 
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";


//load envirenment variables
dotenv.config();
connectDB();



const app = express();

const corsOptions={
  // 1. Explicitly allow your frontend URL (No wildcards!)
  origin: 'http://localhost:3000', 
  
  // 2. Allow headers/cookies to be sent
  credentials: true,               
  
  // 3. Allow specific methods (optional but good practice)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
  // 4. Allow specific headers
  allowedHeaders: ['Content-Type', 'Authorization'],
}

if (process.env.NODE_ENV === 'production') {
    console.error('ERROR: Cannot run seeder in production mode!'.red.bold);
    process.exit(1);
}


//midleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use("/api/products", productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running ... ");
});

const PORT = process.env.PORT || 5000;

//middleware for 404 Not Found
// 4. 404 Handler (MUST come after routes)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});



//Main Error Handler (this converts errors to json)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
