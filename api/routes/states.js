const router = require('express').Router();
const UserModel = require('../models/State');
const stateController = require('../controllers/StatesController');

validateStateId = async (req, res, next) => {
    const state = await UserModel.findByPk(req.params.stateId);
    if (! state) {
      return res.status(404).json({ error: 'State not found' });
    }
    next();
  }

router.get('/states', stateController.index);

router.post('/states', stateController.create);

router.get('/states/:stateId', validateStateId, stateController.show);

router.put('/states/:stateId', validateStateId, stateController.update);

router.delete('/states/:stateId', validateStateId, stateController.delete);

module.exports = router;
