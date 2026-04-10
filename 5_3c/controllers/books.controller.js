const bookService = require('../services/books.service');

exports.getAllBooks = async (req, res, next) => {
    try {
        const items = await bookService.getAllBooks();
        res.status(200).json({
            statusCode: 200,
            data: items,
            message: 'Books retrieved using service'
        });
    } catch (err) {
        next(err);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const item = await bookService.getBookById(req.params.id);
        if (item) {
            res.status(200).json({ statusCode: 200, data: item });
        } else {
            res.status(404).json({ statusCode: 404, message: "Not found" });
        }
    } catch (err) {
        next(err);
    }
};