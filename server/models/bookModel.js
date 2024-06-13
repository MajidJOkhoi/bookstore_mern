import mongoose from "mongoose";

// Define the schema for the Book model
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Book model
const Book = mongoose.model("Book", bookSchema);
export default Book;
