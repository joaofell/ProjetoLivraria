const router = require('express').Router();
const PublisherModel = require('../models/Publisher');
const publishersController = require('../controllers/PublishersController');

validatePublishId = async (req, res, next) => {
    const publisher = await PublisherModel.findByPk(req.params.publishersId);
    if (! publisher) {
      return res.status(404).json({ error: 'Publisher not found' });
    }
    next();
  }

router.get('/publishers', publishersController.index);

router.post('/publishers', publishersController.create);

router.get('/publishers/:publishersId', validatePublishId, publishersController.show);

router.put('/publishers/:publishersId', validatePublishId, publishersController.update);

router.delete('/publishers/:publishersId', validatePublishId, publishersController.delete);

module.exports = router;
