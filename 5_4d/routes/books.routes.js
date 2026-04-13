const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');

router.get('/', bookController.getAllBooks);
router.get('/integrity-check42', (req, res) => res.status(204).send());
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);

module.exports = router;