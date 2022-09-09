const router = require('express').Router();
const CategoryModel = require('../models/category');
const categoryController = require('../controllers/CategoriesController');

validateCategoryId = async (req, res, next) => {
    const city = await CategoryModel.findByPk(req.params.categoryId);
    if (! city) {
      return res.status(404).json({ error: 'category not found' });
    }
    next();
  }

router.get('/categories', categoryController.index);

router.post('/categories', categoryController.create);

router.get('/categories/:categoryId', validateCategoryId, categoryController.show);

router.put('/categories/:categoryId', validateCategoryId, categoryController.update);

router.delete('/categories/:categoryId', validateCategoryId, categoryController.delete);

module.exports = router;
