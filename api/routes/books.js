const router = require('express').Router();
const BookModel = require('../models/Book');
const BooksController = require('../controllers/BookController');

validateBookId = async (req, res, next) => {
    const city = await BookModel.findByPk(req.params.bookId);
    if (! city) {
      return res.status(404).json({ error: 'Book not found' });
    }
    next();
  }

router.get('/books', BooksController.index);

router.post('/books', BooksController.create);

router.get('/books/:bookId', validateBookId, BooksController.show);

router.put('/books/:bookId', validateBookId, BooksController.update);

router.delete('/books/:bookId', validateBookId, BooksController.delete);

module.exports = router;
