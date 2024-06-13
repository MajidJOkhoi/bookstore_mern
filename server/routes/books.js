import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// add book in database
router.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      console.log("Missing required fields");
      return res.status(400).send({
        message: "Send all required fields: author, title, publishYear",
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// show or get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


// get one book from database using id
router.get("/books/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Update th books
router.put("/books/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { id } = req.params;

    // Check if all required fields are provided
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Find and update the book, returning the updated document
    const result = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );
    // Check if the book was found and updated
    if (!result) {
      return res
        .status(404)
        .send({ message: "Could not find book in database" });
    }

    // Send the updated book as a response
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


// delete the book from database
router.delete("/books/:id", async (req, res) => {
    try {
      const { id } = req.params; // Extract the id as a string
  
      // Find and delete the book by its ID
      const result = await Book.findByIdAndDelete(id);
  
      // If the book was not found, return a 404 status with a message
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // If the book was successfully deleted, return a 200 status with a success message
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  

export default router;
