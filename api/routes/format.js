const router = require('express').Router();
const FormatModel = require('../models/Format');
const FormatController = require('../controllers/FormatController');


router.get('/formats', FormatController.index);

router.post('/formats', FormatController.create);


module.exports = router;
