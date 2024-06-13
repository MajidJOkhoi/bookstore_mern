import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/books.js";  // Correct import path
import { PORT, MONGO_URI } from "./config.js";
import cors from "cors";


const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());

// middleware for handling cors policies
// Option1 : handling cors policies defaults of cors(*)
app.use(cors());

// Options 2 : Allow custom origins

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// )

// Use the books router for routes starting with /api
app.use("/api", booksRouter);



// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
