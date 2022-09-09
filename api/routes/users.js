const router = require('express').Router();
const UserModel = require('../models/User');
const userController = require('../controllers/UsersController');

validateUserId = async (req, res, next) => {
    const user = await UserModel.findByPk(req.params.userId);
    if (! user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next();
  }

router.get('/users', userController.index);

router.post('/users', userController.create);

router.post('/validate', userController.validate);

router.get('/users/:userId', validateUserId, userController.show);

router.put('/users/:userId', validateUserId, userController.update);

router.delete('/users/:userId', validateUserId, userController.delete);

module.exports = router;
