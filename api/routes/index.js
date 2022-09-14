const router = require('express').Router();
const cors = require('cors');
const users = require('./users.js');
const states = require('./states.js');
const cities = require('./cities.js');
const Publisher = require('./publishers.js');
const Category = require('./categories.js');
const Book = require('./books.js');
const Format = require('./format.js');

router.use(cors());

router.use(users);
router.use(states);
router.use(cities);
router.use(Publisher);
router.use(Category);
router.use(Book);
router.use(Format);

module.exports = router;