const bookService = require('../services/books.service');

const getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
    res.json({ statusCode: 200, data: books, message: "Success" });
};

const getBookById = (req, res) => {
    const book = bookService.getBookById(req.params.id);
    if (book) {
        res.json({ statusCode: 200, data: book, message: "Success" });
    } else {
        res.status(404).json({ statusCode: 404, message: "Book not found" });
    }
};

module.exports = {
    getAllBooks,
    getBookById
};