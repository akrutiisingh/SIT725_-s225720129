const bookService = require('../services/books.service');

const allowedFields = ['id','title','author','year','genre','summary','price'];

function validateFields(body, isUpdate = false) {

    const keys = Object.keys(body);

    for (let key of keys) {
        if (!allowedFields.includes(key)) {
            return `Unknown field: ${key}`;
        }
    }

    if (isUpdate && body.id) {
        return 'ID is immutable and cannot be changed';
    }

  
    if (isUpdate && Object.keys(body).length === 0) {
        return 'Empty update not allowed';
    }

    return null;
}

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
            return res.status(200).json({
                statusCode: 200,
                data: item
            });
        }

        return res.status(404).json({
            statusCode: 404,
            message: "Not found"
        });

    } catch (err) {
        next(err);
    }
};


exports.createBook = async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.price || !req.body.id) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const error = validateFields(req.body, false);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const newBook = await bookService.createBook(req.body);

        return res.status(201).json({
            statusCode: 201,
            data: newBook
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(409).json({ message: 'Duplicate ID' });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        return res.status(500).json({ message: 'Server error' });
    }
};


exports.updateBook = async (req, res) => {
    try {

        const error = validateFields(req.body, true);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const filteredBody = Object.fromEntries(
            Object.entries(req.body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        const updated = await bookService.updateBook(req.params.id, filteredBody);

        if (!updated) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            statusCode: 200,
            data: updated
        });

    } catch (err) {

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        return res.status(500).json({ message: 'Server error' });
    }
};