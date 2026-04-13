const Book = require("../models/books.model");

async function getAllBooks() {
  return await Book.find({}).lean({ getters: true });
}

async function getBookById(id) {
  return await Book.findOne({ id: id }).lean({ getters: true });
}
async function createBook(data) {
  const book = new Book(data);
  return await book.save();
}

async function updateBook(id, data) {
  return await Book.findOneAndUpdate({ id }, data, {
    new: true,
    runValidators: true,
  }).lean({ getters: true });
}
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
};
